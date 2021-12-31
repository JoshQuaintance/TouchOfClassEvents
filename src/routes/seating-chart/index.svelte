<!--
    File Location: src/routes/seating-chart/index.svelte
    Description: Seating chart
-->
<script lang="ts">
    import '$utils/pixi-ssr-shim';
    import { onMount } from 'svelte';
    import App from './utils/App';
    import { run } from './seating-chart';
    import { percent } from '$utils/math';
    import BuildingObject from './components/BuildingObject.svelte';
    import OptionsButton from './components/OptionsButton.svelte';
    import { Dialog, Modal } from 'attractions';
    import { openModal, dialogUsed } from './utils/localStores';
    import LabelChangeDialog from './dialogs/LabelChangeDialog.svelte';

    let el: HTMLDivElement;
    let modeReceiver = 'view';

    const dialogs = {
        LabelChangeDialog: LabelChangeDialog
    };

    onMount(async () => {
        //@ts-ignore
        const PIXI = await import('pixi.js');

        App.setEventTarget = new EventTarget();
        run(el, PIXI);

        window.addEventListener('resize', () => {
            App.app.destroy(true);
            App.app = null;
            App.viewport = null;

            run(el, PIXI);
        });

        window.addEventListener('keyup', (e) => {
            if (e.key == 'Escape') App.mode = 'view';
            if (e.key == 'z' && e.ctrlKey) App.undo_prev_event();
        });

        App.event_medium.addEventListener('app-mode-changed', (e: CustomEventInit) => (modeReceiver = e.detail.mode.replace('options-', '').replace('-', ' ')));
    });

    $: currentMode = modeReceiver;

</script>

<span class="fixed right-2" style="right: .5rem; z-index: 100;">
    {currentMode}
</span>

<Modal bind:open={$openModal} let:closeCallback>
    <svelte:component
        this={dialogs[$dialogUsed]}
        closeCallback={() => {
            openModal.set(false);
            App.mode = 'view';

            closeCallback();
        }}
    />
</Modal>

<div class="relative flex flex-col items-center justify-around">
    <div bind:this={el} />

    <div
        class="
        bottom-bar 
        bottom-0 fixed w-screen 
        flex flex-row justify-around items-center
        bg-red-500"
        style="bottom: 0; height: {percent(12, window.innerHeight)}px"
    >
        <BuildingObject src="seat" name="seat" />
        <BuildingObject src="table" name="table" />
        <BuildingObject src="circular_table" name="circular_table" />
    </div>
    <div
        class="
        options
        fixed top-0 left-2
        flex flex-col justify-even
        cursor-pointer
        w-fit h-fit text-lg
        "
    >
        <OptionsButton icon="cog" tooltip="Settings" event="settings" />

        <OptionsButton icon="pencil" tooltip="Edit" event="edit" />

        <OptionsButton icon="form-textbox" tooltip="Add/Edit Label" event="add-label" />

        <OptionsButton icon="arrow-top-left-bottom-right" tooltip="Resize Object" event="resize" />

        <style>
            .options hr {
                margin: 0.5rem 0;
            }

            .options .iconify:hover {
                opacity: 50%;
            }
        </style>
    </div>
</div>
