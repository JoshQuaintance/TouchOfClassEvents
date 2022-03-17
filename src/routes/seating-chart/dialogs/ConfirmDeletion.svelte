<script lang="ts">
    import { Button, Dialog } from 'attractions';
    import App from '../utils/App';
    import { openModal } from '../utils/localStores';

    export let closeCallback: (e?: CustomEvent<{ nativeEvent: MouseEvent }>) => void;

    function confirmDeletion() {
        App.new_app_event({
            event: 'deletion-confirmed'
        });

        closeCallback();
    }

    function cancelDeletion() {
        closeCallback();
    }

</script>

<Dialog title="Change Label" {closeCallback}>
    <p>Are you sure to delete selected object?</p>

    <div class="flex-row justify-between">
        <Button class="" on:click={cancelDeletion}>Cancel</Button>
        <Button class="mt-2" on:click={confirmDeletion}>Confirm</Button>
    </div>
</Dialog>
