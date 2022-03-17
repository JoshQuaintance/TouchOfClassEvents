<script context="module">
    export async function load({ session }) {
        // If user is not signed in forbid from entering
        if (!session?.locals.isSignedIn) {
            session.locals?.snackbarQueue.push({
                props: {
                    text: 'You need to be signed in to create a new event!',
                    class: 'bg-red-500'
                },
                component: undefined,
                duration: 5000
            });

            return {
                status: 302,
                redirect: '/'
            };
        }

        return {};
    }
</script>

<script lang="ts">
    import EventsNew from './EventsNew.svelte';
</script>

<svelte:head>
    <title>New Event - Touch of Class Events</title>
</svelte:head>

<EventsNew />
