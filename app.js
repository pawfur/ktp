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
          manualUpdatesHint: 'Aktualizacje instalują się tylko po kliknięciu przycisku Aktualizuj aplikację. Aplikacja nigdy nie aktualizuje się samoczynnie.',
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
          exportFailed: 'Nie udało się zapisać kopii zapasowej.',
          importDone: 'Dane zostały wczytane.',
          importFailed: 'Nie udało się wczytać pliku z danymi.',
          cloudTitle: 'Chmura (Supabase)',
          cloudDescription: 'Dane są wysyłane do chmury, aby móc robić raporty z komputera. Dane na telefonie pozostają najważniejsze i nic ich nie nadpisuje.',
          userNameLabel: 'Nazwa użytkownika',
          userNameHint: 'Ta nazwa podpisuje każdy wysłany wiersz, żeby w raportach było widać, skąd przyszły dane. To nie jest login — login jest niżej.',
          userNameSaved: 'Nazwa użytkownika została zapisana.',
          syncSignIn: 'Zaloguj do chmury',
          syncSignOut: 'Wyloguj',
          syncPushNow: 'Wyślij teraz',
          syncNotConfigured: 'Brak konfiguracji chmury. Uzupełnij config/supabase-config.js.',
          syncNeedsLogin: 'Nie zalogowano. Dane wysyłane są tylko po zalogowaniu.',
          syncSignedInAs: 'Zalogowano jako {email}',
          syncEnterCredentials: 'Podaj e-mail i hasło.',
          syncSigningIn: 'Logowanie...',
          syncEmailLabel: 'E-mail konta lokalu',
          syncPasswordLabel: 'Hasło konta lokalu',
          syncErrNotConfirmed: 'Konto w Supabase nie zostało potwierdzone. Wejdź w panel Supabase → Authentication → Users, otwórz tego użytkownika i potwierdź jego e-mail. Możesz też usunąć konto i dodać je ponownie, zaznaczając „Auto Confirm User”.',
          syncErrBadCredentials: 'Błędny e-mail lub hasło. Sprawdź, czy konto zostało utworzone w tym samym projekcie Supabase, którego adres jest w konfiguracji.',
          syncErrRateLimit: 'Za dużo prób logowania. Odczekaj minutę i spróbuj ponownie.',
          syncErrOffline: 'Brak połączenia z internetem.',
          syncErrTables: 'Brak tabel w Supabase. Uruchom docs/supabase-schema.sql w SQL Editor.',
          syncErrColumn: 'Brakuje kolumny w tabeli. Uruchom ponownie docs/supabase-schema.sql w SQL Editor.',
          syncErrAccess: 'Brak dostępu. Zaloguj się ponownie.',
          syncProblem: 'Ostatnia wysyłka do chmury nie udała się: {detail}',
          syncErrGeneric: 'Nie udało się zalogować: {detail}',
          syncPushInProgress: 'Wysyłanie danych do chmury...',
          syncPushDone: 'Dane zostały wysłane do chmury.',
          syncPushFailed: 'Nie udało się wysłać danych: {detail}',
          syncNothingToSend: 'Wszystko jest już w chmurze. Nie było nic nowego do wysłania.',
          syncCloudRows: 'W chmurze: menu {menu}, składniki {ingredients}, zamówienia {orders}, zakupy {purchases}',
          storagePersistent: 'Pamięć trwała: włączona',
          storageNotPersistent: 'Pamięć trwała: wyłączona (system może usunąć dane przy braku miejsca)',
          storageLabel: 'Wykorzystanie pamięci',
          dbOpenFailed: 'Nie udało się otworzyć lokalnej bazy danych.',
          editMenu: 'Edytuj menu',
          orderArchive: 'Archiwum zamówień',
          editWarehouse: 'Edycja magazynu',
          warehouse: 'Magazyn',
          warehouseHint: 'Podgląd stanu magazynu. Aby dodać lub zmienić składniki, użyj przycisku Edycja magazynu w Ustawieniach.',
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
          noArchiveRange: 'Brak zamówień w wybranym zakresie.',
          archiveRangeLabel: 'Zakres dat',
          archiveRangeDay: 'Dzień',
          archiveRangeWeek: 'Tydzień',
          archiveRangeMonth: 'Miesiąc',
          archiveRangeAll: 'Wszystkie',
          archiveCount: 'Liczba zamówień: {count}',
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
          activeOrdersLabel: 'Aktywne zamówienia',
          archivedOrdersLabel: 'Zarchiwizowane zamówienia',
          confirmDeleteProduct: 'Usunąć pozycję "{name}" z menu?',
          confirmDeleteOrder: 'Usunąć aktywne zamówienie z dnia {date}?',
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
          manualUpdatesHint: 'Updates are installed only after you tap Update app. The app never updates itself.',
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
          exportFailed: 'Could not save the backup file.',
          importDone: 'Data has been loaded.',
          importFailed: 'Could not read the data file.',
          cloudTitle: 'Cloud (Supabase)',
          cloudDescription: 'Data is sent to the cloud so you can run reports from a computer. The data on the phone stays the most important and nothing overwrites it.',
          userNameLabel: 'User name',
          userNameHint: 'This name is attached to every row sent, so reports show where the data came from. This is not a login — the login is below.',
          userNameSaved: 'User name has been saved.',
          syncSignIn: 'Sign in to cloud',
          syncSignOut: 'Sign out',
          syncPushNow: 'Send now',
          syncNotConfigured: 'Cloud is not configured. Fill in config/supabase-config.js.',
          syncNeedsLogin: 'Not signed in. Data is sent only after signing in.',
          syncSignedInAs: 'Signed in as {email}',
          syncEnterCredentials: 'Enter e-mail and password.',
          syncSigningIn: 'Signing in...',
          syncEmailLabel: 'Shop account e-mail',
          syncPasswordLabel: 'Shop account password',
          syncErrNotConfirmed: 'The Supabase account has not been confirmed. Open the Supabase panel → Authentication → Users, open the user and confirm their e-mail. You can also delete the account and add it again with "Auto Confirm User" ticked.',
          syncErrBadCredentials: 'Wrong e-mail or password. Check that the account was created in the same Supabase project whose address is in the configuration.',
          syncErrRateLimit: 'Too many sign-in attempts. Wait a minute and try again.',
          syncErrOffline: 'No internet connection.',
          syncErrTables: 'Tables are missing in Supabase. Run docs/supabase-schema.sql in the SQL Editor.',
          syncErrColumn: 'A table column is missing. Run docs/supabase-schema.sql again in the SQL Editor.',
          syncErrAccess: 'Access denied. Sign in again.',
          syncProblem: 'The last cloud upload failed: {detail}',
          syncErrGeneric: 'Could not sign in: {detail}',
          syncPushInProgress: 'Sending data to the cloud...',
          syncPushDone: 'Data has been sent to the cloud.',
          syncPushFailed: 'Could not send data: {detail}',
          syncNothingToSend: 'Everything is already in the cloud. There was nothing new to send.',
          syncCloudRows: 'In the cloud: menu {menu}, ingredients {ingredients}, orders {orders}, purchases {purchases}',
          storagePersistent: 'Persistent storage: enabled',
          storageNotPersistent: 'Persistent storage: disabled (the system may clear data when space is low)',
          storageLabel: 'Storage usage',
          dbOpenFailed: 'Could not open the local database.',
          editMenu: 'Edit menu',
          orderArchive: 'Order archive',
          editWarehouse: 'Edit warehouse',
          warehouse: 'Warehouse',
          warehouseHint: 'Warehouse preview. To add or change ingredients, use the Edit warehouse button in Settings.',
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
          noArchiveRange: 'No orders in the selected range.',
          archiveRangeLabel: 'Date range',
          archiveRangeDay: 'Day',
          archiveRangeWeek: 'Week',
          archiveRangeMonth: 'Month',
          archiveRangeAll: 'All',
          archiveCount: 'Orders: {count}',
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
          activeOrdersLabel: 'Active orders',
          archivedOrdersLabel: 'Archived orders',
          confirmDeleteProduct: 'Delete the "{name}" item from the menu?',
          confirmDeleteOrder: 'Delete the active order from {date}?',
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
          manualUpdatesHint: 'Pembaruan hanya dipasang setelah Anda menekan Perbarui aplikasi. Aplikasi tidak memperbarui sendiri.',
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
          exportFailed: 'File cadangan tidak dapat disimpan.',
          importDone: 'Data berhasil dimuat.',
          importFailed: 'File data tidak dapat dibaca.',
          cloudTitle: 'Cloud (Supabase)',
          cloudDescription: 'Data dikirim ke cloud agar Anda bisa membuat laporan dari komputer. Data di ponsel tetap yang utama dan tidak ada yang menimpanya.',
          userNameLabel: 'Nama pengguna',
          userNameHint: 'Nama ini disertakan pada setiap baris yang dikirim, agar laporan menunjukkan asal datanya. Ini bukan login — login ada di bawah.',
          userNameSaved: 'Nama pengguna telah disimpan.',
          syncSignIn: 'Masuk ke cloud',
          syncSignOut: 'Keluar',
          syncPushNow: 'Kirim sekarang',
          syncNotConfigured: 'Cloud belum dikonfigurasi. Isi config/supabase-config.js.',
          syncNeedsLogin: 'Belum masuk. Data hanya dikirim setelah masuk.',
          syncSignedInAs: 'Masuk sebagai {email}',
          syncEnterCredentials: 'Masukkan email dan kata sandi.',
          syncSigningIn: 'Sedang masuk...',
          syncEmailLabel: 'Email akun toko',
          syncPasswordLabel: 'Kata sandi akun toko',
          syncErrNotConfirmed: 'Akun Supabase belum dikonfirmasi. Buka panel Supabase → Authentication → Users, buka pengguna tersebut dan konfirmasi emailnya. Anda juga bisa menghapus akun lalu menambahkannya lagi dengan opsi "Auto Confirm User".',
          syncErrBadCredentials: 'Email atau kata sandi salah. Periksa apakah akun dibuat di proyek Supabase yang sama dengan alamat di konfigurasi.',
          syncErrRateLimit: 'Terlalu banyak percobaan masuk. Tunggu satu menit lalu coba lagi.',
          syncErrOffline: 'Tidak ada koneksi internet.',
          syncErrTables: 'Tabel tidak ada di Supabase. Jalankan docs/supabase-schema.sql di SQL Editor.',
          syncErrColumn: 'Kolom tabel tidak ada. Jalankan lagi docs/supabase-schema.sql di SQL Editor.',
          syncErrAccess: 'Akses ditolak. Masuk kembali.',
          syncProblem: 'Pengiriman terakhir ke cloud gagal: {detail}',
          syncErrGeneric: 'Gagal masuk: {detail}',
          syncPushInProgress: 'Mengirim data ke cloud...',
          syncPushDone: 'Data telah dikirim ke cloud.',
          syncPushFailed: 'Gagal mengirim data: {detail}',
          syncNothingToSend: 'Semua sudah ada di cloud. Tidak ada yang baru untuk dikirim.',
          syncCloudRows: 'Di cloud: menu {menu}, bahan {ingredients}, pesanan {orders}, pembelian {purchases}',
          storagePersistent: 'Penyimpanan permanen: aktif',
          storageNotPersistent: 'Penyimpanan permanen: nonaktif (sistem dapat menghapus data saat ruang menipis)',
          storageLabel: 'Penggunaan penyimpanan',
          dbOpenFailed: 'Tidak dapat membuka basis data lokal.',
          editMenu: 'Ubah menu',
          orderArchive: 'Arsip pesanan',
          editWarehouse: 'Ubah gudang',
          warehouse: 'Gudang',
          warehouseHint: 'Pratinjau gudang. Untuk menambah atau mengubah bahan, gunakan tombol Ubah gudang di Pengaturan.',
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
          noArchiveRange: 'Tidak ada pesanan dalam rentang yang dipilih.',
          archiveRangeLabel: 'Rentang tanggal',
          archiveRangeDay: 'Hari',
          archiveRangeWeek: 'Minggu',
          archiveRangeMonth: 'Bulan',
          archiveRangeAll: 'Semua',
          archiveCount: 'Jumlah pesanan: {count}',
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
          activeOrdersLabel: 'Pesanan aktif',
          archivedOrdersLabel: 'Pesanan arsip',
          confirmDeleteProduct: 'Hapus item "{name}" dari menu?',
          confirmDeleteOrder: 'Hapus pesanan aktif dari {date}?',
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

      // Filtr archiwum: domyślnie dzisiejszy dzień.
      const archiveFilter = {
        mode: 'day',
        date: toDateInputValue(new Date())
      };

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
      const archiveCount = document.getElementById('archiveCount');
      const archiveRangeModes = document.getElementById('archiveRangeModes');
      const archiveRangeHint = document.getElementById('archiveRangeHint');
      const archiveDateInput = document.getElementById('archiveDateInput');
      const archiveWeekInput = document.getElementById('archiveWeekInput');
      const archiveMonthInput = document.getElementById('archiveMonthInput');
      const archiveWeekPickerSupported = supportsInputType('week');
      const archiveMonthPickerSupported = supportsInputType('month');
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
      const ingredientEditList = document.getElementById('ingredientEditList');
      const ingredientEditCountBadge = document.getElementById('ingredientEditCountBadge');
      const ingredientCountBadge = document.getElementById('ingredientCountBadge');
      const warehouseValueBadge = document.getElementById('warehouseValueBadge');
      const purchaseItems = document.getElementById('purchaseItems');
      const purchaseSummaryCount = document.getElementById('purchaseSummaryCount');
      const purchaseSummaryDetails = document.getElementById('purchaseSummaryDetails');
      const purchaseTotalLabel = document.getElementById('purchaseTotal');
      const purchaseOrderList = document.getElementById('purchaseOrderList');
      const syncUserNameInput = document.getElementById('syncUserName');
      const syncStatusLabel = document.getElementById('syncStatus');
      const syncLoginFields = document.getElementById('syncLoginFields');
      const syncEmailInput = document.getElementById('syncEmail');
      const syncPasswordInput = document.getElementById('syncPassword');
      const syncSignInBtn = document.getElementById('syncSignInBtn');
      const syncPushBtn = document.getElementById('syncPushBtn');
      const syncSignOutBtn = document.getElementById('syncSignOutBtn');
      let syncErrorNotice = '';
      let cloudCounts = null;
      const headerDateLabel = document.getElementById('headerDate');
      const headerWeekdayLabel = document.getElementById('headerWeekday');

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
        const result = window.KedaiDatabase.saveState(state);
        // Wysyłka do chmury tylko ustawia licznik czasu - nigdy nie blokuje zapisu.
        window.KedaiSync?.notifyChange(state);
        return result;
      }

      const { formatCurrency, formatDateTime: formatUiDateTime, escapeHtml, makeId } = window.KedaiUi;

      function formatDateTime(value) {
        return formatUiDateTime(value, state.language);
      }

      function formatNumber(value) {
        const number = Number(value || 0);
        return Number.isInteger(number) ? String(number) : number.toFixed(2);
      }

      function getLocale() {
        return state.language === 'en' ? 'en-US' : state.language === 'id' ? 'id-ID' : 'pl-PL';
      }

      /**
       * Data i dzień tygodnia w prawym górnym rogu paska. Odświeża się też po
       * północy, bez przeładowania aplikacji.
       */
      function renderHeaderDate() {
        const locale = getLocale();
        const now = new Date();

        if (headerDateLabel) {
          headerDateLabel.textContent = new Intl.DateTimeFormat(locale, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }).format(now);
        }

        if (headerWeekdayLabel) {
          const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(now);
          headerWeekdayLabel.textContent = weekday.charAt(0).toLocaleUpperCase(locale) + weekday.slice(1);
        }
      }

      function renderTabTitle() {
        document.querySelectorAll('.tab-title').forEach(title => {
          title.classList.toggle('active', title.dataset.titleFor === activeTab);
        });
      }

      function setLanguage(lang) {
        state.language = lang;
        window.KedaiDatabase.saveLanguage(lang);
        applyTranslations();
        renderSyncPanel();
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

        renderHeaderDate();
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

        renderTabTitle();
      }

      function setActiveTab(tab) {
        activeTab = tab;
        renderTabs();
        if (tab === 'settings') checkForUpdates();
        if (tab === 'archive') {
          // Każde wejście do archiwum zaczyna od dnia dzisiejszego.
          resetArchiveFilter();
          renderArchive();
        }
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
        const releaseButtons = () => {
          updateButton.disabled = false;
          checkButton.disabled = false;
        };

        updateButton.disabled = true;
        checkButton.disabled = true;
        setProgress(15, translate('updateProgress'));
        status.textContent = translate('updating');
        status.classList.remove('hidden');

        try {
          const registration = navigator.serviceWorker ? await navigator.serviceWorker.getRegistration() : null;

          if (!registration) {
            progressPanel.classList.add('hidden');
            status.textContent = translate('updateCheckFailed');
            releaseButtons();
            return;
          }

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

          if (!registration.waiting) {
            // Nie ma nowej wersji do zainstalowania – nie przeładowujemy aplikacji.
            progressPanel.classList.add('hidden');
            status.textContent = translate('upToDate');
            releaseButtons();
            return;
          }

          setProgress(80, translate('updateInstalling'));
          const controllerChanged = new Promise(resolve => {
            navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true });
            setTimeout(resolve, 4000);
          });
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          await controllerChanged;

          setProgress(100, translate('updateReady'));
          status.textContent = translate('updateReady');
          releaseButtons();
          showConfirmDialog(translate('updateReady'), () => window.location.reload());
        } catch (error) {
          console.error('Błąd aktualizacji aplikacji:', error);
          progressPanel.classList.add('hidden');
          status.textContent = translate('updateCheckFailed');
          releaseButtons();
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

      function toDateInputValue(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

      function addDays(date, days) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
      }

      // Nie każda przeglądarka obsługuje pola "tydzień" i "miesiąc" (np. Firefox,
      // starsze iOS). Wtedy zostaje zwykły kalendarz dzienny.
      function supportsInputType(type) {
        const input = document.createElement('input');
        input.setAttribute('type', type);
        return input.type === type;
      }

      function getIsoWeekStart(date) {
        return addDays(date, -((date.getDay() + 6) % 7));
      }

      function toWeekInputValue(date) {
        const weekStart = getIsoWeekStart(date);
        const year = addDays(weekStart, 3).getFullYear();
        const firstWeekStart = getIsoWeekStart(new Date(year, 0, 4));
        const week = 1 + Math.round((weekStart - firstWeekStart) / 604800000);
        return `${year}-W${String(week).padStart(2, '0')}`;
      }

      function parseWeekInputValue(value) {
        const match = /^(\d{4})-W(\d{2})$/.exec(value || '');
        if (!match) return null;
        const firstWeekStart = getIsoWeekStart(new Date(Number(match[1]), 0, 4));
        return addDays(firstWeekStart, (Number(match[2]) - 1) * 7);
      }

      function toMonthInputValue(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      }

      function parseArchiveAnchor() {
        const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(archiveFilter.date || '');
        if (!parts) return null;
        return new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]));
      }

      function getDateLocale() {
        const lang = state.language || 'pl';
        if (lang === 'en') return 'en-US';
        if (lang === 'id') return 'id-ID';
        return 'pl-PL';
      }

      function formatDateLabel(value) {
        const date = value instanceof Date ? value : new Date(value);
        return new Intl.DateTimeFormat(getDateLocale(), { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
      }

      function formatMonthLabel(value) {
        const date = value instanceof Date ? value : new Date(value);
        return new Intl.DateTimeFormat(getDateLocale(), { month: 'long', year: 'numeric' }).format(date);
      }

      // Zakres czasu dla archiwum: dzień, tydzień (poniedziałek-niedziela) lub miesiąc.
      function getArchiveFilterRange() {
        if (archiveFilter.mode === 'all') return null;

        const anchor = parseArchiveAnchor();
        if (!anchor) return null;

        if (archiveFilter.mode === 'week') {
          const start = getIsoWeekStart(anchor);
          return { start: start.getTime(), end: addDays(start, 7).getTime() };
        }

        if (archiveFilter.mode === 'month') {
          const start = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
          const end = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1);
          return { start: start.getTime(), end: end.getTime() };
        }

        return { start: anchor.getTime(), end: addDays(anchor, 1).getTime() };
      }

      function getArchiveFilteredOrders() {
        const orders = Array.isArray(state.archive) ? state.archive : [];
        const range = getArchiveFilterRange();
        if (!range) return orders;

        return orders.filter(order => {
          const time = new Date(order.createdAt).getTime();
          return Number.isFinite(time) && time >= range.start && time < range.end;
        });
      }

      function describeArchiveRange() {
        const range = getArchiveFilterRange();
        if (!range) return translate('archiveRangeAll');

        const start = new Date(range.start);
        if (archiveFilter.mode === 'week') {
          return `${formatDateLabel(start)} – ${formatDateLabel(addDays(start, 6))}`;
        }
        if (archiveFilter.mode === 'month') {
          return formatMonthLabel(start);
        }
        return formatDateLabel(start);
      }

      // Powrót do archiwum zawsze zaczyna od trybu "Dzień" i bieżącej daty.
      function resetArchiveFilter() {
        archiveFilter.mode = 'day';
        archiveFilter.date = toDateInputValue(new Date());
      }

      function syncArchiveFilterUi() {
        if (!archiveRangeModes) return;

        archiveRangeModes.querySelectorAll('[data-archive-range]').forEach(button => {
          const active = button.dataset.archiveRange === archiveFilter.mode;
          button.classList.toggle('bg-orange-500', active);
          button.classList.toggle('text-white', active);
          button.classList.toggle('bg-slate-100', !active);
          button.classList.toggle('text-slate-700', !active);
        });

        const anchor = parseArchiveAnchor() || new Date();
        const useWeekPicker = archiveFilter.mode === 'week' && archiveWeekPickerSupported;
        const useMonthPicker = archiveFilter.mode === 'month' && archiveMonthPickerSupported;
        const useDatePicker = archiveFilter.mode !== 'all' && !useWeekPicker && !useMonthPicker;

        if (archiveDateInput) {
          if (useDatePicker && archiveDateInput.value !== archiveFilter.date) {
            archiveDateInput.value = archiveFilter.date;
          }
          archiveDateInput.classList.toggle('hidden', !useDatePicker);
        }

        if (archiveWeekInput) {
          if (useWeekPicker) {
            const weekValue = toWeekInputValue(anchor);
            if (archiveWeekInput.value !== weekValue) {
              archiveWeekInput.value = weekValue;
            }
          }
          archiveWeekInput.classList.toggle('hidden', !useWeekPicker);
        }

        if (archiveMonthInput) {
          if (useMonthPicker) {
            const monthValue = toMonthInputValue(anchor);
            if (archiveMonthInput.value !== monthValue) {
              archiveMonthInput.value = monthValue;
            }
          }
          archiveMonthInput.classList.toggle('hidden', !useMonthPicker);
        }

        if (archiveRangeHint) {
          archiveRangeHint.textContent = describeArchiveRange();
        }
      }

      function renderArchive() {
        syncArchiveFilterUi();

        const orders = getArchiveFilteredOrders();
        const total = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
        archiveTotal.textContent = formatCurrency(total);

        if (archiveCount) {
          archiveCount.textContent = translate('archiveCount', { count: orders.length });
        }

        if (!orders.length) {
          const emptyMessage = archiveFilter.mode === 'all' ? translate('noArchive') : translate('noArchiveRange');
          archiveList.innerHTML = `<div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-500">${emptyMessage}</div>`;
          return;
        }

        archiveList.innerHTML = orders
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
          return;
        }

        ingredientList.innerHTML = ingredients
          .slice()
          .sort((a, b) => String(a.name).localeCompare(String(b.name)))
          .map(ingredient => {
            const belowMinimum = Number(ingredient.stock || 0) < Number(ingredient.min_stock || 0);
            const stockValue = Number(ingredient.stock || 0) * Number(ingredient.unit_price || 0);

            return `
              <div class="rounded-2xl border p-3 ${belowMinimum ? 'stock-low border-rose-300' : 'border-slate-200 bg-white shadow-sm'}">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-base font-bold text-slate-800">${escapeHtml(ingredient.name)}</p>
                    <p class="text-sm font-semibold text-slate-700">${formatNumber(ingredient.stock)} ${escapeHtml(ingredient.unit)}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-bold text-orange-600">${formatCurrency(ingredient.unit_price)} / ${escapeHtml(ingredient.unit)}</p>
                    <p class="text-xs text-slate-500">${formatCurrency(stockValue)}</p>
                  </div>
                </div>
                ${belowMinimum ? `<p class="mt-2 text-xs font-bold uppercase tracking-wide text-rose-600">${translate('belowMin')} · ${translate('ingredientMinStock')}: ${formatNumber(ingredient.min_stock)} ${escapeHtml(ingredient.unit)}</p>` : ''}
              </div>
            `;
          })
          .join('');
      }

      function renderWarehouseEdit() {
        const ingredients = state.ingredients || [];
        ingredientEditCountBadge.textContent = getCounterLabel(ingredients.length, 'item', 'items');

        if (!ingredients.length) {
          ingredientEditList.innerHTML = `<div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-500">${translate('noIngredients')}</div>`;
        } else {
          ingredientEditList.innerHTML = ingredients
            .slice()
            .sort((a, b) => String(a.name).localeCompare(String(b.name)))
            .map(ingredient => {
              const belowMinimum = Number(ingredient.stock || 0) < Number(ingredient.min_stock || 0);
              const stockValue = Number(ingredient.stock || 0) * Number(ingredient.unit_price || 0);

              return `
                <div class="rounded-2xl border p-3 ${belowMinimum ? 'stock-low border-rose-300' : 'border-slate-200 bg-white shadow-sm'}">
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
        renderWarehouseEdit();
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
          window.KedaiSync?.deleteRows('clientOrders', [order.date || order.createdAt]);
          saveState();
          renderAll();
          showToast(translate('orderDeleted'), 'success');
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
        renderWarehouseEdit();
      }

      function cancelIngredientEdit() {
        showConfirmDialog(translate('confirmCancelSelection'), () => {
          resetIngredientForm();
          renderWarehouseEdit();
        });
      }

      function deleteIngredient(ingredientId) {
        const ingredient = (state.ingredients || []).find(item => item.id === ingredientId);
        if (!ingredient) return;

        showConfirmDialog(translate('confirmDeleteIngredient', { name: ingredient.name }), () => {
          state.ingredients = state.ingredients.filter(item => item.id !== ingredientId);
          delete currentPurchaseSelection[ingredientId];
          window.KedaiDatabase.deleteIngredient(ingredientId);
          window.KedaiSync?.deleteRows('ingredients', [ingredientId]);
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
          window.KedaiSync?.deleteRows('purchaseOrders', [order.date || order.createdAt]);
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
      if (archiveRangeModes) {
        archiveRangeModes.addEventListener('click', event => {
          const button = event.target.closest('[data-archive-range]');
          if (!button) return;
          archiveFilter.mode = button.dataset.archiveRange;
          renderArchive();
        });
      }

      if (archiveDateInput) {
        archiveDateInput.addEventListener('change', event => {
          if (event.target.value) {
            archiveFilter.date = event.target.value;
          }
          renderArchive();
        });
      }

      if (archiveWeekInput) {
        archiveWeekInput.addEventListener('change', event => {
          const weekStart = parseWeekInputValue(event.target.value);
          if (weekStart) {
            archiveFilter.date = toDateInputValue(weekStart);
            renderArchive();
          }
        });
      }

      if (archiveMonthInput) {
        archiveMonthInput.addEventListener('change', event => {
          const match = /^(\d{4})-(\d{2})$/.exec(event.target.value || '');
          if (match) {
            archiveFilter.date = `${match[1]}-${match[2]}-01`;
            renderArchive();
          }
        });
      }

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
      syncUserNameInput.addEventListener('change', saveSyncUserName);
      syncSignInBtn.addEventListener('click', signInToCloud);
      syncPushBtn.addEventListener('click', pushToCloud);
      syncSignOutBtn.addEventListener('click', signOutFromCloud);
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

      function renderSyncPanel() {
        if (!syncStatusLabel) return;
        const sync = window.KedaiSync;

        if (!sync || !sync.isConfigured()) {
          syncStatusLabel.textContent = translate('syncNotConfigured');
          syncLoginFields.classList.add('hidden');
          syncSignInBtn.classList.add('hidden');
          syncPushBtn.classList.add('hidden');
          syncSignOutBtn.classList.add('hidden');
          return;
        }

        const status = sync.getStatus();
        syncLoginFields.classList.toggle('hidden', status.signedIn);
        syncSignInBtn.classList.toggle('hidden', status.signedIn);
        syncPushBtn.classList.toggle('hidden', !status.signedIn);
        syncSignOutBtn.classList.toggle('hidden', !status.signedIn);
        syncPushBtn.textContent = translate('syncPushNow');
        syncPushBtn.disabled = false;

        if (status.signedIn) syncErrorNotice = '';
        const notice = status.signedIn ? '' : syncErrorNotice;
        syncStatusLabel.classList.toggle('text-rose-600', Boolean(notice));
        syncStatusLabel.classList.toggle('text-slate-500', !notice);

        if (notice) {
          syncStatusLabel.textContent = notice;
          return;
        }

        if (!status.signedIn) {
          syncStatusLabel.textContent = translate('syncNeedsLogin');
          return;
        }

        if (status.code === 'failed') {
          syncStatusLabel.textContent = translate('syncProblem', { detail: syncDetailText(status.detail) });
          syncStatusLabel.classList.remove('text-slate-500');
          syncStatusLabel.classList.add('text-rose-600');
          return;
        }

        const parts = [translate('syncSignedInAs', { email: status.email })];
        if (cloudCounts) {
          parts.push(translate('syncCloudRows', {
            menu: cloudCounts.menu,
            ingredients: cloudCounts.ingredients,
            orders: cloudCounts.clientOrders,
            purchases: cloudCounts.purchaseOrders
          }));
        }
        syncStatusLabel.textContent = parts.join(' · ');
      }

      function saveSyncUserName() {
        const sync = window.KedaiSync;
        if (!sync) return;
        const saved = sync.setUserName(syncUserNameInput.value);
        syncUserNameInput.value = saved;
        syncUserNameInput.blur();
        showToast(translate('userNameSaved'), 'success');
      }

      function syncAuthMessage(error) {
        const code = error?.code || '';
        if (code === 'email_not_confirmed') return translate('syncErrNotConfirmed');
        if (code === 'invalid_credentials') return translate('syncErrBadCredentials');
        if (code === 'over_request_rate_limit' || code === 'too_many_requests' || error?.status === 429) {
          return translate('syncErrRateLimit');
        }
        if (error?.message === 'Failed to fetch') return translate('syncErrOffline');
        return translate('syncErrGeneric', { detail: error?.message || String(error || '') });
      }

      /**
       * Powód niepowodzenia z modułu chmury jest albo kluczem tłumaczenia,
       * albo surowym komunikatem z Supabase.
       */
      function syncDetailText(detail) {
        if (!detail) return '';
        return detail.startsWith('syncErr') ? translate(detail) : detail;
      }

      async function signInToCloud() {
        const sync = window.KedaiSync;
        if (!sync?.isConfigured()) return;

        const email = syncEmailInput.value.trim();
        const password = syncPasswordInput.value;
        if (!email || !password) {
          showToast(translate('syncEnterCredentials'), 'warning');
          return;
        }

        syncSignInBtn.disabled = true;
        syncSignInBtn.textContent = translate('syncSigningIn');
        try {
          const session = await sync.signIn(email, password);
          syncPasswordInput.value = '';
          showToast(translate('syncSignedInAs', { email: session.email }), 'success');
          // Po zalogowaniu wysyłamy od razu wszystko, żeby dane nie czekały
          // na przypadkową zmianę w aplikacji.
          await sendToCloud({ button: false });
        } catch (error) {
          syncErrorNotice = syncAuthMessage(error);
          showToast(syncErrorNotice, 'error');
        } finally {
          syncSignInBtn.disabled = false;
          syncSignInBtn.textContent = translate('syncSignIn');
          renderSyncPanel();
        }
      }

      /** Odczytuje z chmury liczbę wierszy i pokazuje ją w Ustawieniach. */
      async function refreshCloudCounts() {
        const sync = window.KedaiSync;
        if (!sync?.countRows) return;
        try {
          cloudCounts = await sync.countRows();
        } catch (error) {
          console.warn('Nie udało się policzyć wierszy w chmurze:', error);
          cloudCounts = null;
        }
        renderSyncPanel();
      }

      async function sendToCloud(options = {}) {
        const sync = window.KedaiSync;
        if (!sync?.isConfigured()) return null;
        const { button = true } = options;

        if (button) {
          syncPushBtn.disabled = true;
          syncPushBtn.textContent = translate('syncPushInProgress');
        }

        let result;
        try {
          result = await sync.pushNow(state);
        } finally {
          if (button) {
            syncPushBtn.disabled = false;
            syncPushBtn.textContent = translate('syncPushNow');
          }
        }

        if (result?.ok) {
          if (button) {
            showToast(translate(result.sent === 0 ? 'syncNothingToSend' : 'syncPushDone'), 'success');
          }
          await refreshCloudCounts();
        } else if (button) {
          showToast(translate('syncPushFailed', { detail: syncDetailText(result?.detail) }), 'error');
        }

        renderSyncPanel();
        return result;
      }

      function pushToCloud() {
        return sendToCloud({ button: true });
      }

      function signOutFromCloud() {
        window.KedaiSync?.signOut();
        syncErrorNotice = '';
        cloudCounts = null;
        renderSyncPanel();
      }

      /**
       * Zapisuje plik kopii zapasowej. W zainstalowanej aplikacji PWA na Androidzie
       * zwykłe pobieranie linku bywa po cichu ignorowane, dlatego najpierw proponujemy
       * arkusz udostępniania, a pobieranie zostaje jako droga odwrotna.
       * Zwraca 'shared', 'downloaded' lub 'cancelled'.
       */
      async function saveBackupFile(blob, filename) {
        const file = new File([blob], filename, { type: 'application/json' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({ files: [file], title: filename });
            return 'shared';
          } catch (error) {
            if (error && error.name === 'AbortError') return 'cancelled';
            console.warn('Udostępnianie pliku nie powiodło się, próbuję pobrania:', error);
          }
        }

        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = filename;
        link.rel = 'noopener';
        document.body.appendChild(link);
        link.click();
        link.remove();
        // Adresu nie zwalniamy od razu: na Androidzie pobieranie startuje
        // asynchronicznie i przedwczesne zwolnienie przerywało je bez komunikatu.
        setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
        return 'downloaded';
      }

      async function exportData() {
        const filename = `kedai-pos-backup-${new Date().toISOString().slice(0, 10)}.json`;
        const blob = new Blob([window.KedaiDatabase.exportState(state)], { type: 'application/json' });
        try {
          const result = await saveBackupFile(blob, filename);
          if (result === 'cancelled') return;
          showToast(translate('exportDone'), 'success');
        } catch (error) {
          console.error('Błąd eksportu danych:', error);
          showToast(translate('exportFailed'), 'error');
        }
      }

      async function importDataFile(file) {
        try {
          const payload = JSON.parse(await file.text());
          state = await window.KedaiDatabase.importState(defaultState, payload);
          renderAll();
          renderStorageInfo();
          // Import zapisuje dane własną drogą (poza saveState), więc wysyłkę
          // do chmury trzeba uruchomić tutaj ręcznie.
          window.KedaiSync?.notifyChange(state);
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
          syncUserNameInput.value = window.KedaiSync?.getUserName() || '';
          renderSyncPanel();
        } catch (error) {
          console.error('Błąd uruchamiania IndexedDB:', error);
          showToast(translate('dbOpenFailed'), 'error');
        }
      }

      // Data w górnym pasku odświeża się także po północy, bez przeładowania.
      setInterval(renderHeaderDate, 60000);

      initializeApp();
