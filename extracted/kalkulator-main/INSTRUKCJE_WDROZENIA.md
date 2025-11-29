# 🚀 Instrukcje wdrożenia kalkulatorów z Google Apps Script

## 🎯 Co zostało zaimplementowane

✅ **4 kalkulatory z ograniczeniami biznesowymi:**

- Kalkulator hipoteczny (`kalkulator-hipoteczny/index.html`)
- Kalkulator leasingu (`kalkulator-leasingu/index.html`)
- Kalkulator samochodowy (`kalkulator-samochodowy/index.html`)
- Kalkulator zdolności kredytowej (`kalkulator-zdolnosci/index.html`)

✅ **System leadów:**

- Limit 3 kalkulacji na użytkownika
- Automatyczne zachęty do kontaktu
- **JEDEN WEBHOOK** dla wszystkich kalkulatorów

✅ **Backend Google Apps Script:**

- Multi-kalkulator webhook (`google-apps-script.js`)
- Automatyczne tworzenie arkuszy per kalkulator
- Strukturyzowane dane kontaktów i kalkulacji

## 📋 KROK 1: Wdrożenie Google Apps Script

### 1.1 Utwórz nowy projekt Google Apps Script

1. Idź na <https://script.google.com>m>
2. Kliknij **"+ Nowy projekt"**
3. Usuń domyślny kod i wklej zawartość z pliku `google-apps-script.js`
4. Zmień nazwę projektu na np. "Kalkulatory Finansowe - Leady"

### 1.2 Wdróż jako aplikację webową

1. Kliknij **"Wdróż"** → **"Nowe wdrożenie"
2. W typie wybierz **"Aplikacja internetowa"**
3. Opis: `Webhook dla wszystkich kalkulatorów finansowych`
4. Wykonanie jako: **"Ja"**
5. Dostęp: **"Wszyscy"** (ważne!)
6. Kliknij **"Wdróż"**
7. **ZAPISZ URL WEBHOOKA** - będzie wyglądać jak:

   ```text
   https://script.google.com/macros/s/AKfycby...bardzo_długi_tekst.../exec
   ```

### 1.3 Udziel uprawnień

1. Przy pierwszym uruchomieniu kliknij **"Przejrzyj uprawnienia"
2. Wybierz swoje konto Google
3. Kliknij **"Zaawansowane"** → **"Przejdź do ..."**
4. Kliknij **"Zezwól"**

## 📋 KROK 2: Konfiguracja kalkulatorów - JEDEN URL

### 2.1 Zmień URL we WSZYSTKICH kalkulatorach jednocześnie

W **KAŻDYM** z 4 plików kalkulatorów znajdź linię:

```javascript
const KALKULATORY_WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

Zamień `YOUR_SCRIPT_ID` na swój prawdziwy ID z kroku 1.2:

```javascript
const KALKULATORY_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycby...twój_rzeczywisty_id.../exec';
```

### 2.2 Pliki do edycji (JEDEN URL w każdym)

- ✅ `kalkulator-hipoteczny/index.html` (linia ~12)
- ✅ `kalkulator-leasingu/index.html` (linia ~9)
- ✅ `kalkulator-samochodowy/index.html` (linia ~3)
- ✅ `kalkulator-zdolnosci/index.html` (linia ~3)

**🎉 JEDEN URL = JEDNA ZMIANA = ŁATWIEJSZE ZARZĄDZANIE!**

## 📋 KROK 3: Wgranie na serwer

### 3.1 Struktura plików do wgrania

```text
twoja-domena.pl/
├── kalkulatory/
│   ├── hipoteczny/
│   │   └── index.html
│   ├── leasing/
│   │   └── index.html
│   ├── samochodowy/
│   │   └── index.html
│   └── zdolnosc/
│       └── index.html
└── index.html (opcjonalnie - strona główna)
```

### 3.2 URLs dostępowe

- `https://twoja-domena.pl/kalkulatory/hipoteczny/`
- `https://twoja-domena.pl/kalkulatory/leasing/`
- `https://twoja-domena.pl/kalkulatory/samochodowy/`
- `https://twoja-domena.pl/kalkulatory/zdolnosc/`

## 📊 KROK 4: Sprawdzenie Google Sheets

Po pierwszym wysłaniu formularza, Apps Script automatycznie utworzy arkusze:

- **"Leady - Hipoteka"** - kontakty z kalkulatora hipotecznego
- **"Leady - Leasing"** - kontakty z kalkulatora leasingu
- **"Leady - Samochody"** - kontakty z kalkulatora samochodowego
- **"Leady - Zdolność"** - kontakty z kalkulatora zdolności

Każdy arkusz zawiera:

- Dane kontaktowe (imię, telefon, email)
- Szczegóły kalkulacji
- Timestamp
- Źródło (który kalkulator)

## 🧪 KROK 5: Testowanie

### 5.1 Test podstawowy

1. Wejdź na każdy kalkulator
2. Wykonaj 3 kalkulacje
3. Sprawdź czy pojawia się limit
4. Wypełnij formularz kontaktowy
5. Sprawdź czy dane pojawiły się w Google Sheets

### 5.2 Test resetowania

1. Po wysłaniu kontaktu limit powinien się zresetować
2. Ponownie powinno być można wykonać 3 kalkulacje

## 🔧 Rozwiązywanie problemów

### Problem: Formularz nie działa

```javascript
// Sprawdź w konsoli przeglądarki (F12) błędy
// Upewnij się, że URL Google Apps Script jest prawidłowy
```

### Problem: Dane nie pojawiają się w Sheets

- Sprawdź uprawnienia Apps Script
- Upewnij się, że wdrożenie jest aktywne
- Sprawdź logi Apps Script: <https://script.google.com> → twój projekt → "Wykonania"

### Problem: CORS błędy

- To normalne z Google Apps Script
- Dane i tak docierają, błąd możesz zignorować
- Dlatego używamy `mode: 'no-cors'`

## 📈 Monitoring leadów

### Automatyczne powiadomienia (opcjonalnie)

W Google Sheets możesz dodać:

- Powiadomienia email przy nowych leadach
- Integracje z CRM przez Zapier
- Automatyczne odpowiedzi

### Analytics (opcjonalnie)

Możesz dodać Google Analytics lub inne trackery do monitorowania:

- Konwersji (ile osób wypełnia formularze)
- Źródeł ruchu
- Najpopularniejszych kalkulatorów

## 🛡️ Bezpieczeństwo

✅ **Zaimplementowane zabezpieczenia:**

- Walidacja po stronie frontenu
- Sanityzacja danych w Apps Script
- Limity kalkulacji per użytkownik
- Mode no-cors dla bezpieczeństwa

⚠️ **Zalecenia dodatkowe:**

- Dodaj HTTPS (SSL) do domeny
- Rozważ dodanie reCAPTCHA do formularzy
- Monitoruj logi Apps Script pod kątem nadużyć

---

## 🎉 Gotowe

Teraz masz w pełni funkcjonalne kalkulatory finansowe z:

- ✅ Ograniczeniami biznesowymi
- ✅ Systemem leadów
- ✅ Automatyczną integracją z Google Sheets
- ✅ Profesjonalnym wyglądem
- ✅ Responsywnym designem

**Następne kroki:**

1. Przetestuj wszystkie funkcje
2. Udostępnij linki klientom
3. Monitoruj pierwsze leady w Google Sheets
4. Rozważ dodanie analytics i dalsze optymalizacje

Powodzenia! 🚀
