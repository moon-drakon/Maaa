# GitHub Pages Deployment Guide for Mother's Day Tribute Website

This guide will help you deploy your beautiful Mother's Day tribute website to GitHub Pages, making it accessible online for free.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Your Mother's Day tribute website files ready

## Step 1: Create a New GitHub Repository

1. Log in to your GitHub account
2. Click the "+" icon in the upper right corner and select "New repository"
3. Name your repository (e.g., "mothers-day-tribute")
4. Set the repository to "Public"
5. Click "Create repository"

## Step 2: Prepare Your Website Files

1. Make sure all file paths are relative (not absolute)
2. Ensure all links between pages work correctly
3. Test your website locally to verify everything functions as expected

## Step 3: Upload Your Website to GitHub

### Using Git Command Line

```bash
# Navigate to your website folder
cd "g:\Drakon\Desktop\Happy Mothers day"

# Initialize Git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit - Mother's Day tribute website"

# Add the remote GitHub repository (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/mothers-day-tribute.git

# Push to GitHub
git push -u origin main
```

### Using GitHub Desktop

1. Install GitHub Desktop if you haven't already
2. Open GitHub Desktop and log in to your GitHub account
3. Add your local repository by selecting "File" > "Add local repository"
4. Browse to your website folder and select it
5. Write a commit message and click "Commit to main"
6. Click "Publish repository" (or "Push origin" if the repository is already published)

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select "main" branch (or "master" if that's what you have)
5. Click "Save"
6. Wait a few minutes for GitHub to build and deploy your site

## Step 5: Access Your Website

Once deployed, your website will be available at:
```
https://YOUR-USERNAME.github.io/repository-name/
```

## Troubleshooting

- **Images not loading**: Ensure all image paths are relative and correctly referenced
- **Links not working**: Check that all links use relative paths, not absolute
- **Styling issues**: Verify that CSS file paths are correct
- **Music not playing**: Ensure audio file paths are correct and files are uploaded

## Updating Your Website

To make changes to your website after deployment:

1. Make your changes locally
2. Commit the changes using Git
3. Push the changes to GitHub
4. Wait a few minutes for GitHub Pages to update

## Need Help?

If you encounter any issues with deployment, check GitHub's official documentation on GitHub Pages:
[GitHub Pages Documentation](https://docs.github.com/en/pages)

---

Happy Mother's Day! 💐