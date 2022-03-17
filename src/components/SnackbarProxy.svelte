<script lang="ts">
    import { SnackbarContainer } from 'attractions';
    import { onMount } from 'svelte';

    import { globalSnackbarQueue, snackbarQueueEventTarget } from '$utils/stores';

    // $: snackbarQueue = $globalSnackbarQueue;

    let containerProxy: SnackbarContainer;

    onMount(() => {
        snackbarQueueEventTarget.set(new EventTarget());

        // eslint-disable no-undef
        $snackbarQueueEventTarget.addEventListener('new-snackbar', (e: CustomEventInit) => {
            let data = e.detail.data;

            containerProxy.showSnackbar(data);
        });
    });

    $: if ($globalSnackbarQueue.length > 0)
        $snackbarQueueEventTarget.dispatchEvent(
            new CustomEvent('new-snackbar', {
                detail: {
                    data: $globalSnackbarQueue.pop()
                }
            })
        );
</script>

<SnackbarContainer bind:this={containerProxy}>
    <style>
        .snackbar-stack {
            @apply left-5 bottom-5 !important;
        }
    </style>

    <slot />
</SnackbarContainer>
