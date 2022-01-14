<!-- 
    File Location: src/routes/__layout.svelte
    Description: Layout that will be used for all routes
 -->
<script context="module">
    export const load = async ({ url, session }) => {
        isSignedIn.set(session?.locals.isSignedIn || false);
        pageLoaded.set(false);
        return {
            props: {
                key: url.path,
                snackbarQueue: session?.locals.snackbarQueue || []
            }
        };
    };
</script>

<script lang="ts">
    import 'material-icons/iconfont/outlined.css';
    import PageTransitions from '$components/PageTransitions.svelte';
    import { headerHeight, isSignedIn, mainSnackbarController, pageLoaded, user } from '$utils/stores';

    import Nav from '../components/Nav.svelte';
    import { beforeUpdate, onMount } from 'svelte';
    import Spinner from '$components/Spinner.svelte';
    import { initGAPI } from '$utils/gapi';
    import { SnackbarContainer } from 'attractions';

    export let key;
    export let snackbarQueue: [];
    let snackbarController;

    beforeUpdate(() => pageLoaded.set(true));
    onMount(async () => {
        mainSnackbarController.set(snackbarController);
        pageLoaded.set(true);
        
        if (snackbarQueue?.length > 0)
            [...snackbarQueue].forEach((item: any) => {
                snackbarController.showSnackbar(item);
                snackbarQueue.pop();
            });

        initGAPI(getUser);

        function getUser(GoogleAuthClient) {
            if (GoogleAuthClient.isSignedIn.get() && $isSignedIn == false) {
                user.set(GoogleAuthClient.currentUser.get());
                isSignedIn.set(true);
            }
        }
    });
</script>

<SnackbarContainer bind:this={snackbarController}>
    <style>
        .snackbar-stack {
            @apply left-5 bottom-5 !important;
        }
    </style>
    <!-- Load the spinner if the page is not fully mounted yet -->
    {#if !$pageLoaded}
        <Spinner />
    {:else}
        <Nav />

        <div style="margin-top: {$headerHeight}px;" />

        <PageTransitions refresh={key}>
            <slot />
        </PageTransitions>
    {/if}
</SnackbarContainer>

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
