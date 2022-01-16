<script lang="ts">
    import Icon from '$components/Icon.svelte';
    import { Divider } from 'attractions';
    import { onMount } from 'svelte';
    import App from '../utils/App';

    export let icon: string;
    export let tooltip: string;
    export let event: string;
    export let customEvent: () => void = () => {
        App.mode = `options-${event}`;
    };
    let contWidth: number;
    let tooltipEl: HTMLSpanElement;

    onMount(() => {
        tooltipEl.style.left = `calc(${contWidth}px + .5rem)`;
    });
</script>

<div class="option-container relative" bind:clientWidth={contWidth}>
    <Divider />
    <span on:click={customEvent} class="peer">
        <Icon {icon} />
    </span>
    <span
        class="invisible peer-hover:visible text-cameo-pink-lightest bg-red-500 absolute whitespace-nowrap rounded px-[.25rem] font-bold"
        style="top: 50%; transform: translateY(-50%); margin-top: .5rem; left: calc(100% + .5rem)"
        bind:this={tooltipEl}>
        {tooltip}
    </span>
</div>
