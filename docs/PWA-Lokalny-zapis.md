# PWA i lokalna baza IndexedDB na Androidzie

## Rekomendacja

Najlepszy kierunek dla Kedai POS na telefonie z Androidem to PWA z lokalną bazą IndexedDB. Aplikacja działa wtedy bez Google Sheets i bez zewnętrznego backendu.

## Dlaczego IndexedDB

IndexedDB jest właściwsze niż `localStorage` dla historii sprzedaży, ponieważ:

- przechowuje większą ilość danych,
- ma osobne sklepy obiektów,
- obsługuje transakcje,
- może przechowywać pełną historię zamówień i operacji magazynowych,
- działa lokalnie i offline.

## Model danych

Baza `KedaiPOS` w wersji `2` tworzy w `onupgradeneeded` sklepy:

- `Ingredients` – surowce i stany magazynowe,
- `Recipes` – zużycie surowców przez dania,
- `StockOperations` – dostawy, sprzedaż, straty i korekty,
- `Orders` – historia zamówień z autoinkrementowanym `id`, kwotą, tablicą pozycji i dokładnym czasem,
- `AppState` – menu i język aplikacji.

Wersja 2 dodaje indeksy do wyszukiwania po nazwie, daniu, surowcu, statusie i dacie.

W przyszłości można podnieść wersję bazy i dodać migracje, np. indeksy, płatności lub klientów.

## Jak aplikacja zapisuje zamówienie

1. Obsługa wybiera dania i ilości.
2. Aplikacja tworzy datę w `new Date().toISOString()`.
3. Zamówienie jest dodawane do sklepu `Orders`.
4. IndexedDB nadaje mu automatyczny identyfikator.
5. Zamówienie ma status `active`.
6. Po archiwizacji status zmienia się na `archived`.

Przykładowy rekord:

```js
{
  id: 1,
  total_price: 26500,
  items: [
    {
      meal_id: "prod_3",
      quantity: 2,
      custom_modifications: {}
    }
  ],
  date: "2026-09-09T12:30:00.000Z",
  status: "active"
}
```

## Praca całkowicie lokalna

W tym modelu Google Sheets i Apps Script nie są potrzebne do działania aplikacji. Telefon przechowuje dane we własnej bazie przeglądarki, więc sprzedaż może być rejestrowana także bez internetu.

Trzeba pamiętać, że baza należy do konkretnego urządzenia i profilu przeglądarki. Wyczyszczenie danych witryny może ją usunąć. Dlatego w dalszym rozwoju warto dodać eksport/import kopii do pliku JSON lub CSV.

## PWA na Androidzie

Po uruchomieniu przez lokalny serwer:

```powershell
python -m http.server 8000
```

telefon w tej samej sieci Wi-Fi może otworzyć adres:

```text
http://ADRES_IP_KOMPUTERA:8000
```

W Chrome można użyć opcji **Dodaj do ekranu głównego**. Manifest i service worker są kolejnym krokiem, aby aplikacja miała ikonę, tryb pełnoekranowy i cache zasobów.
