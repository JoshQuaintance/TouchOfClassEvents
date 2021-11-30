<!--
    File Location: src/routes/sign-up/index.svelte
    Description: This file will render what's displayed on '/sign-up' page
-->
<script lang="ts">
    import { TextField } from 'attractions';

    import PasswordInput from '$components/PasswordInput.svelte';
    import { checkIfUserExist } from './index';
    import Icon from '$components/Icon.svelte';
    import GoogleAuth from '$components/GoogleAuth.svelte';

    let userEmail: string;
    let nickname: string;
    let userPass: string;

    async function emailSignUp() {
        (userEmail = 'asdf@gmail.com'), (nickname = 'cat'), (userPass = 'pass123');
        let userExist = await checkIfUserExist(userEmail, nickname);

        if (userExist == 0) {
            const res = await fetch('/sign-up', {
                method: 'POST',
                body: JSON.stringify({
                    email: userEmail,
                    nickname,
                    password: userPass
                })
            });
        }
    }
</script>

<svelte:head>
    <title>Sign Up - Touch Of Class Events</title>
</svelte:head>

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
                        class="relative"
                        bind:value={userEmail}
                    >
                        <Icon data="email" class="absolute top-[50%] transform-gpu translate-y-[-50%] translate-x-2" />
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
                        class="relative"
                    >
                        <Icon
                            data="alternate_email"
                            class="absolute top-[50%] transform-gpu translate-y-[-50%] translate-x-2"
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
                        py-3
                    "
                >
                    Sign Up
                </button>

                <div class="flex justify-center items-center relative">
                    <span class="h-px bg-gray-300 absolute inset-x-0" />
                    <span class="bg-white text-gray-400 text-sm relative px-4">Sign Up with social</span>
                </div>

                <button
                    class="
                        flex
                        justify-center
                        items-center
                        bg-blue-500
                        hover:bg-blue-600
                        active:bg-blue-700
                        focus-visible:ring
                        ring-blue-300
                        text-white text-sm
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
                    "
                >
                    <img src="images/facebook-logo.svg" alt="Facebook" />

                    Continue with Facebook
                </button>

                <GoogleAuth />
            </div>

            <div class="flex justify-center items-center bg-gray-100 p-4">
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
