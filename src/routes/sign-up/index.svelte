<!--
    File Location: src/routes/sign-up/index.svelte
    Description: This file will render what's displayed on '/sign-up' page
-->
<script context="module">
    //Redirects user to home page
    export async function load({ session }) {
        if (session?.locals.isSignedIn) {
            return {
                status: 302,
                redirect: '/'
            };
        }

        return {};
    }
</script>

<script lang="ts">
    import { Button, Divider, TextField, SnackbarContainer } from 'attractions';
    import { onMount } from 'svelte';

    import PasswordInput from '$components/PasswordInput.svelte';
    import { checkIfUserExist } from '$utils/db';
    import Icon from '$components/Icon.svelte';
    import GoogleAuth from '$components/GoogleAuth.svelte';
    import { user, isSignedIn } from '$utils/stores';
    import { goto } from '$app/navigation';

    let userEmail: string;
    let nickname: string;
    let userPass: string;
    let snackbarController;

    async function emailSignUp() {
        let userExist = await checkIfUserExist(userEmail, nickname);
 
        //Checks if the user does not exist 
        if (userExist == 0) {
            const res = await fetch('/sign-up', {
                method: 'POST',
                body: JSON.stringify({
                    email: userEmail,
                    nickname,
                    password: userPass
                })
            });

            let serialized = await res.json();

            //Shows that user has been created
            if (serialized.code == 'user-created') {
                snackbarController.showSnackbar({
                    props: {
                        text: 'User created successfully, redirecting to log-in',
                        class: 'bg-green-500'
                    },
                    component: undefined,
                    duration: 1000
                });

                setTimeout(() => {
                    goto('/log-in');
                }, 1000);
            }
        }

        //Checks if the user exists through email
        if (userExist == 1) {
            snackbarController.showSnackbar({
                props: {
                    text: 'The email provided already has an account attached to it. Did you mean to sign in?',
                    class: 'bg-red-500'
                },
                component: undefined,
                duration: 5000
            });
        }
    }

    onMount(() => {
        console.log($user);
    });
</script>

<svelte:head>
    <title>Sign Up - Touch Of Class Events</title>
</svelte:head>

<SnackbarContainer bind:this={snackbarController}>
    <style>
        .snackbar-stack {
            @apply left-5 bottom-5 !important;
        }

    </style>
    <div class="bg-cameo-pink-lightest py-6 sm:py-8 lg:py-12">
        <div class="max-w-screen-2xl px-4 md:px-8 mx-auto ">
            <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">Sign Up</h2>

            <form class="max-w-lg border rounded-lg mx-auto bg-white" on:submit|preventDefault>
                <div class="flex flex-col gap-4 p-4 md:p-8">
                    
                    <div>
                        <TextField
                            type="email"
                            placeholder="example@mail.com"
                            label="Email*"
                            outline
                            withItem
                            required
                            autofocus
                            class="relative outline-none"
                            bind:value={userEmail}
                        >
                            <Icon
                                icon="email"
                                class="absolute left-0 top-[50%] transform-gpu translate-y-[-50%] translate-x-2 "
                            />
                        </TextField>
                    </div>

                    <div>
                        <TextField
                            type="text"
                            placeholder="SuperCoolUsername"
                            label="Username*"
                            outline
                            withItem
                            required
                            bind:value={nickname}
                            class="relative outline-none"
                        >
                            <Icon
                                icon="at"
                                class="absolute left-0 top-[50%] transform-gpu translate-y-[-50%] translate-x-2 "
                            />
                        </TextField>
                    </div>

                    <div>
                        <PasswordInput bind:value={userPass} id="sign-up-password" />
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

                    <!-- Sign up field -->
                    <button
                        on:click={emailSignUp}
                        class="
                        block
                        bg-gray-800
                        hover:bg-gray-700
                        active:bg-gray-600
                        focus-visible:ring
                        ring-gray-300
                        text-white text-sm
                        md:text-base
                        font-semibold
                        text-center
                        rounded-lg
                        outline-none
                        transition
                        duration-100
                        px-8
                        py-3"
                    >
                        Sign Up
                    </button>

                    <Divider class="bg-white text-gray-400 text-sm relative px-4" text="Sign Up with social" />

                    <GoogleAuth />
                </div>

                <div class="flex justify-center items-center bg-gray-100 p-4">
                    <!-- Link to login page -->
                    <p class="text-gray-500 text-sm text-center">
                        Already have an account?
                        <a
                            href="/log-in"
                            class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 transition duration-100"
                            >Login</a
                        >
                    </p>
                </div>
            </form>
        </div>
    </div>
</SnackbarContainer>
