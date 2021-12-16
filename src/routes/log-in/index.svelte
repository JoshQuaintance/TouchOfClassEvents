<script context="module">
    import { get } from 'svelte/store';

    export async function load({ session }) {
        if (session?.locals.user.isSignedIn) {
            return {
                status: 302,
                redirect: '/'
            };
        }

        return {};
    }
</script>

<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { Divider, Snackbar, SnackbarContainer, TextField, Button } from 'attractions';
    import Icon from '$components/Icon.svelte';
    import PasswordInput from '$components/PasswordInput.svelte';
    import GoogleAuth from '$components/GoogleAuth.svelte';
    import { user, isSignedIn } from '$utils/stores';

    onMount(async () => {});

    let userEmail;
    let userPass;
    let showSnackbar;

    async function clickLogin(event) {
        const User = {
            email: userEmail,
            password: userPass
        };

        let x = await fetch('/log-in', {
            method: 'POST',
            body: JSON.stringify(User)
        });

        let res = await x.json();

        if (res.code == 'user-cred-invalid') {
            showSnackbar.showSnackbar({
                props: { text: 'No User Found' },
                component: undefined,
                duration: 2000
            });
        }

        if (res.code == 'user-cred-valid') {
            goto('/');
        }
    }

    function show() {
        showSnackbar.showSnackbar({
            props: { text: 'No User Found', class: 'bg-red-500' },
            component: undefined,
            duration: 50000
        });
    }
</script>

<SnackbarContainer bind:this={showSnackbar}>
    <style>
        .snackbar-stack {
            @apply left-5 bottom-5 !important;
        }

        /* .snackbar {
            @apply bg-red-500 !important;
        } */
    </style>

    <button on:click={show}>PRESS MEE DADDY</button>

    <div class="bg-cameo-pink-lightest py-6 sm:py-8 lg:py-12">
        <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
            <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">Login</h2>

            <form class="bg-white max-w-lg border rounded-lg mx-auto" on:submit|preventDefault>
                <div class="flex flex-col gap-4 p-4 md:p-8">
                    <div>
                        <TextField
                            type="text"
                            placeholder="Email"
                            label="Email*"
                            outline
                            withItem
                            required
                            autofocus
                            class="relative"
                            bind:value={userEmail}
                        >
                            <Icon
                                icon="account"
                                class="absolute left-0 top-[50%] transform-gpu translate-y-[-50%] translate-x-2"
                            />
                        </TextField>
                    </div>

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
                        >Log in</button
                    >

                    <Divider class="bg-white text-gray-400 text-sm relative px-4" text="Log in with social" />

                    <!-- Deactivated for now, if we have time implement facebook oauth -->

                    <!-- <button
                    class="flex justify-center items-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:ring ring-blue-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 gap-2 px-8 py-3"
                >
                    <svg
                        class="w-5 h-5 flex-shrink-0"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 0C5.37273 0 0 5.37273 0 12C0 18.0164 4.43182 22.9838 10.2065 23.8516V15.1805H7.23764V12.0262H10.2065V9.92727C10.2065 6.45218 11.8996 4.92655 14.7878 4.92655C16.1711 4.92655 16.9025 5.02909 17.2489 5.076V7.82945H15.2787C14.0525 7.82945 13.6244 8.99182 13.6244 10.302V12.0262H17.2178L16.7302 15.1805H13.6244V23.8773C19.4815 23.0825 24 18.0747 24 12C24 5.37273 18.6273 0 12 0Z"
                            fill="white"
                        />
                    </svg>

                    Continue with Facebook
                </button> -->

                    <GoogleAuth />
                </div>

                <div class="flex justify-center items-center bg-gray-100 p-4">
                    <p class="text-gray-500 text-sm text-center">
                        Forgot your password? <a
                            href="#"
                            class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100"
                            >Reset password</a
                        >
                        <br />
                        Don't have an account?
                        <a
                            href="sign-up"
                            class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100"
                            >Register</a
                        >
                    </p>
                </div>
            </form>
        </div>
    </div>
</SnackbarContainer>

<style>
</style>
