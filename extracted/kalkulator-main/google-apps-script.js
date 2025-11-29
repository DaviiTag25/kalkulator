/**
 * Google Apps Script - Kalkulatory DGFINANCES - Webhook do Google Sheets
 * Obsługuje wszystkie kalkulatory: Hipoteczny, Leasing, Samochodowy, Zdolność Kredytowa
 * ZAPISUJE DO KONKRETNEGO ARKUSZA: 1gLifg2EGmWrOgE2XMolSfpZsvwvUQMmlOEIIYLZmm64
 * 
 * ⚡ INSTRUKCJA WDROŻENIA:
 * 1. Otwórz https://script.google.com
 * 2. Kliknij "Nowy projekt"
 * 3. Wklej ten kod (zastąp domyślny kod)
 * 4. Zapisz projekt (Ctrl+S) i nadaj nazwę: "DGFINANCES Webhook"
 * 5. Kliknij "Wdróż" > "Nowe wdrożenie"
 * 6. Wybierz typ: "Aplikacja internetowa"
 * 7. Wykonanie jako: "Ja (twój@email.com)"
 * 8. Kto ma dostęp: "Wszyscy"
 * 9. Kliknij "Wdróż" i skopiuj URL
 * 10. URL użyj w zmiennej WEBHOOK_URL w każdym kalkulatorze
 * 
 * 🔧 TEST DZIAŁANIA:
 * - Uruchom funkcję testWebhook() w edytorze
 * - Sprawdź czy dane pojawiły się w Google Sheets
 * - Zweryfikuj endpoint GET przez przeglądarkę
 * 
 * 📊 ARKUSZE GOOGLE SHEETS:
 * - ID: 1gLifg2EGmWrOgE2XMolSfpZsvwvUQMmlOEIIYLZmm64
 * - Automatyczne tworzenie arkuszy dla każdego kalkulatora
 * - Formatowanie nagłówków i auto-resize kolumn
 * 
 * 🚨 UWAGA: Upewnij się że arkusz Google Sheets jest udostępniony z edytowaniem!
 */

function doPost(e) {
  try {
    // Debug logging
    console.log('Received request:', e);
    
    // Pobierz dane z żądania
    let data;
    if (e.postData && e.postData.type === 'application/json') {
      data = JSON.parse(e.postData.contents);
    } else if (e.postData) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Tylko JSON jest obsługiwany'
      })).setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Brak danych w żądaniu'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    

    // Weryfikacja tokena bezpieczeństwa
    const EXPECTED_TOKEN = 'SECURE_TOKEN_123'; // ustaw swój token
    if (!data.token || data.token !== EXPECTED_TOKEN) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Nieprawidłowy token bezpieczeństwa',
        timestamp: new Date().toISOString()
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Walidacja emaila i telefonu
    const email = (data.contact && data.contact.email) || data.email || '';
    const phone = (data.contact && data.contact.phone) || data.phone || '';
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    const phoneRegex = /^\+?[0-9\s-]{7,}$/;
    if (!emailRegex.test(email)) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Nieprawidłowy adres email',
        timestamp: new Date().toISOString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
    if (!phoneRegex.test(phone)) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Nieprawidłowy numer telefonu',
        timestamp: new Date().toISOString()
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const calculatorType = data.calculatorType || 'unknown';
    const timestamp = new Date().toISOString();
    
    // Debug logging
    console.log('Processing calculator type:', calculatorType);
    console.log('Data received:', data);
    
    // Użyj konkretnego arkusza zamiast tworzenia nowego
    const SPREADSHEET_ID = '1gLifg2EGmWrOgE2XMolSfpZsvwvUQMmlOEIIYLZmm64';
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Utwórz oddzielny arkusz dla każdego kalkulatora
    const sheetNames = {
      'mortgage': 'Kalkulator Hipoteczny',
      'leasing': 'Kalkulator Leasingu', 
      'car_loan': 'Kalkulator Samochodowy',
      'credit_capacity': 'Kalkulator Zdolności',
      'test': 'Testy'  // Dodaj arkusz dla testów
    };
    
    const sheetName = sheetNames[calculatorType] || 'Pozostałe';
    let sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      console.log('Creating new sheet:', sheetName);
      sheet = ss.insertSheet(sheetName);
      
      // Różne nagłówki dla różnych kalkulatorów
      let headers;
      switch(calculatorType) {
        case 'mortgage':
          headers = [
            'Data/Czas', 'Imię i Nazwisko', 'Telefon', 'Email', 'Preferowany Kontakt',
            'Wartość Nieruchomości', 'Wkład Własny %', 'Kwota Kredytu', 'Okres (lata)',
            'Oprocentowanie %', 'Typ Rat', 'Rata Miesięczna', 'Suma Odsetek', 'LTV %'
          ];
          break;
        case 'leasing':
          headers = [
            'Data/Czas', 'Imię i Nazwisko', 'Telefon', 'Email', 'Preferowany Kontakt',
            'Cena Pojazdu', 'Tryb Ceny', 'VAT %', 'Wpłata %', 'Okres (mies.)',
            'Oprocentowanie %', 'Balon %', 'Opłata Wstępna', 'Firma Leasingowa', 'Rata Miesięczna'
          ];
          break;
        case 'car_loan':
          headers = [
            'Data/Czas', 'Imię i Nazwisko', 'Telefon', 'Email', 'Preferowany Kontakt',
            'Cena Samochodu', 'Wpłata Własna', 'Kwota Kredytu', 'Okres (mies.)',
            'Oprocentowanie %', 'Rata Miesięczna', 'Całkowity Koszt'
          ];
          break;
        case 'credit_capacity':
          headers = [
            'Data/Czas', 'Imię i Nazwisko', 'Telefon', 'Email', 'Preferowany Kontakt',
            'Dochód Netto', 'Liczba Osób', 'Zobowiązania', 'Limity', 'Okres (mies.)',
            'Maksymalna Kwota Kredytu', 'Bezpieczna Rata'
          ];
          break;
        case 'test':
          headers = [
            'Data/Czas', 'Imię i Nazwisko', 'Telefon', 'Email', 'Typ Kalkulatora', 'Dane'
          ];
          break;
        default:
          headers = [
            'Data/Czas', 'Imię i Nazwisko', 'Telefon', 'Email', 'Typ Kalkulatora', 'Dane'
          ];
      }
      
      sheet.appendRow(headers);
      
      // Formatowanie nagłówków
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4a5568');
      headerRange.setFontColor('#ffffff');
    }
    
    // Przygotuj wiersz danych
    let row;
    
    // Obsługuj oba formaty danych (stary i nowy)
    const contact = data.contact || {
      name: data.clientName || '',
      phone: data.clientPhone || '',
      email: data.clientEmail || '',
      preferredTime: data.preferredTime || ''
    };
    const calc = data.calculation || {};
    
    switch(calculatorType) {
      case 'mortgage':
        row = [
          timestamp,
          contact.name || '',
          contact.phone || '',
          contact.email || '',
          contact.preferredTime || '',
          calc.propertyValue || '',
          calc.downPaymentPct || '',
          calc.loanAmount || '',
          calc.loanTermYears || '',
          calc.interestRate || '',
          calc.paymentType || '',
          calc.monthlyPayment || '',
          calc.totalInterest || '',
          calc.ltv || ''
        ];
        break;
        
      case 'leasing':
        row = [
          timestamp,
          contact.name || '',
          contact.phone || '',
          contact.email || '',
          contact.preferredTime || '',
          calc.vehiclePrice || '',
          calc.priceMode || '',
          calc.vatPct || '',
          calc.downPct || '',
          calc.months || '',
          calc.apr || '',
          calc.balloonPct || '',
          calc.setupFee || '',
          calc.leasingCompany || '',
          calc.monthlyPayment || ''
        ];
        break;
        
      case 'car_loan':
        row = [
          timestamp,
          contact.name || '',
          contact.phone || '',
          contact.email || '',
          contact.preferredTime || '',
          calc.carPrice || '',
          calc.downPayment || '',
          calc.loanAmount || '',
          calc.months || '',
          calc.interestRate || '',
          calc.monthlyPayment || '',
          calc.totalCost || ''
        ];
        break;
        
      case 'credit_capacity':
        row = [
          timestamp,
          contact.name || '',
          contact.phone || '',
          contact.email || '',
          contact.preferredTime || '',
          calc.income || '',
          calc.family || '',
          calc.liabilities || '',
          calc.limits || '',
          calc.months || '',
          calc.maxLoanAmount || '',
          calc.safeInstallment || ''
        ];
        break;
        
      case 'test':
        row = [
          timestamp,
          contact.name || '',
          contact.phone || '',
          contact.email || '',
          calculatorType,
          JSON.stringify(data)
        ];
        break;
        
      default:
        row = [
          timestamp,
          contact.name || '',
          contact.phone || '',
          contact.email || '',
          calculatorType,
          JSON.stringify(data)
        ];
    }
    
    console.log('Appending row:', row);
    sheet.appendRow(row);
    
    // Auto-resize kolumn przy pierwszym zapisie
    if (sheet.getLastRow() === 2) {
      sheet.autoResizeColumns(1, row.length);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Lead zapisany pomyślnie',
      calculatorType: calculatorType,
      timestamp: timestamp
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Logowanie szczegółowego błędu do konsoli
    console.error('Błąd w doPost:', error);
    console.error('Stack trace:', error.stack);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString(),
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    'Google Apps Script webhook dla Kalkulatorów DGFINANCES działa!\n' +
    'Obsługiwane kalkulatory: Hipoteczny, Leasing, Samochodowy, Zdolność Kredytowa\n' +
    'Użyj POST z danymi JSON do wysyłania leadów.'
  );
}

/**
 * Funkcja testowa - można uruchomić ręcznie w Google Apps Script
 */
function testWebhook() {
  const testData = {
    calculatorType: 'mortgage',
    contact: {
      name: 'Jan Kowalski',
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
      monthlyPayment: 2891.23,
      totalInterest: 467369,
      ltv: 80
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
