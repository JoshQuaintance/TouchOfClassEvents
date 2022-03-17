<!-- 
    File Location: 'routes/sign-out/index.svelte'
    This file is the location where sign-out information is located
 -->
<script lang="ts">
    import { onMount, tick } from 'svelte';
    import { initGAPI } from '$utils/gapi';
    import { isSignedIn, newSnackbar } from '$utils/stores';

    onMount(async () => {
        await tick();
        initGAPI(runAfterGAPI);

        function runAfterGAPI(GoogleAuthClient: { signOut: () => void }) {
            GoogleAuthClient.signOut();

            newSnackbar({
                props: {
                    text: 'Signing you out!',
                    class: 'bg-blue-500'
                },
                component: undefined,
                duration: 5000
            });

            location.replace('/');
        }
    });
</script>

<div>
    <h1>Signing you out!</h1>
</div>
