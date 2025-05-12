@echo off
REM Quick GitHub Upload Script for Mother's Day Website

echo ===== Uploading Website to GitHub =====
echo.

cd /d "%~dp0"
echo Working in: %CD%
echo.

echo Step 1: Adding all changes...
"C:\Program Files\Git\cmd\git.exe" add .

echo.
echo Step 2: Committing changes...
set /p message="Enter commit message (default: Website update): "
if "%message%"=="" set message=Website update
"C:\Program Files\Git\cmd\git.exe" commit -m "%message%"

echo.
echo Step 3: Pushing to GitHub...
"C:\Program Files\Git\cmd\git.exe" push

echo.
echo ===== Upload Complete! =====
echo.
echo Your website should be available at:
echo https://moon-drakon.github.io/Maaa/
echo.
echo It may take a few minutes for changes to appear.
echo.

pause
