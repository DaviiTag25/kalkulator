import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options

# Konfiguracja
URL = "http://localhost:8080/kalkulator-hipoteczny/"

# Testowe dane
TEST_EMAIL_OK = "kontakt@dgloans.net"
TEST_EMAIL_BAD = "zlyemail"
TEST_PHONE_OK = "123456789"
TEST_PHONE_BAD = "abc"

# Identyfikatory pól (dostosuj jeśli inne)
FIELD_EMAIL = "email"
FIELD_PHONE = "phone"
FIELD_NAME = "name"
FIELD_SUBMIT = "submit"
FIELD_CONFIRM = "confirmation"
FIELD_ERROR = "error"

# Inicjalizacja przeglądarki
options = Options()
options.add_argument('--headless')
driver = webdriver.Chrome(options=options)
driver.get(URL)
time.sleep(1)

# Test 1: Walidacja email
email_input = driver.find_element(By.NAME, FIELD_EMAIL)
email_input.clear()
email_input.send_keys(TEST_EMAIL_BAD)
email_input.send_keys(Keys.TAB)
time.sleep(0.5)
try:
    error = driver.find_element(By.CLASS_NAME, FIELD_ERROR)
    print("[EMAIL BAD] Komunikat błędu:", error.text)
except:
    print("[EMAIL BAD] Brak komunikatu błędu!")

email_input.clear()
email_input.send_keys(TEST_EMAIL_OK)
email_input.send_keys(Keys.TAB)
time.sleep(0.5)
try:
    error = driver.find_element(By.CLASS_NAME, FIELD_ERROR)
    print("[EMAIL OK] Komunikat błędu:", error.text)
except:
    print("[EMAIL OK] Brak komunikatu błędu (poprawnie)")

# Test 2: Walidacja telefonu
phone_input = driver.find_element(By.NAME, FIELD_PHONE)
phone_input.clear()
phone_input.send_keys(TEST_PHONE_BAD)
phone_input.send_keys(Keys.TAB)
time.sleep(0.5)
try:
    error = driver.find_element(By.CLASS_NAME, FIELD_ERROR)
    print("[PHONE BAD] Komunikat błędu:", error.text)
except:
    print("[PHONE BAD] Brak komunikatu błędu!")

phone_input.clear()
phone_input.send_keys(TEST_PHONE_OK)
phone_input.send_keys(Keys.TAB)
time.sleep(0.5)
try:
    error = driver.find_element(By.CLASS_NAME, FIELD_ERROR)
    print("[PHONE OK] Komunikat błędu:", error.text)
except:
    print("[PHONE OK] Brak komunikatu błędu (poprawnie)")

# Test 3: Wysyłka formularza
name_input = driver.find_element(By.NAME, FIELD_NAME)
name_input.clear()
name_input.send_keys("Test User")
email_input.clear()
email_input.send_keys(TEST_EMAIL_OK)
phone_input.clear()
phone_input.send_keys(TEST_PHONE_OK)

submit_btn = driver.find_element(By.NAME, FIELD_SUBMIT)
submit_btn.click()
time.sleep(1)
try:
    confirm = driver.find_element(By.CLASS_NAME, FIELD_CONFIRM)
    print("[SUBMIT] Potwierdzenie wysyłki:", confirm.text)
except:
    print("[SUBMIT] Brak potwierdzenia wysyłki!")

driver.quit()
