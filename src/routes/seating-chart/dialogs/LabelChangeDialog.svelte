<script lang="ts">
    import { Button, Dialog, TextField } from 'attractions';
    import { beforeUpdate } from 'svelte';
    import App from '../utils/App';
    import { openModal } from '../utils/localStores';

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

    beforeUpdate(() => {
        setTimeout(() => {
            (document.querySelector('input.label-change') as HTMLInputElement).focus();
        }, 100);
    });
</script>

<Dialog title="Change Label" {closeCallback}>
    <p>Insert the label here:</p>
    <TextField
        bind:value
        inputClass="label-change"
        on:keydown={(e) => {
            if (e.detail.nativeEvent.code == 'Enter') changeLabel();
        }} />

    <Button class="mt-2" on:click={changeLabel}>Confirm</Button>
</Dialog>
