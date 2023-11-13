#!/usr/bin/env pwsh
# Build an archive for the current version
# Usage: ./build.ps1

Remove-Item emoji-keyboard.zip -ErrorAction Ignore
$status = git status --porcelain
if ($LASTEXITCODE -ne 0)
{
    Write-Error "git status failed with code $LASTEXITCODE"
    exit 1
}
if ($status)
{
    Write-Warning "The repository is not clean!`n$status"
}
git archive --format zip -o emoji-keyboard.zip HEAD
Write-Host "Created emoji-keyboard.zip"
