# Deploy & GitHub Pages — instrukcje

Uwaga: nie wklejaj tokenów (PAT) publicznie. Jeśli token wyciekł, natychmiast go odwołaj.

1) Natychmiastowe kroki bezpieczeństwa
- Otwórz: `https://github.com/settings/tokens` lub `https://github.com/settings/tokens/classic`
- Znajdź i *Revoke/Delete* wszystkie tokeny zaczynające się od `ghp_...`, które mogły wyciec.
- Jeśli używałeś tokena w tym terminalu: `unset GH_TOKEN` i usuń wpisy z historii (`history -d <nr>`).

2) Zalogowanie `gh` (zalecane, bez wklejania tokenów tutaj)
- Interaktywnie:
  ```bash
  gh auth login
  ```
  Wybierz `GitHub.com`, `HTTPS`, metodę `Web browser` i zaloguj się.
- Jeśli musisz użyć PAT lokalnie (nie publikuj go):
  ```bash
  export GH_TOKEN="TWÓJ_NOWY_TOKEN"
  echo "$GH_TOKEN" | gh auth login --with-token
  unset GH_TOKEN
  ```

3) Włączenie GitHub Pages (UI)
- Otwórz: `https://github.com/DaviiTag25/kalkulator/settings/pages`
- W sekcji "Build and deployment" wybierz: `Branch: main` i `Folder: / (root)` → Save

4) Włączenie GitHub Pages (CLI) — po poprawnym zalogowaniu `gh`
```bash
gh api -X POST /repos/DaviiTag25/kalkulator/pages -f source.branch=main -f source.path=/
gh api /repos/DaviiTag25/kalkulator/pages --jq .html_url
```

5) Lokalny podgląd strony
```bash
python3 -m http.server 8000 --directory extracted/kalkulator-main
# potem otwórz w przeglądarce: http://127.0.0.1:8000/kalkulator-hipoteczny/index.html
```

6) Co zrobić gdy pojawi się błąd 403 "Resource not accessible by integration"
- Token `gh` może nie mieć wystarczających uprawnień (scopes). Wygeneruj PAT z zakresem `repo` (dla prywatnych) lub `public_repo` (dla publicznych) i zaloguj `gh` ponownie.
- W organizacjach mogą istnieć dodatkowe polityki (admin musi nadać dostęp lub włączyć Pages).

7) Kontakt / dalsze kroki
- Gdy potwierdzisz, że usunąłeś wyciekły token i `gh auth status` zwróci sukces — napisz `zalogowano` a ja spróbuję automatycznie włączyć Pages i podam URL.

Plik stworzony automatycznie przez skrypt deploy w repozytorium.
