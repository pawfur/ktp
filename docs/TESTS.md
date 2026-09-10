# Testy aplikacji Kedai POS

Ten dokument wyjaśnia, jak działa sprawdzanie tłumaczeń i jak je uruchamiać.

## 1. Po co jest ten test

Tłumaczenia są przechowywane w trzech językach: `pl`, `en`, `id`. Łatwo popełnić błąd, którego nie widać od razu:

- dodanie klucza tylko do jednego języka,
- literówka w nazwie klucza użytego w HTML,
- zgubienie symbolu zastępczego, np. `{name}` zamienione na `{nazwa}`,
- powtórzenie klucza, przez co jedna wartość po cichu nadpisuje drugą.

Test wykrywa takie sytuacje przed publikacją, bez uruchamiania przeglądarki.

## 2. Jak uruchomić

W katalogu projektu:

```powershell
node tests/check-translations.mjs
```

Wymagany jest Node.js. Test nie potrzebuje żadnych dodatkowych bibliotek ani internetu.

Przykładowy poprawny wynik:

```text
Kedai POS – sprawdzanie tłumaczeń

· Klucze użyte w index.html: 32
· Klucze użyte w kodzie: 77 z 87

OK – języki: pl, en, id, klucze: 87, ostrzeżenia: 1
```

Przykładowy wynik z błędem:

```text
Błędy: 2
  ✗ Język "id" nie ma klucza "backupTitle" (jest w "pl")
  ✗ index.html używa klucza "clearAll", którego brak w języku "en"

Sprawdzenie nie przeszło.
```

Kod wyjścia to `0` przy powodzeniu i `1` przy błędzie, więc test można podłączyć do automatyzacji.

## 3. Co dokładnie sprawdza

| Kontrola | Co wykrywa |
|---|---|
| Kompletność kluczy | Brak klucza w którymś języku oraz klucz nadmiarowy |
| Symbole zastępcze | Niezgodność `{name}`, `{date}` itp. między językami |
| Puste wartości | Klucz z pustym tekstem |
| Powtórzone klucze | Ten sam klucz dwa razy w jednym języku |
| Użycie w `index.html` | Atrybut `data-i18n` wskazujący nieistniejący klucz |
| Martwe klucze | Klucz zdefiniowany, ale nigdzie nieużywany (ostrzeżenie) |
| Identyczne tłumaczenia | Wartość taka sama jak polska (ostrzeżenie) |

Ostrzeżenia nie przerywają testu. Błędy przerywają i zwracają kod wyjścia `1`.

## 4. Jak to działa

Skrypt nie używa przeglądarki ani wyrażeń regularnych do wycinania całego obiektu tłumaczeń. Działa tak:

1. **Wczytanie źródeł** – czyta `app.js` oraz `index.html`.
2. **Znalezienie literału** – szuka tekstu `const translations`, a następnie nawiasu `{` po nim.
3. **Dopasowanie nawiasów ze świadomością łańcuchów** – przechodzi znak po znaku i liczy nawiasy klamrowe tylko poza łańcuchami znaków. Dzięki temu nawiasy występujące w tłumaczeniach, np. `Usunąć pozycję "{name}" z menu?`, nie psują dopasowania.
4. **Zamiana na obiekt** – wycięty fragment jest zamieniany na obiekt funkcją `new Function`, bez ręcznego przepisywania danych.
5. **Porównanie języków** – sprawdzane są klucze, symbole zastępcze, puste wartości i duplikaty.
6. **Analiza użycia** – skrypt zbiera klucze z `data-i18n` w HTML, z wywołań `translate('klucz')` oraz z argumentów `getCounterLabel(count, 'item', 'items')`.

Ważny szczegół techniczny: w pliku `app.js` obiekt `translations` jest globalną stałą, więc ten sam mechanizm porównania działa także w przeglądarce, co pozwala sprawdzić tłumaczenia w działającej aplikacji.

## 5. Czego ten test nie sprawdza

- Nie ocenia, czy tłumaczenie jest poprawne językowo ani stylistycznie.
- Nie sprawdza wyglądu interfejsu, np. czy tekst się nie ucina.
- Nie sprawdza dynamicznego tekstu, który nie pochodzi ze słownika.
- Nie sprawdza, czy po zmianie języka w interfejsie nie został stary tekst.

Do ostatniego punktu służy osobny skrypt uruchamiany w przeglądarce.

## 6. Sprawdzanie w przeglądarce bez instalowania czegokolwiek

Ten skrypt wypisuje teksty, które po przełączeniu języka nadal wyglądają na polskie.

Jak użyć:

1. Otwórz aplikację w przeglądarce na komputerze.
2. Naciśnij `F12` i przejdź do zakładki `Console`.
3. Wklej poniższy kod i naciśnij `Enter`.
4. Wynik pojawi się w tabeli. Pusta lista oznacza brak zastrzeżeń.

```js
(async () => {
  const polishRegex = /[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/;
  const select = document.querySelector('#languageSelect');
  const results = {};

  for (const language of ['en', 'id']) {
    select.value = language;
    select.dispatchEvent(new Event('change', { bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 600));

    const leftovers = [];
    const walk = element => {
      for (const node of element.childNodes) {
        if (node.nodeType === 3 && polishRegex.test(node.textContent)) {
          leftovers.push(node.textContent.trim());
        } else if (node.nodeType === 1 && !['SCRIPT', 'STYLE'].includes(node.tagName)) {
          walk(node);
        }
      }
    };
    walk(document.querySelector('main'));
    results[language] = [...new Set(leftovers)];
  }

  console.table(results);
})();
```

Ten skrypt niczego nie zapisuje i nie zmienia danych. Po zakończeniu warto wrócić do języka polskiego w Ustawieniach.

## 7. Jak dodać nowy klucz tłumaczenia

1. Dodaj klucz do bloku `pl`, `en` i `id` w `app.js`.
2. Użyj go w HTML jako `data-i18n="nazwaKlucza"` albo w kodzie jako `translate('nazwaKlucza')`.
3. Uruchom `node tests/check-translations.mjs`.

Jeżeli klucz ma być identyczny w kilku językach, test zgłosi ostrzeżenie. Aby potwierdzić, że to celowe, dopisz go do listy `ALLOWED_IDENTICAL` w pliku testu.

## 8. Jak dodać nowy język

1. Skopiuj blok jednego z języków w `app.js` i przetłumacz wartości.
2. Dodaj kod języka do stałej `LANGUAGES` w `tests/check-translations.mjs`.
3. Dodaj opcję w `index.html` w elemencie `languageSelect`.
4. Uruchom test.

## 9. Dodawanie kolejnych testów

Plik `tests/check-translations.mjs` jest samodzielnym skryptem Node. Można obok niego dodać kolejne, na przykład:

- `tests/check-version.mjs` – porównanie wersji w `config/default-state.js` z `version.json`,
- `tests/check-cache.mjs` – sprawdzenie, czy cache w `service-worker.js` został podbity,
- `tests/check-assets.mjs` – sprawdzenie, czy pliki z `APP_SHELL` istnieją.

Każdy taki skrypt może zwracać kod wyjścia `1` przy błędzie, dzięki czemu łatwo uruchomić je wszystkie jedną komendą przed publikacją.
