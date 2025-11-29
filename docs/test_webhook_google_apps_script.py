import requests

# Podaj tutaj swój URL webhooka Google Apps Script
WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbx3eZrmbp3YT6Aqc1cn9E0aChQpX9MIt_5cayoYp6FZmvQGwNF6FH1GKKieNk1uIwswxQ/exec"

# Przykładowe dane do wysyłki
payload_ok = {
    "name": "Test User",
    "email": "kontakt@dgloans.net",
    "phone": "123456789",
    "token": "SECURE_TOKEN"
}
payload_bad_email = {
    "name": "Test User",
    "email": "zlyemail",
    "phone": "123456789",
    "token": "SECURE_TOKEN"
}
payload_no_token = {
    "name": "Test User",
    "email": "kontakt@dgloans.net",
    "phone": "123456789"
}

def test_webhook(payload, description):
    print(f"Test: {description}")
    try:
        response = requests.post(WEBHOOK_URL, json=payload)
        print("Status:", response.status_code)
        print("Odpowiedź:", response.text)
    except Exception as e:
        print("Błąd:", e)
    print("-"*40)

if __name__ == "__main__":
    test_webhook(payload_ok, "Poprawne dane + token")
    test_webhook(payload_bad_email, "Błędny email + token")
    test_webhook(payload_no_token, "Poprawne dane bez tokena")
