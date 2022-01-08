<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { mainSnackbarController, pageLoaded } from '$utils/stores';
    import { get } from 'svelte/store';
    import { initGAPI } from '$utils/gapi';

    onMount(() => {
        initGAPI(getUser);

        function getUser(GoogleAuthClient) {
            if (GoogleAuthClient.isSignedIn.get()) {
                GoogleAuthClient.signOut();
            }
        }
        goto('/');
    });

    $: if ($pageLoaded)
        get(mainSnackbarController).showSnackbar({
            props: {
                text: 'Signed Out!',
                class: 'bg-green-500'
            },
            component: undefined,
            duration: 4000
        });
</script>

<div>
    <h1>Signing you out!</h1>
</div>
