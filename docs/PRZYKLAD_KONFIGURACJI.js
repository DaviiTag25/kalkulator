/* 
🚀 PRZYKŁAD KONFIGURACJI - JEDEN URL DLA WSZYSTKICH

Zamiast konfigurować 4 różne URL, teraz masz JEDEN webhook dla wszystkich kalkulatorów!

PRZED (skomplikowane):
- Kalkulator hipoteczny: URL_1
- Kalkulator leasingu: URL_2  
- Kalkulator samochodowy: URL_3
- Kalkulator zdolności: URL_4

TERAZ (proste):
- WSZYSTKIE KALKULATORY: JEDEN URL!

*/

// 1. Wdróż google-apps-script.js w Google Apps Script
// 2. Skopiuj URL (np. https://script.google.com/macros/s/AKfycby123.../exec)
// 3. Zamień w WSZYSTKICH 4 plikach tę linię:

const KALKULATORY_WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// NA:

const KALKULATORY_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycby123abc.../exec';

/* 
✅ ZALETY JEDNEGO WEBHOOKA:
- Łatwiejsze zarządzanie
- Jeden URL do zapamiętania  
- Centralizowane logi
- Automatyczne rozpoznawanie typu kalkulatora
- Jeden arkusz Google Sheets z wieloma zakładkami

🎯 BACKEND AUTOMATYCZNIE ROZPOZNAJE:
- calculatorType: 'mortgage' → arkusz "Leady - Hipoteka"
- calculatorType: 'leasing' → arkusz "Leady - Leasing"  
- calculatorType: 'car_loan' → arkusz "Leady - Samochody"
- calculatorType: 'credit_capacity' → arkusz "Leady - Zdolność"
*/