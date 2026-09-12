<#
.SYNOPSIS
    Publikuje Kedai POS na GitHubie (numer wersji, cache, testy, commit, push).

.DESCRIPTION
    Wygodna nakładka na skrypt tools\push-release.mjs. Uruchamia go i czeka na
    zakończenie. Dwuklik na tym pliku też działa – okno nie zamknie się od razu.

.PARAMETER Rest
    Dowolne argumenty przekazywane do tools\push-release.mjs, np. -m "Opis zmiany".

.EXAMPLE
    .\push-github.ps1 -m "Nowy przycisk w Ustawieniach"

.EXAMPLE
    .\push-github.ps1 --dry-run

.EXAMPLE
    .\push-github.ps1 -m "Poprawka" -y
#>
param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]] $Rest
)

$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$script = Join-Path $root 'tools\push-release.mjs'

if (-not (Test-Path -LiteralPath $script)) {
    Write-Host "Nie znalazłem skryptu: $script" -ForegroundColor Red
    exit 1
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host 'Brak Node.js w PATH – zainstaluj Node i spróbuj ponownie.' -ForegroundColor Red
    exit 1
}

Push-Location -LiteralPath $root
try {
    & node $script @Rest
    $code = $LASTEXITCODE
} finally {
    Pop-Location
}

# Gdy plik uruchomiono dwuklikiem (proces nadrzędny to explorer), nie zamykaj okna.
$launchedFromExplorer = $false
try {
    $parentId = (Get-CimInstance Win32_Process -Filter "ProcessId = $PID").ParentProcessId
    if ($parentId -and (Get-Process -Id $parentId -ErrorAction SilentlyContinue).ProcessName -eq 'explorer') {
        $launchedFromExplorer = $true
    }
} catch {
    $launchedFromExplorer = $false
}

if ($launchedFromExplorer) {
    Write-Host ''
    Read-Host 'Naciśnij Enter, aby zamknąć okno'
}

exit $code
