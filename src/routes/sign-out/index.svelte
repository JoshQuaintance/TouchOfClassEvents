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
