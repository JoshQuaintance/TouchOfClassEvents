# Touch of Class Events Source Code -<br>A BPA Competition

## Disclaimer

This project is now deprecated and a lot of its features will not work. Some of the reasons are the fact that SvelteKit 1.0 was released and there are a lot of breaking changes. The MongoDB Atlas Database is also frozen due to inactivity. In order to reactivate this project, a whole rewrite of the codebase will be necessary!

## About

This web application was made in participation of a [Business Professionals of America (BPA)](https://bpa.org) competition. Any code that is in this repository is open source and public until our team hand it over to BPA for grading.

## Members

- Quinton Skelly
- David Crosslin
- Ethan Napier
- Joshua Pelealu

<br>

# Want to run the webapp?

The web application in this repository is already set to be able to run locally on any machine and even build the output for hosting

**_Note: It is not recommended to host by building it locally_**

## Make sure to have!

If you do not have any of these software needed to run this project, we recommend you to do so.

| Software | Version | Link | Additional Notes |
| - | - | - | - |
| Visual Studio Code | `Latest` | https://code.visualstudio.com | Necessary to edit project and extensions used on the project to improve workflow
| Node.js | `16.x LTS` | https://nodejs.org/ | We used the LTS (Long Term Support) version for Node. Node runs javascript as server side code
| NPM | `8.x` | https://npmjs.org | We used the pre-installed version that comes with installing nodejs
| Git | `Latest` | https://git-scm.com | Source Control Manager to keep track changes and progress in the code


## Cloning the repo
Make sure you have all the software needed! If you do, then clone this repository by:  
**_Make sure you are in a directory you want to put this project in_**

```bash
git clone https://github.com/JoshuaPelealu/TouchOfClassEvents

# Then go into the directory
cd TouchOfClassEvents
```

## Developing

Once you've clone the repo, now you need to install the necessary dependencies to run this project by running:
```bash
npm i
# or
npm install
```

After all the installation is finished, you can run:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open

# or expose the server so other devices can see the website locally
npm run dev -- --host --open
```

This will now run the project locally at `localhost:3000` and any changes you made in the code will reflect to what you see in `localhost:3000`. You can start editing the code inside `src/`


## Building
If you want to see a build version of the project you can run
```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
