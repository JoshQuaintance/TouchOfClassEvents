# Changelog

This changelog follows the semantic versioning: [Major].[Minor].[Patch]

## Version 0

### 0.4.1 - [November 24, 2021]

Bug fixes, page transitions and new icon provider

##### Changes

###### Client

-   Fixed a bug where user will be stuck in loading screen
    -   Change the state on update
    -   Added a home button on loading screen
-   Fixed page transition that won't trigger
-   Changed page transition to scale up and down
-   New Icons using https://fonts.google.com

###### Development

-   Fixed an external dependency problem  
    Note: This is a workaround rather than a fix.
    -   Installed 3 deps which doesn't affect other development process
        -   `nock`
        -   `aws-sdk`
        -   `mock-aws-s3`
    -   See https://stackoverflow.com/questions/70097108/sveltekit-could-not-resolve-dependency-even-though-its-external/70097383#70097383
-   New `Icon.svelte` component for icons

### 0.4.0 - [November 23, 2021]

Dependencies Cleanup and Revoke Auth0. Sign-up page halfway done.

##### Changes

###### Client

-   Added a spinner on page loading
-   Error page now shows useful information
-   Removed auth0 from project
    -   Auth0 Google connection removed
-   Google OAuth connection (straight from Google)
-   Sign-up endpoint working
    -   Checks if user exists using username or email
    -   Connection to DB established
    -   Hashes passwords and store to DB
    -   User creation successful

###### Development

-   Cleaned up dependency list
-   Smaller bundle size
-   `cameo-pink` color completed in config
-   Moved socials logo to static folder
    -   Google logo
    -   Facebook logo

### 0.3.0 - [November 19, 2021]

Sign Up page started.

##### Changes

###### Client

-   Sign up route finished
    -   Sign up form
    -   Styling
    -   Input validations
-   Auth0 Connection to Google
    -   Connected to Sign-In With Google

###### Development

-   Added Guidelines
    -   How to create branches
    -   How to reset master
    -   Naming conventions
    -   File Headers
-   Enforce file headers
-   Cleaned up redundant codes

### 0.2.3 - [November 10, 2021]

Finished chore responsive changelog page

##### Changes

-   Moved header to `__layout.svelte` from `src/index.svelte`
-   Contain changelog content into a level deeper
-   Made changelog responsive
    -   Changed font size
    -   Changed `list-style-position` to keep list bullets inside the container
    -   Changed paddings and margins
-   Started dating changelogs
-   Made README for the project
    -   About the project
    -   Members
    -   How to edit and run the project locally

### 0.2.2

Added content to welcome page

##### Changes

-   Editted call to action
    -   Formated greeting message
    -   edited "Learn more" button
-   Added preset color for background
-   Added new routes
    -   Log in
    -   About
-   Added gitpod support for development process

### 0.2.1

Added changelog route in the main page and styled.

##### Changes

-   Added changelog
    -   Added route
    -   Custom styles
    -   Markdown parser and sanitizer

### 0.2.0

Added a simple changelog mock to keep track of changes.

##### Changes

-   Added `CHANGELOG.md`

### 0.1.1

Hosted the app, available at: <br>
https://touch-of-class-events.vercel.app

##### Changes

-   App hosted in vercel

### 0.1.0

Initialized project with TailWind and fixed the problem with the template config. Mockup landing page is also created.

##### Changes

-   Added content mockup
-   Added header and footer
-   Fixed Tailwind config
