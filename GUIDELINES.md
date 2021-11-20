# Guidelines

This are the guidelines for the Web App team...

## Forks

Before doing anything else, make sure you have a forked version of the repository. This is to prevent accidental push to the main branch and ends up breaking the main repository.

## Branches

When you want to add a feature, fix a bug, or edit something, make sure you create a new branch with a clear name of the branch intention. Examples:

-   `feat/sign-up`
-   `chore/clean-main`
-   `fix/cannot-login`

#### Creating a new branch

Before creating a new branch, make sure you reset the master branch to reflect the upstream/master. Go to `Resetting Master Branch`

Since we are using Visual Studio Code, creating a branch is not going to be hard.

-   Press `CTRL + SHIFT + P` or `CMD + SHIFT + P` for Mac
-   Then type in `Git: Create Branch` and then press `Enter`
-   Then it's going to prompt you for the branch name, name it accordingly
-   Then press `Enter`

It will create a new branch for you and now you can edit as you want  
**_NOTE: When editting, make sure you're NOT in the `master` branch. ALWAYS use a different branch_**

#### Resetting Master Branch

**_NOTE: When editting, make sure you're NOT in the `master` branch. ALWAYS use a different branch, because this process will delete all progress in the master branch_**

Make sure you are in the master branch by `git checkout master`  
First we have to set the upstream link. If you have done this, you can skip this step...  
To check just type `git remote -v` in the terminal and if you find `upstream` in one of the output, then you're set

###### Setting Upstream link

```bash
git remote add upstream https://github.com/JoshuaPelealu/TouchOfClassEvents.git
```

Now to check if it works, type `git remote -v` in the terminal and if you find `upstream`, then you're set

###### Resetting Master Branch

Type in these commands one by one

```bash
# This will pull the upstream branch
git pull upstream master

# this will delete all your local changes to master
git reset --hard upstream/master

# take care, this will delete all your changes on your forked master
git push origin master --force
```

Now you're set to create a new branch

## Pull Request

When you think you are done, and you want these changes updated in the main repo, you can do so by syncing your changes to your fork, and then in your github page, there is going to be an alert saying that there are new commits in a branch, and there is going to be a buton saying `Pull Request`. Click that button.

It's going to prompt you to make a pull request. Make a title summarizing what you did, then in the description box, you can type in more detailed notes. Then, I (Joshua) will check on the code to review it, and merge it if it's good.

## Editting

This is the editting guidelines:

#### File headers

In every files that are inside the `src/` file, you have to write a header. If it's already there then don't mess with it. Here's an example that you can follow:

-   Typescript or Javascript files or CSS files

```js
/**
 * File Location: src/routes/auth/user-exist.ts
 * Description: Endpoint to check if a user does exists in our database
 */
```

-   Svelte Files

```HTML
<!--
    File Location: src/routes/index.svelte
    Description: Renders main page
 -->
```

Why you asked, because how our file structure works, there is a lot of `index.svelte` and `index.ts`, and sometimes it gets confusing. These headers are here to help just a little and to also document what is happening in the file.
