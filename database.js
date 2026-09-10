(function () {
  const DB_NAME = 'KedaiPOS';
  const DB_VERSION = 3;
  const APP_STATE_KEY = 'main';
  const BACKUP_KEY = 'kedai_pos_backup_v1';
  let database;

  function requestToPromise(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = event => {
        const db = event.target.result;
        let store;
        if (!db.objectStoreNames.contains('Ingredients')) {
          store = db.createObjectStore('Ingredients', { keyPath: 'id' });
        } else {
          store = event.target.transaction.objectStore('Ingredients');
        }
        if (!store.indexNames.contains('by_name')) store.createIndex('by_name', 'name', { unique: false });

        if (!db.objectStoreNames.contains('Recipes')) {
          store = db.createObjectStore('Recipes', { keyPath: 'id' });
        } else {
          store = event.target.transaction.objectStore('Recipes');
        }
        if (!store.indexNames.contains('by_meal_id')) store.createIndex('by_meal_id', 'meal_id', { unique: false });
        if (!store.indexNames.contains('by_ingredient_id')) store.createIndex('by_ingredient_id', 'ingredient_id', { unique: false });

        if (!db.objectStoreNames.contains('StockOperations')) {
          store = db.createObjectStore('StockOperations', { keyPath: 'id', autoIncrement: true });
        } else {
          store = event.target.transaction.objectStore('StockOperations');
        }
        if (!store.indexNames.contains('by_ingredient_id')) store.createIndex('by_ingredient_id', 'ingredient_id', { unique: false });
        if (!store.indexNames.contains('by_date')) store.createIndex('by_date', 'date', { unique: false });

        if (!db.objectStoreNames.contains('Orders')) {
          store = db.createObjectStore('Orders', { keyPath: 'id', autoIncrement: true });
        } else {
          store = event.target.transaction.objectStore('Orders');
        }
        if (!store.indexNames.contains('by_status')) store.createIndex('by_status', 'status', { unique: false });
        if (!store.indexNames.contains('by_date')) store.createIndex('by_date', 'date', { unique: false });

        if (!db.objectStoreNames.contains('PurchaseOrders')) {
          store = db.createObjectStore('PurchaseOrders', { keyPath: 'id', autoIncrement: true });
        } else {
          store = event.target.transaction.objectStore('PurchaseOrders');
        }
        if (!store.indexNames.contains('by_status')) store.createIndex('by_status', 'status', { unique: false });
        if (!store.indexNames.contains('by_date')) store.createIndex('by_date', 'date', { unique: false });

        if (!db.objectStoreNames.contains('AppState')) {
          db.createObjectStore('AppState', { keyPath: 'id' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  function buildState(defaultState, savedState, orders, ingredients, purchaseOrders) {
    return {
      ...JSON.parse(JSON.stringify(defaultState)),
      ...savedState,
      menu: Array.isArray(savedState.menu) ? savedState.menu : JSON.parse(JSON.stringify(defaultState.menu)),
      ingredients: Array.isArray(ingredients) ? ingredients : [],
      activeOrders: orders.filter(order => order.status === 'active'),
      archive: orders.filter(order => order.status === 'archived'),
      purchaseOrders: Array.isArray(purchaseOrders) ? purchaseOrders : []
    };
  }

  function readBackup() {
    try {
      const raw = localStorage.getItem(BACKUP_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function writeBackup(state) {
    try {
      localStorage.setItem(BACKUP_KEY, JSON.stringify({
        savedAt: new Date().toISOString(),
        menu: state.menu,
        language: state.language,
        ingredients: state.ingredients,
        activeOrders: state.activeOrders,
        archive: state.archive,
        purchaseOrders: state.purchaseOrders
      }));
    } catch (error) {
      console.warn('Nie udało się zapisać kopii zapasowej:', error);
    }
  }

  function hasData(payload) {
    return Boolean(payload) && (
      (Array.isArray(payload.menu) && payload.menu.length > 0)
      || (Array.isArray(payload.ingredients) && payload.ingredients.length > 0)
      || (Array.isArray(payload.activeOrders) && payload.activeOrders.length > 0)
      || (Array.isArray(payload.archive) && payload.archive.length > 0)
      || (Array.isArray(payload.purchaseOrders) && payload.purchaseOrders.length > 0)
    );
  }

  /**
   * Wprowadza przykładowe składniki tylko raz. Dzięki temu użytkownik, który
   * celowo usunie wszystkie pozycje, nie zobaczy ich ponownie po restarcie.
   */
  function seedIngredients(state, defaultState, savedState) {
    const alreadySeeded = savedState?.ingredientsSeeded === true;
    const isEmpty = !Array.isArray(state.ingredients) || state.ingredients.length === 0;
    if (alreadySeeded || !isEmpty) return false;
    state.ingredients = JSON.parse(JSON.stringify(defaultState.ingredients || []));
    return true;
  }

  async function initialize(defaultState) {
    database = await openDatabase();
    const transaction = database.transaction(['AppState', 'Orders', 'Ingredients', 'PurchaseOrders'], 'readonly');
    const appStateRequest = transaction.objectStore('AppState').get(APP_STATE_KEY);
    const ordersRequest = transaction.objectStore('Orders').getAll();
    const ingredientsRequest = transaction.objectStore('Ingredients').getAll();
    const purchaseOrdersRequest = transaction.objectStore('PurchaseOrders').getAll();
    const appState = await requestToPromise(appStateRequest);
    const orders = await requestToPromise(ordersRequest);
    const ingredients = await requestToPromise(ingredientsRequest);
    const purchaseOrders = await requestToPromise(purchaseOrdersRequest);
    const savedState = appState?.value || {};
    const hasStoredData = Array.isArray(savedState.menu)
      || orders.length > 0
      || ingredients.length > 0
      || purchaseOrders.length > 0;

    if (hasStoredData) {
      const stored = buildState(defaultState, savedState, orders, ingredients, purchaseOrders);
      if (seedIngredients(stored, defaultState, savedState)) {
        await saveState(stored);
      } else {
        writeBackup(stored);
      }
      return stored;
    }

    const backup = readBackup();
    if (hasData(backup)) {
      const restored = buildState(defaultState, backup, [
        ...((backup.activeOrders || []).map(order => ({ ...order, status: 'active' }))),
        ...((backup.archive || []).map(order => ({ ...order, status: 'archived' })))
      ], backup.ingredients || [], backup.purchaseOrders || []);
      await saveState(restored);
      return restored;
    }

    const fresh = buildState(defaultState, {}, [], [], []);
    seedIngredients(fresh, defaultState, {});
    await saveState(fresh);
    return fresh;
  }

  async function saveState(state) {
    if (!database) return;
    const transaction = database.transaction(['AppState', 'Orders', 'Ingredients', 'PurchaseOrders'], 'readwrite');
    transaction.objectStore('AppState').put({
      id: APP_STATE_KEY,
      value: { menu: state.menu, language: state.language, ingredientsSeeded: true, savedAt: new Date().toISOString() }
    });

    const ordersStore = transaction.objectStore('Orders');
    state.activeOrders.forEach(order => ordersStore.put({ ...order, status: 'active' }));
    state.archive.forEach(order => ordersStore.put({ ...order, status: 'archived' }));

    const ingredientsStore = transaction.objectStore('Ingredients');
    state.ingredients.forEach(ingredient => ingredientsStore.put(ingredient));

    const purchaseOrdersStore = transaction.objectStore('PurchaseOrders');
    state.purchaseOrders.forEach(order => purchaseOrdersStore.put(order));

    writeBackup(state);
  }

  function deleteIngredient(ingredientId) {
    return requestToPromise(database.transaction('Ingredients', 'readwrite').objectStore('Ingredients').delete(ingredientId));
  }

  function addPurchaseOrder(order) {
    return requestToPromise(database.transaction('PurchaseOrders', 'readwrite').objectStore('PurchaseOrders').add({ ...order, status: 'ordered' }));
  }

  function deletePurchaseOrder(orderId) {
    return requestToPromise(database.transaction('PurchaseOrders', 'readwrite').objectStore('PurchaseOrders').delete(orderId));
  }

  async function saveLanguage(language) {
    if (!database) return;
    const current = await requestToPromise(database.transaction('AppState', 'readonly').objectStore('AppState').get(APP_STATE_KEY));
    const value = { ...(current?.value || {}), language, savedAt: new Date().toISOString() };
    await requestToPromise(database.transaction('AppState', 'readwrite').objectStore('AppState').put({ id: APP_STATE_KEY, value }));
    const backup = readBackup();
    if (backup) {
      backup.language = language;
      try {
        localStorage.setItem(BACKUP_KEY, JSON.stringify(backup));
      } catch (error) {
        console.warn('Nie udało się zaktualizować kopii zapasowej:', error);
      }
    }
  }

  async function requestPersistence() {
    if (!navigator.storage?.persist) return false;
    try {
      if (await navigator.storage.persisted()) return true;
      return await navigator.storage.persist();
    } catch (error) {
      return false;
    }
  }

  async function getStorageInfo() {
    const info = { persistent: false, usage: 0, quota: 0 };
    try {
      if (navigator.storage?.persisted) info.persistent = await navigator.storage.persisted();
      if (navigator.storage?.estimate) {
        const estimate = await navigator.storage.estimate();
        info.usage = estimate.usage || 0;
        info.quota = estimate.quota || 0;
      }
    } catch (error) {
      // Informacje o magazynie są opcjonalne.
    }
    return info;
  }

  function exportState(state) {
    return JSON.stringify({
      app: 'KedaiPOS',
      exportedAt: new Date().toISOString(),
      menu: state.menu,
      language: state.language,
      ingredients: state.ingredients,
      activeOrders: state.activeOrders,
      archive: state.archive,
      purchaseOrders: state.purchaseOrders
    }, null, 2);
  }

  async function importState(defaultState, payload) {
    const restored = buildState(defaultState, payload, [
      ...((payload.activeOrders || []).map(order => ({ ...order, status: 'active' }))),
      ...((payload.archive || []).map(order => ({ ...order, status: 'archived' })))
    ], payload.ingredients || [], payload.purchaseOrders || []);
    await saveState(restored);
    return restored;
  }

  function addOrder(order) {
    return requestToPromise(database.transaction('Orders', 'readwrite').objectStore('Orders').add({ ...order, status: 'active' }));
  }

  function updateOrder(order, status) {
    return requestToPromise(database.transaction('Orders', 'readwrite').objectStore('Orders').put({ ...order, status }));
  }

  function deleteOrder(orderId) {
    return requestToPromise(database.transaction('Orders', 'readwrite').objectStore('Orders').delete(orderId));
  }

  function clearOrders() {
    return requestToPromise(database.transaction('Orders', 'readwrite').objectStore('Orders').clear());
  }

  window.KedaiDatabase = {
    initialize,
    saveState,
    saveLanguage,
    addOrder,
    updateOrder,
    deleteOrder,
    clearOrders,
    deleteIngredient,
    addPurchaseOrder,
    deletePurchaseOrder,
    requestPersistence,
    getStorageInfo,
    exportState,
    importState
  };
})();
