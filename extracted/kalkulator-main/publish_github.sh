#!/bin/bash
# publish_github.sh
# Skrypt bash do inicjalizacji repo i wypchnięcia plików na zdalne repozytorium GitHub
# DGFINANCES - System kalkulatorów finansowych z lead generation
# Uwaga: podaj URL zdalnego repo w formacie https://github.com/USER/REPO.git

if ! command -v git &> /dev/null; then
    echo "Błąd: Git nie jest zainstalowany lub nie jest dostępny w PATH. Zainstaluj Git i spróbuj ponownie."
    exit 1
fi

read -p "Wklej URL zdalnego repozytorium (https://github.com/USER/REPO.git): " remote
if [ -z "$remote" ]; then
    echo "Błąd: Nie podano URL. Anuluję."
    exit 1
fi

# Jeśli katalog .git nie istnieje, zainicjuj repo
if [ ! -d .git ]; then
    git init
fi

# Upewnij się, że branch main istnieje
if ! git rev-parse --verify main &> /dev/null; then
    git checkout -b main
fi

# Dodaj pliki i commit
git add .
git commit -m "Add DGFINANCES calculators with lead generation system" --allow-empty

# Dodaj remote (nadpisze, jeśli istnieje)
if git remote | grep -q '^origin$'; then
    git remote remove origin
fi

git remote add origin "$remote"

# Push
echo "Wysyłam na $remote (branch: main). Jeśli wymagane są poświadczenia, podaj je gdy git poprosi."
git push -u origin main

if [ $? -ne 0 ]; then
    echo "Błąd: Push zakończony niepowodzeniem. Sprawdź poświadczenia i uprawnienia repozytorium."
    exit 1
fi

echo "Gotowe — pliki wypchnięte do $remote. Sprawdź ustawienia GitHub Pages w ustawieniach repozytorium."
echo "System kalkulatorów DGFINANCES z lead generation jest gotowy do użycia!"
