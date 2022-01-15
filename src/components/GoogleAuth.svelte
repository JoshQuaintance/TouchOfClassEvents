<!-- 
    File Location: src/components/GoogleAuth.svelte
    Description: Google Authentication button to sign in with
 -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { mainSnackbarController, pageLoaded, user } from '$utils/stores';
    import { initGAPI } from '$utils/gapi';
    import { checkIfUserExist } from '$utils/db';

    // let GoogleAuthClient;
    let signInBtn: HTMLButtonElement;

    onMount(async () => {
        signInBtn.onclick = () => {
            // Run the gapi initializer
            initGAPI(btnClicked);
        };

        /**
         * Callback for google sign in
         */
        async function btnClicked(GoogleAuthClient) {
            try {
                // Ask user for authorization
                const { code } = await GoogleAuthClient.grantOfflineAccess();

                // We have to wait until the user state changed
                GoogleAuthClient.isSignedIn.listen(async (val) => {
                    if (!val) return console.error('User state is signed out');

                    const userObject = GoogleAuthClient.currentUser.get();
                    user.set(userObject);

                    const profile = userObject.getBasicProfile();

                    const email = profile.getEmail();
                    const name = profile.getName();

                    const userExist = await checkIfUserExist(email);
                    pageLoaded.set(false);

                    if (userExist == 3) {
                        $mainSnackbarController.showSnackbar({
                            props: {
                                text: 'User found in our database with connection! Logging you in...',
                                class: 'bg-green-500'
                            },
                            component: undefined,
                            duration: 5000
                        });

                        let logUserIn = await fetch('/log-in', {
                            method: 'POST',
                            body: JSON.stringify({
                                email,
                                password: ''
                            })
                        });

                        let res = await logUserIn.json();

                        if (res.code == 'user-cred-valid') {
                            location.replace('/');
                        }
                    }

                    // If user exist by email
                    if (userExist == 1) {
                        $mainSnackbarController.showSnackbar({
                            props: {
                                text: 'User exists in our database, linking account!',
                                class: 'bg-blue-500'
                            },
                            component: undefined,
                            duration: 5000
                        });

                        let linkAccounts = await fetch('/auth/link-user/existing', {
                            method: 'POST',
                            body: JSON.stringify({
                                connection: 'google',
                                code
                            })
                        });

                        let res = await linkAccounts.json();

                        if (res.code == 'social-link-success') {
                            $mainSnackbarController.showSnackbar({
                                props: {
                                    text: 'Account Linked! Logging you in....',
                                    class: 'bg-green-500'
                                },
                                component: undefined,
                                duration: 5000
                            });

                            location.replace('/');
                        }
                    }

                    // If user doesn't exist
                    if (userExist == 0) {
                        $mainSnackbarController.showSnackbar({
                            props: {
                                text: "Google account isn't linked to any accounts in our database!\nCreating a new account based on Google account",
                                class: 'bg-blue-500'
                            },
                            component: undefined,
                            duration: 5000
                        });

                        let createNewUserAndLink = await fetch('/auth/link-user/new', {
                            method: 'POST',
                            body: JSON.stringify({
                                connection: 'google',
                                code
                            })
                        });

                        let res = await createNewUserAndLink.json();

                        if (res.code == 'social-link-success') {
                            $mainSnackbarController.showSnackbar({
                                props: {
                                    text: 'Account Linked! Logging you in....',
                                    class: 'bg-green-500'
                                },
                                component: undefined,
                                duration: 5000
                            });

                            location.replace('/');
                        }
                    }
                });
            } catch (e) {
                // If the user closes the popup
                // TODO: Change this into a modal
                if (e.error == 'popup_closed_by_user') alert('popup closed');
            }
        }
    });
</script>

<!-- 
<svelte:head>
    <script src="https://apis.google.com/js/api:platform.js"></script>
</svelte:head> -->

<button
    type="button"
    bind:this={signInBtn}
    class="
    flex
    justify-center
    items-center
    bg-white
    hover:bg-gray-100
    active:bg-gray-200
    border border-gray-300
    focus-visible:ring
    ring-gray-300
    text-gray-800 text-sm
    md:text-base
    font-semibold
    text-center
    rounded-lg
    outline-none
    transition
    duration-100
    gap-2
    px-8
    py-3
">
    <img src="images/google-logo.svg" alt="Google" />

    Continue with Google
</button>
