# Git workflow

## Branches

For every new task we create new branch.

Example of branch name is: `my-feature`.

If you need you can create subtasks for task to create more branches.

## Commits

When you want to commit your changes, you should follow the pattern:

`tag: name of commit`

tag is one of words:

- chore (сode maintenance, like install libraries, update configs, etc.)
- feature (new functional)
- fix
- refactor (change code without change functional)
- doc
- test

The name of the commit begins with the verb in the initial form, the question which name of commit answer is "What commit do?". For example: 'add sms sending in registration' or 'install date-fns npm package for date-manipulation'

## Pull updates from root branch

When you develop some feature, you work in a separate branch . If in process of work you want to upload some changes by root branch, for example 'dev', your steps are:

```
git checkout dev
git pull origin dev
git checkout my-feature-branch
git rebase dev
```

Also you can use this command to just make your branch actual without updating local dev branch
```
git pull --rebase origin dev
```

if you have some conflicts, fix them and add to index (`git add .`) and continue rebasing (`git rebase --continue`). If by some reason you want to cancel rebasing, just make `git rebase --abort` command and you repo will be like before start of rebasing.

When you want to merge to root branch, push your branch to origin and create merge request in gitlab interface.

### Useful links

http://pcottle.github.io/learnGitBranching/index.html?demo - git learning

https://www.youtube.com/watch?v=1zwbFpzu57Y - differents of merge and rebase (russian)

https://www.youtube.com/watch?v=a_msiOrYLgM - theory about differents of merge and rebase
