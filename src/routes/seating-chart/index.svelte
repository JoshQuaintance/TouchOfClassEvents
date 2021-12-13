<script lang="ts">
    import '$utils/pixi-ssr-shim';
    import { onMount } from 'svelte';
    import App from './utils/App';
    import { run } from './seating-chart';

    let el: HTMLDivElement;

    onMount(async () => {
        //@ts-ignore
        const PIXI = await import('pixi.js');

        run(el, PIXI);

        window.addEventListener('resize', () => {
            App.app.destroy(true);
            App.app = null;
            App.viewport = null;

            run(el, PIXI);
        });
    });
</script>

<div class="flex items-center justify-around">
    <div bind:this={el} />
</div>
