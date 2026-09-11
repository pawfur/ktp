/**
 * Dane połączenia z Supabase.
 *
 * ============================================================================
 *  TU WKLEJ SWOJE DWIE WARTOŚCI. Nic więcej nie trzeba zmieniać.
 * ============================================================================
 *
 * Skąd je wziąć:
 *   Panel Supabase → Twój projekt → Settings (⚙) → API
 *     • "Project URL"       → pole url poniżej   (wygląda tak: https://abcdefgh.supabase.co)
 *     • "anon public" key   → pole anonKey poniżej (długi ciąg zaczynający się od "eyJ...")
 *
 * ⚠️  NIGDY nie wklejaj tu klucza "service_role" ani "secret".
 *     Klucz "anon public" jest z założenia publiczny – trafia do przeglądarki
 *     i każdy może go zobaczyć. Ochronę danych zapewniają reguły RLS w bazie
 *     (uruchamiane z pliku docs/supabase-schema.sql). Klucz "service_role"
 *     omija te reguły i w aplikacji na telefonie oznaczałby pełny dostęp do
 *     całej bazy dla każdego, kto go odczyta.
 *
 * Hasła do konta lokalu NIE wpisuj tutaj. Podaje się je raz w aplikacji
 * w Ustawieniach, a aplikacja zapamiętuje tylko sesję.
 *
 * Gdy oba pola są puste, synchronizacja jest wyłączona i aplikacja działa
 * dokładnie tak jak dotychczas – wyłącznie na danych lokalnych.
 */
window.KedaiSupabaseConfig = {
  url: 'https://gbtiuowskxigyqvmaukw.supabase.co',
  anonKey: 'sb_publishable_auYiI3QTVh9EZPSycQ7Qrw_bcZTIpEx',

  // Kolejność wysyłania. Można zostawić bez zmian.
  tables: {
    menu: 'menu_items',
    ingredients: 'ingredients',
    clientOrders: 'client_orders',
    purchaseOrders: 'purchase_orders'
  }
};
