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
    import SignUp from './SignUp.svelte';
</script>

<svelte:head>
    <title>Sign Up - Touch Of Class Events</title>
</svelte:head>

<SignUp />
