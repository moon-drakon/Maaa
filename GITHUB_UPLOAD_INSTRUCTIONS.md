# GitHub Upload Instructions

This guide provides you with the commands to upload your Mother's Day website to GitHub.

## Simple Upload Process

When you've made changes to your website and want to upload them to GitHub, follow these steps:

### Step 1: Open Command Prompt or Git Bash

Open a terminal (Command Prompt, PowerShell, or Git Bash) and navigate to your website folder.

```
cd "g:\Drakon\Desktop\Happy Mothers day"
```

### Step 2: Add Your Changes

This command stages all your changes for commit:

```
git add .
```

### Step 3: Commit Your Changes

This command saves your changes with a descriptive message:

```
git commit -m "Updated website with new features"
```

Replace "Updated website with new features" with a brief description of the changes you made.

### Step 4: Push to GitHub

This command uploads your changes to GitHub:

```
git push
```

## Full Command Sequence

You can also run all these commands in sequence:

```
cd "g:\Drakon\Desktop\Happy Mothers day"
git add .
git commit -m "Updated website with new features"
git push
```

## If You Encounter Issues

If you get an error about remote changes, try:

```
git pull --rebase
git push
```

If you're still having issues, you can use force push (use with caution!):

```
git push -f
```

## Website URL

Your website should be available at:
https://moon-drakon.github.io/Maaa/

It might take a few minutes for changes to appear after pushing.

## Troubleshooting

If you need to check the status of your repository:

```
git status
```

To see the commit history:

```
git log --oneline
```

## Need to Clone on Another Computer?

To download your website on another computer:

```
git clone https://github.com/moon-drakon/Maaa.git
```
