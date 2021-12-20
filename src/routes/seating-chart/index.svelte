<script lang="ts">
    import '$utils/pixi-ssr-shim';
    import { onMount } from 'svelte';
    import App from './utils/App';
    import { run } from './seating-chart';
    import { percent } from '$utils/math';
    import BuildingObject from './utils/BuildingObject.svelte';

    let el: HTMLDivElement;

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
            if (e.key == 'z' && e.ctrlKey) App.undo_prev_event()
        });
    });
</script>

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
</div>
