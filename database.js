(function () {
  const DB_NAME = 'KedaiPOS';
  const DB_VERSION = 2;
  const APP_STATE_KEY = 'main';
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

        if (!db.objectStoreNames.contains('AppState')) {
          db.createObjectStore('AppState', { keyPath: 'id' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function initialize(defaultState) {
    database = await openDatabase();
    const transaction = database.transaction(['AppState', 'Orders'], 'readonly');
    const appState = await requestToPromise(transaction.objectStore('AppState').get(APP_STATE_KEY));
    const orders = await requestToPromise(transaction.objectStore('Orders').getAll());
    const savedState = appState?.value || {};
    const state = {
      ...JSON.parse(JSON.stringify(defaultState)),
      ...savedState,
      menu: Array.isArray(savedState.menu) && savedState.menu.length ? savedState.menu : defaultState.menu,
      activeOrders: orders.filter(order => order.status === 'active'),
      archive: orders.filter(order => order.status === 'archived')
    };

    await saveState(state);
    return state;
  }

  async function saveState(state) {
    if (!database) return;
    const transaction = database.transaction(['AppState', 'Orders'], 'readwrite');
    transaction.objectStore('AppState').put({
      id: APP_STATE_KEY,
      value: { menu: state.menu, language: state.language }
    });

    const ordersStore = transaction.objectStore('Orders');
    state.activeOrders.forEach(order => ordersStore.put({ ...order, status: 'active' }));
    state.archive.forEach(order => ordersStore.put({ ...order, status: 'archived' }));
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

  window.KedaiDatabase = { initialize, saveState, addOrder, updateOrder, deleteOrder, clearOrders };
})();
