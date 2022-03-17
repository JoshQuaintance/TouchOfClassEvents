<!-- 
    File Location: 'routes/log-in/Login.svelte'
    This file is the location where log-in information is located
 -->
<script>
    import { onMount } from 'svelte';
    import { Divider, Snackbar, SnackbarContainer, TextField, Button } from 'attractions';
    import Icon from '$components/Icon.svelte';
    import PasswordInput from '$components/PasswordInput.svelte';
    import GoogleAuth from '$components/GoogleAuth.svelte';
    import { newSnackbar } from '$utils/stores';

    let userEmail;
    let userPass;
    let snackbarController;

    //This function sends the log in request and processes if the request is valid
    async function clickLogin(event) {
        const userData = {
            email: userEmail,
            password: userPass
        };

        let checkCredentials = await fetch('/log-in', {
            method: 'POST',
            body: JSON.stringify(userData)
        });

        let res = await checkCredentials.json();

        if (res.code == 'user-cred-invalid') {
            newSnackbar({
                props: { text: 'No User Found!', class: 'bg-red-500' },
                component: undefined,
                duration: 5000
            });
        }

        if (res.code == 'user-only-linked-with-google') {
            newSnackbar({
                props: {
                    text: 'This account is only connected to a Google account! Please log in using "Continue with Google"',
                    class: 'bg-red-500'
                },
                component: undefined,
                duration: 5000
            });
        }

        if (res.code == 'user-cred-valid') {
            location.reload();
        }
    }
</script>

<svelte:head>
    <title>Log In - Touch Of Class Events</title>
</svelte:head>

<div class="bg-cameo-pink-lightest py-6 sm:py-8 lg:py-12">
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">Login</h2>

        <form class="bg-white max-w-lg border rounded-lg mx-auto" on:submit|preventDefault>
            <div class="flex flex-col gap-4 p-4 md:p-8">
                <!-- Input user email -->
                <div>
                    <TextField
                        type="text"
                        placeholder="Email"
                        label="Email*"
                        outline
                        withItem
                        required
                        autofocus
                        class="relative outline-none"
                        bind:value={userEmail}>
                        <Icon
                            icon="account"
                            class="absolute left-0 top-[50%] transform-gpu translate-y-[-50%] translate-x-2" />
                    </TextField>
                </div>
                <!-- Input user password -->
                <div>
                    <PasswordInput bind:value={userPass} id="sign-in-password" />
                </div>

                <style>
                    .text-field input {
                        @apply rounded outline-none;
                        @apply px-3 py-2;

                        border-radius: 6px !important;
                    }

                    .text-field label {
                        height: fit-content;
                    }
                </style>

                <span class="text-red-600 italic text-right">* required</span>

                <button
                    type="submit"
                    on:click={clickLogin}
                    id="Login"
                    class="block bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                    >Log in</button>

                <Divider class="bg-white text-gray-400 text-sm relative px-4" text="Log in with social" />
                <!-- Allows user to log in through google -->
                <GoogleAuth />
            </div>

            <div class="flex justify-center items-center bg-gray-100 p-4">
                <!-- Link to sign up page -->
                <p class="text-gray-500 text-sm text-center">
                    Don't have an account?
                    <a
                        href="sign-up"
                        class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100"
                        >Register</a>
                </p>
            </div>
        </form>
    </div>
</div>

<style>
</style>
