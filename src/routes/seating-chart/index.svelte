<script lang="ts">
    import '@mszu/pixi-ssr-shim';

    import { onMount } from 'svelte';
    import App from './App';
    import { run } from './seating-chart';

    let el: HTMLDivElement;

    onMount(async () => {
        run(el);

        window.addEventListener('resize', () => {
            App.app.destroy(true);
            App.app = null;
            App.viewport = null;

            run(el);
        });
    });
</script>

<div class="flex items-center justify-around">
    <div bind:this={el} />
</div>
