const defaultState = window.KedaiConfig.defaultState;

      /**
       * Nazwy kluczy przeglądarki zależą od środowiska (config/env.js). Wydanie
       * oficjalne zostaje przy dotychczasowych nazwach, a testowe dostaje sufiks
       * `_test`, dzięki czemu oba mogą działać w tej samej przeglądarce bez
       * mieszania ustawień.
       */
      const envKey = name => (window.KedaiEnv ? window.KedaiEnv.key(name) : name);

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
          syncPendingCount: 'Wiersze czekające na wysłanie: {count}',
          syncPendingNone: 'Wszystko potwierdzone w chmurze',
          syncLastSuccess: 'Ostatnia udana wysyłka: {time}',
          syncFailedCount: 'Chmura odrzuciła {count} wierszy: {detail}',
          syncResendAll: 'Wyślij wszystko od nowa',
          syncResendConfirm: 'Wysłać ponownie wszystkie dane? Wysyłka jest bezpieczna: nadpisuje te same wiersze i nie tworzy duplikatów.',
          syncResendDone: 'Wszystkie dane zostały wysłane ponownie.',
          syncBadgePending: '{count} do wysłania',
          syncBadgeSignedOut: '{count} bez chmury',
          syncBadgeFailed: '{count} odrzuconych',
          syncDeleteNote: 'Usunięcie pozycji nie kasuje jej z chmury - wiersz zostaje ze znacznikiem deleted.',
          localDataTitle: 'Dane na telefonie',
          localDataDescription: 'Stare zamówienia można usuwać z telefonu, aby zwolnić miejsce. W chmurze zostają na zawsze i nigdy nie są kasowane.',
          localRetentionLabel: 'Trzymaj archiwum na telefonie (dni)',
          localRetentionHint: '0 = nie usuwaj nic. Starsze zamówienia są usuwane tylko z telefonu i tylko wtedy, gdy są już potwierdzone w chmurze.',
          localRetentionSave: 'Zapisz',
          localRetentionSaved: 'Ustawienie zostało zapisane.',
          localRetentionPurged: 'Usunięto z telefonu {count} starych zamówień (w chmurze zostały).',
          storagePersistent: 'Pamięć trwała: włączona',
          storageNotPersistent: 'Pamięć trwała: wyłączona (system może usunąć dane przy braku miejsca)',
          storageLabel: 'Wykorzystanie pamięci',
          dbOpenFailed: 'Nie udało się otworzyć lokalnej bazy danych.',
          editMenu: 'Edytuj menu',
          openAppMenu: 'Ustawienia i edycja',
          navModeTitle: 'Wygląd dolnego paska',
          navModeHint: 'Zdecyduj, jak mają wyglądać przyciski na dole ekranu.',
          navModeText: 'Tylko tekst',
          navModeBoth: 'Tekst i ikona',
          navModeIcon: 'Tylko ikona',
          editWarehouse: 'Edycja magazynu',
          warehouse: 'Magazyn',
          warehouseHint: 'Plus przy składniku dodaje jedno opakowanie do zamówienia. Podsumowanie pojawi się na dole ekranu.',
          ingredients: 'Składniki',
          addIngredient: 'Dodaj nowy składnik',
          ingredientName: 'Nazwa',
          ingredientUnit: 'Jednostka',
          ingredientStock: 'Ilość',
          ingredientStockHint: 'Ile masz teraz w magazynie.',
          ingredientMinStock: 'Stan min.',
          ingredientMinStockHint: 'Poniżej tej ilości pozycja świeci na czerwono.',
          ingredientPackage: 'Opakowanie',
          ingredientPackageHint: 'Ile wchodzi w jedno opakowanie ({unit}) — o tyle zmienia się ilość przy zamawianiu.',
          ingredientPriceFor: 'Cena za 1 {unit}',
          ingredientCalcHint: 'Nie znasz ceny za jednostkę? Użyj kalkulatora obok.',
          editIngredientTitle: 'Edytuj składnik',
          ingredientModalHint: 'Wpisz stan, cenę i wielkość opakowania.',
          ingredientAccept: 'Akceptuj',
          addIngredientSection: 'Dodaj zakładkę',
          ingredientSectionNewTitle: 'Nowa zakładka magazynu',
          ingredientSectionEditTitle: 'Zakładka magazynu',
          ingredientSectionSave: 'Dodaj zakładkę',
          ingredientSectionHint: 'Składniki należą do zakładki, która jest nad nimi — przesuwaj je strzałkami.',
          ingredientSectionPreview: 'Podgląd zakładki',
          ingredientSectionAdded: 'Zakładka magazynu została dodana.',
          ingredientSectionUpdated: 'Zakładka magazynu została zapisana.',
          ingredientSectionRemoved: 'Zakładka została usunięta. Składniki zostały w magazynie.',
          confirmDeleteIngredientSection: 'Usunąć zakładkę "{name}"? Składniki pod nią zostaną.',
          fillSectionName: 'Wpisz nazwę zakładki.',
          unitPcs: 'szt',
          unitGram: 'g',
          unitMl: 'ml',
          calcOpen: 'Kalkulator ceny z opakowania',
          calcTitle: 'Kalkulator ceny',
          calcHint: 'Znasz cenę i wielkość opakowania? Policz cenę jednostki.',
          calcPrice: 'Cena opakowania',
          calcResultMissing: 'Uzupełnij oba pola',
          calcApply: 'Użyj tej ceny',
          calcApplyHint: 'Przycisk wpisze wyliczoną cenę i wielkość opakowania do okna składnika.',
          calcApplied: 'Cena i wielkość opakowania zostały wpisane.',
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
          orderAddPackage: 'Dodaj opakowanie',
          orderRemovePackage: 'Odejmij opakowanie',
          orderBarClear: 'Wyczyść zamówienie',
          orderSheetHint: 'Popraw ilości i zaakceptuj. Ilość zmienia się całymi opakowaniami.',
          orderSheetClose: 'Zamknij',
          receivedShort: 'przyjęto {received}',
          purchaseKeepReceived: 'Nie można zamówić mniej niż już przyjęto ({quantity} {unit}).',
          purchaseListShort: 'Zakupy',
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
          purchaseUpdated: 'Zamówienie zostało zaktualizowane.',
          purchaseEditNotice: 'Edytujesz zamówienie z {date}.',
          purchaseReceived: 'Przyjęte',
          purchasePartial: 'Częściowo',
          receivePurchase: 'Przyjmij',
          receiveTitle: 'Przyjęcie zamówienia z {date}',
          receiveHint: 'Zaznacz, co dotarło — zaznaczona pozycja zostanie przekreślona. Przyjęte w całości pozycje są zablokowane.',
          receiveSummary: 'Do przyjęcia: {count} pozycji · {value}',
          receiveNothing: 'Nic nie zaznaczono.',
          receiveAllDone: 'Wszystko już przyjęte.',
          receivedOfOrdered: 'przyjęto {received} z {ordered}',
          receiveSkipped: 'Nie można przyjąć: tego składnika nie ma już w magazynie.',
          receivedOne: 'Przyjęto na magazyn 1 pozycję.',
          receivedMany: 'Przyjęto na magazyn: {count} pozycji.',
          copyPurchase: 'Kopiuj',
          purchaseCopyDone: 'Lista skopiowana do schowka.',
          purchaseCopyFailed: 'Nie udało się skopiować listy.',
          copyNothingToSend: 'Nie ma czego kopiować — wszystko już przyjęte.',
          stepWarning: '{name}: ilość musi być wielokrotnością opakowania ({step} {unit}).',
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
          hideItem: 'Ukryj w obsłudze klienta',
          showItem: 'Pokaż w obsłudze klienta',
          itemHidden: 'Pozycja "{name}" została ukryta. Wróci po kliknięciu "Pokaż w obsłudze klienta".',
          itemShown: 'Pozycja "{name}" jest znowu widoczna.',
          itemHiddenBadge: 'UKRYTE — widoczne tylko tutaj',
          visibleInCustomer: 'Widoczne w obsłudze klienta',
          sectionColor: 'Kolor zakładki',
          sectionColorNone: 'bez koloru',
          sectionColorClear: 'Wyczyść',
          recipe: 'Receptura',
          recipeTitle: 'Receptura: {name}',
          recipeHint: 'Wpisz, ile składnika zużywa jedna porcja. Puste pole = składnik nieużywany w tym daniu.',
          recipeStock: 'Stan',
          recipeSave: 'Zapisz recepturę',
          recipeSaved: 'Receptura została zapisana.',
          recipeNoIngredients: 'Magazyn jest pusty. Dodaj składniki w Ustawieniach → Edycja magazynu.',
          recipeMissing: 'Składnik usunięty z magazynu',
          recipeRemoveMissing: 'Usuń z receptury',
          archivedWithStock: 'Zamówienie w archiwum. Z magazynu zeszło składników: {count}.',
          archivedWithStockOne: 'Zamówienie w archiwum. Z magazynu zszedł 1 składnik.',
          recipeCostLabel: 'Koszt receptury',
          recipeCostNone: 'Brak receptury',
          recipeCostPartial: 'Koszt niepełny: brakuje {count} składników',
          recipeMarginLabel: 'Marża',
          orderCostLabel: 'Koszt zamówienia',
          orderProfitLabel: 'Zysk i marża',
          orderCostMissing: 'Koszt nienaliczony',
          orderCostMissingHint: 'Zamówienie zarchiwizowane przed wprowadzeniem kosztów.',
          orderStockUsed: 'Ze stanu zeszło',
          orderStockNone: 'Nic nie zeszło ze stanu.',
          seedApplied: 'Magazyn i receptury zostały uzupełnione.',
          testSeedApplied: 'Środowisko testowe: wgrano menu i magazyn lokalu.',
          menuCountWithHidden: '{visible} widocznych · {hidden} ukrytych',
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
          syncPendingCount: 'Rows waiting to be sent: {count}',
          syncPendingNone: 'Everything confirmed in the cloud',
          syncLastSuccess: 'Last successful upload: {time}',
          syncFailedCount: 'The cloud rejected {count} rows: {detail}',
          syncResendAll: 'Send everything again',
          syncResendConfirm: 'Send all data again? This is safe: it overwrites the same rows and never creates duplicates.',
          syncResendDone: 'All data has been sent again.',
          syncBadgePending: '{count} to send',
          syncBadgeSignedOut: '{count} not in the cloud',
          syncBadgeFailed: '{count} rejected',
          syncDeleteNote: 'Deleting an item does not remove it from the cloud - the row stays with a deleted flag.',
          localDataTitle: 'Data on the phone',
          localDataDescription: 'Old orders can be removed from the phone to free up space. In the cloud they stay forever and are never deleted.',
          localRetentionLabel: 'Keep the archive on the phone (days)',
          localRetentionHint: '0 = keep everything. Older orders are removed from the phone only, and only when they are already confirmed in the cloud.',
          localRetentionSave: 'Save',
          localRetentionSaved: 'The setting has been saved.',
          localRetentionPurged: 'Removed {count} old orders from the phone (they stay in the cloud).',
          storagePersistent: 'Persistent storage: enabled',
          storageNotPersistent: 'Persistent storage: disabled (the system may clear data when space is low)',
          storageLabel: 'Storage usage',
          dbOpenFailed: 'Could not open the local database.',
          editMenu: 'Edit menu',
          openAppMenu: 'Settings and editing',
          navModeTitle: 'Bottom bar appearance',
          navModeHint: 'Choose how the buttons at the bottom of the screen look.',
          navModeText: 'Text only',
          navModeBoth: 'Text and icon',
          navModeIcon: 'Icon only',
          editWarehouse: 'Edit warehouse',
          warehouse: 'Warehouse',
          warehouseHint: 'The plus button adds one package to the order. The summary shows at the bottom of the screen.',
          ingredients: 'Ingredients',
          addIngredient: 'Add new ingredient',
          ingredientName: 'Name',
          ingredientUnit: 'Unit',
          ingredientStock: 'Quantity',
          ingredientStockHint: 'How much you have right now.',
          ingredientMinStock: 'Min. level',
          ingredientMinStockHint: 'Below this amount the item glows red.',
          ingredientPackage: 'Package',
          ingredientPackageHint: 'How much comes in one package ({unit}) — this is the step when ordering.',
          ingredientPriceFor: 'Price per 1 {unit}',
          ingredientCalcHint: 'Not sure about the unit price? Use the calculator next to it.',
          editIngredientTitle: 'Edit ingredient',
          ingredientModalHint: 'Enter the stock, price and package size.',
          ingredientAccept: 'Accept',
          addIngredientSection: 'Add tab',
          ingredientSectionNewTitle: 'New warehouse tab',
          ingredientSectionEditTitle: 'Warehouse tab',
          ingredientSectionSave: 'Add tab',
          ingredientSectionHint: 'Ingredients belong to the tab above them — move them with the arrows.',
          ingredientSectionPreview: 'Tab preview',
          ingredientSectionAdded: 'Warehouse tab added.',
          ingredientSectionUpdated: 'Warehouse tab saved.',
          ingredientSectionRemoved: 'Tab removed. The ingredients stayed in the warehouse.',
          confirmDeleteIngredientSection: 'Delete tab "{name}"? The ingredients below it will stay.',
          fillSectionName: 'Enter the tab name.',
          unitPcs: 'pcs',
          unitGram: 'g',
          unitMl: 'ml',
          calcOpen: 'Price calculator from package',
          calcTitle: 'Price calculator',
          calcHint: 'Know the package size and price? Work out the unit price.',
          calcPrice: 'Package price',
          calcResultMissing: 'Fill in both fields',
          calcApply: 'Use this price',
          calcApplyHint: 'The button fills the calculated price and package size into the ingredient window.',
          calcApplied: 'Price and package size filled in.',
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
          orderAddPackage: 'Add a package',
          orderRemovePackage: 'Remove a package',
          orderBarClear: 'Clear the order',
          orderSheetHint: 'Adjust the quantities and accept. Quantities change in whole packages.',
          orderSheetClose: 'Close',
          receivedShort: 'received {received}',
          purchaseKeepReceived: 'You cannot order less than already received ({quantity} {unit}).',
          purchaseListShort: 'Shopping',
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
          purchaseUpdated: 'Order updated.',
          purchaseEditNotice: 'You are editing the order from {date}.',
          purchaseReceived: 'Received',
          purchasePartial: 'Partial',
          receivePurchase: 'Receive',
          receiveTitle: 'Receive the order from {date}',
          receiveHint: 'Tick what arrived — a ticked item is crossed out. Items already received in full are locked.',
          receiveSummary: 'To receive: {count} items · {value}',
          receiveNothing: 'Nothing is ticked.',
          receiveAllDone: 'Everything is already received.',
          receivedOfOrdered: 'received {received} of {ordered}',
          receiveSkipped: 'Cannot receive: this ingredient is no longer in the warehouse.',
          receivedOne: 'Added 1 item to the warehouse.',
          receivedMany: 'Added {count} items to the warehouse.',
          copyPurchase: 'Copy',
          purchaseCopyDone: 'List copied to the clipboard.',
          purchaseCopyFailed: 'Could not copy the list.',
          copyNothingToSend: 'Nothing to copy — everything is already received.',
          stepWarning: '{name}: the quantity must be a multiple of the package ({step} {unit}).',
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
          hideItem: 'Hide from customers',
          showItem: 'Show to customers',
          itemHidden: 'Item "{name}" is now hidden. It comes back with "Show to customers".',
          itemShown: 'Item "{name}" is visible again.',
          itemHiddenBadge: 'HIDDEN — only visible here',
          visibleInCustomer: 'Visible to customers',
          sectionColor: 'Colour of the tab',
          sectionColorNone: 'no colour',
          sectionColorClear: 'Clear',
          recipe: 'Recipe',
          recipeTitle: 'Recipe: {name}',
          recipeHint: 'Enter how much of each ingredient one portion uses. An empty field means the ingredient is not used in this dish.',
          recipeStock: 'Stock',
          recipeSave: 'Save recipe',
          recipeSaved: 'The recipe has been saved.',
          recipeNoIngredients: 'The warehouse is empty. Add ingredients in Settings → Edit warehouse.',
          recipeMissing: 'Ingredient removed from the warehouse',
          recipeRemoveMissing: 'Remove from recipe',
          archivedWithStock: 'Order archived. {count} ingredients were deducted from stock.',
          archivedWithStockOne: 'Order archived. 1 ingredient was deducted from stock.',
          recipeCostLabel: 'Recipe cost',
          recipeCostNone: 'No recipe',
          recipeCostPartial: 'Partial cost: {count} ingredients missing',
          recipeMarginLabel: 'Margin',
          orderCostLabel: 'Order cost',
          orderProfitLabel: 'Profit and margin',
          orderCostMissing: 'Cost not calculated',
          orderCostMissingHint: 'Order archived before cost tracking was introduced.',
          orderStockUsed: 'Taken from stock',
          orderStockNone: 'Nothing was taken from stock.',
          seedApplied: 'Warehouse and recipes have been filled in.',
          testSeedApplied: 'Test environment: the shop menu and warehouse were loaded.',
          menuCountWithHidden: '{visible} visible · {hidden} hidden',
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
          syncPendingCount: 'Baris menunggu dikirim: {count}',
          syncPendingNone: 'Semua sudah terkonfirmasi di cloud',
          syncLastSuccess: 'Pengiriman berhasil terakhir: {time}',
          syncFailedCount: 'Cloud menolak {count} baris: {detail}',
          syncResendAll: 'Kirim ulang semua',
          syncResendConfirm: 'Kirim ulang semua data? Ini aman: menimpa baris yang sama dan tidak membuat duplikat.',
          syncResendDone: 'Semua data telah dikirim ulang.',
          syncBadgePending: '{count} belum terkirim',
          syncBadgeSignedOut: '{count} belum ke cloud',
          syncBadgeFailed: '{count} ditolak',
          syncDeleteNote: 'Menghapus item tidak menghapusnya dari cloud - baris tetap ada dengan tanda deleted.',
          localDataTitle: 'Data di ponsel',
          localDataDescription: 'Pesanan lama bisa dihapus dari ponsel untuk menghemat ruang. Di cloud tetap tersimpan selamanya dan tidak pernah dihapus.',
          localRetentionLabel: 'Simpan arsip di ponsel (hari)',
          localRetentionHint: '0 = simpan semua. Pesanan lama hanya dihapus dari ponsel, dan hanya jika sudah terkonfirmasi di cloud.',
          localRetentionSave: 'Simpan',
          localRetentionSaved: 'Pengaturan telah disimpan.',
          localRetentionPurged: 'Menghapus {count} pesanan lama dari ponsel (tetap ada di cloud).',
          storagePersistent: 'Penyimpanan permanen: aktif',
          storageNotPersistent: 'Penyimpanan permanen: nonaktif (sistem dapat menghapus data saat ruang menipis)',
          storageLabel: 'Penggunaan penyimpanan',
          dbOpenFailed: 'Tidak dapat membuka basis data lokal.',
          editMenu: 'Ubah menu',
          openAppMenu: 'Pengaturan dan edit',
          navModeTitle: 'Tampilan bilah bawah',
          navModeHint: 'Pilih tampilan tombol di bagian bawah layar.',
          navModeText: 'Teks saja',
          navModeBoth: 'Teks dan ikon',
          navModeIcon: 'Ikon saja',
          editWarehouse: 'Ubah gudang',
          warehouse: 'Gudang',
          warehouseHint: 'Tombol plus menambah satu kemasan ke pesanan. Ringkasan muncul di bawah layar.',
          ingredients: 'Bahan',
          addIngredient: 'Tambah bahan baru',
          ingredientName: 'Nama',
          ingredientUnit: 'Satuan',
          ingredientStock: 'Jumlah',
          ingredientStockHint: 'Berapa stok yang ada sekarang.',
          ingredientMinStock: 'Stok minimum',
          ingredientMinStockHint: 'Di bawah jumlah ini item menyala merah.',
          ingredientPackage: 'Kemasan',
          ingredientPackageHint: 'Isi satu kemasan ({unit}) — ini langkah saat memesan.',
          ingredientPriceFor: 'Harga per 1 {unit}',
          ingredientCalcHint: 'Belum tahu harga satuan? Pakai kalkulator di samping.',
          editIngredientTitle: 'Ubah bahan',
          ingredientModalHint: 'Isi stok, harga, dan isi kemasan.',
          ingredientAccept: 'Terima',
          addIngredientSection: 'Tambah kategori',
          ingredientSectionNewTitle: 'Kategori gudang baru',
          ingredientSectionEditTitle: 'Kategori gudang',
          ingredientSectionSave: 'Tambah kategori',
          ingredientSectionHint: 'Bahan masuk ke kategori di atasnya — geser dengan panah.',
          ingredientSectionPreview: 'Pratinjau kategori',
          ingredientSectionAdded: 'Kategori gudang ditambahkan.',
          ingredientSectionUpdated: 'Kategori gudang disimpan.',
          ingredientSectionRemoved: 'Kategori dihapus. Bahannya tetap ada.',
          confirmDeleteIngredientSection: 'Hapus kategori "{name}"? Bahan di bawahnya tetap ada.',
          fillSectionName: 'Isi nama kategori.',
          unitPcs: 'buah',
          unitGram: 'g',
          unitMl: 'ml',
          calcOpen: 'Kalkulator harga dari kemasan',
          calcTitle: 'Kalkulator harga',
          calcHint: 'Tahu isi dan harga kemasan? Hitung harga satuannya.',
          calcPrice: 'Harga kemasan',
          calcResultMissing: 'Isi kedua kolom',
          calcApply: 'Pakai harga ini',
          calcApplyHint: 'Tombol mengisi harga dan isi kemasan ke jendela bahan.',
          calcApplied: 'Harga dan isi kemasan sudah diisi.',
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
          orderAddPackage: 'Tambah kemasan',
          orderRemovePackage: 'Kurangi kemasan',
          orderBarClear: 'Kosongkan pesanan',
          orderSheetHint: 'Sesuaikan jumlah lalu terima. Jumlah berubah per kemasan.',
          orderSheetClose: 'Tutup',
          receivedShort: 'diterima {received}',
          purchaseKeepReceived: 'Tidak bisa memesan kurang dari yang sudah diterima ({quantity} {unit}).',
          purchaseListShort: 'Belanja',
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
          purchaseUpdated: 'Pesanan diperbarui.',
          purchaseEditNotice: 'Anda mengedit pesanan {date}.',
          purchaseReceived: 'Diterima',
          purchasePartial: 'Sebagian',
          receivePurchase: 'Terima',
          receiveTitle: 'Terima pesanan {date}',
          receiveHint: 'Centang yang sudah datang — item yang dicentang akan dicoret. Item yang sudah diterima penuh dikunci.',
          receiveSummary: 'Akan diterima: {count} item · {value}',
          receiveNothing: 'Belum ada yang dicentang.',
          receiveAllDone: 'Semua sudah diterima.',
          receivedOfOrdered: 'diterima {received} dari {ordered}',
          receiveSkipped: 'Tidak bisa diterima: bahan ini sudah tidak ada di gudang.',
          receivedOne: '1 item masuk ke gudang.',
          receivedMany: '{count} item masuk ke gudang.',
          copyPurchase: 'Salin',
          purchaseCopyDone: 'Daftar disalin ke clipboard.',
          purchaseCopyFailed: 'Gagal menyalin daftar.',
          copyNothingToSend: 'Tidak ada yang bisa disalin — semua sudah diterima.',
          stepWarning: '{name}: jumlah harus kelipatan kemasan ({step} {unit}).',
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
          hideItem: 'Sembunyikan dari pelanggan',
          showItem: 'Tampilkan ke pelanggan',
          itemHidden: 'Item "{name}" disembunyikan. Muncul kembali dengan "Tampilkan ke pelanggan".',
          itemShown: 'Item "{name}" terlihat kembali.',
          itemHiddenBadge: 'DISEMBUNYIKAN — hanya terlihat di sini',
          visibleInCustomer: 'Terlihat ke pelanggan',
          sectionColor: 'Warna kategori',
          sectionColorNone: 'tanpa warna',
          sectionColorClear: 'Hapus',
          recipe: 'Resep',
          recipeTitle: 'Resep: {name}',
          recipeHint: 'Isi berapa banyak bahan yang dipakai untuk satu porsi. Kolom kosong = bahan tidak dipakai di menu ini.',
          recipeStock: 'Stok',
          recipeSave: 'Simpan resep',
          recipeSaved: 'Resep telah disimpan.',
          recipeNoIngredients: 'Gudang masih kosong. Tambahkan bahan di Pengaturan → Ubah gudang.',
          recipeMissing: 'Bahan dihapus dari gudang',
          recipeRemoveMissing: 'Hapus dari resep',
          archivedWithStock: 'Pesanan diarsipkan. {count} bahan dikurangi dari stok.',
          archivedWithStockOne: 'Pesanan diarsipkan. 1 bahan dikurangi dari stok.',
          recipeCostLabel: 'Biaya resep',
          recipeCostNone: 'Tanpa resep',
          recipeCostPartial: 'Biaya tidak lengkap: {count} bahan hilang',
          recipeMarginLabel: 'Margin',
          orderCostLabel: 'Biaya pesanan',
          orderProfitLabel: 'Laba dan margin',
          orderCostMissing: 'Biaya belum dihitung',
          orderCostMissingHint: 'Pesanan diarsipkan sebelum pencatatan biaya.',
          orderStockUsed: 'Diambil dari stok',
          orderStockNone: 'Tidak ada yang diambil dari stok.',
          seedApplied: 'Gudang dan resep sudah diisi.',
          testSeedApplied: 'Lingkungan uji: menu dan gudang toko sudah dimuat.',
          menuCountWithHidden: '{visible} terlihat · {hidden} disembunyikan',
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
      let activeTab = 'customer';
      let currentSelection = {};
      let currentPurchaseSelection = {};
      let editingProductId = null;
      let editingOrderId = null;
      // Okno składnika: null = dodawanie nowego, id = edycja istniejącego.
      let ingredientModalId = null;
      // Okno zakładki magazynu i jej kolor (null = zakładka bez koloru).
      let editingIngredientSectionId = null;
      let ingredientSectionDraft = null;
      // Zamówienie zakupowe: edycja (powrót do zakładki Zamów) i przyjęcie towaru.
      let editingPurchaseOrderId = null;
      let receivingOrderId = null;
      let receiptDraft = [];

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
      const recipeModal = document.getElementById('recipeModal');
      const recipeTitle = document.getElementById('recipeTitle');
      const recipeHintText = document.getElementById('recipeHintText');
      const recipeList = document.getElementById('recipeList');
      const recipeSaveBtn = document.getElementById('recipeSaveBtn');
      const recipeCancelBtn = document.getElementById('recipeCancelBtn');
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
      const ingredientModal = document.getElementById('ingredientModal');
      const ingredientModalTitle = document.getElementById('ingredientModalTitle');
      const ingredientModalHint = document.getElementById('ingredientModalHint');
      const ingredientNameInput = document.getElementById('ingredientName');
      const ingredientUnitSelect = document.getElementById('ingredientUnit');
      const ingredientStockInput = document.getElementById('ingredientStock');
      const ingredientPriceInput = document.getElementById('ingredientPrice');
      const ingredientPriceLabel = document.getElementById('ingredientPriceLabel');
      const ingredientMinStockInput = document.getElementById('ingredientMinStock');
      const ingredientPackageInput = document.getElementById('ingredientPackage');
      const ingredientPackageHint = document.getElementById('ingredientPackageHint');
      const ingredientAcceptBtn = document.getElementById('ingredientAcceptBtn');
      const ingredientCancelBtn = document.getElementById('ingredientCancelBtn');
      const ingredientCalcBtn = document.getElementById('ingredientCalcBtn');
      const addIngredientBtn = document.getElementById('addIngredientBtn');
      const addIngredientSectionBtn = document.getElementById('addIngredientSectionBtn');
      const priceCalcModal = document.getElementById('priceCalcModal');
      const calcPackageInput = document.getElementById('calcPackage');
      const calcPackageLabel = document.getElementById('calcPackageLabel');
      const calcPriceInput = document.getElementById('calcPrice');
      const calcResultLabel = document.getElementById('calcResultLabel');
      const calcResult = document.getElementById('calcResult');
      const calcApplyBtn = document.getElementById('calcApplyBtn');
      const calcCancelBtn = document.getElementById('calcCancelBtn');
      const ingredientSectionModal = document.getElementById('ingredientSectionModal');
      const ingredientSectionTitle = document.getElementById('ingredientSectionTitle');
      const ingredientSectionNameInput = document.getElementById('ingredientSectionName');
      const ingredientSectionColorInput = document.getElementById('ingredientSectionColor');
      const ingredientSectionColorClear = document.getElementById('ingredientSectionColorClear');
      const ingredientSectionColorValue = document.getElementById('ingredientSectionColorValue');
      const ingredientSectionPreview = document.getElementById('ingredientSectionPreview');
      const ingredientSectionSaveBtn = document.getElementById('ingredientSectionAcceptBtn');
      const ingredientSectionCancelBtn = document.getElementById('ingredientSectionCancelBtn');
      const receiveModal = document.getElementById('receiveModal');
      const receiveTitle = document.getElementById('receiveTitle');
      const receiveHint = document.getElementById('receiveHint');
      const receiveList = document.getElementById('receiveList');
      const receiveSummary = document.getElementById('receiveSummary');
      const receiveAcceptBtn = document.getElementById('receiveAcceptBtn');
      const receiveCancelBtn = document.getElementById('receiveCancelBtn');
      const purchaseEditNotice = document.getElementById('purchaseEditNotice');
      const orderBar = document.getElementById('orderBar');
      const orderBarOpenBtn = document.getElementById('orderBarOpenBtn');
      const orderBarClearBtn = document.getElementById('orderBarClearBtn');
      const orderBarCount = document.getElementById('orderBarCount');
      const orderBarTotal = document.getElementById('orderBarTotal');
      const orderSheetModal = document.getElementById('orderSheetModal');
      const orderSheetList = document.getElementById('orderSheetList');
      const orderSheetTotal = document.getElementById('orderSheetTotal');
      const orderSheetAcceptBtn = document.getElementById('orderSheetAcceptBtn');
      const orderSheetCloseBtn = document.getElementById('orderSheetCloseBtn');
      const warehousePanel = document.getElementById('panel-warehouse');
      const ingredientList = document.getElementById('ingredientList');
      const ingredientEditList = document.getElementById('ingredientEditList');
      const ingredientEditCountBadge = document.getElementById('ingredientEditCountBadge');
      const ingredientCountBadge = document.getElementById('ingredientCountBadge');
      const warehouseValueBadge = document.getElementById('warehouseValueBadge');
      const purchaseOrderList = document.getElementById('purchaseOrderList');
      const syncUserNameInput = document.getElementById('syncUserName');
      const syncStatusLabel = document.getElementById('syncStatus');
      const syncLoginFields = document.getElementById('syncLoginFields');
      const syncEmailInput = document.getElementById('syncEmail');
      const syncPasswordInput = document.getElementById('syncPassword');
      const syncSignInBtn = document.getElementById('syncSignInBtn');
      const syncPushBtn = document.getElementById('syncPushBtn');
      const syncSignOutBtn = document.getElementById('syncSignOutBtn');
      const syncResendBtn = document.getElementById('syncResendBtn');
      const retentionDaysInput = document.getElementById('retentionDays');
      const saveRetentionBtn = document.getElementById('saveRetentionBtn');
      let syncErrorNotice = '';
      let cloudCounts = null;
      const headerDateLabel = document.getElementById('headerDate');
      const headerWeekdayLabel = document.getElementById('headerWeekday');
      const headerTimeLabel = document.getElementById('headerTime');

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
        updateSyncBadge();
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
       * Data, dzień tygodnia i godzina - wyśrodkowane nad tytułem zakładki.
       * Odświeża się co sekundę, więc data sama przeskoczy także po północy,
       * bez przeładowania aplikacji.
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

        if (headerTimeLabel) {
          const time = new Intl.DateTimeFormat(locale, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }).format(now);
          // Piszemy tylko, gdy tekst się zmienił - zegar tyka co sekundę.
          if (headerTimeLabel.textContent !== time) headerTimeLabel.textContent = time;
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

        // Etykiety dla czytników ekranu (data-i18n-aria) - przy trybie
        // "tylko ikona" dolny pasek nie ma widocznego tekstu.
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
          const key = el.dataset.i18nAria;
          if (translations[lang][key] || translations.pl[key]) {
            el.setAttribute('aria-label', translate(key));
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

      /** Pozycja jest widoczna, dopóki ktoś jej nie ukryje (domyślnie widoczna). */
      function isItemVisible(item) {
        return item?.visible !== false;
      }

      /**
       * Menu dla klienta: bez pozycji wyłączonych przełącznikiem.
       * Wyłączenie zakładki ukrywa TYLKO jej nagłówek - pozycje pod nią zostają
       * widoczne, chyba że wyłączysz je osobno. Wyłączenie jednej rzeczy nie
       * zmienia więc niczego innego w menu.
       */
      function getVisibleMenu() {
        return getSortedMenu().filter(isItemVisible);
      }

      /** Barwa zakładki jest liczbą 0-360; brak liczby = brak koloru (białe tło). */
      function sectionColorOf(item) {
        return typeof item?.color === 'number' && Number.isFinite(item.color) ? item.color : null;
      }

      /**
       * Delikatny, przezroczysty kolor (HSL) - nasycenie jest umyślnie niskie,
       * żeby tła pozostały czytelne, a nie "dzikie". `lightness` to jasność
       * w procentach (im wyżej, tym bledszy kolor).
       */
      function tint(hue, lightness, saturation = 85) {
        return `hsl(${Math.round(Number(hue))} ${saturation}% ${lightness}%)`;
      }

      /**
       * Menu dla klienta razem z kolorem zakładki, w której dana pozycja leży.
       * Zakładka wyłączona jest traktowana jak nieobecna - jej pozycje nie mają
       * koloru, tak samo jak pozycje przed pierwszą zakładką.
       */
      function getColoredVisibleMenu() {
        let color = null;
        return getVisibleMenu().map(item => {
          if (isMenuSection(item)) {
            color = sectionColorOf(item);
            return { item, color, section: true };
          }
          return { item, color, section: false };
        });
      }

      /** To samo dla edytora menu, gdzie widoczne są także pozycje wyłączone. */
      function getEditorMenuWithColors() {
        let color = null;
        return getSortedMenu().map(item => {
          const section = isMenuSection(item);
          if (section) color = isItemVisible(item) ? sectionColorOf(item) : null;
          return { item, color, section };
        });
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
          const tab = button.dataset.tab;
          const active = tab === activeTab;
          button.classList.toggle('bg-orange-500', active);
          button.classList.toggle('text-white', active);
          button.classList.toggle('bg-slate-100', !active);
          button.classList.toggle('text-slate-700', !active);
          if (active) button.setAttribute('aria-current', 'page');
          else button.removeAttribute('aria-current');
        });

        // Zakładki z szuflady (Ustawienia, edytuj menu, edycja magazynu) nie mają
        // przycisku na dole - wtedy podświetlamy zębatkę, żeby pasek nie milczał.
        document.querySelectorAll('.drawer-item').forEach(item => {
          item.classList.toggle('is-active', item.dataset.tab === activeTab);
        });

        const toggle = document.getElementById('drawerToggleBtn');
        if (toggle) toggle.classList.toggle('is-active', DRAWER_TABS.includes(activeTab));

        renderWarehouseNav();
        renderTabTitle();
      }
      function setActiveTab(tab, swipe) {
        activeTab = tab;
        closeDrawer();
        renderTabs();
        if (tab === 'settings') checkForUpdates();
        if (tab === 'archive') {
          // Każde wejście do archiwum zaczyna od dnia dzisiejszego.
          resetArchiveFilter();
          renderArchive();
        }
        // Pasek zamówienia pokazuje się tylko w Magazynie.
        renderOrderBar();
        if (swipe) animatePanel(swipe);
      }

      /** Krótkie wsunięcie zakładki po przesunięciu palcem. */
      function animatePanel(direction) {
        const panel = document.getElementById(`panel-${activeTab}`);
        if (!panel) return;

        const className = direction === 'from-right' ? 'swipe-from-right' : 'swipe-from-left';
        panel.classList.remove('swipe-from-right', 'swipe-from-left');
        // Wymuszenie odświeżenia stylów - bez tego druga animacja pod rząd nie startuje.
        void panel.offsetWidth;
        panel.classList.add(className);
        setTimeout(() => panel.classList.remove(className), 260);
      }

      /* ------------------------------------------- szuflada i dolny pasek */

      const NAV_MODE_KEY = envKey('kedai_pos_nav_mode');
      const NAV_MODES = ['text', 'both', 'icon'];
      const DRAWER_TABS = ['settings', 'menu', 'warehouseEdit'];
      /** Zakładki dolnego paska - po nich przechodzi też przesunięcie palcem. */
      const MAIN_TABS = ['customer', 'orders', 'archive', 'warehouse', 'purchaseList'];

      function isDrawerOpen() {
        return !document.getElementById('appDrawer').classList.contains('hidden');
      }

      function openDrawer() {
        document.getElementById('appDrawer').classList.remove('hidden');
        document.getElementById('drawerToggleBtn').setAttribute('aria-expanded', 'true');
      }

      function closeDrawer() {
        const drawer = document.getElementById('appDrawer');
        if (!drawer || drawer.classList.contains('hidden')) return;
        drawer.classList.add('hidden');
        document.getElementById('drawerToggleBtn').setAttribute('aria-expanded', 'false');
      }

      /**
       * Sposób wyświetlania dolnego paska: sam tekst, tekst z ikoną albo sama
       * ikona. Ustawienie jest lokalne dla telefonu i dotyczy wyłącznie paska -
       * szuflada zawsze pokazuje ikonę razem z podpisem.
       */
      function getNavMode() {
        try {
          const value = localStorage.getItem(NAV_MODE_KEY);
          return NAV_MODES.includes(value) ? value : 'both';
        } catch (error) {
          return 'both';
        }
      }

      function setNavMode(mode) {
        const value = NAV_MODES.includes(mode) ? mode : 'both';
        try {
          localStorage.setItem(NAV_MODE_KEY, value);
        } catch (error) {
          console.warn('Nie udało się zapisać wyglądu paska:', error);
        }
        renderNavMode();
      }

      function renderNavMode() {
        const mode = getNavMode();
        const nav = document.querySelector('.app-nav');
        if (nav) nav.dataset.navMode = mode;

        // Tylko przyciski - ten sam atrybut ma też sam pasek (dla CSS).
        document.querySelectorAll('button[data-nav-mode]').forEach(button => {
          const active = button.dataset.navMode === mode;
          button.classList.toggle('bg-orange-500', active);
          button.classList.toggle('border-orange-500', active);
          button.classList.toggle('text-white', active);
          button.classList.toggle('bg-white', !active);
          button.classList.toggle('text-slate-700', !active);
          button.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
      }

      /**
       * Przełącznik trzech widoków magazynu zastąpiło jedno wspólne okno:
       * stan i zamawianie są teraz na jednej liście, a lista zamówień ma
       * własny przycisk w dolnym pasku.
       */
      function renderWarehouseNav() {}

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
        const products = menu.filter(item => !isMenuSection(item));
        // Pokazujemy to, co klient faktycznie może zamówić: pozycje ukryte
        // pojedynczo ORAZ te należące do ukrytej zakładki.
        const orderableProducts = getVisibleMenu().filter(item => !isMenuSection(item)).length;
        const hiddenProducts = products.length - orderableProducts;
        menuCountBadge.textContent = hiddenProducts
          ? translate('menuCountWithHidden', { visible: orderableProducts, hidden: hiddenProducts })
          : getCounterLabel(orderableProducts, 'item', 'items');

        if (!menu.length) {
          menuList.innerHTML = `<div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-500">${translate('noProduct')}</div>`;
          return;
        }

        const editorMenu = getEditorMenuWithColors();
        menuList.innerHTML = editorMenu
          .map(({ item, color }, index) => {
            const section = isMenuSection(item);
            const visible = isItemVisible(item);
            const recipeCount = section ? 0 : recipeOf(item).length;
            // Wyłączona zakładka nie koloruje niczego - jest jak nieobecna.
            const activeColor = section && !visible ? null : color;
            const cardStyle = activeColor === null
              ? ''
              : (section
                ? ` style="background-color: ${tint(activeColor, 93)}; border-color: ${tint(activeColor, 78)}"`
                : ` style="background-color: ${tint(activeColor, 98)}; border-color: ${tint(activeColor, 90)}; border-left: 4px solid ${tint(activeColor, 66)}"`);
            return `
              <div class="rounded-2xl border ${section ? 'border-orange-200 bg-orange-50' : 'border-slate-200 bg-white'} p-3 shadow-sm ${visible ? '' : 'opacity-60'}"${cardStyle}>
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <p class="text-base font-bold text-slate-800">${section ? '▰ ' : ''}${escapeHtml(item.name)}</p>
                    ${section ? `<p class="text-xs font-semibold uppercase tracking-wide text-orange-600">${translate('sectionType')}</p>` : `<p class="text-sm font-semibold text-orange-600">${formatCurrency(item.price)}</p>`}
                    ${section ? '' : recipeCostLine(item)}
                    ${visible ? '' : `<p class="mt-1 text-xs font-bold text-slate-500">${translate('itemHiddenBadge')}</p>`}
                  </div>
                  <div class="flex gap-2">
                    <button data-action="move-up" data-id="${item.id}" class="touch-btn menu-move-btn rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-xs font-bold text-slate-700 ${index === 0 ? 'opacity-40' : ''}" ${index === 0 ? 'disabled' : ''}>↑</button>
                    <button data-action="move-down" data-id="${item.id}" class="touch-btn menu-move-btn rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-xs font-bold text-slate-700 ${index === editorMenu.length - 1 ? 'opacity-40' : ''}" ${index === editorMenu.length - 1 ? 'disabled' : ''}>↓</button>
                  </div>
                </div>

                <div class="mt-3 grid ${section ? 'grid-cols-2' : 'grid-cols-3'} gap-2">
                  <button data-action="edit-product" data-id="${item.id}" class="touch-btn rounded-xl bg-amber-100 px-3 py-2 text-sm font-bold text-amber-700">${section ? translate('editSection') : translate('edit')}</button>
                  ${section ? '' : `<button data-action="open-recipe" data-id="${item.id}" class="touch-btn rounded-xl bg-sky-100 px-3 py-2 text-sm font-bold text-sky-700">${recipeCount ? `${translate('recipe')} (${recipeCount})` : translate('recipe')}</button>`}
                  <button data-action="delete-product" data-id="${item.id}" class="touch-btn rounded-xl bg-rose-100 px-3 py-2 text-sm font-bold text-rose-700">${translate('delete')}</button>
                </div>

                ${section ? `
                <div class="mt-3 rounded-xl bg-white/70 px-3 py-2">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-xs font-bold text-slate-600">${translate('sectionColor')}</span>
                    <span class="text-[11px] font-semibold text-slate-500">${color === null ? translate('sectionColorNone') : `${Math.round(color)}°`}</span>
                  </div>
                  <div class="mt-2 flex items-center gap-2">
                    <input type="range" min="0" max="360" step="1" value="${color === null ? 0 : Math.round(color)}" data-action="section-color" data-id="${item.id}" class="color-range" aria-label="${translate('sectionColor')}" />
                    <button data-action="clear-section-color" data-id="${item.id}" class="touch-btn rounded-xl border border-slate-300 bg-white px-2 py-2 text-[11px] font-bold text-slate-600">${translate('sectionColorClear')}</button>
                  </div>
                </div>` : ''}

                <div class="mt-3 flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2">
                  <span class="text-xs font-bold text-slate-600">${translate('visibleInCustomer')}</span>
                  <button data-action="toggle-visible" data-id="${item.id}" role="switch" aria-checked="${visible ? 'true' : 'false'}" title="${visible ? translate('hideItem') : translate('showItem')}" aria-label="${visible ? translate('hideItem') : translate('showItem')}" class="switch ${visible ? 'is-on' : ''}">
                    <span class="switch-knob"></span>
                  </button>
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
        const menu = getColoredVisibleMenu();

        customerItems.innerHTML = menu
          .map(({ item, color }) => {
            if (isMenuSection(item)) {
              const style = color === null
                ? ''
                : ` style="background-color: ${tint(color, 91)}; border-color: ${tint(color, 62)}; color: ${tint(color, 27, 55)}"`;
              return `<div class="mt-5 rounded-xl border-b-2 px-3 py-1 text-sm font-black uppercase tracking-[0.12em] text-orange-600"${style}>${escapeHtml(item.name)}</div>`;
            }
            const qty = Number(currentSelection[item.id] || 0);
            // Tło pozycji jest bardzo jasne, a mocniejsza jest tylko lewa krawędź -
            // kolor porządkuje menu, ale nie przeszkadza w czytaniu nazw i cen.
            const style = color === null
              ? ''
              : ` style="background-color: ${tint(color, 97)}; border-color: ${tint(color, 88)}; border-left: 4px solid ${tint(color, 62)}"`;
            return `
              <div class="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"${style}>
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
          .filter(entry => !entry.section)
          .map(entry => entry.item)
          .filter(item => Number(currentSelection[item.id] || 0) > 0)
          .map(item => ({ ...item, qty: Number(currentSelection[item.id] || 0) }));

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

            // Zamówienia zarchiwizowane przed wprowadzeniem kosztów nie mają
            // migawki - nie odtwarzamy jej z aktualnych cen, bo to byłoby
            // zgadywanie. Pokazujemy wprost, że kosztu nie ma.
            const hasCost = order.costTotal !== null && order.costTotal !== undefined && Number.isFinite(Number(order.costTotal));
            const revenue = Number(order.total || 0);
            const cost = hasCost ? Number(order.costTotal) : 0;
            const profit = revenue - cost;
            const stockUsed = Array.isArray(order.costItems) ? order.costItems : [];
            const margin = hasCost && revenue > 0 ? ((revenue - cost) / revenue) * 100 : null;

            return `
              <div class="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div class="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">${formatDateTime(order.createdAt)}</p>
                    <p class="text-lg font-black text-slate-800">${formatCurrency(revenue)}</p>
                  </div>
                  <span class="rounded-full bg-slate-200 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-700">${translate('closed')}</span>
                </div>
                <p class="text-sm text-slate-600">${escapeHtml(summary)}</p>

                <div class="mt-3 rounded-xl bg-slate-50 px-3 py-2">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-xs font-bold text-slate-600">${translate('orderCostLabel')}</span>
                    <span class="text-sm font-bold ${hasCost ? 'text-slate-800' : 'text-slate-400'}">${hasCost ? formatCurrency(cost) : translate('orderCostMissing')}</span>
                  </div>
                  ${margin === null ? '' : `
                  <div class="mt-1 flex items-center justify-between gap-2">
                    <span class="text-xs font-bold text-slate-600">${translate('orderProfitLabel')}</span>
                    <span class="text-sm font-bold ${profit >= 0 ? 'text-emerald-700' : 'text-rose-700'}">${formatCurrency(profit)} · ${formatNumber(margin)}%</span>
                  </div>`}
                  ${hasCost ? '' : `<p class="mt-1 text-[11px] text-slate-400">${translate('orderCostMissingHint')}</p>`}
                </div>

                ${stockUsed.length ? `
                <div class="mt-2">
                  <p class="text-xs font-bold text-slate-600">${translate('orderStockUsed')}</p>
                  <ul class="mt-1 space-y-0.5">
                    ${stockUsed.map(entry => `<li class="text-xs text-slate-600">${formatNumber(entry.amount)} ${unitLabel(entry.unit)} · ${escapeHtml(entry.name || '')}</li>`).join('')}
                  </ul>
                </div>` : (hasCost ? `<p class="mt-2 text-xs text-slate-500">${translate('orderStockNone')}</p>` : '')}
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

      /**
       * Jednostka do wyświetlenia. W danych zostaje krótki zapis ("szt", "g",
       * "ml"), bo to on jest kluczem w recepturach - tłumaczymy tylko to, co
       * widać na ekranie.
       */
      function unitLabel(unit) {
        if (unit === 'g') return translate('unitGram');
        if (unit === 'ml') return translate('unitMl');
        if (unit === 'szt') return translate('unitPcs');
        return String(unit || '');
      }

      /** Zakładka magazynu to wiersz z type = 'section' (tak samo jak w menu). */
      function isIngredientSection(item) {
        return item?.type === 'section';
      }

      /**
       * Kolejność magazynu. Dopóki nie ma zakładek ani ustawionej kolejności,
       * lista jest alfabetyczna - stare dane wyglądają więc tak jak dotąd.
       */
      function getSortedIngredients() {
        const list = [...(state.ingredients || [])];
        const ordered = list.some(item => Number(item.sort_order || 0) > 0) || list.some(isIngredientSection);
        if (!ordered) return list.sort((a, b) => String(a.name).localeCompare(String(b.name)));
        return list.sort((a, b) => (Number(a.sort_order || 0) - Number(b.sort_order || 0))
          || String(a.name).localeCompare(String(b.name)));
      }

      /** Składniki razem z kolorem zakładki, w której leżą (jak w menu). */
      function getIngredientsWithColors() {
        let color = null;
        return getSortedIngredients().map(item => {
          const section = isIngredientSection(item);
          if (section) color = sectionColorOf(item);
          return { item, color, section };
        });
      }

      /** Nowa pozycja ląduje na końcu listy - tak samo jak w menu. */
      function nextIngredientOrder() {
        const orders = (state.ingredients || []).map(item => Number(item.sort_order || 0));
        return orders.length ? Math.max(...orders, 0) + 1 : 0;
      }

      /** Przepisuje kolejność całej listy na 0..n-1 (po przesunięciu pozycji). */
      function writeIngredientOrder(list) {
        state.ingredients = list.map((item, index) => ({ ...item, sort_order: index }));
      }

      /** Nagłówek zakładki magazynu - ten sam wygląd co zakładki w menu. */
      function ingredientSectionHeader(section, color) {
        const style = color === null
          ? ''
          : ` style="background-color: ${tint(color, 91)}; border-color: ${tint(color, 62)}; color: ${tint(color, 27, 55)}"`;
        return `<div class="mt-2 rounded-xl border-b-2 px-3 py-1 text-sm font-black uppercase tracking-[0.12em] text-orange-600"${style}>${escapeHtml(section.name)}</div>`;
      }

      /** Tło karty zakładki w edycji magazynu (paleta jak w menu). */
      function ingredientSectionCardStyle(color) {
        return color === null ? '' : ` style="background-color: ${tint(color, 93)}; border-color: ${tint(color, 78)}"`;
      }

      function renderWarehouse() {
        const ingredients = state.ingredients || [];
        const products = ingredients.filter(item => !isIngredientSection(item));
        const totalValue = products.reduce((sum, item) => sum + Number(item.stock || 0) * Number(item.unit_price || 0), 0);
        warehouseValueBadge.textContent = formatCurrency(totalValue);
        ingredientCountBadge.textContent = getCounterLabel(products.length, 'item', 'items');

        if (!ingredients.length) {
          ingredientList.innerHTML = `<div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-500">${translate('noIngredients')}</div>`;
          return;
        }

        ingredientList.innerHTML = getIngredientsWithColors()
          .map(({ item, color, section }) => {
            if (section) return ingredientSectionHeader(item, color);

            // Ilość w bieżącym zamówieniu oraz to, czego nie wolno zejść niżej
            // przy poprawianiu istniejącego zamówienia (już przyjęte sztuki).
            const quantity = Number(currentPurchaseSelection[item.id] || 0);
            const minimum = receivedInEditedOrder(item.id);

            const belowMinimum = Number(item.stock || 0) < Number(item.min_stock || 0);
            const stockValue = Number(item.stock || 0) * Number(item.unit_price || 0);
            const unit = unitLabel(item.unit);
            // Pozycja poniżej stanu min. dostaje wykrzyknik, ale zachowuje kolor
            // zakładki - ostrzeżenie niesie znaczek, nie całe tło karty.
            const lowFlag = belowMinimum
              ? ` <span class="low-flag" role="img" title="${translate('belowMin')}" aria-label="${translate('belowMin')}">!</span>`
              : '';
            const cardStyle = color === null
              ? ''
              : ` style="background-color: ${tint(color, 98)}; border-color: ${tint(color, 90)}; border-left: 4px solid ${tint(color, 66)}"`;

            return `
              <div class="rounded-2xl border ${quantity > 0 ? 'border-orange-300 ring-1 ring-orange-200' : 'border-slate-200'} bg-white p-3 shadow-sm"${cardStyle}>
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-base font-bold text-slate-800">${escapeHtml(item.name)}${lowFlag}</p>
                    <p class="text-sm font-semibold text-slate-700">${formatNumber(item.stock)} ${unit}</p>
                  </div>
                  <div class="flex-none text-right">
                    <p class="text-sm font-bold text-orange-600">${formatCurrency(item.unit_price)} / ${unit}</p>
                    <p class="text-xs text-slate-500">${formatCurrency(stockValue)}</p>
                  </div>
                </div>
                ${belowMinimum ? `<p class="mt-2 text-xs font-bold uppercase tracking-wide text-rose-600">${translate('belowMin')} · ${translate('ingredientMinStock')}: ${formatNumber(item.min_stock)} ${unit}</p>` : ''}
                ${ingredientOrderRow(item, quantity, unit, minimum)}
              </div>
            `;
          })
          .join('');
      }

      /**
       * Wiersz zamawiania w karcie składnika. Zwijnięty pokazuje sam przycisk
       * „+”, rozwinięty - ilość i przyciski minus/plus. Jedno miejsce w karcie
       * obsługuje całe zamawianie, więc nie trzeba przełączać widoków.
       */
      function ingredientOrderRow(item, quantity, unit, minimum) {
        const selected = quantity > 0;
        const lineTotal = quantity * Number(item.unit_price || 0);
        const leftText = minimum > 0
          ? translate('receivedShort', { received: `${formatNumber(minimum)} ${unit}` })
          : (selected ? formatCurrency(lineTotal) : translate('orderIngredients'));

        return `
          <div class="mt-2 flex items-center justify-between gap-2 border-t border-slate-100 pt-2">
            <span class="text-xs font-bold ${minimum > 0 ? 'text-amber-600' : (selected ? 'text-orange-600' : 'text-slate-400')}">${leftText}</span>
            <div class="flex flex-none items-center gap-2">
              ${selected ? `<button data-action="purchase-decrease" data-id="${item.id}" class="qty-btn border border-slate-200 bg-slate-100 text-slate-700" aria-label="${translate('orderRemovePackage')}">−</button>` : ''}
              ${selected ? `<span class="min-w-[3rem] text-center text-sm font-black text-slate-800">${formatNumber(quantity)} <span class="text-[11px] font-semibold text-slate-500">${unit}</span></span>` : ''}
              <button data-action="purchase-increase" data-id="${item.id}" class="qty-btn border border-orange-200 bg-orange-50 text-orange-600" aria-label="${translate('orderAddPackage')}">+</button>
            </div>
          </div>
        `;
      }

      function renderWarehouseEdit() {
        const ingredients = state.ingredients || [];
        const products = ingredients.filter(item => !isIngredientSection(item));
        ingredientEditCountBadge.textContent = getCounterLabel(products.length, 'item', 'items');

        if (!ingredients.length) {
          ingredientEditList.innerHTML = `<div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-500">${translate('noIngredients')}</div>`;
          return;
        }

        const rows = getIngredientsWithColors();
        ingredientEditList.innerHTML = rows
          .map(({ item, color, section }, index) => {
            const first = index === 0;
            const last = index === rows.length - 1;
            const moveButtons = `
                  <div class="flex gap-2">
                    <button data-action="move-ingredient-up" data-id="${item.id}" class="touch-btn menu-move-btn rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-xs font-bold text-slate-700 ${first ? 'opacity-40' : ''}" ${first ? 'disabled' : ''}>↑</button>
                    <button data-action="move-ingredient-down" data-id="${item.id}" class="touch-btn menu-move-btn rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-xs font-bold text-slate-700 ${last ? 'opacity-40' : ''}" ${last ? 'disabled' : ''}>↓</button>
                  </div>`;

            if (section) {
              return `
              <div class="rounded-2xl border border-orange-200 bg-orange-50 p-3 shadow-sm"${ingredientSectionCardStyle(color)}>
                <div class="flex items-center justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-base font-bold text-slate-800">▰ ${escapeHtml(item.name)}</p>
                    <p class="text-xs font-semibold uppercase tracking-wide text-orange-600">${translate('sectionType')}</p>
                  </div>
                  ${moveButtons}
                </div>

                <div class="mt-3 grid grid-cols-2 gap-2">
                  <button data-action="edit-ingredient-section" data-id="${item.id}" class="touch-btn rounded-xl bg-amber-100 px-3 py-2 text-sm font-bold text-amber-700">${translate('editSection')}</button>
                  <button data-action="delete-ingredient-section" data-id="${item.id}" class="touch-btn rounded-xl bg-rose-100 px-3 py-2 text-sm font-bold text-rose-700">${translate('delete')}</button>
                </div>

                <div class="mt-3 rounded-xl bg-white/70 px-3 py-2">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-xs font-bold text-slate-600">${translate('sectionColor')}</span>
                    <span class="text-[11px] font-semibold text-slate-500">${color === null ? translate('sectionColorNone') : `${Math.round(color)}°`}</span>
                  </div>
                  <div class="mt-2 flex items-center gap-2">
                    <input type="range" min="0" max="360" step="1" value="${color === null ? 0 : Math.round(color)}" data-action="ingredient-section-color" data-id="${item.id}" class="color-range" aria-label="${translate('sectionColor')}" />
                    <button data-action="clear-ingredient-section-color" data-id="${item.id}" class="touch-btn rounded-xl border border-slate-300 bg-white px-2 py-2 text-[11px] font-bold text-slate-600">${translate('sectionColorClear')}</button>
                  </div>
                </div>
              </div>
            `;
            }

            const belowMinimum = Number(item.stock || 0) < Number(item.min_stock || 0);
            const stockValue = Number(item.stock || 0) * Number(item.unit_price || 0);
            const unit = unitLabel(item.unit);
            const packageSize = Number(item.unit_step || 0);
            // Wykrzyknik zamiast czerwonej poświaty - karta zostaje w kolorze
            // zakładki, a niski stan widać po znaczku i zdaniu na dole.
            const lowFlag = belowMinimum
              ? ` <span class="low-flag" role="img" title="${translate('belowMin')}" aria-label="${translate('belowMin')}">!</span>`
              : '';
            const cardStyle = color === null
              ? ''
              : ` style="background-color: ${tint(color, 98)}; border-color: ${tint(color, 90)}; border-left: 4px solid ${tint(color, 66)}"`;

            return `
              <div class="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"${cardStyle}>
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <p class="text-base font-bold text-slate-800">${escapeHtml(item.name)}${lowFlag}</p>
                    <p class="text-sm font-semibold text-orange-600">${formatCurrency(item.unit_price)} / ${unit}</p>
                  </div>
                  ${moveButtons}
                </div>

                <div class="mt-2 grid grid-cols-2 gap-1 text-xs text-slate-600">
                  <span>${translate('ingredientStock')}: <b>${formatNumber(item.stock)} ${unit}</b></span>
                  <span>${translate('stockValue')}: <b>${formatCurrency(stockValue)}</b></span>
                  <span>${translate('ingredientMinStock')}: <b>${formatNumber(item.min_stock)} ${unit}</b></span>
                  <span>${translate('ingredientPackage')}: <b>${packageSize > 0 ? `${formatNumber(packageSize)} ${unit}` : '—'}</b></span>
                </div>

                ${belowMinimum ? `<p class="mt-2 text-xs font-bold uppercase tracking-wide text-rose-600">${translate('belowMin')}</p>` : ''}

                <div class="mt-3 grid grid-cols-2 gap-2">
                  <button data-action="edit-ingredient" data-id="${item.id}" class="touch-btn rounded-xl bg-amber-100 px-3 py-2 text-sm font-bold text-amber-700">${translate('edit')}</button>
                  <button data-action="delete-ingredient" data-id="${item.id}" class="touch-btn rounded-xl bg-rose-100 px-3 py-2 text-sm font-bold text-rose-700">${translate('delete')}</button>
                </div>
              </div>
            `;
          })
          .join('');
      }

      /* ------------------------------------------------- zamówienie (koszyk) */

      /** Pozycje wybrane do zamówienia, w kolejności magazynu. */
      function currentPurchaseDetails() {
        return (state.ingredients || [])
          .filter(ingredient => !isIngredientSection(ingredient) && Number(currentPurchaseSelection[ingredient.id] || 0) > 0)
          .map(ingredient => {
            const quantity = Number(currentPurchaseSelection[ingredient.id] || 0);
            return {
              ingredient,
              quantity,
              lineTotal: quantity * Number(ingredient.unit_price || 0),
              minimum: receivedInEditedOrder(ingredient.id)
            };
          });
      }

      /**
       * Pasek zamówienia: pokazuje się nad dolnym paskiem tylko wtedy, gdy coś
       * jest wybrane w Magazynie. Dotknięcie otwiera arkusz z całą listą,
       * krzyżyk czyści wybór. Dzięki temu podsumowanie nie zabiera miejsca,
       * dopóki nie jest potrzebne.
       */
      function renderOrderBar() {
        if (!orderBar) return;

        const details = currentPurchaseDetails();
        const total = details.reduce((sum, item) => sum + item.lineTotal, 0);
        const visible = activeTab === 'warehouse' && details.length > 0;

        orderBar.classList.toggle('hidden', !visible);
        if (warehousePanel) warehousePanel.classList.toggle('order-bar-open', visible);
        if (!visible) {
          closeOrderSheet();
          return;
        }

        orderBarCount.textContent = getCounterLabel(details.length, 'item', 'items');
        orderBarTotal.textContent = formatCurrency(total);
      }

      /** Arkusz zamówienia: pełna lista z możliwością poprawiania ilości. */
      function renderOrderSheet() {
        if (!orderSheetModal || orderSheetModal.classList.contains('hidden')) return;

        const details = currentPurchaseDetails();
        if (!details.length) {
          closeOrderSheet();
          return;
        }

        orderSheetList.innerHTML = details
          .map(({ ingredient, quantity, lineTotal, minimum }) => {
            const unit = unitLabel(ingredient.unit);
            const received = minimum > 0
              ? `<p class="text-[11px] font-semibold text-amber-600">${translate('receivedShort', { received: `${formatNumber(minimum)} ${unit}` })}</p>`
              : '';

            return `
              <div class="rounded-xl border border-slate-200 bg-white p-3">
                <div class="flex items-center justify-between gap-3">
                  <p class="min-w-0 truncate text-sm font-bold text-slate-800">${escapeHtml(ingredient.name)}</p>
                  <div class="flex flex-none items-center gap-2">
                    <button data-action="purchase-decrease" data-id="${ingredient.id}" class="qty-btn border border-slate-200 bg-slate-100 text-slate-700" aria-label="${translate('orderRemovePackage')}">−</button>
                    <span class="min-w-[3rem] text-center text-sm font-black text-slate-800">${formatNumber(quantity)} <span class="text-[11px] font-semibold text-slate-500">${unit}</span></span>
                    <button data-action="purchase-increase" data-id="${ingredient.id}" class="qty-btn border border-orange-200 bg-orange-50 text-orange-600" aria-label="${translate('orderAddPackage')}">+</button>
                  </div>
                </div>
                <p class="mt-1 text-[11px] text-slate-500">${formatCurrency(ingredient.unit_price)} / ${unit} · <span class="font-bold text-slate-700">${formatCurrency(lineTotal)}</span></p>
                ${received}
              </div>
            `;
          })
          .join('');

        orderSheetTotal.textContent = formatCurrency(details.reduce((sum, item) => sum + item.lineTotal, 0));
        orderSheetAcceptBtn.textContent = translate(editingPurchaseOrderId ? 'saveChanges' : 'acceptOrder');
      }

      function openOrderSheet() {
        if (!currentPurchaseDetails().length) return;
        orderSheetModal.classList.remove('hidden');
        renderOrderSheet();
      }

      function closeOrderSheet() {
        if (orderSheetModal) orderSheetModal.classList.add('hidden');
      }

      /** Odświeża wszystko, co pokazuje bieżący wybór do zamówienia. */
      function renderOrderUi() {
        renderWarehouse();
        renderOrderBar();
        renderOrderSheet();
        // Pasek przypomnienia znika razem z edycją zamówienia.
        renderPurchaseEditNotice();
      }

      /** Pasek nad listą: przypomina, że poprawiamy już złożone zamówienie. */
      function renderPurchaseEditNotice() {
        if (!purchaseEditNotice) return;
        const order = editingPurchaseOrderId
          ? (state.purchaseOrders || []).find(item => String(item.id) === String(editingPurchaseOrderId))
          : null;

        purchaseEditNotice.classList.toggle('hidden', !order);
        if (order) {
          purchaseEditNotice.textContent = translate('purchaseEditNotice', { date: formatDateTime(order.createdAt) });
        }
      }

      /**
       * Lista zamówienia jak lista zakupowa: jedna pozycja pod drugą, przyjęte
       * przekreślone. Do tego cztery działania: przyjęcie, edycja, kopiowanie
       * i usunięcie.
       */
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
            const items = Array.isArray(order.items) ? order.items : [];
            // "Częściowo" już wtedy, gdy cokolwiek dotarło - także gdy jedna
            // pozycja przyszła w kawałku (np. 100 z 250 g).
            const receivedCount = items.filter(item => receivedQuantity(item) > 0).length;
            const allReceived = items.length > 0 && items.every(item => remainingQuantity(item) <= 0);
            const badge = allReceived
              ? ['bg-emerald-100', 'text-emerald-700', translate('purchaseReceived')]
              : (receivedCount ? ['bg-amber-100', 'text-amber-700', translate('purchasePartial')] : ['bg-sky-100', 'text-sky-700', translate('ordered')]);

            const lines = items.length
              ? items.map(item => {
                const received = receivedQuantity(item);
                const done = remainingQuantity(item) <= 0 && received > 0;
                const lineTotal = Number(item.line_total ?? Number(item.quantity || 0) * Number(item.unit_price || 0));
                const note = !done && received > 0
                  ? `<span class="mt-0.5 block text-[11px] font-semibold text-amber-600">${translate('receivedOfOrdered', { received: formatNumber(received), ordered: formatNumber(item.quantity) })}</span>`
                  : '';
                return `
                  <li class="flex items-start justify-between gap-2 py-1.5">
                    <span class="min-w-0 text-sm ${done ? 'text-slate-400 line-through' : 'text-slate-700'}">${formatNumber(item.quantity)} ${unitLabel(item.unit)} ${escapeHtml(item.name)}${note}</span>
                    <span class="flex-none text-xs font-semibold ${done ? 'text-slate-300 line-through' : 'text-slate-500'}">${formatCurrency(lineTotal)}</span>
                  </li>`;
              }).join('')
              : `<li class="py-1.5 text-sm text-slate-500">${translate('noPurchaseItems')}</li>`;

            return `
              <div class="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div class="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">${formatDateTime(order.createdAt)}</p>
                    <p class="text-lg font-black text-slate-800">${formatCurrency(order.total_price)}</p>
                  </div>
                  <span class="rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${badge[0]} ${badge[1]}">${badge[2]}</span>
                </div>

                <ul class="divide-y divide-slate-100">${lines}</ul>

                <div class="mt-3 grid grid-cols-2 gap-2">
                  <button data-action="receive-purchase" data-id="${order.id}" class="touch-btn rounded-xl bg-emerald-100 px-3 py-2 text-sm font-bold text-emerald-700">${translate('receivePurchase')}</button>
                  <button data-action="edit-purchase" data-id="${order.id}" class="touch-btn rounded-xl bg-amber-100 px-3 py-2 text-sm font-bold text-amber-700">${translate('edit')}</button>
                  <button data-action="copy-purchase" data-id="${order.id}" class="touch-btn rounded-xl bg-sky-100 px-3 py-2 text-sm font-bold text-sky-700">${translate('copyPurchase')}</button>
                  <button data-action="delete-purchase" data-id="${order.id}" class="touch-btn rounded-xl bg-rose-100 px-3 py-2 text-sm font-bold text-rose-700">${translate('delete')}</button>
                </div>
              </div>
            `;
          })
          .join('');
      }

      function renderAll() {
        applyTranslations();
        renderNavMode();
        updateSyncBadge();
        renderMenu();
        renderCustomer();
        renderActiveOrders();
        renderArchive();
        renderWarehouse();
        renderWarehouseEdit();
        renderOrderBar();
        renderOrderSheet();
        renderPurchaseOrders();
        renderPurchaseEditNotice();
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

      /* ------------------------------------------------------------ receptury */

      // Receptura to lista { id składnika, qty } na pozycji menu. Pusta = brak.
      let recipeEditingId = null;
      let recipeDraft = [];

      function recipeOf(item) {
        return Array.isArray(item?.recipe) ? item.recipe : [];
      }

      /**
       * Koszt jednej porcji wyliczony z receptury: ilość składnika × jego cena
       * jednostkowa. Liczone jest z bieżącego magazynu, więc w edycji menu to
       * wartość "na dziś", a nie historia.
       */
      function recipeCost(product) {
        let cost = 0;
        let missing = 0;
        const recipe = recipeOf(product);

        recipe.forEach(entry => {
          const ingredient = (state.ingredients || []).find(item => item.id === entry.id);
          if (!ingredient) {
            missing += 1;
            return;
          }
          cost += Number(entry.qty || 0) * Number(ingredient.unit_price || 0);
        });

        return { cost: Number(cost.toFixed(2)), missing, count: recipe.length };
      }

      /**
       * Wiersz z kosztem receptury obok ceny sprzedażowej. Pusta receptura
       * pokazuje wprost "brak receptury" - zero byłoby mylące.
       */
      function recipeCostLine(item) {
        const price = Number(item.price || 0);
        const { cost, missing, count } = recipeCost(item);

        if (!count) {
          return `<p class="text-xs font-semibold text-slate-400">${translate('recipeCostLabel')}: ${translate('recipeCostNone')}</p>`;
        }

        const parts = [`${translate('recipeCostLabel')}: ${formatCurrency(cost)}`];
        if (price > 0 && cost > 0) {
          parts.push(`${translate('recipeMarginLabel')}: ${formatNumber(((price - cost) / price) * 100)}%`);
        }
        if (missing) parts.push(translate('recipeCostPartial', { count: missing }));

        return `<p class="text-xs font-semibold ${missing ? 'text-amber-600' : 'text-slate-500'}">${parts.join(' · ')}</p>`;
      }

      function draftQuantity(ingredientId) {
        const entry = recipeDraft.find(row => row.id === ingredientId);
        return entry ? Number(entry.qty || 0) : 0;
      }

      /** Zapisuje to, co użytkownik ma w polach okna, do szkicu receptury. */
      function captureRecipeInputs() {
        const missingIds = new Set(recipeDraft.filter(entry => !(state.ingredients || []).some(ingredient => ingredient.id === entry.id)).map(entry => entry.id));
        const draft = recipeDraft.filter(entry => missingIds.has(entry.id));

        recipeList.querySelectorAll('[data-recipe-ingredient]').forEach(input => {
          const qty = Number(String(input.value).replace(',', '.'));
          if (Number.isFinite(qty) && qty > 0) draft.push({ id: input.dataset.recipeIngredient, qty });
        });

        recipeDraft = draft;
      }

      function openRecipeEditor(productId) {
        const product = state.menu.find(item => item.id === productId);
        if (!product || isMenuSection(product)) return;

        recipeEditingId = productId;
        recipeDraft = recipeOf(product).map(entry => ({ id: entry.id, qty: Number(entry.qty || 0) }));
        recipeTitle.textContent = translate('recipeTitle', { name: product.name });
        recipeHintText.textContent = translate('recipeHint');
        recipeSaveBtn.textContent = translate('recipeSave');
        recipeCancelBtn.textContent = translate('cancel');
        renderRecipeList();
        recipeModal.classList.remove('hidden');
      }

      function closeRecipeEditor() {
        recipeEditingId = null;
        recipeDraft = [];
        recipeModal.classList.add('hidden');
      }

      function renderRecipeList() {
        // Zakładki magazynu nie są składnikami - nie mają czego zużywać.
        const ingredients = [...(state.ingredients || [])]
          .filter(ingredient => !isIngredientSection(ingredient))
          .sort((first, second) => String(first.name).localeCompare(String(second.name), 'pl'));
        const knownIds = new Set(ingredients.map(ingredient => ingredient.id));
        const missing = recipeDraft.filter(entry => !knownIds.has(entry.id));

        if (!ingredients.length && !missing.length) {
          recipeList.innerHTML = `<div class="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-center text-sm text-slate-500">${translate('recipeNoIngredients')}</div>`;
          return;
        }

        recipeList.innerHTML = [
          ...ingredients.map(ingredient => {
            const qty = draftQuantity(ingredient.id);
            return `
              <div class="rounded-xl border border-slate-200 bg-white p-2">
                <div class="flex items-center justify-between gap-2">
                  <div class="min-w-0">
                    <p class="truncate text-sm font-bold text-slate-800">${escapeHtml(ingredient.name)}</p>
                    <p class="text-[11px] text-slate-500">${translate('recipeStock')}: ${formatNumber(ingredient.stock)} ${unitLabel(ingredient.unit)}</p>
                  </div>
                  <div class="flex flex-none items-center gap-1">
                    <input type="number" inputmode="decimal" min="0" step="any" data-recipe-ingredient="${ingredient.id}" value="${qty || ''}" placeholder="0" class="w-24 rounded-lg border border-slate-300 px-2 py-2 text-right text-sm text-slate-800" />
                    <span class="w-10 text-xs font-semibold text-slate-500">${unitLabel(ingredient.unit)}</span>
                  </div>
                </div>
              </div>
            `;
          }),
          ...missing.map(entry => `
              <div class="rounded-xl border border-amber-200 bg-amber-50 p-2">
                <div class="flex items-center justify-between gap-2">
                  <div class="min-w-0">
                    <p class="truncate text-sm font-bold text-amber-800">${escapeHtml(entry.id)}</p>
                    <p class="text-[11px] font-semibold text-amber-700">${translate('recipeMissing')}</p>
                  </div>
                  <button type="button" data-action="remove-recipe-ingredient" data-id="${escapeHtml(entry.id)}" class="touch-btn flex-none rounded-lg border border-amber-300 bg-white px-2 py-2 text-[11px] font-bold text-amber-700">${translate('recipeRemoveMissing')}</button>
                </div>
              </div>`)
        ].join('');
      }

      function removeRecipeEntry(ingredientId) {
        captureRecipeInputs();
        recipeDraft = recipeDraft.filter(entry => entry.id !== ingredientId);
        renderRecipeList();
      }

      function saveRecipeFromDialog() {
        const product = state.menu.find(item => item.id === recipeEditingId);
        if (!product) {
          closeRecipeEditor();
          return;
        }

        captureRecipeInputs();
        const recipe = recipeDraft
          .filter(entry => Number(entry.qty) > 0)
          .map(entry => ({ id: entry.id, qty: Number(entry.qty) }));

        if (recipe.length) product.recipe = recipe;
        else delete product.recipe;

        closeRecipeEditor();
        saveState();
        renderAll();
        showToast(translate('recipeSaved'), 'success');
      }

      /**
       * Odejmuje z magazynu składniki zużyte na zamówienie, na podstawie receptur
       * pozycji. Składniki usunięte z magazynu są pomijane (receptura je pamięta,
       * ale nie ma czego odejmować). Zwraca listę odjętych pozycji do komunikatu.
       */
      function deductIngredientsForOrder(order) {
        const usage = new Map();

        (order.items || []).forEach(item => {
          const product = state.menu.find(entry => entry.id === item.productId);
          const portions = Number(item.qty || 0);
          if (!product || portions <= 0) return;

          recipeOf(product).forEach(entry => {
            const amount = Number(entry.qty || 0) * portions;
            if (amount <= 0) return;
            usage.set(entry.id, (usage.get(entry.id) || 0) + amount);
          });
        });

        // Do zużycia dokładamy cenę z TEJ chwili. To migawka kosztu - gdybyśmy
        // liczyli ją później z aktualnego cennika, zmiana ceny składnika
        // przepisałaby koszt zamówień z przeszłości.
        const applied = [];
        usage.forEach((amount, ingredientId) => {
          const ingredient = state.ingredients.find(entry => entry.id === ingredientId);
          if (!ingredient) return;
          const quantity = Number(amount.toFixed(3));
          const unitPrice = Number(ingredient.unit_price || 0);
          ingredient.stock = Number((Number(ingredient.stock || 0) - quantity).toFixed(3));
          applied.push({
            id: ingredient.id,
            name: ingredient.name,
            unit: ingredient.unit,
            amount: quantity,
            unit_price: unitPrice,
            cost: Number((quantity * unitPrice).toFixed(2))
          });
        });

        return applied;
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
            order: state.menu.length,
            visible: true
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
          window.KedaiSync?.softDelete('menu', [item]);
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

      /**
       * Wyłącza lub przywraca pozycję menu (także zakładkę). Nic nie jest
       * kasowane - pozycja zostaje w edytorze i w kopii zapasowej, znika tylko
       * z widoku obsługi klienta. Wyłączenie zakładki ukrywa wyłącznie jej
       * nagłówek; pozycje pod nią zmieniają się tylko vtedy, gdy wyłączysz je
       * osobno.
       */
      function toggleItemVisibility(productId) {
        const item = state.menu.find(product => product.id === productId);
        if (!item) return;

        const wasVisible = isItemVisible(item);
        item.visible = !wasVisible;
        // Pozycja wyłączona w trakcie kompletowania zamówienia nie może po cichu
        // trafić do zamówienia.
        if (wasVisible) delete currentSelection[item.id];

        saveState();
        renderAll();
        showToast(translate(item.visible ? 'itemShown' : 'itemHidden', { name: item.name }), 'success');
      }

      /**
       * Ustawia kolor zakładki. `live` = przeciąganie paska: kolor widać od razu
       * w obsłudze klienta, ale zapis (i wysyłka) następuje dopiero po puszczeniu
       * paska, żeby przeciąganie nie zasypało chmury zapytaniami.
       */
      function setSectionColor(sectionId, hue, live) {
        const section = state.menu.find(item => item.id === sectionId && isMenuSection(item));
        if (!section) return;

        if (hue === null) delete section.color;
        else section.color = Math.max(0, Math.min(360, Math.round(Number(hue))));

        if (live) {
          renderCustomer();
          return;
        }

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
        const selected = getVisibleMenu().filter(item => Number(currentSelection[item.id] || 0) > 0);
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

        // Dopiero w tym momencie schodzi towar z magazynu - na podstawie receptur
        // pozycji (patrz deductIngredientsForOrder).
        const deducted = deductIngredientsForOrder(archivedOrder);

        // Migawka kosztu: ile czego zeszło i po jakiej cenie z tej chwili.
        // Dzięki temu późniejsza zmiana receptury albo ceny składnika nie
        // przepisze kosztu tego zamówienia.
        archivedOrder.costItems = deducted;
        archivedOrder.costTotal = Number(deducted.reduce((sum, entry) => sum + Number(entry.cost || 0), 0).toFixed(2));
        archivedOrder.costAt = new Date().toISOString();

        await window.KedaiDatabase.updateOrder(archivedOrder, 'archived');
        saveState();
        renderAll();
        showToast(deducted.length
          ? translate(deducted.length === 1 ? 'archivedWithStockOne' : 'archivedWithStock', { count: deducted.length })
          : translate('archived'), 'success');
      }

      async function deleteOrder(orderId) {
        const order = state.activeOrders.find(item => sameOrderId(item.id, orderId));
        if (!order) return;

        showConfirmDialog(translate('confirmDeleteOrder', { date: formatDateTime(order.createdAt) }), () => {
          // W chmurze wiersz nie znika - dostaje tylko znacznik `deleted`,
          // żeby historia sprzedaży została w raportach.
          window.KedaiSync?.softDelete('clientOrders', [order]);
          state.activeOrders = state.activeOrders.filter(item => !sameOrderId(item.id, orderId));
          window.KedaiDatabase.deleteOrder(order.id);
          saveState();
          renderAll();
          showToast(translate('orderDeleted'), 'success');
        });
      }

      /* --------------------------------------------------- okno składnika */

      /** Liczba z pola tekstowego; puste pole liczy się jako 0. */
      function numberFromInput(input) {
        const value = Number(String(input.value ?? '').replace(',', '.'));
        return Number.isFinite(value) ? value : NaN;
      }

      function setInputValue(input, value) {
        input.value = value === null || value === undefined || value === '' ? '' : String(value);
      }

      /**
       * Podpisy zależą od wybranej jednostki ("Cena za 1 g"), więc odświeżamy
       * je przy otwarciu okna i po każdej zmianie jednostki.
       */
      function updateIngredientUnitHints() {
        const unit = unitLabel(ingredientUnitSelect.value);
        ingredientPriceLabel.textContent = translate('ingredientPriceFor', { unit });
        ingredientPackageHint.textContent = translate('ingredientPackageHint', { unit });
        renderCalculatorResult();
      }

      function openIngredientModal(ingredientId = null) {
        const ingredient = ingredientId ? (state.ingredients || []).find(item => item.id === ingredientId) : null;
        ingredientModalId = ingredient ? ingredient.id : null;

        ingredientForm.reset();
        ingredientUnitSelect.value = 'szt';

        if (ingredient) {
          ingredientNameInput.value = ingredient.name;
          if (ingredient.unit) ingredientUnitSelect.value = ingredient.unit;
          setInputValue(ingredientStockInput, ingredient.stock);
          setInputValue(ingredientPriceInput, ingredient.unit_price);
          setInputValue(ingredientMinStockInput, ingredient.min_stock);
          setInputValue(ingredientPackageInput, Number(ingredient.unit_step || 0) > 0 ? ingredient.unit_step : '');
        }

        ingredientModalTitle.textContent = translate(ingredient ? 'editIngredientTitle' : 'addIngredient');
        ingredientModalHint.textContent = translate('ingredientModalHint');
        ingredientAcceptBtn.textContent = translate(ingredient ? 'saveChanges' : 'ingredientAccept');
        updateIngredientUnitHints();

        closePriceCalculator();
        ingredientModal.classList.remove('hidden');
        ingredientNameInput.focus();
      }

      function closeIngredientModal() {
        ingredientModalId = null;
        ingredientForm.reset();
        ingredientModal.classList.add('hidden');
      }

      function handleIngredientFormSubmit(event) {
        event.preventDefault();
        const name = ingredientNameInput.value.trim();
        const unit = ingredientUnitSelect.value;
        const stock = numberFromInput(ingredientStockInput);
        const unitPrice = numberFromInput(ingredientPriceInput);
        const minStock = numberFromInput(ingredientMinStockInput);
        const unitStep = numberFromInput(ingredientPackageInput);

        const numbersValid = [stock, unitPrice, minStock, unitStep]
          .every(value => Number.isFinite(value) && value >= 0);

        if (!name || !numbersValid) {
          showToast(translate('fillIngredient'), 'warning');
          return;
        }

        // "Stan zalecany" i "minimalne zamówienie" już nie istnieją - przy
        // zamawianiu krokiem jest wielkość opakowania (unit_step).
        const payload = {
          name,
          unit,
          stock,
          unit_price: unitPrice,
          min_stock: minStock,
          unit_step: unitStep
        };

        if (ingredientModalId) {
          const ingredient = state.ingredients.find(item => item.id === ingredientModalId);
          if (ingredient) Object.assign(ingredient, payload);
          showToast(translate('ingredientUpdated'), 'success');
        } else {
          // Nowa pozycja ląduje na końcu listy - tak samo jak w menu.
          state.ingredients.push({ id: makeId('ing'), type: 'product', ...payload, sort_order: nextIngredientOrder() });
          showToast(translate('ingredientAdded'), 'success');
        }

        closeIngredientModal();
        saveState();
        renderAll();
      }

      /* ------------------------------------------------- kalkulator ceny */

      /**
       * Z opakowania wychodzi cena jednostki. Przycisk "Użyj tej ceny" wpisuje
       * ją z powrotem do okna składnika razem z wielkością opakowania, żeby nie
       * trzeba było przepisywać jej ręcznie.
       */
      function calculatorUnitPrice() {
        const packageSize = numberFromInput(calcPackageInput);
        const packagePrice = numberFromInput(calcPriceInput);
        if (!Number.isFinite(packageSize) || packageSize <= 0) return null;
        if (!Number.isFinite(packagePrice) || packagePrice < 0) return null;
        return packagePrice / packageSize;
      }

      function renderCalculatorResult() {
        const unit = unitLabel(ingredientUnitSelect.value);
        const unitPrice = calculatorUnitPrice();

        calcPackageLabel.textContent = `${translate('ingredientPackage')} (${unit})`;
        calcResultLabel.textContent = translate('ingredientPriceFor', { unit });

        if (unitPrice === null) {
          calcResult.textContent = translate('calcResultMissing');
          calcResult.classList.add('text-slate-400');
          calcResult.classList.remove('text-slate-800');
          calcApplyBtn.classList.add('opacity-50');
          return;
        }

        calcResult.textContent = formatCurrency(unitPrice);
        calcResult.classList.remove('text-slate-400');
        calcResult.classList.add('text-slate-800');
        calcApplyBtn.classList.remove('opacity-50');
      }

      function openPriceCalculator() {
        // Wielkość opakowania jest już wpisana w oknie składnika - nie każemy
        // jej podawać drugi raz.
        calcPackageInput.value = ingredientPackageInput.value || '';
        calcPriceInput.value = '';
        renderCalculatorResult();
        priceCalcModal.classList.remove('hidden');
        calcPriceInput.focus();
      }

      function closePriceCalculator() {
        if (priceCalcModal) priceCalcModal.classList.add('hidden');
      }

      function applyCalculatorResult() {
        const unitPrice = calculatorUnitPrice();
        const packageSize = numberFromInput(calcPackageInput);

        if (unitPrice === null) {
          showToast(translate('calcResultMissing'), 'warning');
          return;
        }

        // Cena jednostki bywa ułamkiem (np. 34,5 za gram) - zapisujemy ją bez
        // ogona zer, ale z rozsądną dokładnością.
        ingredientPriceInput.value = String(Number(unitPrice.toFixed(4)));
        if (Number.isFinite(packageSize) && packageSize > 0) {
          ingredientPackageInput.value = String(packageSize);
        }

        closePriceCalculator();
        updateIngredientUnitHints();
        showToast(translate('calcApplied'), 'success');
      }

      /* --------------------------------------------- zakładki magazynu */

      function renderIngredientSectionPreview() {
        const name = ingredientSectionNameInput.value.trim() || translate('ingredientSectionPreview');
        const draft = ingredientSectionDraft;

        ingredientSectionColorValue.textContent = draft === null ? translate('sectionColorNone') : `${Math.round(draft)}°`;
        ingredientSectionPreview.textContent = name;
        ingredientSectionPreview.style.cssText = draft === null
          ? 'background-color: #f1f5f9; border-color: #cbd5e1; color: #475569'
          : `background-color: ${tint(draft, 91)}; border-color: ${tint(draft, 62)}; color: ${tint(draft, 27, 55)}`;
      }

      function openIngredientSectionModal(sectionId = null) {
        const section = sectionId
          ? (state.ingredients || []).find(item => item.id === sectionId && isIngredientSection(item))
          : null;

        editingIngredientSectionId = section ? section.id : null;
        ingredientSectionDraft = section ? sectionColorOf(section) : null;
        ingredientSectionNameInput.value = section ? section.name : '';
        ingredientSectionColorInput.value = ingredientSectionDraft === null ? 0 : Math.round(ingredientSectionDraft);
        ingredientSectionTitle.textContent = translate(section ? 'ingredientSectionEditTitle' : 'ingredientSectionNewTitle');
        ingredientSectionSaveBtn.textContent = translate(section ? 'saveChanges' : 'ingredientSectionSave');
        renderIngredientSectionPreview();
        ingredientSectionModal.classList.remove('hidden');
        ingredientSectionNameInput.focus();
      }

      function closeIngredientSectionModal() {
        editingIngredientSectionId = null;
        ingredientSectionDraft = null;
        ingredientSectionModal.classList.add('hidden');
      }

      function saveIngredientSection() {
        const name = ingredientSectionNameInput.value.trim();
        if (!name) {
          showToast(translate('fillSectionName'), 'warning');
          return;
        }

        const color = ingredientSectionDraft === null ? null : Math.round(ingredientSectionDraft);

        if (editingIngredientSectionId) {
          const section = state.ingredients.find(item => item.id === editingIngredientSectionId && isIngredientSection(item));
          if (!section) {
            closeIngredientSectionModal();
            return;
          }
          section.name = name;
          if (color === null) delete section.color;
          else section.color = color;
          showToast(translate('ingredientSectionUpdated'), 'success');
        } else {
          const section = {
            id: makeId('ing'),
            name,
            type: 'section',
            unit: '',
            stock: 0,
            unit_price: 0,
            min_stock: 0,
            unit_step: 0,
            sort_order: nextIngredientOrder()
          };
          if (color !== null) section.color = color;
          state.ingredients.push(section);
          // Zakładka porządkuje magazyn, więc od tej chwili kolejność trzymamy
          // wprost - inaczej lista alfabetyczna przeskoczyłaby nad zakładką.
          writeIngredientOrder(getSortedIngredients());
          showToast(translate('ingredientSectionAdded'), 'success');
        }

        closeIngredientSectionModal();
        saveState();
        renderAll();
      }

      function deleteIngredientSection(sectionId) {
        const section = (state.ingredients || []).find(item => item.id === sectionId && isIngredientSection(item));
        if (!section) return;

        // Usuwamy sam nagłówek - składniki pod nim zostają w magazynie.
        showConfirmDialog(translate('confirmDeleteIngredientSection', { name: section.name }), () => {
          window.KedaiSync?.softDelete('ingredients', [section]);
          state.ingredients = state.ingredients.filter(item => item.id !== sectionId);
          // Bez tego wiersz wróciłby po restarcie: zapis stanu tylko nadpisuje
          // pozycje, nigdy ich nie kasuje.
          window.KedaiDatabase.deleteIngredient(sectionId);
          if (editingIngredientSectionId === sectionId) closeIngredientSectionModal();
          saveState();
          renderAll();
          showToast(translate('ingredientSectionRemoved'), 'success');
        });
      }

      function moveIngredient(ingredientId, direction) {
        const list = getSortedIngredients();
        const index = list.findIndex(item => item.id === ingredientId);
        if (index < 0) return;

        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= list.length) return;

        const temp = list[index];
        list[index] = list[targetIndex];
        list[targetIndex] = temp;

        writeIngredientOrder(list);
        saveState();
        renderAll();
      }

      /**
       * Kolor zakładki magazynu. `live` = przeciąganie paska: podgląd od razu,
       * zapis dopiero po puszczeniu (żeby chmura nie dostała kilkudziesięciu
       * wysyłek w trakcie jednego ruchu palca).
       */
      function setIngredientSectionColor(sectionId, hue, live) {
        const section = (state.ingredients || []).find(item => item.id === sectionId && isIngredientSection(item));
        if (!section) return;

        if (hue === null) delete section.color;
        else section.color = Math.max(0, Math.min(360, Math.round(Number(hue))));

        if (live) {
          renderWarehouse();
          return;
        }

        saveState();
        renderAll();
      }

      function deleteIngredient(ingredientId) {
        const ingredient = (state.ingredients || []).find(item => item.id === ingredientId);
        if (!ingredient) return;

        showConfirmDialog(translate('confirmDeleteIngredient', { name: ingredient.name }), () => {
          window.KedaiSync?.softDelete('ingredients', [ingredient]);
          state.ingredients = state.ingredients.filter(item => item.id !== ingredientId);
          delete currentPurchaseSelection[ingredientId];
          window.KedaiDatabase.deleteIngredient(ingredientId);
          // Otwarte okno usuwanego składnika nie może zostać na ekranie.
          if (ingredientModalId === ingredientId) closeIngredientModal();
          saveState();
          renderAll();
          showToast(translate('ingredientRemoved'), 'success');
        });
      }

      /**
       * Ile trzeba zostawić w poprawianym zamówieniu: tego, co już przyjęto na
       * magazyn, nie da się z zamówienia wycofać (stan by kłamał).
       */
      function receivedInEditedOrder(ingredientId) {
        if (!editingPurchaseOrderId) return 0;
        const order = (state.purchaseOrders || []).find(item => String(item.id) === String(editingPurchaseOrderId));
        if (!order) return 0;
        const item = (order.items || []).find(entry => entry.ingredient_id === ingredientId);
        return item ? receivedQuantity(item) : 0;
      }

      function updatePurchaseQuantity(ingredientId, direction) {
        const ingredient = (state.ingredients || []).find(item => item.id === ingredientId);
        if (!ingredient) return;

        const step = getStep(ingredient);
        const minimum = receivedInEditedOrder(ingredientId);
        const current = Number(currentPurchaseSelection[ingredientId] || 0);
        const next = Number((current + direction * step).toFixed(3));
        const clamped = Math.max(next, minimum);

        if (direction < 0 && clamped !== next) {
          showToast(translate('purchaseKeepReceived', {
            quantity: formatNumber(minimum),
            unit: unitLabel(ingredient.unit)
          }), 'warning');
        }

        if (clamped <= 0) {
          delete currentPurchaseSelection[ingredientId];
        } else {
          currentPurchaseSelection[ingredientId] = clamped;
        }
        renderOrderUi();
      }

      async function acceptPurchaseOrder() {
        const selected = (state.ingredients || [])
          .filter(ingredient => !isIngredientSection(ingredient) && Number(currentPurchaseSelection[ingredient.id] || 0) > 0)
          .map(ingredient => ({
            ingredient,
            // Świadomie nie schodzimy poniżej tego, co już przyjęto.
            quantity: Math.max(Number(currentPurchaseSelection[ingredient.id] || 0), receivedInEditedOrder(ingredient.id)),
            step: getStep(ingredient)
          }));

        if (!selected.length) {
          showToast(translate('chooseIngredient'), 'warning');
          return;
        }

        // Zamawiamy całymi opakowaniami - krokiem jest wielkość opakowania.
        const misaligned = selected.find(item => !isStepAligned(item.quantity, item.step));
        if (misaligned) {
          showToast(translate('stepWarning', {
            name: misaligned.ingredient.name,
            step: formatNumber(misaligned.step),
            unit: unitLabel(misaligned.ingredient.unit)
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

        // Edycja zamówienia z listy: podmieniamy pozycje w tym samym wierszu,
        // żeby nie robiły się dwie kopie tego samego zamówienia. Informacja
        // o przyjęciu towaru musi przy tym zostać.
        const existing = editingPurchaseOrderId
          ? (state.purchaseOrders || []).find(item => String(item.id) === String(editingPurchaseOrderId))
          : null;

        if (existing) {
          const receivedAt = new Map((existing.items || [])
            .filter(item => item.received_at)
            .map(item => [item.ingredient_id, { at: item.received_at, qty: receivedQuantity(item) }]));
          items.forEach(item => {
            const previous = receivedAt.get(item.ingredient_id);
            if (!previous) return;
            // Przyjęte już sztuki muszą przetrwać poprawkę zamówienia.
            item.received_at = previous.at;
            item.received_qty = previous.qty;
          });

          existing.items = items;
          existing.total_price = items.reduce((sum, item) => sum + item.line_total, 0);
          existing.total_quantity = items.reduce((sum, item) => sum + item.quantity, 0);
          existing.editedAt = new Date().toISOString();
          if (existing.received_at) delete existing.received_at;
          existing.status = items.every(item => remainingQuantity(item) <= 0)
            ? 'received'
            : (items.some(item => receivedQuantity(item) > 0) ? 'partial' : 'ordered');

          window.KedaiDatabase.updatePurchaseOrder(existing);
          editingPurchaseOrderId = null;
          currentPurchaseSelection = {};
          closeOrderSheet();
          saveState();
          renderAll();
          setActiveTab('purchaseList');
          showToast(translate('purchaseUpdated'), 'success');
          return;
        }

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
        editingPurchaseOrderId = null;
        closeOrderSheet();
        saveState();
        renderAll();
        setActiveTab('purchaseList');
        showToast(translate('purchaseSaved'), 'success');
      }

      function cancelPurchaseSelection() {
        showConfirmDialog(translate('confirmCancelPurchase'), () => {
          currentPurchaseSelection = {};
          editingPurchaseOrderId = null;
          renderOrderUi();
          showToast(translate('purchaseCleared'), 'warning');
        });
      }

      /** Powrót do zakładki Magazyn z pozycjami wybranego zamówienia. */
      function editPurchaseOrder(orderId) {
        const order = (state.purchaseOrders || []).find(item => String(item.id) === String(orderId));
        if (!order) return;

        currentPurchaseSelection = {};
        (order.items || []).forEach(item => {
          const ingredient = (state.ingredients || []).find(entry => entry.id === item.ingredient_id);
          if (!ingredient || isIngredientSection(ingredient)) return;
          currentPurchaseSelection[item.ingredient_id] = Number(item.quantity || 0);
        });

        editingPurchaseOrderId = order.id;
        setActiveTab('warehouse');
        renderAll();
        showToast(translate('purchaseEditNotice', { date: formatDateTime(order.createdAt) }), 'warning');
      }

      /* --------------------------------------- przyjęcie zamówienia na magazyn */

      /** Ile z tej pozycji już przyjęto. Starsze wiersze mają tylko datę. */
      function receivedQuantity(item) {
        const ordered = Number(item.quantity || 0);
        if (item.received_qty === undefined || item.received_qty === null) {
          return item.received_at ? ordered : 0;
        }
        return Number(item.received_qty);
      }

      /** Ile jeszcze nie dotarło (zamówione minus przyjęte). */
      function remainingQuantity(item) {
        return Math.max(0, Number((Number(item.quantity || 0) - receivedQuantity(item)).toFixed(3)));
      }

      function openReceiveModal(orderId) {
        const order = (state.purchaseOrders || []).find(item => String(item.id) === String(orderId));
        if (!order) return;

        receivingOrderId = order.id;
        receiptDraft = (order.items || []).map((item, index) => {
          const ordered = Number(item.quantity || 0);
          const received = receivedQuantity(item);
          const remaining = remainingQuantity(item);

          return {
            index,
            ingredientId: item.ingredient_id,
            name: item.name,
            unit: item.unit,
            ordered,
            received,
            remaining,
            // Wpisujemy to, czego jeszcze brakuje. Pozycja przyjęta w całości
            // jest zablokowana - inaczej dałoby się przyjąć ją drugi raz.
            quantity: remaining,
            unitPrice: Number(item.unit_price || 0),
            done: remaining <= 0,
            checked: remaining <= 0
          };
        });

        receiveTitle.textContent = translate('receiveTitle', { date: formatDateTime(order.createdAt) });
        receiveHint.textContent = translate('receiveHint');
        receiveAcceptBtn.textContent = translate('ingredientAccept');
        renderReceiveList();
        receiveModal.classList.remove('hidden');
      }

      function closeReceiveModal() {
        receivingOrderId = null;
        receiptDraft = [];
        receiveModal.classList.add('hidden');
      }

      function renderReceiveList() {
        if (!receiptDraft.length) {
          receiveList.innerHTML = `<div class="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-center text-sm text-slate-500">${translate('noPurchaseItems')}</div>`;
          updateReceiveSummary();
          return;
        }

        receiveList.innerHTML = receiptDraft.map(row => {
          const ingredient = (state.ingredients || []).find(entry => entry.id === row.ingredientId);
          // Składnik usunięty z magazynu nie ma gdzie się przyjąć.
          const missing = !ingredient;
          const unit = unitLabel(row.unit);
          const locked = row.done || missing;
          const border = row.done ? 'border-emerald-200 bg-emerald-50' : (row.checked ? 'border-orange-300 bg-orange-50' : 'border-slate-200 bg-white');

          const note = [
            `${translate('ingredientStock')}: ${formatNumber(ingredient ? ingredient.stock : 0)} ${unit}`,
            row.received > 0 ? translate('receivedOfOrdered', { received: formatNumber(row.received), ordered: formatNumber(row.ordered) }) : '',
            missing ? translate('recipeMissing') : '',
            row.done ? translate('purchaseReceived') : ''
          ].filter(Boolean).join(' · ');

          return `
            <div class="rounded-xl border ${border} p-3" data-receive-row="${row.index}">
              <div class="flex items-start gap-3">
                <input type="checkbox" data-receive-check="${row.index}" class="receive-check" ${row.checked ? 'checked' : ''} ${locked ? 'disabled' : ''} aria-label="${escapeHtml(row.name)}" />
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-bold text-slate-800 ${row.done ? 'text-slate-400 line-through' : (row.checked ? 'line-through text-slate-400' : '')}" data-receive-name="${row.index}">${escapeHtml(row.name)}</p>
                  <p class="text-[11px] text-slate-500">${note}</p>
                </div>
                <div class="flex flex-none items-center gap-1">
                  <input type="number" inputmode="decimal" min="0" step="any" data-receive-qty="${row.index}" value="${row.remaining}" ${locked ? 'disabled' : ''} class="w-20 rounded-lg border border-slate-300 px-2 py-2 text-right text-sm text-slate-800 ${row.checked ? 'line-through text-slate-400' : ''}" />
                  <span class="w-10 text-xs font-semibold text-slate-500">${unit}</span>
                </div>
              </div>
            </div>
          `;
        }).join('');

        updateReceiveSummary();
      }

      /** Zaznaczenie przekreśla pozycję - bez przerysowywania całej listy. */
      function markReceiveRow(index) {
        const row = receiptDraft[index];
        const element = receiveList.querySelector(`[data-receive-row="${index}"]`);
        if (!row || !element) return;

        element.classList.toggle('border-orange-300', row.checked);
        element.classList.toggle('bg-orange-50', row.checked);
        element.classList.toggle('border-slate-200', !row.checked);
        element.classList.toggle('bg-white', !row.checked);

        const name = element.querySelector(`[data-receive-name="${index}"]`);
        if (name) {
          name.classList.toggle('line-through', row.checked);
          name.classList.toggle('text-slate-400', row.checked);
        }

        const quantity = element.querySelector(`[data-receive-qty="${index}"]`);
        if (quantity) {
          quantity.classList.toggle('line-through', row.checked);
          quantity.classList.toggle('text-slate-400', row.checked);
        }
      }

      /** Przepisuje to, co użytkownik ma w oknie, do szkicu przyjęcia. */
      function captureReceiveInputs() {
        receiveList.querySelectorAll('[data-receive-qty]').forEach(input => {
          const index = Number(input.dataset.receiveQty);
          const value = Number(String(input.value).replace(',', '.'));
          if (receiptDraft[index] && Number.isFinite(value) && value >= 0) receiptDraft[index].quantity = value;
        });
        receiveList.querySelectorAll('[data-receive-check]').forEach(input => {
          const index = Number(input.dataset.receiveCheck);
          if (receiptDraft[index]) receiptDraft[index].checked = input.checked;
        });
      }

      function updateReceiveSummary() {
        const checked = receiptDraft.filter(row => row.checked && !row.done);
        const value = checked.reduce((sum, row) => sum + Number(row.quantity || 0) * Number(row.unitPrice || 0), 0);
        const anythingLeft = receiptDraft.some(row => !row.done);
        receiveSummary.textContent = checked.length
          ? translate('receiveSummary', { count: checked.length, value: formatCurrency(value) })
          : translate(anythingLeft ? 'receiveNothing' : 'receiveAllDone');
      }

      /**
       * Przyjęcie towaru: zaznaczone pozycje dodają się do stanu magazynu,
       * pozycja dostaje datę przyjęcia (w liście będzie przekreślona), a gdy
       * wszystko dotarło - zamówienie zmienia status na "przyjęte".
       */
      function acceptReceivedItems() {
        const order = (state.purchaseOrders || []).find(item => String(item.id) === String(receivingOrderId));
        if (!order) {
          closeReceiveModal();
          return;
        }

        captureReceiveInputs();
        let applied = 0;
        let skipped = 0;

        receiptDraft.forEach(row => {
          // Pozycja przyjęta w całości jest zablokowana - drugie przyjęcie tej
          // samej ilości zawyżyłoby stan magazynu.
          if (!row.checked || row.done) return;
          const item = (order.items || [])[row.index];
          if (!item) return;

          const ingredient = (state.ingredients || []).find(entry => entry.id === item.ingredient_id);
          const quantity = Number(row.quantity);
          if (!ingredient || !Number.isFinite(quantity) || quantity <= 0) {
            skipped += 1;
            return;
          }

          ingredient.stock = Number((Number(ingredient.stock || 0) + quantity).toFixed(3));
          // Ilość narastająco: dostawa może przyjść w częściach, a przyjęte
          // wcześniej sztuki nie mogą policzyć się dwa razy.
          const already = item.received_qty === undefined || item.received_qty === null
            ? (item.received_at ? Number(item.quantity || 0) : 0)
            : Number(item.received_qty);
          item.received_qty = Number((already + quantity).toFixed(3));
          item.received_at = new Date().toISOString();
          applied += 1;
        });

        if (!applied) {
          const left = receiptDraft.some(row => !row.done);
          showToast(translate(!left ? 'receiveAllDone' : (skipped ? 'receiveSkipped' : 'receiveNothing')), 'warning');
          return;
        }

        const items = order.items || [];
        const everythingIn = items.length > 0 && items.every(item => Number(item.received_qty || 0) >= Number(item.quantity || 0));
        order.status = everythingIn ? 'received' : 'partial';
        if (everythingIn) order.received_at = new Date().toISOString();
        else delete order.received_at;

        window.KedaiDatabase.updatePurchaseOrder(order);
        closeReceiveModal();
        saveState();
        renderAll();
        showToast(translate(applied === 1 ? 'receivedOne' : 'receivedMany', { count: applied }), 'success');
      }

      /**
       * Lista do schowka: wyłącznie pozycje, których jeszcze nie przyjęto.
       * Dostawca dostaje sam wykaz - bez daty, cen i podsumowania.
       */
      function purchaseOrderText(order) {
        return (order.items || [])
          .map(item => ({ item, remaining: remainingQuantity(item) }))
          .filter(entry => entry.remaining > 0)
          .map(entry => `- ${formatNumber(entry.remaining)} ${unitLabel(entry.item.unit)} ${entry.item.name}`)
          .join('\n');
      }

      /**
       * Schowek: najpierw nowe API, a gdy go nie ma (starsza przeglądarka albo
       * strona bez HTTPS) - stara sztuczka z ukrytym polem tekstowym.
       */
      async function copyTextToClipboard(text) {
        try {
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
          }
        } catch (error) {
          console.warn('Schowek przez clipboard API nie zadziałał:', error);
        }

        try {
          const field = document.createElement('textarea');
          field.value = text;
          field.setAttribute('readonly', '');
          field.style.position = 'fixed';
          field.style.top = '0';
          field.style.opacity = '0';
          document.body.appendChild(field);
          field.select();
          field.setSelectionRange(0, text.length);
          const ok = document.execCommand('copy');
          field.remove();
          return ok;
        } catch (error) {
          console.warn('Nie udało się skopiować listy:', error);
          return false;
        }
      }

      async function copyPurchaseOrder(orderId) {
        const order = (state.purchaseOrders || []).find(item => String(item.id) === String(orderId));
        if (!order) return;

        const text = purchaseOrderText(order);
        if (!text) {
          showToast(translate('copyNothingToSend'), 'warning');
          return;
        }

        const copied = await copyTextToClipboard(text);
        showToast(translate(copied ? 'purchaseCopyDone' : 'purchaseCopyFailed'), copied ? 'success' : 'warning');
      }

      function deletePurchaseOrder(orderId) {
        const order = (state.purchaseOrders || []).find(item => String(item.id) === String(orderId));
        if (!order) return;

        showConfirmDialog(translate('confirmDeletePurchase'), () => {
          window.KedaiSync?.softDelete('purchaseOrders', [order]);
          state.purchaseOrders = state.purchaseOrders.filter(item => String(item.id) !== String(orderId));
          window.KedaiDatabase.deletePurchaseOrder(order.id);
          if (String(editingPurchaseOrderId) === String(orderId)) editingPurchaseOrderId = null;
          if (String(receivingOrderId) === String(orderId)) closeReceiveModal();
          saveState();
          renderAll();
          showToast(translate('purchaseDeleted'), 'success');
        });
      }

      productForm.addEventListener('submit', handleProductFormSubmit);
      recipeSaveBtn.addEventListener('click', saveRecipeFromDialog);
      recipeCancelBtn.addEventListener('click', closeRecipeEditor);

      ingredientForm.addEventListener('submit', handleIngredientFormSubmit);
      addIngredientBtn.addEventListener('click', () => openIngredientModal());
      addIngredientSectionBtn.addEventListener('click', () => openIngredientSectionModal());
      ingredientCancelBtn.addEventListener('click', closeIngredientModal);
      ingredientCalcBtn.addEventListener('click', openPriceCalculator);
      ingredientUnitSelect.addEventListener('change', updateIngredientUnitHints);
      calcCancelBtn.addEventListener('click', closePriceCalculator);
      calcApplyBtn.addEventListener('click', applyCalculatorResult);
      calcPackageInput.addEventListener('input', renderCalculatorResult);
      calcPriceInput.addEventListener('input', renderCalculatorResult);
      ingredientSectionCancelBtn.addEventListener('click', closeIngredientSectionModal);
      ingredientSectionSaveBtn.addEventListener('click', saveIngredientSection);
      ingredientSectionNameInput.addEventListener('input', renderIngredientSectionPreview);
      ingredientSectionColorInput.addEventListener('input', event => {
        ingredientSectionDraft = Number(event.target.value);
        renderIngredientSectionPreview();
      });
      ingredientSectionColorClear.addEventListener('click', () => {
        ingredientSectionDraft = null;
        ingredientSectionColorInput.value = 0;
        renderIngredientSectionPreview();
      });
      document.getElementById('acceptPurchaseBtn')?.addEventListener('click', acceptPurchaseOrder);
      orderBarOpenBtn.addEventListener('click', openOrderSheet);
      orderBarClearBtn.addEventListener('click', cancelPurchaseSelection);
      orderSheetCloseBtn.addEventListener('click', closeOrderSheet);
      orderSheetAcceptBtn.addEventListener('click', acceptPurchaseOrder);
      orderSheetModal.addEventListener('click', event => {
        // Kliknięcie w tło zamyka arkusz, ale nie kasuje wyboru.
        if (event.target === orderSheetModal) closeOrderSheet();
      });
      receiveAcceptBtn.addEventListener('click', acceptReceivedItems);
      receiveCancelBtn.addEventListener('click', closeReceiveModal);
      receiveList.addEventListener('change', event => {
        const check = event.target.closest?.('[data-receive-check]');
        if (!check) return;
        const index = Number(check.dataset.receiveCheck);
        if (receiptDraft[index]) receiptDraft[index].checked = check.checked;
        markReceiveRow(index);
        updateReceiveSummary();
      });
      receiveList.addEventListener('input', event => {
        if (!event.target.closest?.('[data-receive-qty]')) return;
        captureReceiveInputs();
        updateReceiveSummary();
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

        if (action === 'toggle-visible') {
          toggleItemVisibility(id);
        }

        if (action === 'clear-section-color') {
          setSectionColor(id, null, false);
        }

        if (action === 'open-recipe') {
          openRecipeEditor(id);
        }

        if (action === 'remove-recipe-ingredient') {
          removeRecipeEntry(id);
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
          openIngredientModal(id);
        }

        if (action === 'delete-ingredient') {
          deleteIngredient(id);
        }

        if (action === 'move-ingredient-up') {
          moveIngredient(id, 'up');
        }

        if (action === 'move-ingredient-down') {
          moveIngredient(id, 'down');
        }

        if (action === 'edit-ingredient-section') {
          openIngredientSectionModal(id);
        }

        if (action === 'delete-ingredient-section') {
          deleteIngredientSection(id);
        }

        if (action === 'clear-ingredient-section-color') {
          setIngredientSectionColor(id, null, false);
        }

        if (action === 'purchase-increase') {
          updatePurchaseQuantity(id, 1);
        }

        if (action === 'purchase-decrease') {
          updatePurchaseQuantity(id, -1);
        }

        if (action === 'receive-purchase') {
          openReceiveModal(id);
        }

        if (action === 'edit-purchase') {
          editPurchaseOrder(id);
        }

        if (action === 'copy-purchase') {
          copyPurchaseOrder(id);
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

      document.getElementById('drawerToggleBtn').addEventListener('click', () => {
        if (isDrawerOpen()) closeDrawer();
        else openDrawer();
      });

      document.getElementById('appDrawerBackdrop').addEventListener('click', closeDrawer);

      /* --------------------------------------- przesuwanie zakładek palcem */

      let swipeStart = null;

      /** Czy otwarte jest jakieś okno? Wtedy gest należy do okna, nie do zakładek. */
      function isAnyOverlayOpen() {
        return [orderSheetModal, receiveModal, priceCalcModal, ingredientModal, ingredientSectionModal, confirmModal, recipeModal]
          .some(node => node && !node.classList.contains('hidden'));
      }

      document.addEventListener('touchstart', event => {
        swipeStart = null;
        if (isAnyOverlayOpen() || isDrawerOpen()) return;
        const touch = event.touches?.[0];
        if (!touch) return;
        // Suwaki i pola formularzy mają własne gesty (np. kolor zakładki).
        if (event.target.closest?.('input, select, textarea, .color-range')) return;
        swipeStart = { x: touch.clientX, y: touch.clientY };
      }, { passive: true });

      document.addEventListener('touchend', event => {
        const start = swipeStart;
        swipeStart = null;
        if (!start) return;
        const touch = event.changedTouches?.[0];
        if (!touch) return;

        const dx = touch.clientX - start.x;
        const dy = touch.clientY - start.y;

        // Ruch musi być zdecydowany i wyraźnie poziomy - pionowe przewijanie
        // listy ma zostać przewijaniem, a krótkie muśnięcia klikaniem.
        if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;

        const index = MAIN_TABS.indexOf(activeTab);
        if (index === -1) return;
        const next = MAIN_TABS[index + (dx < 0 ? 1 : -1)];
        if (!next) return;

        setActiveTab(next, dx < 0 ? 'from-right' : 'from-left');
      }, { passive: true });

      document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        // Zamykamy to, co jest na wierzchu - najpierw arkusz zamówienia.
        if (orderSheetModal && !orderSheetModal.classList.contains('hidden')) {
          closeOrderSheet();
          return;
        }
        if (receiveModal && !receiveModal.classList.contains('hidden')) {
          closeReceiveModal();
          return;
        }
        if (priceCalcModal && !priceCalcModal.classList.contains('hidden')) {
          closePriceCalculator();
          return;
        }
        if (ingredientSectionModal && !ingredientSectionModal.classList.contains('hidden')) {
          closeIngredientSectionModal();
          return;
        }
        if (ingredientModal && !ingredientModal.classList.contains('hidden')) {
          closeIngredientModal();
          return;
        }
        closeDrawer();
      });

      document.querySelectorAll('button[data-nav-mode]').forEach(button => {
        button.addEventListener('click', () => setNavMode(button.dataset.navMode));
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
      syncResendBtn?.addEventListener('click', resendAllToCloud);
      saveRetentionBtn?.addEventListener('click', saveRetentionSetting);
      // Moduł chmury melduje każdy ruch (wysyłkę w tle, powstanie zaległości)
      // i wtedy odświeżamy licznik oraz panel w Ustawieniach.
      window.addEventListener('kedai-sync-status', () => {
        updateSyncBadge();
        renderSyncPanel();
      });
      menuElementTypeSelect.addEventListener('change', updateMenuFormType);

      // Kolor zakładki: podczas przeciągania paska tylko podglądamy (bez zapisu,
      // żeby nie zasypać chmury), a po puszczeniu zapisujemy raz.
      document.addEventListener('input', event => {
        const sectionInput = event.target.closest?.('[data-action="section-color"]');
        if (sectionInput) setSectionColor(sectionInput.dataset.id, Number(sectionInput.value), true);

        const ingredientInput = event.target.closest?.('[data-action="ingredient-section-color"]');
        if (ingredientInput) setIngredientSectionColor(ingredientInput.dataset.id, Number(ingredientInput.value), true);
      });

      document.addEventListener('change', event => {
        const sectionInput = event.target.closest?.('[data-action="section-color"]');
        if (sectionInput) setSectionColor(sectionInput.dataset.id, Number(sectionInput.value), false);

        const ingredientInput = event.target.closest?.('[data-action="ingredient-section-color"]');
        if (ingredientInput) setIngredientSectionColor(ingredientInput.dataset.id, Number(ingredientInput.value), false);
      });

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
        syncResendBtn?.classList.toggle('hidden', !status.signedIn);
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

        // Odrzucone wiersze są ważniejsze niż informacja o sukcesie - muszą być
        // widoczne na czerwono, bo inaczej część danych po cichu nie dojdzie.
        const problem = status.failed > 0
          ? translate('syncFailedCount', { count: status.failed, detail: syncDetailText(status.detail) })
          : (status.code === 'failed' || status.code === 'partial'
            ? translate('syncProblem', { detail: syncDetailText(status.detail) })
            : '');

        if (problem) {
          syncStatusLabel.textContent = problem;
          syncStatusLabel.classList.remove('text-slate-500');
          syncStatusLabel.classList.add('text-rose-600');
          return;
        }

        const parts = [translate('syncSignedInAs', { email: status.email })];
        parts.push(status.pending > 0
          ? translate('syncPendingCount', { count: status.pending })
          : translate('syncPendingNone'));
        if (status.lastOkAt) parts.push(translate('syncLastSuccess', { time: formatDateTime(status.lastOkAt) }));
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
        // Nazwa jest częścią odcisku każdego wiersza, więc jej zmiana wymusza
        // wysłanie danych ponownie - inaczej raporty filtrowałyby po starej
        // nazwie i część zamówień byłaby niewidoczna.
        sync.notifyChange(state);
        showToast(translate('userNameSaved'), 'success');
      }

      /* --------------------------------------------------- dane na telefonie */

      const RETENTION_KEY = envKey('kedai_pos_local_retention_days');

      /**
       * Ile dni archiwum trzymamy na telefonie. 0 = nie usuwamy nic.
       * Chmura nigdy nie jest ruszana - to ustawienie działa wyłącznie lokalnie.
       */
      function getRetentionDays() {
        try {
          const value = Number(localStorage.getItem(RETENTION_KEY));
          return Number.isFinite(value) && value > 0 ? Math.min(Math.floor(value), 3650) : 0;
        } catch (error) {
          return 0;
        }
      }

      function setRetentionDays(days) {
        try {
          if (days > 0) localStorage.setItem(RETENTION_KEY, String(days));
          else localStorage.removeItem(RETENTION_KEY);
        } catch (error) {
          console.warn('Nie udało się zapisać ustawienia przechowywania:', error);
        }
      }

      /**
       * Usuwa z telefonu wyłącznie te zamówienia archiwalne, które są już
       * potwierdzone w chmurze. Do Supabase nie leci żadne zapytanie -
       * w chmurze te wiersze zostają na zawsze.
       */
      function purgeLocalArchive() {
        const days = getRetentionDays();
        if (!days) return 0;

        const sync = window.KedaiSync;
        const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
        const stale = state.archive.filter(order => {
          const time = new Date(order.date || order.createdAt).getTime();
          if (!Number.isFinite(time) || time >= cutoff) return false;
          // Bezpiecznik: nigdy nie usuwamy wiersza, którego chmura nie potwierdziła.
          return Boolean(sync?.isSent?.('clientOrders', order.date || order.createdAt));
        });
        if (!stale.length) return 0;

        const ids = new Set(stale.map(order => order.id));
        stale.forEach(order => window.KedaiDatabase.deleteOrder(order.id));
        state.archive = state.archive.filter(order => !ids.has(order.id));
        saveState();
        return stale.length;
      }

      function saveRetentionSetting() {
        const typed = Number(retentionDaysInput?.value || 0);
        const days = Number.isFinite(typed) && typed > 0 ? Math.min(Math.floor(typed), 3650) : 0;
        if (retentionDaysInput) retentionDaysInput.value = String(days);
        setRetentionDays(days);
        const removed = purgeLocalArchive();
        if (removed) {
          renderAll();
          showToast(translate('localRetentionPurged', { count: removed }), 'success');
        } else {
          showToast(translate('localRetentionSaved'), 'success');
        }
      }

      /** Awaryjne „wyślij wszystko od nowa", gdy trzeba naprawić rozbieżność. */
      function resendAllToCloud() {
        const sync = window.KedaiSync;
        if (!sync?.isConfigured() || !sync.isSignedIn()) return;

        showConfirmDialog(translate('syncResendConfirm'), async () => {
          sync.forgetSynced();
          updateSyncBadge();
          const result = await sendToCloud({ button: true });
          if (result?.ok) showToast(translate('syncResendDone'), 'success');
        });
      }

      /**
       * Stan chmury pokazywany na dwa sposoby: kropka na zębatce (sygnał)
       * i zdanie w stopce szuflady (wyjaśnienie). Sama kropka byłaby zagadką,
       * dlatego pełny opis jest o jedno dotknięcie dalej.
       */
      function updateSyncBadge() {
        const dot = document.getElementById('drawerToggleDot');
        const description = document.getElementById('drawerToggleStatus');
        const footer = document.getElementById('drawerSyncFooter');
        const footerDot = document.getElementById('drawerSyncDot');
        const footerText = document.getElementById('drawerSyncText');
        const sync = window.KedaiSync;

        if (!sync?.isConfigured()) {
          // Bez konfiguracji chmury nie ma czego wysyłać - nie straszymy kropką.
          dot?.classList.add('hidden');
          footer?.classList.add('hidden');
          if (description) description.textContent = '';
          return;
        }

        const syncStatus = sync.getStatus();
        const pending = syncStatus.pending;
        const failed = syncStatus.failed;
        const clean = !pending && !failed;
        // Kropka ma zwracać uwagę, a nie mrugać przy każdej zmianie danych.
        // Rutynowa chwilowa zaległość (telefon zalogowany, wysyłka ruszy za
        // chwilę) jej nie zapala - inaczej świeciłaby cały dzień i przestałaby
        // cokolwiek znaczyć. Zapala ją brak logowania (nic nie jedzie do chmury)
        // albo odrzucone wiersze.
        const needsAttention = failed > 0 || (!syncStatus.signedIn && pending > 0);

        const message = clean
          ? translate('syncPendingNone')
          : (failed
            ? translate('syncBadgeFailed', { count: failed })
            : (syncStatus.signedIn
              ? translate('syncBadgePending', { count: pending })
              : translate('syncBadgeSignedOut', { count: pending })));

        if (dot) {
          dot.classList.toggle('hidden', !needsAttention);
          dot.classList.toggle('is-error', Boolean(failed));
          dot.title = message;
        }

        if (description) description.textContent = clean ? '' : message;

        if (footer) {
          footer.classList.remove('hidden');
          if (footerDot) {
            footerDot.classList.toggle('is-error', Boolean(failed));
            footerDot.classList.toggle('is-clear', clean);
          }
          if (footerText) footerText.textContent = message;
        }
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
            if (result.rejected?.length) {
              showToast(translate('syncFailedCount', {
                count: result.rejected.length,
                detail: syncDetailText(result.rejected[0].detail)
              }), 'error');
            } else {
              showToast(translate(result.sent === 0 ? 'syncNothingToSend' : 'syncPushDone'), 'success');
            }
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

      /* ------------------------------------------------ jednorazowy seed PIPIN */

      const PIPIN_SEED_KEY = envKey('kedai_pos_pipin_seed');

      /**
       * Jednorazowe uzupełnienie magazynu i receptur (config/seed-pipin.js).
       *
       * Wykonuje się raz na urządzenie i tylko dla użytkownika o nazwie z seeda,
       * żeby nie ruszyć danych innych telefonów. Zasady: nic nie kasujemy
       * fizycznie (stare składniki dostają nagrobek), stany magazynowe zostają,
       * receptury wypełniamy wyłącznie tam, gdzie są puste.
       */
      async function applyPipinSeed() {
        const seed = window.KedaiSeed;
        if (!seed || !Array.isArray(seed.ingredients)) return false;

        const userName = (window.KedaiSync?.getUserName() || '').trim().toUpperCase();
        if (!userName || userName !== String(seed.userName || '').trim().toUpperCase()) return false;

        const version = Number(seed.version || 1);
        try {
          if (Number(localStorage.getItem(PIPIN_SEED_KEY) || 0) >= version) return false;
        } catch (error) {
          // Brak dostępu do localStorage nie może zablokować uzupełnienia danych.
        }

        const now = new Date().toISOString();
        const existing = new Map((state.ingredients || []).map(item => [item.id, item]));

        seed.ingredients.forEach(entry => {
          const current = existing.get(entry.id);
          if (!current) {
            state.ingredients.push({ ...entry });
            return;
          }
          // Składnik już istnieje - stan zostawiamy (to prawdziwy towar w lokalu),
          // a z seeda bierzemy nazwę, jednostkę, cenę i progi.
          Object.assign(current, {
            name: entry.name,
            unit: entry.unit,
            unit_price: entry.unit_price,
            min_stock: entry.min_stock,
            target_stock: entry.target_stock,
            min_order_quantity: entry.min_order_quantity,
            unit_step: entry.unit_step
          });
        });

        const keptIds = new Set(seed.ingredients.map(entry => entry.id));
        for (const id of (seed.remove || [])) {
          const ingredient = existing.get(id);
          if (!ingredient || keptIds.has(id)) continue;
          ingredient.deleted = true;
          ingredient.deleted_at = now;
          // Nagrobek do chmury, potem usunięcie z telefonu - w tej kolejności.
          window.KedaiSync?.softDelete('ingredients', [ingredient]);
          state.ingredients = state.ingredients.filter(item => item.id !== id);
          await window.KedaiDatabase.deleteIngredient(id);
        }

        Object.entries(seed.recipes || {}).forEach(([productId, recipe]) => {
          const product = (state.menu || []).find(item => item.id === productId);
          if (!product || recipeOf(product).length) return;
          product.recipe = recipe.map(entry => ({ id: entry.id, qty: Number(entry.qty || 0) }));
        });

        try {
          localStorage.setItem(PIPIN_SEED_KEY, String(version));
        } catch (error) {
          console.warn('Nie udało się zapisać znacznika uzupełnienia danych:', error);
        }

        return true;
      }

      /* ------------------------------------------- lustro danych (KEDAI-test) */

      const TEST_SEED_KEY = envKey('kedai_pos_test_seed');

      /**
       * Środowisko TESTOWE dostaje kopię tego, co ma lokal: menu, magazyn
       * z zakładkami i kolorami oraz receptury, powiększone o sugerowane
       * pozycje magazynu (config/seed-test.js).
       *
       * Wersją jest odcisk treści pliku: po zmianie danych lokalu plik się
       * zmienia, więc testowe urządzenie wgra lustro jeszcze raz. Wydanie
       * lokalu (window.KedaiEnv.isTest === false) nigdy tu nie wchodzi, a dane
       * kasujemy tylko z tego urządzenia i tylko z jego chmury - projekt
       * KTP-test jest do tego właśnie oddzielony.
       */
      async function applyTestSeed() {
        const seed = window.KedaiSeedTest;
        if (!seed || !window.KedaiEnv?.isTest) return false;
        if (!Array.isArray(seed.menu) || !Array.isArray(seed.ingredients)) return false;

        const version = String(seed.version || '');
        try {
          if (version && localStorage.getItem(TEST_SEED_KEY) === version) return false;
        } catch (error) {
          console.warn('Brak dostępu do localStorage:', error);
        }

        const now = new Date().toISOString();
        const keptIngredients = new Set(seed.ingredients.map(entry => entry.id));
        const keptMenu = new Set(seed.menu.map(entry => entry.id));

        // Lustro: czego nie ma w seedzie, tego nie ma tutaj. Wiersze dostają
        // nagrobek (chmura nic nie traci), a to, co lokalne, znika z telefonu.
        const removedIngredients = (state.ingredients || []).filter(item => !keptIngredients.has(item.id));
        for (const ingredient of removedIngredients) {
          ingredient.deleted = true;
          ingredient.deleted_at = now;
          window.KedaiSync?.softDelete('ingredients', [ingredient]);
          await window.KedaiDatabase.deleteIngredient(ingredient.id);
        }

        const removedMenu = (state.menu || []).filter(item => !keptMenu.has(item.id));
        if (removedMenu.length) window.KedaiSync?.softDelete('menu', removedMenu);

        // Kolejność i typy bierzemy wprost z pliku - on już je policzył.
        state.ingredients = seed.ingredients.map(entry => ({ ...entry }));
        state.menu = seed.menu.map(entry => ({ ...entry }));

        try {
          if (version) localStorage.setItem(TEST_SEED_KEY, version);
        } catch (error) {
          console.warn('Nie udało się zapisać znacznika lustra:', error);
        }

        return true;
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
          const seedApplied = await applyPipinSeed();
          const mirrorApplied = await applyTestSeed();
          renderAll();
          renderStorageInfo();
          syncUserNameInput.value = window.KedaiSync?.getUserName() || '';
          if (retentionDaysInput) retentionDaysInput.value = String(getRetentionDays());
          if (purgeLocalArchive()) renderAll();
          // Bez tego zaległości z poprzedniej sesji czekałyby na przypadkową
          // następną zmianę danych - patrz komentarz w modules/sync.js.
          window.KedaiSync?.start(state);
          renderSyncPanel();
          updateSyncBadge();
          if (seedApplied || mirrorApplied) {
            saveState();
            showToast(translate(mirrorApplied ? 'testSeedApplied' : 'seedApplied'), 'success');
          }
        } catch (error) {
          console.error('Błąd uruchamiania IndexedDB:', error);
          showToast(translate('dbOpenFailed'), 'error');
        }
      }

      // Data i godzina w górnym pasku odświeżają się same: data przeskoczy po
      // północy, zegar tyka co sekundę - wszystko bez przeładowania aplikacji.
      setInterval(renderHeaderDate, 1000);

      initializeApp();
