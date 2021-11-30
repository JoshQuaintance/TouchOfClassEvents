<!-- 
    File Location: src/components/GoogleAuth.svelte
    Description: Google Authentication button to sign in with
 -->
<script lang="ts">
    import { user } from '$utils/stores';

    import { onMount } from 'svelte';

    let GoogleAuth;
    let signInBtn;

    onMount(async () => {
        // let scriptSrc = await fetch();

        const element = document.createElement('script');
        element.src = 'https://apis.google.com/js/api:client.js';
        element.onload = apiLoaded;
        document.body.appendChild(element);

        function apiLoaded() {
            //@ts-ignore
            window.gapi.load('auth2', async () => {
                GoogleAuth =
                    //@ts-ignore
                    window.gapi.auth2.getAuthInstance() ||
                    //@ts-ignore
                    window.gapi.auth2.init({
                        client_id: '481928203178-8gbnbea8kad8e3rjm0l06ejafno82kl8.apps.googleusercontent.com'
                    });
                GoogleAuth.then(attachHandler, handleInitialisationError);
            });
        }

        function attachHandler() {
            GoogleAuth.attachClickHandler(
                signInBtn,
                {},
                () => {
                    user.set(GoogleAuth.currentUser.get());
                },
                (e) => {
                    console.error(e);
                }
            );
        }

        function handleInitialisationError(e) {
            console.error(e);
        }
    });
</script>

<svelte:head>
    <script src="https://apis.google.com/js/api:client.js"></script>
</svelte:head>

<button
    type="button"
    bind:this={signInBtn}
    class="
    flex
    justify-center
    items-center
    bg-white
    hover:bg-gray-100
    active:bg-gray-200
    border border-gray-300
    focus-visible:ring
    ring-gray-300
    text-gray-800 text-sm
    md:text-base
    font-semibold
    text-center
    rounded-lg
    outline-none
    transition
    duration-100
    gap-2
    px-8
    py-3
"
>
    <img src="images/google-logo.svg" alt="Google" />

    Continue with Google
</button>
