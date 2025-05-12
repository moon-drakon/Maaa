# Mother's Day Tribute Website - GitHub Pages Preparation Script
# This script helps verify and prepare your website for GitHub Pages deployment

Write-Host "Mother's Day Tribute Website - GitHub Pages Preparation" -ForegroundColor Magenta
Write-Host "=================================================" -ForegroundColor Magenta

# Get the directory where the script is located
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -Path $scriptPath

# Functions
function Test-FileExists {
    param (
        [string]$FilePath
    )
    
    if (Test-Path $FilePath) {
        Write-Host "✓ Found: $FilePath" -ForegroundColor Green
        return $true
    } else {
        Write-Host "✗ Missing: $FilePath" -ForegroundColor Red
        return $false
    }
}

function Test-AudioFilesExist {
    Write-Host "`nChecking audio files..." -ForegroundColor Cyan
    
    $audioFolder = Join-Path -Path $scriptPath -ChildPath "audio"
    if (-not (Test-Path $audioFolder)) {
        Write-Host "✗ Audio folder not found!" -ForegroundColor Red
        return
    }
    
    Test-FileExists -FilePath (Join-Path -Path $audioFolder -ChildPath "moms-song.mp3")
}

function Test-ImageFilesExist {
    Write-Host "`nChecking image files..." -ForegroundColor Cyan
    
    $imageFolder = Join-Path -Path $scriptPath -ChildPath "images"
    if (-not (Test-Path $imageFolder)) {
        Write-Host "✗ Images folder not found!" -ForegroundColor Red
        return
    }
    
    # Check essential images
    Test-FileExists -FilePath (Join-Path -Path $imageFolder -ChildPath "mom-portrait.webp")
    Test-FileExists -FilePath (Join-Path -Path $imageFolder -ChildPath "mother-child.png")
    
    # Check gallery images
    for ($i = 1; $i -le 10; $i++) {
        $fileName = "photo$i.jpg"
        if (-not (Test-FileExists -FilePath (Join-Path -Path $imageFolder -ChildPath $fileName))) {
            $fileName = "photo$i.webp"
            Test-FileExists -FilePath (Join-Path -Path $imageFolder -ChildPath $fileName)
        }
    }
}

function Test-HTMLFiles {
    Write-Host "`nChecking HTML files..." -ForegroundColor Cyan
    
    $requiredFiles = @("index.html", "gallery.html", "dedication.html")
    foreach ($file in $requiredFiles) {
        Test-FileExists -FilePath (Join-Path -Path $scriptPath -ChildPath $file)
    }
}

function Test-JSFiles {
    Write-Host "`nChecking JavaScript files..." -ForegroundColor Cyan
    
    $requiredFiles = @(
        "site-music.js", 
        "page-transitions.js", 
        "image-preloader.js",
        "audio-preloader.js",
        "welcome-notice.js"
    )
    
    foreach ($file in $requiredFiles) {
        Test-FileExists -FilePath (Join-Path -Path $scriptPath -ChildPath $file)
    }
}

function Test-CSSFiles {
    Write-Host "`nChecking CSS files..." -ForegroundColor Cyan
    
    $requiredFiles = @(
        "music-controls.css",
        "welcome-notice.css",
        "page-loader.css",
        "smooth-transitions.css",
        "styles.css"
    )
    
    foreach ($file in $requiredFiles) {
        Test-FileExists -FilePath (Join-Path -Path $scriptPath -ChildPath $file)
    }
}

function Check-RelativePaths {
    Write-Host "`nChecking for absolute paths in HTML files (should be none)..." -ForegroundColor Cyan
    
    $htmlFiles = Get-ChildItem -Path $scriptPath -Filter "*.html"
    $problematicPaths = @()
    
    foreach ($file in $htmlFiles) {
        $content = Get-Content -Path $file.FullName -Raw
        $matches = [regex]::Matches($content, '(src|href)="(\/|\\|[a-zA-Z]:\\)')
        
        if ($matches.Count -gt 0) {
            foreach ($match in $matches) {
                $problematicPaths += @{
                    File = $file.Name
                    Match = $match.Value
                    LineNumber = ($content.Substring(0, $match.Index).Split("`n").Length)
                }
            }
        }
    }
    
    if ($problematicPaths.Count -gt 0) {
        Write-Host "✗ Found absolute paths that may cause issues on GitHub Pages:" -ForegroundColor Red
        foreach ($path in $problematicPaths) {
            Write-Host "  - File: $($path.File), Line: $($path.LineNumber), Issue: $($path.Match)" -ForegroundColor Red
        }
    } else {
        Write-Host "✓ No absolute paths found in HTML files." -ForegroundColor Green
    }
}

function Create-GitIgnore {
    Write-Host "`nChecking/creating .gitignore file..." -ForegroundColor Cyan
    
    $gitignorePath = Join-Path -Path $scriptPath -ChildPath ".gitignore"
    if (Test-Path $gitignorePath) {
        Write-Host "✓ .gitignore already exists." -ForegroundColor Green
    } else {
        $gitignoreContent = @"
# OS files
.DS_Store
Thumbs.db
desktop.ini

# Editor files
.vscode/
.idea/
*.swp
*.swo

# Temporary files
*.tmp
*.log
*.bak
"@
        
        Set-Content -Path $gitignorePath -Value $gitignoreContent
        Write-Host "✓ Created .gitignore file." -ForegroundColor Green
    }
}

# Run checks
Test-HTMLFiles
Test-CSSFiles
Test-JSFiles
Test-AudioFilesExist
Test-ImageFilesExist
Check-RelativePaths
Create-GitIgnore

Write-Host "`nPreparation Check Complete!" -ForegroundColor Magenta
Write-Host "Fix any issues noted above before deploying to GitHub Pages." -ForegroundColor Magenta
Write-Host "See GITHUB_DEPLOYMENT_GUIDE.md for detailed deployment instructions." -ForegroundColor Magenta