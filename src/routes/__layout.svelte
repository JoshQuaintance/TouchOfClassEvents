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
    import { globalSnackbarQueue, headerHeight, isSignedIn, newSnackbar, pageLoaded } from '$utils/stores';

    import Nav from '$components/Nav.svelte';
    import Spinner from '$components/Spinner.svelte';
    import SnackbarProxy from '$components/SnackbarProxy.svelte';
    import { beforeUpdate, onMount } from 'svelte';
    import { initGAPI } from '$utils/gapi';

    export let key;
    export let snackbarQueue: [] = [];
    globalSnackbarQueue.set(snackbarQueue);

    beforeUpdate(() => pageLoaded.set(true));
    onMount(async () => {
        pageLoaded.set(true);

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
                else {
                    newSnackbar({
                        props: {
                            text: `Google Account Signed in found in user database!\n Hello ${user.getName()}`,
                            class: 'bg-blue-500'
                        },
                        component: undefined,
                        duration: 5000
                    });

                    location.reload();
                }
            }
        }
    });
</script>

<SnackbarProxy>
    <!-- Load the spinner if the page is not fully mounted yet -->
    {#if !$pageLoaded}
        <Spinner />
    {:else}
        <!-- Do not show the navbar when looking at the seating chart -->
        {#if !key.startsWith('/seating-chart') || key.startsWith('/seating-chart/settings')}
            <Nav />
            <div style="margin-top: {$headerHeight}px;" />
        {/if}

        <PageTransitions refresh={key}>
            <slot />
        </PageTransitions>
    {/if}
</SnackbarProxy>

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
