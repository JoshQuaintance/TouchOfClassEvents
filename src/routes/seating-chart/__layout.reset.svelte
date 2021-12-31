<!--
    File Location: src/routes/seating-chart/__layout.reset.svelte
    Description: Resets the layout so the main layout won't be used
 -->
<script lang="ts">
    import { onMount, beforeUpdate } from 'svelte';
    import { isSignedIn, pageLoaded, user } from '$utils/stores';
    import { initGAPI } from '$utils/gapi';
    import Spinner from '$components/Spinner.svelte';

    beforeUpdate(() => pageLoaded.set(true));
    onMount(async () => {
        pageLoaded.set(true);

        initGAPI(getUser);

        function getUser(GoogleAuthClient) {
            /**
             * TODO: CHANGE THIS TO GETTING JWT TOKEN PAYLOAD
             */
            if (GoogleAuthClient.isSignedIn.get()) {
                user.set(GoogleAuthClient.currentUser.get());
                isSignedIn.set(true);
            }
        }
    });
</script>

{#if !$pageLoaded}
    <Spinner />
{:else}
    <slot />
{/if}

<style global lang="postcss">
    @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@700&display=swap');

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    * {
        @apply text-prussian;
        padding: 0;
        margin: 0;
    }

    :global(html) {
        @apply bg-cameo-pink-lightest;
    }

    .header-container {
        @apply filter drop-shadow-sm;
        background-color: rgba(250, 240, 242, 0.97) !important;
        -webkit-backdrop-filter: blur(4px);
    }

    @supports (backdrop-filter: none) {
        .header-container {
            @apply bg-cameo-pink-lightest bg-opacity-90 filter drop-shadow-sm;
            backdrop-filter: blur(4px) brightness(90%);
        }
    }
</style>
