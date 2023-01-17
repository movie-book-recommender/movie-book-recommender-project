# Instructions to using branches

1. ' git pull ' to fetch latest changes from main.

2. 'git checkout -b {branch name}' to create and change to a new branch.

3. Make some changes in the branch.

4. 'git add' and 'git commit -m "{commit message}"' to add and commit new changes.

5. 'git pull origin main' to fetch latest changes from main. Solve possible merge conflicts. After solving, pull again so that there are not any merge conflicts anymore.

6. 'git checkout main' to change to main branch.

7. 'git merge {branch name}' to merge the feature branch to main branch.

8. 'git push' to push changes to github.

9. 'git branch -d {branch name}' to delete the feature branch.

Remember to add and commit changes in the feature branch, if you forget, the changes will "follow you"!