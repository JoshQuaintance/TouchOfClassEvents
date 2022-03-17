<!-- 
    File Location: 'routes/log-in/index.svelte'
    This file is a route file to the actual module
 -->
<script context="module">
    //Redirects user back to home page if they are already logged in
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
    import Login from './Login.svelte';
</script>

<svelte:head>
    <title>Log In - Touch of Class Events</title>
</svelte:head>

<Login />
