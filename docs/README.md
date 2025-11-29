# 🏦 DGFINANCES - Kalkulatory Finansowe z Lead Generation

Profesjonalny system 4 kalkulatorów finansowych z ograniczeniami biznesowymi, formularzami kontaktowymi i automatycznym zapisem leadów do Google Sheets.

## 🎆 **Funkcjonalności biznesowe**

- 📏 **Limity użytkownika:** 3 kalkulacje na użytkownika przed kontaktem
- 📞 **System leadów:** Automatyczne przechwytywanie kontaktów po osiągnięciu limitu
- 📈 **Google Sheets CRM:** Jeden webhook dla wszystkich kalkulatorów
- 🎨 **Profesjonalny design:** Responsive, dark theme z animacjami
- ⚙️ **Gotowe do wdrożenia:** Pełne instrukcje i skrypty automatyzujące

## 📁 Struktura projektu

```text
kalkulatorhipoteczny/
├── index.html                          # Strona główna z panelem kalkulatorów
├── kalkulator-hipoteczny/
│   └── index.html                      # Kalkulator Hipoteczny + formularze
├── kalkulator-leasingu/
│   └── index.html                      # Kalkulator Leasingu + formularze
├── kalkulator-zdolnosci/
│   └── index.html                      # Kalkulator Zdolności + formularze
├── kalkulator-samochodowy/
│   └── index.html                      # Kalkulator Samochodowy + formularze
├── google-apps-script.js              # Multi-kalkulator webhook (Google Sheets)
├── INSTRUKCJE_WDROZENIA.md            # Szczegółowe instrukcje wdrożenia
├── STATUS_SPRAWDZENIA_FORMULARZY.md   # Raport stanu formularzy
├── publish_github.ps1                 # Skrypt wdrożenia (Windows)
├── publish_github.sh                  # Skrypt wdrożenia (Linux/Mac)
└── README.md
```

## 📊 Zawartość

### 🧮 Kalkulatory z funkcjonalnościami biznesowymi

- **🏠 Kalkulator Hipoteczny** - raty kredytu, harmonogram spłat, LTV, limity użytkownika
- **🚗 Kalkulator Leasingu** - leasing operacyjny/finansowy, wartość końcowa, formularze kontaktowe
- **💰 Kalkulator Zdolności** - maksymalna kwota kredytu, analiza dochodów, DTI
- **🚙 Kalkulator Samochodowy** - raty, całkowity koszt, porównanie ofert

### 🛠️ Pliki systemowe

- `google-apps-script.js` - webhook do Google Sheets (obsługuje wszystkie kalkulatory)
- `INSTRUKCJE_WDROZENIA.md` - pełny przewodnik wdrożenia krok po kroku
- `STATUS_SPRAWDZENIA_FORMULARZY.md` - raport stanu i testów formularzy
- Skrypty publikacji: `publish_github.ps1` / `publish_github.sh`

## 🏠 Kalkulator Hipoteczny

Funkcje kalkulatora hipotecznego:

- Obliczanie rat kredytu (równe i malejące)
- Harmonogram spłat (miesięczny/roczny)
- Kalkulacja całkowitego kosztu kredytu
- Wizualizacja podziału kapitał/odsetki
- Wskaźnik LTV (Loan to Value)
- Uwzględnienie prowizji i ubezpieczenia pomostowego
- **Limit 3 kalkulacji przed kontaktem**
- **Formularz kontaktowy z integracją Google Sheets**
- Responsywny design z dark theme

## 📈 System Lead Generation (Google Apps Script)

**JEDEN WEBHOOK DLA WSZYSTKICH KALKULATORÓW** - obsługuje automatyczne rozpoznawanie typu kalkulatora i tworzy oddzielne arkusze.

### Szybka konfiguracja

1. Otwórz <https://script.google.com>
2. Kliknij **"+ Nowy projekt"**
3. Wklej całą zawartość z `google-apps-script.js`
4. **Wdróż → Nowe wdrożenie → Aplikacja internetowa**
5. Ustawienia: **Wykonanie jako: "Ja"**, **Dostęp: "Wszyscy"**
6. **Skopiuj URL webhooka**
7. Zmień `KALKULATORY_WEBHOOK_URL` we wszystkich 4 kalkulatorach

### Automatyczne arkusze w Google Sheets

- **"Kalkulator Hipoteczny"** - leady z kalkulatora hipotecznego
- **"Kalkulator Leasingu"** - leady z kalkulatora leasingu  
- **"Kalkulator Samochodowy"** - leady z kalkulatora samochodowego
- **"Kalkulator Zdolności"** - leady z kalkulatora zdolności

📄 **Pełne instrukcje:** Zobacz `INSTRUKCJE_WDROZENIA.md`

## 🚀 Szybkie wdrożenie

### 1) GitHub Pages (polecane)

1. Utwórz repo na GitHub i wrzuć wszystkie pliki do katalogu głównego
2. Push na branch `main`
3. **Settings → Pages → Source**: wybierz `main` / `/ (root)`
4. Strona będzie dostępna pod: `https://TWOJ_LOGIN.github.io/REPO_NAME/`

### URLs do kalkulatorów

- `https://TWOJ_LOGIN.github.io/REPO_NAME/kalkulator-hipoteczny/`
- `https://TWOJ_LOGIN.github.io/REPO_NAME/kalkulator-leasingu/`
- `https://TWOJ_LOGIN.github.io/REPO_NAME/kalkulator-zdolnosci/`
- `https://TWOJ_LOGIN.github.io/REPO_NAME/kalkulator-samochodowy/`

**Iframe do osadzenia w Webador:**

```html
<!-- Panel wyboru kalkulatorów -->
<iframe src="https://TWOJ_LOGIN.github.io/REPO_NAME/" 
        style="width:100%;height:900px;border:0;"></iframe>

<!-- Kalkulator hipoteczny -->
<iframe src="https://TWOJ_LOGIN.github.io/REPO_NAME/kalkulator-hipoteczny/" 
        style="width:100%;height:900px;border:0;"></iframe>

<!-- Kalkulator leasingu -->
<iframe src="https://TWOJ_LOGIN.github.io/REPO_NAME/kalkulator-leasingu/" 
        style="width:100%;height:900px;border:0;"></iframe>

<!-- Kalkulator zdolności -->
<iframe src="https://TWOJ_LOGIN.github.io/REPO_NAME/kalkulator-zdolnosci/" 
        style="width:100%;height:900px;border:0;"></iframe>

<!-- Kalkulator kredytu samochodowego -->
<iframe src="https://TWOJ_LOGIN.github.io/REPO_NAME/kalkulator-samochodowy/" 
        style="width:100%;height:900px;border:0;"></iframe>
```

### 2) Netlify (drag & drop)

1. Otwórz <https://app.netlify.com/drop> i przeciągnij całą zawartość folderu
2. Netlify poda publiczny URL - użyj go w iframe

### 3) Ręczne polecenia Git

```bash
git init
git add .
git commit -m "Add DGFINANCES calculators with lead generation"
git branch -M main
git remote add origin https://github.com/TWOJ_LOGIN/REPO_NAME.git
git push -u origin main
```

**Lub użyj przygotowanych skryptów:**

- **Windows (PowerShell)**: `.\publish_github.ps1`
- **Linux/Mac (bash)**: `./publish_github.sh`

## 📝 Dokumentacja

- **`INSTRUKCJE_WDROZENIA.md`** - szczegółowy przewodnik wdrożenia krok po kroku
- **`STATUS_SPRAWDZENIA_FORMULARZY.md`** - raport stanu formularzy i testów
- **`google-apps-script.js`** - kod webhooka z pełną dokumentacją

## ✨ **Funkcjonalności biznesowe**

✅ **System limitów użytkownika** - 3 kalkulacje przed kontaktem  
✅ **Automatyczne formularze** - pojawienie po osiągnięciu limitu  
✅ **Google Sheets CRM** - automatyczny zapis leadów  
✅ **Reset po kontakcie** - odblokowanie pełnego dostępu  
✅ **Multi-kalkulator webhook** - jeden backend dla wszystkich  
✅ **Responsywny design** - działa na wszystkich urządzeniach  
✅ **Professional UI** - nowoczesny dark theme z animacjami  
✅ **Gotowe do produkcji** - pełne instrukcje i testy  

## 📞 **Kontakt i wsparcie**

System jest w pełni gotowy do wdrożenia. Wszystkie funkcjonalności zostały przetestowane i są udokumentowane w `INSTRUKCJE_WDROZENIA.md`.

**Powodzenia z wdrożeniem!** 🚀
