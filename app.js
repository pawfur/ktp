const defaultState = window.KedaiConfig.defaultState;

      const translations = {
        pl: {
          ready: 'Gotowy',
          cashRegister: 'Kasa fiskalna',
          menu: 'Menu',
          customer: 'Obsługa',
          orders: 'Zamówienia',
          archive: 'Archiwum',
          settings: 'Ustawienia',
          menuElementType: 'Typ elementu',
          productType: 'Pozycja menu',
          sectionType: 'Zakładka / kategoria',
          addSection: 'Dodaj zakładkę',
          editSection: 'Zapisz zakładkę',
          appVersionLabel: 'Wersja aplikacji',
          checkUpdates: 'Sprawdź aktualizacje',
          updateApp: 'Aktualizuj aplikację',
          updateProgress: 'Przygotowywanie aktualizacji...',
          updateDownloading: 'Pobieranie nowej wersji...',
          updateInstalling: 'Instalowanie nowej wersji...',
          updateReady: 'Aktualizacja gotowa. Uruchomić aplikację ponownie?',
          updatePartial: 'Pamięć podręczna odświeżona. Uruchom aplikację ponownie.',
          updateRestart: 'Uruchom ponownie',
          updateAvailable: 'Dostępna jest nowsza wersja: {version}',
          upToDate: 'Aplikacja jest aktualna.',
          updateCheckFailed: 'Nie udało się sprawdzić aktualizacji.',
          updating: 'Aktualizowanie aplikacji...',
          backupTitle: 'Kopia zapasowa danych',
          backupDescription: 'Zapisz menu i zamówienia do pliku, aby móc je odtworzyć na tym lub innym telefonie.',
          exportBackup: 'Eksportuj dane',
          importBackup: 'Importuj dane',
          exportDone: 'Kopia zapasowa została zapisana.',
          importDone: 'Dane zostały wczytane.',
          importFailed: 'Nie udało się wczytać pliku z danymi.',
          storagePersistent: 'Pamięć trwała: włączona',
          storageNotPersistent: 'Pamięć trwała: wyłączona (system może usunąć dane przy braku miejsca)',
          storageLabel: 'Wykorzystanie pamięci',
          dbOpenFailed: 'Nie udało się otworzyć lokalnej bazy danych.',
          editMenu: 'Edytuj menu',
          orderArchive: 'Archiwum zamówień',
          editWarehouse: 'Edycja magazynu',
          warehouse: 'Magazyn',
          ingredients: 'Składniki',
          addIngredient: 'Dodaj składnik',
          ingredientName: 'Nazwa',
          ingredientUnit: 'Jednostka',
          ingredientStock: 'Ilość',
          ingredientPrice: 'Cena jedn.',
          ingredientMinStock: 'Stan min.',
          ingredientTargetStock: 'Stan zalecany',
          ingredientMoq: 'Min. zamówienie',
          ingredientStep: 'Krok zamówienia',
          noIngredients: 'Brak składników. Dodaj pierwszy składnik.',
          fillIngredient: 'Uzupełnij poprawnie nazwę, ilość i cenę.',
          ingredientAdded: 'Składnik został dodany.',
          ingredientUpdated: 'Składnik został zaktualizowany.',
          ingredientRemoved: 'Składnik został usunięty.',
          confirmDeleteIngredient: 'Usunąć składnik "{name}" z magazynu?',
          warehouseValue: 'Wartość magazynu',
          stockValue: 'Wartość stanu',
          belowMin: 'Poniżej stanu min.',
          orderIngredients: 'Zamów',
          purchaseTitle: 'Zamawianie składników',
          purchaseList: 'Lista zamówień',
          purchaseTotal: 'Wartość zamówienia',
          acceptOrder: 'Akceptuj',
          noPurchaseItems: 'Nie wybrano składników.',
          chooseIngredient: 'Wybierz co najmniej jeden składnik.',
          purchaseSaved: 'Zamówienie zostało zapisane.',
          purchaseEmpty: 'Brak zamówień.',
          purchaseDeleted: 'Zamówienie zostało usunięte.',
          confirmDeletePurchase: 'Usunąć to zamówienie?',
          confirmCancelPurchase: 'Czy na pewno chcesz anulować zamówienie?',
          purchaseCleared: 'Zamówienie zostało anulowane.',
          recommended: 'Zalecane',
          useRecommended: 'Ustaw zalecane',
          moqWarning: '{name}: minimalne zamówienie to {moq} {unit}.',
          stepWarning: '{name}: ilość musi być wielokrotnością {step} {unit}.',
          ordered: 'Zamówione',
          clear: 'Wyczyść',
          totalSales: 'Suma sprzedaży',
          language: 'Język',
          item: 'pozycja',
          items: 'pozycji',
          productName: 'Nazwa',
          productPrice: 'Cena (IDR)',
          addProduct: 'Dodaj pozycję',
          cancel: 'Anuluj',
          saveChanges: 'Zapisz zmiany',
          customerService: 'Obsługa klienta',
          summary: 'Podsumowanie',
          totalToPay: 'Do zapłaty',
          saveOrder: 'Zapisz',
          clearSelection: 'Anuluj',
          noItems: 'Brak wybranych pozycji.',
          activeOrders: 'Aktywne zamówienia',
          noActiveOrders: 'Brak aktywnych zamówień.',
          noArchive: 'Brak zarchiwizowanych zamówień.',
          edit: 'Edytuj',
          delete: 'Usuń',
          archiveLabel: 'Archiwizuj',
          closed: 'Zamknięte',
          active: 'Aktywne',
          statusReady: 'Gotowy',
          noProduct: 'Brak pozycji w menu. Dodaj pierwszą pozycję.',
          fillProduct: 'Uzupełnij poprawnie nazwę i cenę.',
          productUpdated: 'Pozycja została zaktualizowana.',
          productAdded: 'Dodano nową pozycję.',
          productRemoved: 'Pozycja została usunięta.',
          selectionCleared: 'Wybór został wyczyszczony.',
          chooseAtLeastOne: 'Wybierz co najmniej jedną pozycję.',
          orderSaved: 'Zamówienie zostało zapisane.',
          orderUpdated: 'Zamówienie zostało zaktualizowane.',
          archived: 'Zamówienie przeniesiono do archiwum.',
          orderDeleted: 'Zamówienie zostało usunięte.',
          archiveCleared: 'Archiwum zostało wyczyszczone.',
          archiveEmpty: 'Archiwum jest puste.',
          activeOrdersLabel: 'Aktywne zamówienia',
          archivedOrdersLabel: 'Zarchiwizowane zamówienia',
          confirmDeleteProduct: 'Usunąć pozycję "{name}" z menu?',
          confirmDeleteOrder: 'Usunąć aktywne zamówienie z dnia {date}?',
          confirmClearArchive: 'Czy na pewno chcesz wyczyścić archiwum?',
          confirmCancelSelection: 'Czy na pewno chcesz anulować bieżące zamówienie?',
          confirmEditOrder: 'Aby edytować to zamówienie, obecne zamówienie w zakładce Obsługa zostanie usunięte. Kontynuować?',
          confirmDeleteOrderInList: 'Czy na pewno chcesz usunąć to zamówienie?',
          confirmDeleteMenuProduct: 'Czy na pewno chcesz usunąć tę pozycję z menu?',
          no: 'Nie',
          yes: 'Tak'
        },
        en: {
          ready: 'Ready',
          cashRegister: 'Cash register',
          menu: 'Menu',
          customer: 'Customer',
          orders: 'Orders',
          archive: 'Archive',
          settings: 'Settings',
          menuElementType: 'Element type',
          productType: 'Menu item',
          sectionType: 'Tab / category',
          addSection: 'Add category',
          editSection: 'Save category',
          appVersionLabel: 'App version',
          checkUpdates: 'Check for updates',
          updateApp: 'Update app',
          updateProgress: 'Preparing update...',
          updateDownloading: 'Downloading new version...',
          updateInstalling: 'Installing new version...',
          updateReady: 'Update ready. Restart the app?',
          updatePartial: 'Cache refreshed. Please restart the app.',
          updateRestart: 'Restart',
          updateAvailable: 'A newer version is available: {version}',
          upToDate: 'The app is up to date.',
          updateCheckFailed: 'Could not check for updates.',
          updating: 'Updating app...',
          backupTitle: 'Data backup',
          backupDescription: 'Save the menu and orders to a file so you can restore them on this or another phone.',
          exportBackup: 'Export data',
          importBackup: 'Import data',
          exportDone: 'Backup file has been saved.',
          importDone: 'Data has been loaded.',
          importFailed: 'Could not read the data file.',
          storagePersistent: 'Persistent storage: enabled',
          storageNotPersistent: 'Persistent storage: disabled (the system may clear data when space is low)',
          storageLabel: 'Storage usage',
          dbOpenFailed: 'Could not open the local database.',
          editMenu: 'Edit menu',
          orderArchive: 'Order archive',
          editWarehouse: 'Edit warehouse',
          warehouse: 'Warehouse',
          ingredients: 'Ingredients',
          addIngredient: 'Add ingredient',
          ingredientName: 'Name',
          ingredientUnit: 'Unit',
          ingredientStock: 'Quantity',
          ingredientPrice: 'Unit price',
          ingredientMinStock: 'Min. level',
          ingredientTargetStock: 'Target level',
          ingredientMoq: 'Min. order',
          ingredientStep: 'Order step',
          noIngredients: 'No ingredients yet. Add the first one.',
          fillIngredient: 'Please enter a valid name, quantity and price.',
          ingredientAdded: 'Ingredient added.',
          ingredientUpdated: 'Ingredient updated.',
          ingredientRemoved: 'Ingredient removed.',
          confirmDeleteIngredient: 'Delete the "{name}" ingredient from the warehouse?',
          warehouseValue: 'Warehouse value',
          stockValue: 'Stock value',
          belowMin: 'Below minimum',
          orderIngredients: 'Order',
          purchaseTitle: 'Order ingredients',
          purchaseList: 'Order list',
          purchaseTotal: 'Order value',
          acceptOrder: 'Accept',
          noPurchaseItems: 'No ingredients selected.',
          chooseIngredient: 'Please select at least one ingredient.',
          purchaseSaved: 'Order saved.',
          purchaseEmpty: 'No orders yet.',
          purchaseDeleted: 'Order deleted.',
          confirmDeletePurchase: 'Delete this order?',
          confirmCancelPurchase: 'Are you sure you want to cancel the order?',
          purchaseCleared: 'Order cancelled.',
          recommended: 'Recommended',
          useRecommended: 'Use recommended',
          moqWarning: '{name}: minimum order is {moq} {unit}.',
          stepWarning: '{name}: quantity must be a multiple of {step} {unit}.',
          ordered: 'Ordered',
          clear: 'Clear',
          totalSales: 'Total sales',
          language: 'Language',
          item: 'item',
          items: 'items',
          productName: 'Name',
          productPrice: 'Price (IDR)',
          addProduct: 'Add item',
          cancel: 'Cancel',
          saveChanges: 'Save changes',
          customerService: 'Customer service',
          summary: 'Summary',
          totalToPay: 'Total',
          saveOrder: 'Save',
          clearSelection: 'Cancel',
          noItems: 'No items selected.',
          activeOrders: 'Active orders',
          noActiveOrders: 'No active orders.',
          noArchive: 'No archived orders.',
          edit: 'Edit',
          delete: 'Delete',
          archiveLabel: 'Archive',
          closed: 'Closed',
          active: 'Active',
          statusReady: 'Ready',
          noProduct: 'No menu items yet. Add the first one.',
          fillProduct: 'Please enter a valid name and price.',
          productUpdated: 'Item updated.',
          productAdded: 'New item added.',
          productRemoved: 'Item removed.',
          selectionCleared: 'Selection cleared.',
          chooseAtLeastOne: 'Please select at least one item.',
          orderSaved: 'Order saved.',
          orderUpdated: 'Order updated.',
          archived: 'Order moved to archive.',
          orderDeleted: 'Order deleted.',
          archiveCleared: 'Archive cleared.',
          archiveEmpty: 'Archive is empty.',
          activeOrdersLabel: 'Active orders',
          archivedOrdersLabel: 'Archived orders',
          confirmDeleteProduct: 'Delete the "{name}" item from the menu?',
          confirmDeleteOrder: 'Delete the active order from {date}?',
          confirmClearArchive: 'Are you sure you want to clear the archive?',
          confirmCancelSelection: 'Are you sure you want to cancel the current order?',
          confirmEditOrder: 'To edit this order, the current order in the Customer tab will be removed. Continue?',
          confirmDeleteOrderInList: 'Are you sure you want to delete this order?',
          confirmDeleteMenuProduct: 'Are you sure you want to delete this menu item?',
          no: 'No',
          yes: 'Yes'
        },
        id: {
          ready: 'Siap',
          cashRegister: 'Kasir',
          menu: 'Menu',
          customer: 'Pelayanan',
          orders: 'Pesanan',
          archive: 'Arsip',
          settings: 'Pengaturan',
          menuElementType: 'Jenis elemen',
          productType: 'Item menu',
          sectionType: 'Tab / kategori',
          addSection: 'Tambah kategori',
          editSection: 'Simpan kategori',
          appVersionLabel: 'Versi aplikasi',
          checkUpdates: 'Periksa pembaruan',
          updateApp: 'Perbarui aplikasi',
          updateProgress: 'Menyiapkan pembaruan...',
          updateDownloading: 'Mengunduh versi baru...',
          updateInstalling: 'Memasang versi baru...',
          updateReady: 'Pembaruan siap. Mulai ulang aplikasi?',
          updatePartial: 'Cache diperbarui. Mulai ulang aplikasi.',
          updateRestart: 'Mulai ulang',
          updateAvailable: 'Versi baru tersedia: {version}',
          upToDate: 'Aplikasi sudah terbaru.',
          updateCheckFailed: 'Pembaruan tidak dapat diperiksa.',
          updating: 'Memperbarui aplikasi...',
          backupTitle: 'Cadangan data',
          backupDescription: 'Simpan menu dan pesanan ke file agar dapat dipulihkan di ponsel ini atau ponsel lain.',
          exportBackup: 'Ekspor data',
          importBackup: 'Impor data',
          exportDone: 'File cadangan telah disimpan.',
          importDone: 'Data berhasil dimuat.',
          importFailed: 'File data tidak dapat dibaca.',
          storagePersistent: 'Penyimpanan permanen: aktif',
          storageNotPersistent: 'Penyimpanan permanen: nonaktif (sistem dapat menghapus data saat ruang menipis)',
          storageLabel: 'Penggunaan penyimpanan',
          dbOpenFailed: 'Tidak dapat membuka basis data lokal.',
          editMenu: 'Ubah menu',
          orderArchive: 'Arsip pesanan',
          editWarehouse: 'Ubah gudang',
          warehouse: 'Gudang',
          ingredients: 'Bahan',
          addIngredient: 'Tambah bahan',
          ingredientName: 'Nama',
          ingredientUnit: 'Satuan',
          ingredientStock: 'Jumlah',
          ingredientPrice: 'Harga satuan',
          ingredientMinStock: 'Stok minimum',
          ingredientTargetStock: 'Stok ideal',
          ingredientMoq: 'Min. pesan',
          ingredientStep: 'Langkah pesan',
          noIngredients: 'Belum ada bahan. Tambahkan yang pertama.',
          fillIngredient: 'Isi nama, jumlah, dan harga dengan benar.',
          ingredientAdded: 'Bahan ditambahkan.',
          ingredientUpdated: 'Bahan diperbarui.',
          ingredientRemoved: 'Bahan dihapus.',
          confirmDeleteIngredient: 'Hapus bahan "{name}" dari gudang?',
          warehouseValue: 'Nilai gudang',
          stockValue: 'Nilai stok',
          belowMin: 'Di bawah minimum',
          orderIngredients: 'Pesan',
          purchaseTitle: 'Pesan bahan',
          purchaseList: 'Daftar pesanan',
          purchaseTotal: 'Nilai pesanan',
          acceptOrder: 'Terima',
          noPurchaseItems: 'Belum ada bahan dipilih.',
          chooseIngredient: 'Pilih minimal satu bahan.',
          purchaseSaved: 'Pesanan disimpan.',
          purchaseEmpty: 'Belum ada pesanan.',
          purchaseDeleted: 'Pesanan dihapus.',
          confirmDeletePurchase: 'Hapus pesanan ini?',
          confirmCancelPurchase: 'Apakah Anda yakin ingin membatalkan pesanan?',
          purchaseCleared: 'Pesanan dibatalkan.',
          recommended: 'Disarankan',
          useRecommended: 'Pakai disarankan',
          moqWarning: '{name}: pesanan minimum {moq} {unit}.',
          stepWarning: '{name}: jumlah harus kelipatan {step} {unit}.',
          ordered: 'Dipesan',
          clear: 'Bersihkan',
          totalSales: 'Total penjualan',
          language: 'Bahasa',
          item: 'item',
          items: 'item',
          productName: 'Nama',
          productPrice: 'Harga (IDR)',
          addProduct: 'Tambah item',
          cancel: 'Batal',
          saveChanges: 'Simpan perubahan',
          customerService: 'Pelayanan pelanggan',
          summary: 'Ringkasan',
          totalToPay: 'Total',
          saveOrder: 'Simpan',
          clearSelection: 'Batal',
          noItems: 'Belum ada item yang dipilih.',
          activeOrders: 'Pesanan aktif',
          noActiveOrders: 'Belum ada pesanan aktif.',
          noArchive: 'Belum ada arsip pesanan.',
          edit: 'Edit',
          delete: 'Hapus',
          archiveLabel: 'Arsipkan',
          closed: 'Selesai',
          active: 'Aktif',
          statusReady: 'Siap',
          noProduct: 'Belum ada item menu. Tambahkan yang pertama.',
          fillProduct: 'Isi nama dan harga dengan benar.',
          productUpdated: 'Item berhasil diperbarui.',
          productAdded: 'Item baru ditambahkan.',
          productRemoved: 'Item dihapus.',
          selectionCleared: 'Pilihan dibatalkan.',
          chooseAtLeastOne: 'Pilih minimal satu item.',
          orderSaved: 'Pesanan berhasil disimpan.',
          orderUpdated: 'Pesanan berhasil diperbarui.',
          archived: 'Pesanan dipindahkan ke arsip.',
          orderDeleted: 'Pesanan dihapus.',
          archiveCleared: 'Arsip berhasil dibersihkan.',
          archiveEmpty: 'Arsip masih kosong.',
          activeOrdersLabel: 'Pesanan aktif',
          archivedOrdersLabel: 'Pesanan arsip',
          confirmDeleteProduct: 'Hapus item "{name}" dari menu?',
          confirmDeleteOrder: 'Hapus pesanan aktif dari {date}?',
          confirmClearArchive: 'Apakah Anda yakin ingin membersihkan arsip?',
          confirmCancelSelection: 'Apakah Anda yakin ingin membatalkan pesanan saat ini?',
          confirmEditOrder: 'Untuk mengedit pesanan ini, pesanan saat ini di tab Pelayanan akan dihapus. Lanjutkan?',
          confirmDeleteOrderInList: 'Apakah Anda yakin ingin menghapus pesanan ini?',
          confirmDeleteMenuProduct: 'Apakah Anda yakin ingin menghapus item menu ini?',
          no: 'Tidak',
          yes: 'Ya'
        }
      };

      let state = JSON.parse(JSON.stringify(defaultState));
      let activeTab = 'menu';
      let currentSelection = {};
      let currentPurchaseSelection = {};
      let editingProductId = null;
      let editingOrderId = null;
      let editingIngredientId = null;

      const productForm = document.getElementById('productForm');
      const menuElementTypeSelect = document.getElementById('menuElementType');
      const productNameInput = document.getElementById('productName');
      const productPriceInput = document.getElementById('productPrice');
      const menuList = document.getElementById('menuList');
      const customerItems = document.getElementById('customerItems');
      const activeOrdersList = document.getElementById('activeOrdersList');
      const archiveList = document.getElementById('archiveList');
      const toast = document.getElementById('toast');
      const confirmModal = document.getElementById('confirmModal');
      const confirmMessage = document.getElementById('confirmMessage');
      const confirmNoBtn = document.getElementById('confirmNoBtn');
      const confirmYesBtn = document.getElementById('confirmYesBtn');
      const archiveTotal = document.getElementById('archiveTotal');
      const menuCountBadge = document.getElementById('menuCountBadge');
      const customerSummaryCount = document.getElementById('customerSummaryCount');
      const customerSummaryDetails = document.getElementById('customerSummaryDetails');
      const customerTotal = document.getElementById('customerTotal');
      const languageSelect = document.getElementById('languageSelect');
      const ingredientForm = document.getElementById('ingredientForm');
      const ingredientNameInput = document.getElementById('ingredientName');
      const ingredientUnitSelect = document.getElementById('ingredientUnit');
      const ingredientStockInput = document.getElementById('ingredientStock');
      const ingredientPriceInput = document.getElementById('ingredientPrice');
      const ingredientMinStockInput = document.getElementById('ingredientMinStock');
      const ingredientTargetStockInput = document.getElementById('ingredientTargetStock');
      const ingredientMoqInput = document.getElementById('ingredientMoq');
      const ingredientStepInput = document.getElementById('ingredientStep');
      const ingredientList = document.getElementById('ingredientList');
      const ingredientCountBadge = document.getElementById('ingredientCountBadge');
      const warehouseValueBadge = document.getElementById('warehouseValueBadge');
      const purchaseItems = document.getElementById('purchaseItems');
      const purchaseSummaryCount = document.getElementById('purchaseSummaryCount');
      const purchaseSummaryDetails = document.getElementById('purchaseSummaryDetails');
      const purchaseTotalLabel = document.getElementById('purchaseTotal');
      const purchaseOrderList = document.getElementById('purchaseOrderList');

      function translate(key, replacements = {}) {
        const lang = state.language || 'pl';
        const source = translations[lang] || translations.pl;
        const text = (source[key] || translations.pl[key] || key).toString();
        return Object.entries(replacements).reduce((result, [token, value]) => result.replace(new RegExp(`\\{${token}\\}`, 'g'), value), text);
      }

      function getCounterLabel(count, singularKey = 'item', pluralKey = 'items') {
        const label = count === 1 ? singularKey : pluralKey;
        return `${count} ${translate(label)}`;
      }

      function saveState() {
        return window.KedaiDatabase.saveState(state);
      }

      const { formatCurrency, formatDateTime: formatUiDateTime, escapeHtml, makeId } = window.KedaiUi;

      function formatDateTime(value) {
        return formatUiDateTime(value, state.language);
      }

      function formatNumber(value) {
        const number = Number(value || 0);
        return Number.isInteger(number) ? String(number) : number.toFixed(2);
      }

      function setLanguage(lang) {
        state.language = lang;
        window.KedaiDatabase.saveLanguage(lang);
        applyTranslations();
      }

      function applyTranslations() {
        const lang = state.language || 'pl';
        const t = translations[lang] || translations.pl;
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.dataset.i18n;
          if (translations[lang][key] || translations.pl[key]) {
            el.textContent = translate(key);
          }
        });

        if (languageSelect) {
          languageSelect.value = lang;
        }
      }

      function showToast(message, type = 'success') {
        toast.textContent = message;
        toast.classList.remove('hidden', 'border-emerald-200', 'bg-emerald-50', 'text-emerald-700', 'border-amber-200', 'bg-amber-50', 'text-amber-700', 'border-rose-200', 'bg-rose-50', 'text-rose-700');

        if (type === 'success') {
          toast.classList.add('border-emerald-200', 'bg-emerald-50', 'text-emerald-700');
        } else if (type === 'warning') {
          toast.classList.add('border-amber-200', 'bg-amber-50', 'text-amber-700');
        } else {
          toast.classList.add('border-rose-200', 'bg-rose-50', 'text-rose-700');
        }

        toast.classList.remove('hidden');
        clearTimeout(showToast.timeoutId);
        showToast.timeoutId = setTimeout(() => toast.classList.add('hidden'), 2200);
      }

      function getSortedMenu() {
        return [...state.menu].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      }

      function isMenuSection(item) {
        return item.type === 'section';
      }

      function updateMenuFormType() {
        const isSection = menuElementTypeSelect.value === 'section';
        productPriceInput.disabled = isSection;
        productPriceInput.required = !isSection;
        productPriceInput.parentElement.classList.toggle('opacity-50', isSection);
      }

      function renderTabs() {
        document.querySelectorAll('.tab-panel').forEach(panel => {
          panel.classList.toggle('active', panel.id === `panel-${activeTab}`);
        });

        document.querySelectorAll('.tab-btn').forEach(button => {
          const active = button.dataset.tab === activeTab;
          button.classList.toggle('bg-orange-500', active);
          button.classList.toggle('text-white', active);
          button.classList.toggle('bg-slate-100', !active);
          button.classList.toggle('text-slate-700', !active);
        });
      }

      function setActiveTab(tab) {
        activeTab = tab;
        renderTabs();
        if (tab === 'settings') checkForUpdates();
      }

      function compareVersions(firstVersion, secondVersion) {
        const first = firstVersion.split('.').map(Number);
        const second = secondVersion.split('.').map(Number);
        for (let index = 0; index < 4; index += 1) {
          const firstPart = first[index] || 0;
          const secondPart = second[index] || 0;
          if (firstPart !== secondPart) return firstPart - secondPart;
        }
        return 0;
      }

      async function checkForUpdates() {
        const status = document.getElementById('updateStatus');
        const updateButton = document.getElementById('updateAppBtn');
        try {
          const response = await fetch(`./version.json?check=${Date.now()}`, { cache: 'no-store' });
          if (!response.ok) throw new Error(`Status ${response.status}`);
          const serverVersion = (await response.json()).version;
          updateButton.classList.toggle('hidden', compareVersions(serverVersion, window.KedaiConfig.version) <= 0);
          status.textContent = compareVersions(serverVersion, window.KedaiConfig.version) > 0
            ? translate('updateAvailable', { version: serverVersion })
            : translate('upToDate');
          status.classList.remove('hidden');
        } catch (error) {
          updateButton.classList.add('hidden');
          status.textContent = translate('updateCheckFailed');
          status.classList.remove('hidden');
        }
      }

      function waitForWorkerInstalled(worker, timeoutMs = 15000) {
        if (!worker || worker.state === 'installed' || worker.state === 'activated') return Promise.resolve(true);
        return new Promise(resolve => {
          const timer = setTimeout(() => resolve(false), timeoutMs);
          worker.addEventListener('statechange', () => {
            if (worker.state === 'installed' || worker.state === 'activated') {
              clearTimeout(timer);
              resolve(true);
            }
            if (worker.state === 'redundant') {
              clearTimeout(timer);
              resolve(false);
            }
          });
        });
      }

      async function clearApplicationCaches() {
        if (!window.caches) return;
        try {
          const keys = await caches.keys();
          await Promise.all(keys.filter(key => key.startsWith('kedai-pos-')).map(key => caches.delete(key)));
        } catch (error) {
          console.warn('Nie udało się wyczyścić pamięci podręcznej:', error);
        }
      }

      async function updateApplication() {
        const status = document.getElementById('updateStatus');
        const updateButton = document.getElementById('updateAppBtn');
        const checkButton = document.getElementById('checkUpdatesBtn');
        const progressPanel = document.getElementById('updateProgressPanel');
        const progressLabel = document.getElementById('updateProgressLabel');
        const progressValue = document.getElementById('updateProgressValue');
        const progressBar = document.getElementById('updateProgressBar');
        const setProgress = (value, label) => {
          progressPanel.classList.remove('hidden');
          progressLabel.textContent = label;
          progressValue.textContent = `${value}%`;
          progressBar.style.width = `${value}%`;
        };
        const finish = message => {
          setProgress(100, translate('updateReady'));
          status.textContent = message;
          status.classList.remove('hidden');
          updateButton.disabled = false;
          checkButton.disabled = false;
          showConfirmDialog(translate('updateReady'), () => window.location.reload());
        };

        updateButton.disabled = true;
        checkButton.disabled = true;
        setProgress(15, translate('updateProgress'));
        status.textContent = translate('updating');
        status.classList.remove('hidden');

        try {
          const registration = navigator.serviceWorker ? await navigator.serviceWorker.getRegistration() : null;

          if (registration) {
            setProgress(35, translate('updateDownloading'));
            try {
              await registration.update();
            } catch (error) {
              console.warn('Nie udało się pobrać nowego service workera:', error);
            }

            const pendingWorker = registration.installing || registration.waiting;
            if (pendingWorker) {
              setProgress(55, translate('updateDownloading'));
              await waitForWorkerInstalled(pendingWorker);
            }

            if (registration.waiting) {
              setProgress(75, translate('updateInstalling'));
              const controllerChanged = new Promise(resolve => {
                navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true });
                setTimeout(resolve, 4000);
              });
              registration.waiting.postMessage({ type: 'SKIP_WAITING' });
              await controllerChanged;
            }
          }

          setProgress(90, translate('updateInstalling'));
          await clearApplicationCaches();
          finish(translate('updateReady'));
        } catch (error) {
          console.error('Błąd aktualizacji aplikacji:', error);
          finish(translate('updatePartial'));
        }
      }

      function renderMenu() {
        const menu = getSortedMenu();
        const productCount = menu.filter(item => !isMenuSection(item)).length;
        menuCountBadge.textContent = getCounterLabel(productCount, 'item', 'items');

        if (!menu.length) {
          menuList.innerHTML = `<div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-500">${translate('noProduct')}</div>`;
          return;
        }

        menuList.innerHTML = menu
          .map((item, index) => {
            const section = isMenuSection(item);
            return `
              <div class="rounded-2xl border ${section ? 'border-orange-200 bg-orange-50' : 'border-slate-200 bg-white'} p-3 shadow-sm">
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <p class="text-base font-bold text-slate-800">${section ? '▰ ' : ''}${escapeHtml(item.name)}</p>
                    ${section ? `<p class="text-xs font-semibold uppercase tracking-wide text-orange-600">${translate('sectionType')}</p>` : `<p class="text-sm font-semibold text-orange-600">${formatCurrency(item.price)}</p>`}
                  </div>
                  <div class="flex gap-2">
                    <button data-action="move-up" data-id="${item.id}" class="touch-btn menu-move-btn rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-xs font-bold text-slate-700 ${index === 0 ? 'opacity-40' : ''}" ${index === 0 ? 'disabled' : ''}>↑</button>
                    <button data-action="move-down" data-id="${item.id}" class="touch-btn menu-move-btn rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-xs font-bold text-slate-700 ${index === menu.length - 1 ? 'opacity-40' : ''}" ${index === menu.length - 1 ? 'disabled' : ''}>↓</button>
                  </div>
                </div>

                <div class="mt-3 grid grid-cols-2 gap-2">
                  <button data-action="edit-product" data-id="${item.id}" class="touch-btn rounded-xl bg-amber-100 px-3 py-2 text-sm font-bold text-amber-700">${section ? translate('editSection') : translate('edit')}</button>
                  <button data-action="delete-product" data-id="${item.id}" class="touch-btn rounded-xl bg-rose-100 px-3 py-2 text-sm font-bold text-rose-700">${translate('delete')}</button>
                </div>
              </div>
            `;
          })
          .join('');

        const saveButton = document.getElementById('saveProductBtn');
        if (editingProductId) {
          const editingItem = state.menu.find(item => item.id === editingProductId);
          saveButton.textContent = editingItem && isMenuSection(editingItem) ? translate('editSection') : translate('saveChanges');
          document.getElementById('cancelProductEditBtn').textContent = translate('cancel');
          document.getElementById('cancelProductEditBtn').classList.remove('hidden');
        } else {
          saveButton.textContent = translate('addProduct');
          document.getElementById('cancelProductEditBtn').textContent = translate('cancel');
          document.getElementById('cancelProductEditBtn').classList.add('hidden');
        }
      }

      function renderCustomer() {
        const menu = getSortedMenu();

        customerItems.innerHTML = menu
          .map(item => {
            if (isMenuSection(item)) {
              return `<div class="mt-5 border-b-2 border-orange-200 pb-2 text-sm font-black uppercase tracking-[0.12em] text-orange-600">${escapeHtml(item.name)}</div>`;
            }
            const qty = Number(currentSelection[item.id] || 0);
            return `
              <div class="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <p class="text-base font-bold text-slate-800">${escapeHtml(item.name)}</p>
                    <p class="text-sm font-semibold text-orange-600">${formatCurrency(item.price)}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button data-action="decrease" data-id="${item.id}" class="qty-btn border border-slate-200 bg-slate-100 text-slate-700">−</button>
                    <span class="min-w-[2rem] text-center text-lg font-black text-slate-800">${qty}</span>
                    <button data-action="increase" data-id="${item.id}" class="qty-btn border border-orange-200 bg-orange-50 text-orange-600">+</button>
                  </div>
                </div>
              </div>
            `;
          })
          .join('');

        const details = menu
          .filter(item => !isMenuSection(item))
          .filter(item => Number(currentSelection[item.id] || 0) > 0)
          .map(item => {
            const qty = Number(currentSelection[item.id] || 0);
            return { ...item, qty };
          });

        const totalQty = details.reduce((sum, item) => sum + item.qty, 0);
        const total = details.reduce((sum, item) => sum + item.qty * item.price, 0);
        customerSummaryCount.textContent = getCounterLabel(totalQty, 'item', 'items');

        if (!details.length) {
          customerSummaryDetails.innerHTML = `<p class="text-sm text-slate-300">${translate('noItems')}</p>`;
        } else {
          customerSummaryDetails.innerHTML = details
            .map(item => `<div class="flex items-center justify-between gap-2"><span>${item.qty}× ${escapeHtml(item.name)}</span><span>${formatCurrency(item.qty * item.price)}</span></div>`)
            .join('');
        }

        customerTotal.textContent = formatCurrency(total);
      }

      function renderActiveOrders() {
        if (!state.activeOrders.length) {
          activeOrdersList.innerHTML = `<div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-500">${translate('noActiveOrders')}</div>`;
          return;
        }

        activeOrdersList.innerHTML = state.activeOrders
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(order => {
            const summary = order.items
              .map(item => `${item.qty}× ${item.name}`)
              .join(', ') || translate('noItems');

            return `
              <div class="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div class="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">${formatDateTime(order.createdAt)}</p>
                    <p class="text-lg font-black text-slate-800">${formatCurrency(order.total)}</p>
                  </div>
                  <span class="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">${translate('active')}</span>
                </div>

                <p class="mb-3 text-sm text-slate-600">${escapeHtml(summary)}</p>

                <div class="grid grid-cols-3 gap-2">
                  <button data-action="edit-order" data-id="${order.id}" class="touch-btn rounded-xl bg-amber-100 px-2 py-2 text-xs font-bold text-amber-700">${translate('edit')}</button>
                  <button data-action="archive-order" data-id="${order.id}" class="touch-btn rounded-xl bg-sky-100 px-2 py-2 text-xs font-bold text-sky-700">${translate('archiveLabel')}</button>
                  <button data-action="delete-order" data-id="${order.id}" class="touch-btn rounded-xl bg-rose-100 px-2 py-2 text-xs font-bold text-rose-700">${translate('delete')}</button>
                </div>
              </div>
            `;
          })
          .join('');
      }

      function renderArchive() {
        const total = state.archive.reduce((sum, order) => sum + Number(order.total || 0), 0);
        archiveTotal.textContent = formatCurrency(total);

        if (!state.archive.length) {
          archiveList.innerHTML = `<div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-500">${translate('noArchive')}</div>`;
          return;
        }

        archiveList.innerHTML = state.archive
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(order => {
            const summary = order.items
              .map(item => `${item.qty}× ${item.name}`)
              .join(', ') || translate('noItems');

            return `
              <div class="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div class="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">${formatDateTime(order.createdAt)}</p>
                    <p class="text-lg font-black text-slate-800">${formatCurrency(order.total)}</p>
                  </div>
                  <span class="rounded-full bg-slate-200 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-700">${translate('closed')}</span>
                </div>
                <p class="text-sm text-slate-600">${escapeHtml(summary)}</p>
              </div>
            `;
          })
          .join('');
      }

      function getStep(ingredient) {
        const step = Number(ingredient.unit_step);
        return Number.isFinite(step) && step > 0 ? step : 1;
      }

      function isStepAligned(quantity, step) {
        const ratio = quantity / step;
        return Math.abs(ratio - Math.round(ratio)) < 1e-6;
      }

      function getRecommendedQuantity(ingredient) {
        const step = getStep(ingredient);
        const missing = Number(ingredient.target_stock || 0) - Number(ingredient.stock || 0);
        if (missing <= 0) return 0;
        const quantity = Math.ceil(missing / step) * step;
        const moq = Math.max(1, Number(ingredient.min_order_quantity) || 1);
        return quantity < moq ? Math.ceil(moq / step) * step : quantity;
      }

      function renderWarehouse() {
        const ingredients = state.ingredients || [];
        const totalValue = ingredients.reduce((sum, item) => sum + Number(item.stock || 0) * Number(item.unit_price || 0), 0);
        warehouseValueBadge.textContent = formatCurrency(totalValue);
        ingredientCountBadge.textContent = getCounterLabel(ingredients.length, 'item', 'items');

        if (!ingredients.length) {
          ingredientList.innerHTML = `<div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-500">${translate('noIngredients')}</div>`;
        } else {
          ingredientList.innerHTML = ingredients
            .slice()
            .sort((a, b) => String(a.name).localeCompare(String(b.name)))
            .map(ingredient => {
              const belowMinimum = Number(ingredient.stock || 0) < Number(ingredient.min_stock || 0);
              const stockValue = Number(ingredient.stock || 0) * Number(ingredient.unit_price || 0);

              return `
                <div class="rounded-2xl border ${belowMinimum ? 'border-rose-200 bg-rose-50' : 'border-slate-200 bg-white'} p-3 shadow-sm">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p class="text-base font-bold text-slate-800">${escapeHtml(ingredient.name)}</p>
                      <p class="text-sm font-semibold text-orange-600">${formatCurrency(ingredient.unit_price)} / ${escapeHtml(ingredient.unit)}</p>
                    </div>
                    ${belowMinimum ? `<span class="rounded-full bg-rose-200 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-rose-700">${translate('belowMin')}</span>` : ''}
                  </div>

                  <div class="mt-2 grid grid-cols-2 gap-1 text-xs text-slate-600">
                    <span>${translate('ingredientStock')}: <b>${formatNumber(ingredient.stock)} ${escapeHtml(ingredient.unit)}</b></span>
                    <span>${translate('stockValue')}: <b>${formatCurrency(stockValue)}</b></span>
                    <span>${translate('ingredientMinStock')}: <b>${formatNumber(ingredient.min_stock)}</b></span>
                    <span>${translate('ingredientTargetStock')}: <b>${formatNumber(ingredient.target_stock)}</b></span>
                    <span>${translate('ingredientMoq')}: <b>${formatNumber(ingredient.min_order_quantity)}</b></span>
                    <span>${translate('ingredientStep')}: <b>${formatNumber(ingredient.unit_step)}</b></span>
                  </div>

                  <div class="mt-3 grid grid-cols-2 gap-2">
                    <button data-action="edit-ingredient" data-id="${ingredient.id}" class="touch-btn rounded-xl bg-amber-100 px-3 py-2 text-sm font-bold text-amber-700">${translate('edit')}</button>
                    <button data-action="delete-ingredient" data-id="${ingredient.id}" class="touch-btn rounded-xl bg-rose-100 px-3 py-2 text-sm font-bold text-rose-700">${translate('delete')}</button>
                  </div>
                </div>
              `;
            })
            .join('');
        }

        const saveButton = document.getElementById('saveIngredientBtn');
        if (editingIngredientId) {
          saveButton.textContent = translate('saveChanges');
          document.getElementById('cancelIngredientEditBtn').textContent = translate('cancel');
          document.getElementById('cancelIngredientEditBtn').classList.remove('hidden');
        } else {
          saveButton.textContent = translate('addIngredient');
          document.getElementById('cancelIngredientEditBtn').classList.add('hidden');
        }
      }

      function renderPurchase() {
        const ingredients = state.ingredients || [];

        if (!ingredients.length) {
          purchaseItems.innerHTML = `<div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-500">${translate('noIngredients')}</div>`;
        } else {
          purchaseItems.innerHTML = ingredients
            .slice()
            .sort((a, b) => String(a.name).localeCompare(String(b.name)))
            .map(ingredient => {
              const quantity = Number(currentPurchaseSelection[ingredient.id] || 0);
              const recommended = getRecommendedQuantity(ingredient);

              return `
                <div class="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  <div class="flex items-center justify-between gap-3">
                    <div>
                      <p class="text-base font-bold text-slate-800">${escapeHtml(ingredient.name)}</p>
                      <p class="text-sm font-semibold text-orange-600">${formatCurrency(ingredient.unit_price)} / ${escapeHtml(ingredient.unit)}</p>
                      <p class="text-xs text-slate-500">${translate('ingredientStock')}: ${formatNumber(ingredient.stock)} ${escapeHtml(ingredient.unit)} · ${translate('ingredientStep')}: ${formatNumber(ingredient.unit_step)}</p>
                    </div>
                    <div class="flex items-center gap-2">
                      <button data-action="purchase-decrease" data-id="${ingredient.id}" class="qty-btn border border-slate-200 bg-slate-100 text-slate-700">−</button>
                      <span class="min-w-[2rem] text-center text-lg font-black text-slate-800">${formatNumber(quantity)}</span>
                      <button data-action="purchase-increase" data-id="${ingredient.id}" class="qty-btn border border-orange-200 bg-orange-50 text-orange-600">+</button>
                    </div>
                  </div>
                  ${recommended > 0 ? `<button data-action="purchase-recommended" data-id="${ingredient.id}" class="mt-2 w-full rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">${translate('recommended')}: ${formatNumber(recommended)} ${escapeHtml(ingredient.unit)}</button>` : ''}
                </div>
              `;
            })
            .join('');
        }

        const details = ingredients
          .filter(ingredient => Number(currentPurchaseSelection[ingredient.id] || 0) > 0)
          .map(ingredient => {
            const quantity = Number(currentPurchaseSelection[ingredient.id] || 0);
            return { ...ingredient, quantity, lineTotal: quantity * Number(ingredient.unit_price || 0) };
          });

        const total = details.reduce((sum, item) => sum + item.lineTotal, 0);
        purchaseSummaryCount.textContent = getCounterLabel(details.length, 'item', 'items');

        purchaseSummaryDetails.innerHTML = details.length
          ? details
            .map(item => `<div class="flex items-center justify-between gap-2"><span>${formatNumber(item.quantity)} ${escapeHtml(item.unit)} ${escapeHtml(item.name)}</span><span>${formatCurrency(item.lineTotal)}</span></div>`)
            .join('')
          : `<p class="text-sm text-slate-300">${translate('noPurchaseItems')}</p>`;

        purchaseTotalLabel.textContent = formatCurrency(total);
      }

      function renderPurchaseOrders() {
        const orders = state.purchaseOrders || [];

        if (!orders.length) {
          purchaseOrderList.innerHTML = `<div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-500">${translate('purchaseEmpty')}</div>`;
          return;
        }

        purchaseOrderList.innerHTML = orders
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(order => {
            const summary = order.items
              .map(item => `${formatNumber(item.quantity)} ${item.unit} ${item.name}`)
              .join(', ') || translate('noPurchaseItems');

            return `
              <div class="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div class="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">${formatDateTime(order.createdAt)}</p>
                    <p class="text-lg font-black text-slate-800">${formatCurrency(order.total_price)}</p>
                  </div>
                  <span class="rounded-full bg-sky-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-sky-700">${translate('ordered')}</span>
                </div>
                <p class="mb-3 text-sm text-slate-600">${escapeHtml(summary)}</p>
                <button data-action="delete-purchase" data-id="${order.id}" class="touch-btn w-full rounded-xl bg-rose-100 px-3 py-2 text-sm font-bold text-rose-700">${translate('delete')}</button>
              </div>
            `;
          })
          .join('');
      }

      function renderAll() {
        applyTranslations();
        renderMenu();
        renderCustomer();
        renderActiveOrders();
        renderArchive();
        renderWarehouse();
        renderPurchase();
        renderPurchaseOrders();
        renderTabs();
      }

      function showConfirmDialog(message, onConfirm) {
        window.KedaiDialogs.showConfirmDialog(
          { modal: confirmModal, messageElement: confirmMessage, noButton: confirmNoBtn, yesButton: confirmYesBtn },
          translate,
          message,
          onConfirm
        );
      }

      function updateProductQuantity(productId, change) {
        const currentQty = Number(currentSelection[productId] || 0);
        const nextValue = currentQty + change;
        if (nextValue <= 0) {
          delete currentSelection[productId];
        } else {
          currentSelection[productId] = nextValue;
        }
        renderCustomer();
      }

      function handleProductFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(productForm);
        const type = formData.get('type') === 'section' ? 'section' : 'product';
        const name = (formData.get('name') || '').toString().trim();
        const price = Number(formData.get('price'));

        if (!name || (type === 'product' && (!Number.isFinite(price) || price < 0))) {
          showToast(translate('fillProduct'), 'warning');
          return;
        }

        if (editingProductId) {
          const product = state.menu.find(item => item.id === editingProductId);
          if (product) {
            product.name = name;
            product.type = type;
            product.price = type === 'section' ? 0 : Number(price.toFixed(2));
          }
          showToast(translate('productUpdated'), 'success');
          editingProductId = null;
        } else {
          state.menu.push({
            id: makeId('prod'),
            name,
            type,
            price: type === 'section' ? 0 : Number(price.toFixed(2)),
            order: state.menu.length
          });
          showToast(translate('productAdded'), 'success');
        }

        saveState();
        productForm.reset();
        renderAll();
      }

      function startProductEdit(productId) {
        const product = state.menu.find(item => item.id === productId);
        if (!product) return;

        editingProductId = productId;
        menuElementTypeSelect.value = isMenuSection(product) ? 'section' : 'product';
        productNameInput.value = product.name;
        productPriceInput.value = product.price.toFixed(2);
        updateMenuFormType();
        productNameInput.focus();
        renderMenu();
      }

      function cancelMenuEdit() {
        showConfirmDialog(translate('confirmCancelSelection'), () => {
          editingProductId = null;
          productForm.reset();
          menuElementTypeSelect.value = 'product';
          updateMenuFormType();
          renderMenu();
        });
      }

      function deleteProduct(productId) {
        const item = state.menu.find(product => product.id === productId);
        if (!item) return;

        showConfirmDialog(translate('confirmDeleteProduct', { name: item.name }), () => {
          state.menu = state.menu.filter(product => product.id !== productId);
          state.menu = state.menu.map((product, index) => ({ ...product, order: index }));
          saveState();
          if (editingProductId === productId) {
            editingProductId = null;
            productForm.reset();
          }
          menuElementTypeSelect.value = 'product';
          updateMenuFormType();
          renderAll();
          showToast(translate('productRemoved'), 'success');
        });
      }

      function moveProduct(productId, direction) {
        const menu = getSortedMenu();
        const index = menu.findIndex(item => item.id === productId);
        if (index < 0) return;

        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= menu.length) return;

        const temp = menu[index];
        menu[index] = menu[targetIndex];
        menu[targetIndex] = temp;

        state.menu = menu.map((product, idx) => ({ ...product, order: idx }));
        saveState();
        renderAll();
      }

      function createOrderPayload(items, total, createdAt) {
        return {
          createdAt,
          date: createdAt,
          total,
          total_price: total,
          items: items.map(item => ({
            meal_id: item.productId,
            quantity: Number(item.qty),
            custom_modifications: {},
            productId: item.productId,
            name: item.name,
            price: Number(item.price),
            qty: Number(item.qty),
            lineTotal: Number((Number(item.price) * Number(item.qty)).toFixed(2))
          }))
        };
      }

      function sameOrderId(firstId, secondId) {
        return String(firstId) === String(secondId);
      }

      async function saveCurrentOrder() {
        const selected = getSortedMenu().filter(item => Number(currentSelection[item.id] || 0) > 0);
        if (!selected.length) {
          showToast(translate('chooseAtLeastOne'), 'warning');
          return;
        }

        const items = selected.map(item => ({
          productId: item.id,
          name: item.name,
          price: Number(item.price),
          qty: Number(currentSelection[item.id] || 0)
        }));

        const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);
        let orderData;

        if (editingOrderId) {
          const existingIndex = state.activeOrders.findIndex(order => sameOrderId(order.id, editingOrderId));
          if (existingIndex !== -1) {
            orderData = {
              ...state.activeOrders[existingIndex],
              items,
              total,
              updatedAt: new Date().toISOString()
            };
            state.activeOrders[existingIndex] = orderData;
            showToast(translate('orderUpdated'), 'success');
          }
        } else {
          orderData = createOrderPayload(items, total, new Date().toISOString());
          const orderId = await window.KedaiDatabase.addOrder(orderData);
          orderData.id = orderId;
          state.activeOrders.push(orderData);
          showToast(translate('orderSaved'), 'success');
        }

        currentSelection = {};
        editingOrderId = null;
        saveState();
        renderAll();
        setActiveTab('orders');

      }

      function cancelCustomerSelection() {
        showConfirmDialog(translate('confirmCancelSelection'), () => {
          currentSelection = {};
          editingOrderId = null;
          renderCustomer();
          showToast(translate('selectionCleared'), 'warning');
        });
      }

      function editOrder(orderId) {
        const order = state.activeOrders.find(item => sameOrderId(item.id, orderId));
        if (!order) return;

        const hasOpenSelection = Object.keys(currentSelection).length > 0;
        const confirmText = translate('confirmEditOrder');

        if (hasOpenSelection || editingOrderId) {
          showConfirmDialog(confirmText, () => {
            editingOrderId = orderId;
            currentSelection = {};
            order.items.forEach(item => {
              if (item.productId) {
                currentSelection[item.productId] = item.qty;
              }
            });

            setActiveTab('customer');
            renderCustomer();
          });
          return;
        }

        editingOrderId = orderId;
        currentSelection = {};
        order.items.forEach(item => {
          if (item.productId) {
            currentSelection[item.productId] = item.qty;
          }
        });

        setActiveTab('customer');
        renderCustomer();
      }

      async function archiveOrder(orderId) {
        const index = state.activeOrders.findIndex(order => sameOrderId(order.id, orderId));
        if (index === -1) return;

        const [order] = state.activeOrders.splice(index, 1);
        const archivedOrder = {
          ...order,
          archivedAt: new Date().toISOString()
        };
        state.archive.push(archivedOrder);

        await window.KedaiDatabase.updateOrder(archivedOrder, 'archived');
        saveState();
        renderAll();
        showToast(translate('archived'), 'success');
      }

      async function deleteOrder(orderId) {
        const order = state.activeOrders.find(item => sameOrderId(item.id, orderId));
        if (!order) return;

        showConfirmDialog(translate('confirmDeleteOrder', { date: formatDateTime(order.createdAt) }), () => {
          state.activeOrders = state.activeOrders.filter(item => !sameOrderId(item.id, orderId));
          window.KedaiDatabase.deleteOrder(order.id);
          saveState();
          renderAll();
          showToast(translate('orderDeleted'), 'success');
        });
      }

      function clearArchive() {
        if (!state.archive.length) {
          showToast(translate('archiveEmpty'), 'warning');
          return;
        }

        showConfirmDialog(translate('confirmClearArchive'), async () => {
          state.archive = [];
          await window.KedaiDatabase.clearOrders();
          await saveState();
          renderArchive();
          showToast(translate('archiveCleared'), 'success');
        });
      }

      function resetIngredientForm() {
        ingredientForm.reset();
        ingredientUnitSelect.value = 'szt';
        editingIngredientId = null;
        document.getElementById('cancelIngredientEditBtn').classList.add('hidden');
      }

      function handleIngredientFormSubmit(event) {
        event.preventDefault();
        const name = ingredientNameInput.value.trim();
        const unit = ingredientUnitSelect.value;
        const stock = Number(ingredientStockInput.value);
        const unitPrice = Number(ingredientPriceInput.value);
        const minStock = Number(ingredientMinStockInput.value);
        const targetStock = Number(ingredientTargetStockInput.value);
        const moq = Number(ingredientMoqInput.value);
        const unitStep = Number(ingredientStepInput.value);

        const numbersValid = [stock, unitPrice, minStock, targetStock, moq, unitStep]
          .every(value => Number.isFinite(value) && value >= 0);

        if (!name || !numbersValid || moq < 1 || unitStep < 1) {
          showToast(translate('fillIngredient'), 'warning');
          return;
        }

        const payload = {
          name,
          unit,
          stock,
          unit_price: unitPrice,
          min_stock: minStock,
          target_stock: targetStock,
          min_order_quantity: moq,
          unit_step: unitStep
        };

        if (editingIngredientId) {
          const ingredient = state.ingredients.find(item => item.id === editingIngredientId);
          if (ingredient) Object.assign(ingredient, payload);
          showToast(translate('ingredientUpdated'), 'success');
        } else {
          state.ingredients.push({ id: makeId('ing'), ...payload });
          showToast(translate('ingredientAdded'), 'success');
        }

        resetIngredientForm();
        saveState();
        renderAll();
      }

      function startIngredientEdit(ingredientId) {
        const ingredient = (state.ingredients || []).find(item => item.id === ingredientId);
        if (!ingredient) return;

        editingIngredientId = ingredientId;
        ingredientNameInput.value = ingredient.name;
        ingredientUnitSelect.value = ingredient.unit;
        ingredientStockInput.value = ingredient.stock;
        ingredientPriceInput.value = ingredient.unit_price;
        ingredientMinStockInput.value = ingredient.min_stock;
        ingredientTargetStockInput.value = ingredient.target_stock;
        ingredientMoqInput.value = ingredient.min_order_quantity;
        ingredientStepInput.value = ingredient.unit_step;
        ingredientNameInput.focus();
        renderWarehouse();
      }

      function cancelIngredientEdit() {
        showConfirmDialog(translate('confirmCancelSelection'), () => {
          resetIngredientForm();
          renderWarehouse();
        });
      }

      function deleteIngredient(ingredientId) {
        const ingredient = (state.ingredients || []).find(item => item.id === ingredientId);
        if (!ingredient) return;

        showConfirmDialog(translate('confirmDeleteIngredient', { name: ingredient.name }), () => {
          state.ingredients = state.ingredients.filter(item => item.id !== ingredientId);
          delete currentPurchaseSelection[ingredientId];
          window.KedaiDatabase.deleteIngredient(ingredientId);
          if (editingIngredientId === ingredientId) resetIngredientForm();
          saveState();
          renderAll();
          showToast(translate('ingredientRemoved'), 'success');
        });
      }

      function updatePurchaseQuantity(ingredientId, direction) {
        const ingredient = (state.ingredients || []).find(item => item.id === ingredientId);
        if (!ingredient) return;

        const step = getStep(ingredient);
        const current = Number(currentPurchaseSelection[ingredientId] || 0);
        const next = Number((current + direction * step).toFixed(3));

        if (next <= 0) {
          delete currentPurchaseSelection[ingredientId];
        } else {
          currentPurchaseSelection[ingredientId] = next;
        }
        renderPurchase();
      }

      function setPurchaseQuantity(ingredientId, quantity) {
        if (!quantity || quantity <= 0) {
          delete currentPurchaseSelection[ingredientId];
        } else {
          currentPurchaseSelection[ingredientId] = quantity;
        }
        renderPurchase();
      }

      async function acceptPurchaseOrder() {
        const selected = (state.ingredients || [])
          .filter(ingredient => Number(currentPurchaseSelection[ingredient.id] || 0) > 0)
          .map(ingredient => ({
            ingredient,
            quantity: Number(currentPurchaseSelection[ingredient.id] || 0),
            step: getStep(ingredient),
            moq: Math.max(1, Number(ingredient.min_order_quantity) || 1)
          }));

        if (!selected.length) {
          showToast(translate('chooseIngredient'), 'warning');
          return;
        }

        const misaligned = selected.find(item => !isStepAligned(item.quantity, item.step));
        if (misaligned) {
          showToast(translate('stepWarning', {
            name: misaligned.ingredient.name,
            step: formatNumber(misaligned.step),
            unit: misaligned.ingredient.unit
          }), 'warning');
          return;
        }

        const tooSmall = selected.find(item => item.quantity < item.moq);
        if (tooSmall) {
          showToast(translate('moqWarning', {
            name: tooSmall.ingredient.name,
            moq: formatNumber(tooSmall.moq),
            unit: tooSmall.ingredient.unit
          }), 'warning');
          return;
        }

        const items = selected.map(item => ({
          ingredient_id: item.ingredient.id,
          name: item.ingredient.name,
          unit: item.ingredient.unit,
          quantity: item.quantity,
          unit_price: Number(item.ingredient.unit_price || 0),
          line_total: Number((item.quantity * Number(item.ingredient.unit_price || 0)).toFixed(2))
        }));

        const createdAt = new Date().toISOString();
        const order = {
          createdAt,
          date: createdAt,
          items,
          total_price: items.reduce((sum, item) => sum + item.line_total, 0),
          total_quantity: items.reduce((sum, item) => sum + item.quantity, 0)
        };

        const orderId = await window.KedaiDatabase.addPurchaseOrder(order);
        state.purchaseOrders.push({ id: orderId, ...order });

        currentPurchaseSelection = {};
        saveState();
        renderAll();
        setActiveTab('purchaseList');
        showToast(translate('purchaseSaved'), 'success');
      }

      function cancelPurchaseSelection() {
        showConfirmDialog(translate('confirmCancelPurchase'), () => {
          currentPurchaseSelection = {};
          renderPurchase();
          showToast(translate('purchaseCleared'), 'warning');
        });
      }

      function deletePurchaseOrder(orderId) {
        const order = (state.purchaseOrders || []).find(item => String(item.id) === String(orderId));
        if (!order) return;

        showConfirmDialog(translate('confirmDeletePurchase'), () => {
          state.purchaseOrders = state.purchaseOrders.filter(item => String(item.id) !== String(orderId));
          window.KedaiDatabase.deletePurchaseOrder(order.id);
          saveState();
          renderPurchaseOrders();
          showToast(translate('purchaseDeleted'), 'success');
        });
      }

      productForm.addEventListener('submit', handleProductFormSubmit);

      ingredientForm.addEventListener('submit', handleIngredientFormSubmit);
      document.getElementById('cancelIngredientEditBtn').addEventListener('click', cancelIngredientEdit);
      document.getElementById('acceptPurchaseBtn').addEventListener('click', acceptPurchaseOrder);
      document.getElementById('cancelPurchaseBtn').addEventListener('click', cancelPurchaseSelection);
      document.querySelectorAll('[data-warehouse-view]').forEach(button => {
        button.addEventListener('click', () => setActiveTab(button.dataset.warehouseView));
      });

      document.getElementById('cancelProductEditBtn').addEventListener('click', cancelMenuEdit);

      document.getElementById('saveOrderBtn').addEventListener('click', saveCurrentOrder);
      document.getElementById('cancelCustomerBtn').addEventListener('click', cancelCustomerSelection);
      document.getElementById('clearArchiveBtn').addEventListener('click', clearArchive);
      document.getElementById('languageSelect').addEventListener('change', event => {
        setLanguage(event.target.value);
        renderAll();
        renderStorageInfo();
        checkForUpdates();
      });

      document.addEventListener('click', event => {
        const button = event.target.closest('button');
        if (!button) return;

        const action = button.dataset.action;
        const id = button.dataset.id;

        if (action === 'increase') {
          updateProductQuantity(id, 1);
        }

        if (action === 'decrease') {
          updateProductQuantity(id, -1);
        }

        if (action === 'delete-product') {
          deleteProduct(id);
        }

        if (action === 'edit-product') {
          startProductEdit(id);
        }

        if (action === 'move-up') {
          moveProduct(id, 'up');
        }

        if (action === 'move-down') {
          moveProduct(id, 'down');
        }

        if (action === 'edit-order') {
          editOrder(id);
        }

        if (action === 'archive-order') {
          archiveOrder(id);
        }

        if (action === 'delete-order') {
          deleteOrder(id);
        }

        if (action === 'edit-ingredient') {
          startIngredientEdit(id);
        }

        if (action === 'delete-ingredient') {
          deleteIngredient(id);
        }

        if (action === 'purchase-increase') {
          updatePurchaseQuantity(id, 1);
        }

        if (action === 'purchase-decrease') {
          updatePurchaseQuantity(id, -1);
        }

        if (action === 'purchase-recommended') {
          const ingredient = (state.ingredients || []).find(item => item.id === id);
          if (ingredient) setPurchaseQuantity(id, getRecommendedQuantity(ingredient));
        }

        if (action === 'delete-purchase') {
          deletePurchaseOrder(id);
        }

        const tab = button.dataset.tab;
        if (tab) {
          setActiveTab(tab);
        }
      });

      document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => setActiveTab(button.dataset.tab));
      });

      document.querySelectorAll('[data-settings-tab]').forEach(button => {
        button.addEventListener('click', () => setActiveTab(button.dataset.settingsTab));
      });

      document.getElementById('checkUpdatesBtn').addEventListener('click', checkForUpdates);
      document.getElementById('updateAppBtn').addEventListener('click', updateApplication);
      document.getElementById('exportBackupBtn').addEventListener('click', exportData);
      document.getElementById('importBackupBtn').addEventListener('click', () => document.getElementById('importBackupInput').click());
      document.getElementById('importBackupInput').addEventListener('change', event => {
        const file = event.target.files?.[0];
        if (file) importDataFile(file);
        event.target.value = '';
      });
      menuElementTypeSelect.addEventListener('change', updateMenuFormType);

      document.addEventListener('dblclick', event => {
        event.preventDefault();
      }, { passive: false });

      function formatMegabytes(bytes) {
        return `${(Number(bytes || 0) / (1024 * 1024)).toFixed(1)} MB`;
      }

      async function renderStorageInfo() {
        const label = document.getElementById('storageInfo');
        if (!label) return;
        const info = await window.KedaiDatabase.getStorageInfo();
        const persistence = info.persistent ? translate('storagePersistent') : translate('storageNotPersistent');
        label.textContent = `${persistence} · ${translate('storageLabel')}: ${formatMegabytes(info.usage)}`;
      }

      function exportData() {
        const blob = new Blob([window.KedaiDatabase.exportState(state)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `kedai-pos-backup-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(link.href);
        showToast(translate('exportDone'), 'success');
      }

      async function importDataFile(file) {
        try {
          const payload = JSON.parse(await file.text());
          state = await window.KedaiDatabase.importState(defaultState, payload);
          renderAll();
          renderStorageInfo();
          showToast(translate('importDone'), 'success');
        } catch (error) {
          console.error('Błąd importu danych:', error);
          showToast(translate('importFailed'), 'error');
        }
      }

      async function initializeApp() {
        try {
          updateMenuFormType();
          if (screen.orientation?.lock) {
            screen.orientation.lock('portrait').catch(() => {});
          }
          document.getElementById('settingsAppVersion').textContent = `v${window.KedaiConfig.version}`;
          await window.KedaiDatabase.requestPersistence();
          state = await window.KedaiDatabase.initialize(defaultState);
          renderAll();
          renderStorageInfo();
        } catch (error) {
          console.error('Błąd uruchamiania IndexedDB:', error);
          showToast(translate('dbOpenFailed'), 'error');
        }
      }

      initializeApp();
