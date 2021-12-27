<script lang="ts">
    import { Dialog, Modal } from 'attractions';
    import { onMount } from 'svelte';
    import { openModal } from '../utils/localStores';
</script>

<!-- <Modal bind:open={$openModal} let:closeCallback>
    <Dialog title="Change Label" {closeCallback}>
        <h1>Maybe</h1>
        <p>Test 123</p>
    </Dialog>
</Modal> -->

<h1 style="position: fixed; top: 0; right: 0; width: 100vw; background-color: red; z-index: 10000;">TEST</h1>
