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
                key: url.pathname,
                snackbarQueue: session?.locals.snackbarQueue || []
            }
        };
    };
</script>

<script lang="ts">
    import 'material-icons/iconfont/outlined.css';
    import PageTransitions from '$components/PageTransitions.svelte';
    import {
        headerHeight,
        isSignedIn,
        mainSnackbarController,
        pageLoaded,
        snackbarQueueEventTarget,
        user
    } from '$utils/stores';

    import Nav from '../components/Nav.svelte';
    import { beforeUpdate, onMount } from 'svelte';
    import Spinner from '$components/Spinner.svelte';
    import { initGAPI } from '$utils/gapi';
    import { SnackbarContainer } from 'attractions';
    import GoogleAuth from '$components/GoogleAuth.svelte';

    export let key;
    export let snackbarQueue: [];
    let snackbarController;

    beforeUpdate(() => pageLoaded.set(true));
    onMount(async () => {
        mainSnackbarController.set(snackbarController);
        snackbarQueueEventTarget.set(new EventTarget());
        pageLoaded.set(true);

        $snackbarQueueEventTarget.addEventListener('new-snackbar', () => {
            [...snackbarQueue].forEach((item: any) => {
                snackbarController.showSnackbar(item);
                snackbarQueue.pop();
            });
        });

        initGAPI(getUser);

        async function getUser(GoogleAuthClient) {
            if (GoogleAuthClient.isSignedIn.get() && $isSignedIn == false) {
                let user = GoogleAuthClient.currentUser.get().getBasicProfile();

                let tryLogUserIn = await fetch('/log-in', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: user.getEmail(),
                        password: ''
                    })
                });

                if (tryLogUserIn.status == 403) GoogleAuthClient.signOut();
                else location.reload();
            }
        }
    });

    $: if (snackbarQueue?.length > 0) $snackbarQueueEventTarget.dispatchEvent(new CustomEvent('new-snackbar', {}));
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
        <!-- Do not show the navbar when looking at the seating chart -->
        {#if !key.startsWith('/seating-chart')}
            <Nav />
        {/if}

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
