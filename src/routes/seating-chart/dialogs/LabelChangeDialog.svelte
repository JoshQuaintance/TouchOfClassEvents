<script lang="ts">
    import { Button, Dialog, Modal, TextField } from 'attractions';
    import App from '../utils/App';

    export let closeCallback: (e?: CustomEvent<{ nativeEvent: MouseEvent }>) => void;

    let value: string;

    function changeLabel() {
        App.new_app_event({
            event: 'label-change-input',
            additional: {
                label: value
            }
        });

        value = '';

        closeCallback();
    }
</script>

<Dialog title="Change Label" {closeCallback}>
    <p>Insert the label here:</p>
    <TextField bind:value />

    <Button class="mt-2" on:click={changeLabel}>Confirm</Button>
</Dialog>
