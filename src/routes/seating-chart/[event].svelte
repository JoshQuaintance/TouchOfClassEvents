<script context="module">
    export async function load({ params, session, fetch }) {
        const getMetadata = await fetch('/seating-chart/' + params?.event, {
            method: 'POST'
        });

        const serialized = await getMetadata.json();

        if (getMetadata.status == 404)
            return {
                status: 404,
                error: serialized.message
            };

        return {
            props: {
                event_id: params?.event,
                authorized: session.locals.user.admin || (session?.locals.isSignedIn && session?.locals.user.uid == serialized.createdBy),
                event_data: serialized.seating_chart_data,
                mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(session['user-agent'])
            }
        };
    }
</script>

<script lang="ts">
    import '$utils/pixi-ssr-shim';
    import { onMount } from 'svelte';
    import App from './utils/App';
    import { run } from './seating-chart';
    import { percent } from '$utils/math';
    import BuildingObject from './components/BuildingObject.svelte';
    import OptionsButton from './components/OptionsButton.svelte';
    import { Dialog, Modal } from 'attractions';
    import { openModal, dialogUsed, hintText } from './utils/localStores';
    import LabelChangeDialog from './dialogs/LabelChangeDialog.svelte';
    import ConfirmDeletion from './dialogs/ConfirmDeletion.svelte';

    export let mobile;
    export let event_data;
    export let event_id: string;
    export let authorized: boolean;
    let el: HTMLDivElement;
    let modeReceiver = 'view';
    $: editMode = mobile ? false : authorized ? true : false;

    const dialogs = {
        LabelChangeDialog,
        ConfirmDeletion
    };

    onMount(async () => {
        App.editMode = editMode;
        App.import_data(event_data);
        App.setEventTarget = new EventTarget();

        // if (App.app != null) return;

        run(el);

        window.addEventListener('resize', () => {
            const app = App.app;
            const viewport = App.viewport;

            app.resize();

            viewport.resize(App.app.view.width, percent(88, App.app.view.height), 9600, 9600);

            viewport.fit(false, viewport.screenWidth, viewport.screenHeight);
        });

        window.addEventListener('keyup', (e) => {
            if (e.key == 'Escape') App.mode = 'view';
            if (e.key == 'z' && e.ctrlKey) App.undo_prev_event();
            if (e.key == 's' && e.ctrlKey) App.save_seating_chart();
        });

        App.event_medium.addEventListener(
            'app-mode-changed',
            (e: CustomEventInit) => (modeReceiver = e.detail.mode.replace('options-', '').replace('-', ' '))
        );
    });

    $: currentMode = modeReceiver;
    $: hintTextDynamic = $hintText;
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
        }} />
</Modal>

<div class="relative flex flex-col items-center justify-around">
    {#if hintTextDynamic != ''}
        <span
            class="fixed bg-white bg-opacity-75 px-2"
            style="z-index:100 !important; top:.25rem; padding-left: .5rem; padding-right: .5rem; ">
            {hintTextDynamic}
        </span>
    {/if}

    <div bind:this={el} />

    {#if editMode}
        <div
            class="
        bottom-bar 
        bottom-0 fixed w-screen 
        flex flex-row justify-around items-center
        bg-red-500"
            style="bottom: 0; height: {percent(12, window.innerHeight)}px">
            <BuildingObject src="seat" name="seat" />
            <BuildingObject src="table" name="table" />
            <BuildingObject src="circular_table" name="circular_table" />
        </div>
    {/if}
    <div
        class="
        options
        fixed top-0 left-2
        flex flex-col justify-even
        cursor-pointer
        w-fit h-fit text-lg
        ">
        {#if editMode}
            <OptionsButton
                icon="cog"
                tooltip="Settings"
                event="settings"
                customEvent={() => {
                    App.save_seating_chart();
                    App.clearViewport();
                    location.replace('/seating-chart/settings/' + event_id);
                }} />

            <OptionsButton icon="content-save" tooltip="Save" event="save" />

            <OptionsButton icon="delete-outline" tooltip="Delete" event="delete" />

            <OptionsButton icon="form-textbox" tooltip="Add/Edit Label" event="add-label" />

            <OptionsButton icon="arrow-top-left-bottom-right" tooltip="Resize Object" event="resize" />
        {/if}
        <OptionsButton
            icon="power"
            tooltip="Exit"
            event="exit"
            customEvent={() => {
                App.save_seating_chart();
                App.clearViewport();
                location.replace('/');
            }} />
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
