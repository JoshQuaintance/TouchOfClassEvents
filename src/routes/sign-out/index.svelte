<!-- 
    File Location: 'routes/sign-out/index.svelte'
    This file is the location where sign-out information is located
 -->
<svelte:head>
    <title>Sign Out - Touch Of Class Events</title>
</svelte:head>
<script lang="ts">
    import { onMount, tick } from 'svelte';
    import { initGAPI } from '$utils/gapi';

    onMount(async () => {
        await tick();
        initGAPI(runAfterGAPI);

        function runAfterGAPI(GoogleAuthClient: { signOut: () => void; }) {
            GoogleAuthClient.signOut();
            location.replace('/');
        }

    });
</script>

<div>
    <h1>Signing you out!</h1>
</div>
