@echo off
REM GitHub Repository Setup for Mother's Day Tribute Website
echo ===== GitHub Repository Setup for Mother's Day Tribute Website =====
echo.
echo Follow these steps to set up your GitHub repository:
echo.
echo 1. Create a new repository on GitHub:
echo    a. Go to https://github.com/new
echo    b. Repository name: mothers-day-tribute (or another name you prefer)
echo    c. Make it 'Public'
echo    d. DO NOT initialize with README, .gitignore, or license
echo    e. Click 'Create repository'
echo.
echo 2. After creating the repository, you'll see a page with setup instructions.
echo    Copy the URL of your repository (it should look like: https://github.com/YOUR-USERNAME/mothers-day-tribute.git)
echo.
set /p github_url="Enter your GitHub repository URL: "

if "%github_url%"=="" (
    echo No URL provided. Exiting.
    exit /b 1
)

echo.
echo Setting up remote origin...
git remote add origin "%github_url%"

echo.
echo Pushing to GitHub...
git push -u origin master

echo.
echo ===== Next Steps =====
echo.
echo 1. Go to your repository settings on GitHub:
echo    %github_url%/settings/pages
echo.
echo 2. Under 'Source', select 'GitHub Actions'
echo.
echo 3. Wait a few minutes for GitHub Actions to deploy your site
echo.
echo 4. Your website will be available at:
echo    https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
echo.
echo Done! Your Mother's Day Tribute website is now on GitHub and will be available via GitHub Pages soon.
echo.
pause
