# Essential Git Commands Reference Guide

This document contains the core Git commands required for managing local and remote repositories during development.

### 1. Repository Setup & Initialization
* **`git init`**: Initializes a brand new local Git repository in the current directory.
* **`git clone <url>`**: Downloads an existing repository from GitHub to your local machine.

### 2. Tracking Changes (Staging & Committing)
* **`git status`**: Shows the current state of your working directory (tracked, untracked, and modified files).
* **`git add <file>`**: Moves specific files to the staging area, preparing them for a commit. Use `git add .` to stage everything.
* **`git commit -m "message"`**: Records your staged snapshots permanently in the local history.

### 3. Branching & Merging
* **`git branch`**: Lists all local branches. Adding a name (`git branch <name>`) creates a new branch.
* **`git checkout <branch>`**: Switches from your current branch to the specified one.
* **`git merge <branch>`**: Combines the history of the specified branch into your active branch.

### 4. Remote Synchronization (GitHub Link)
* **`git remote add origin <url>`**: Connects your local repository to a remote server (like GitHub).
* **`git push -u origin <branch>`**: Uploads local commits to the remote repository.
* **`git pull`**: Fetches changes from GitHub and immediately merges them into your local workspace.