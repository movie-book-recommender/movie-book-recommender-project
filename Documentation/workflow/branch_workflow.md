# Instructions to using branches

1. ' git pull ' to fetch latest changes from main.

2. 'git checkout -b {branch name}' to create and change to a new branch.

3. Make some changes in the branch.

4. 'git add' and 'git commit -m "{commit message}"' to add and commit new changes.

5. 'git pull origin main' to fetch latest changes from main. Solve possible merge conflicts. After solving, pull again so that there are not any merge conflicts anymore.

6. 'git push --set-upstream origin {branch name}' to push changes to github.

7. From Github, create a pull request to the branch you want to merge to the main one.

8. One member of the team will review the code and accept/decline the pull request.

9. Delete the old branch from github after the merge

10. 'git branch -d {branch name}' to delete the local version of the branch.
