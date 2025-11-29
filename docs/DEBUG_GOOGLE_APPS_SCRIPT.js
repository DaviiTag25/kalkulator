// DEBUGOWANIE GOOGLE APPS SCRIPT - SPRAWDŹ TE KROKI

// 1. SPRAWDŹ LOGI W GOOGLE APPS SCRIPT
// Idź na https://script.google.com → twój projekt → "Wykonania" (Executions)
// Sprawdź czy są błędy w logach

// 2. SPRAWDŹ UPRAWNIENIA DO ARKUSZA
// Arkusz musi być dostępny dla skryptu
// ID arkusza: 1gLifg2EGmWrOgE2XMolSfpZsvwvUQMmlOEIIYLZmm64

// 3. TESTUJ FUNKCJĘ RĘCZNIE
// W Google Apps Script uruchom funkcję testWebhook():
function testWebhook() {
  const testData = {
    calculatorType: 'mortgage',
    contact: {
      name: 'Jan Kowalski TEST',
      phone: '+48 600 123 456',
      email: 'kontakt@dgloans.net',
      preferredTime: 'afternoon'
    },
    calculation: {
      propertyValue: 500000,
      downPaymentPct: 20,
      loanAmount: 400000,
      loanTermYears: 25,
      interestRate: 7.5,
      paymentType: 'equal',
      monthlyPayment: '2,891.23 zł',
      totalInterest: '467,369 zł',
      ltv: '80%'
    }
  };
  
  const e = {
    postData: {
      type: 'application/json',
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(e);
  console.log(result.getContent());
}

// 4. SPRAWDŹ BROWSER CONSOLE
// Otwórz F12 w przeglądarce i sprawdź czy są błędy JavaScript

// 5. SPRAWDŹ NETWORK TAB
// W F12 → Network sprawdź czy request do Google Apps Script się wysyła

// MOŻLIWE PRZYCZYNY:
// - Brak uprawnień do arkusza
// - Błąd w Google Apps Script
// - CORS blocking
// - Nieprawidłowy URL webhooka
// - Błąd w formularzu (niepoprawne ID pól)