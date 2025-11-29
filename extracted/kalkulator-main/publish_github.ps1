# publish_github.ps1
<#
.SYNOPSIS
    Inicjalizuje repozytorium Git i publikuje pliki na zdalnym repozytorium GitHub.
.DESCRIPTION
    Skrypt automatyzuje proces inicjalizacji lokalnego repozytorium Git, dodawania plików,
    tworzenia commita i wysyłania ich do zdalnego repozytorium na GitHub.
    DGFINANCES - System kalkulatorów finansowych z lead generation.
.PARAMETER RemoteUrl
    Adres URL zdalnego repozytorium GitHub w formacie https://github.com/USER/REPO.git.
.PARAMETER BranchName
    Nazwa gałęzi, na którą mają zostać wysłane zmiany. Domyślnie 'main'.
.PARAMETER CommitMessage
    Opis commita. Domyślnie 'Add DGFINANCES calculators with lead generation system'.
.PARAMETER ForcePush
    Przełącznik, który wymusza wysłanie zmian (`git push --force`). Używaj z ostrożnością.
.EXAMPLE
    .\publish_github.ps1 -RemoteUrl "https://github.com/twoja-nazwa/twoje-repo.git"
.EXAMPLE
    .\publish_github.ps1 -RemoteUrl "https://github.com/twoja-nazwa/twoje-repo.git" -BranchName "develop" -CommitMessage "Initial commit on dev" -ForcePush
#>
param(
    [Parameter(Mandatory=$true, HelpMessage="Podaj URL zdalnego repozytorium (https://github.com/USER/REPO.git)")]
    [ValidatePattern('\.git$')]
    [string]$RemoteUrl,

    [Parameter(Mandatory=$false)]
    [string]$BranchName = "main",

    [Parameter(Mandatory=$false)]
    [string]$CommitMessage = "Add DGFINANCES calculators with lead generation system",

    [Parameter(Mandatory=$false)]
    [switch]$ForcePush
)

try {
    # Funkcja pomocnicza do wywoływania poleceń git i sprawdzania błędów
    function Invoke-GitCommand {
        param($Arguments)
        
        # Ukryj wyjście, chyba że wystąpi błąd, aby interfejs był czystszy
        $output = git @Arguments 2>&1
        if ($LASTEXITCODE -ne 0) {
            throw "Polecenie 'git $Arguments' zakończyło się błędem (kod: $LASTEXITCODE).`nSzczegóły: $output"
        }
        # Zwróć wyjście w przypadku sukcesu, jeśli jest potrzebne
        return $output
    }

    # Sprawdzenie, czy git działa (wyjście jest ukryte przez funkcję)
    Invoke-GitCommand -Arguments @("--version")

    # Jeśli katalog .git nie istnieje, zainicjuj repo
    if (-not (Test-Path .git -PathType Container)) {
        Write-Host "Inicjalizuję nowe repozytorium Git..."
        # Używamy bezpośrednio git, bo `Invoke-GitCommand` ukryłby pomocne wyjście `git init`
        git init
        if ($LASTEXITCODE -ne 0) { throw "Inicjalizacja repozytorium Git nie powiodła się." }
    }

    # Upewnij się, że gałąź istnieje, jeśli nie - utwórz ją
    $branchExists = git branch --list $BranchName
    if (-not $branchExists) {
        Write-Host "Tworzę i przełączam na nową gałąź: $BranchName"
        git checkout -b $BranchName
        if ($LASTEXITCODE -ne 0) { throw "Nie udało się utworzyć gałęzi $BranchName." }
    } elseif ((git symbolic-ref --short HEAD) -ne $BranchName) {
        Write-Host "Przełączam na istniejącą gałąź: $BranchName"
        git checkout $BranchName
        if ($LASTEXITCODE -ne 0) { throw "Nie udało się przełączyć na gałąź $BranchName." }
    }

    # Dodaj pliki i commit
    Write-Host "Dodaję pliki do przechowalni..."
    Invoke-GitCommand -Arguments @("add", ".")
    Write-Host "Tworzę commit z wiadomością: `"$CommitMessage`"..."
    Invoke-GitCommand -Arguments @("commit", "-m", $CommitMessage, "--allow-empty")

    # Dodaj remote (nadpisze, jeśli istnieje)
    if (git remote | Where-Object { $_ -eq 'origin' }) {
        Invoke-GitCommand -Arguments @("remote", "remove", "origin")
    }
    Invoke-GitCommand -Arguments @("remote", "add", "origin", $RemoteUrl)

    # Push
    $pushArgs = @("push", "-u", "origin", $BranchName)
    if ($ForcePush.IsPresent) {
        $pushArgs += "--force"
    }
    Write-Host "Wysyłam zmiany na $RemoteUrl (gałąź: $BranchName)..."
    Write-Host "Może być konieczne podanie poświadczeń..."
    Invoke-GitCommand -Arguments $pushArgs

    Write-Host "Gotowe — pliki wypchnięte do $RemoteUrl. Sprawdź ustawienia GitHub Pages w ustawieniach repozytorium."
    Write-Host "System kalkulatorów DGFINANCES z lead generation jest gotowy do użycia!"
}
catch {
    Write-Error "Wystąpił błąd: $_"
    exit 1
}