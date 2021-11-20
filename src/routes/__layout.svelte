<!-- 
    File Location: src/routes/__layout.svelte
    Description: Layout that will be used for all routes
 -->
<script context="module">
    export const load = async ({ page }) => ({
        props: {
            key: page.path
        }
    });
</script>

<script lang="ts">
    import PageTransitions from '$components/PageTransitions.svelte';
    import { headerHeight } from '$utils/stores';

    import Nav from '../components/Nav.svelte';
    export let key;
</script>

<Nav />

<div style="margin-top: {$headerHeight}px;" />

<PageTransitions refresh={key}>
    <slot />
</PageTransitions>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@700&display=swap');
    * {
        @apply text-prussian;
        padding: 0;
        margin: 0;
    }

    :global(html) {
        @apply bg-cameo-pink-lightest;
    }

    .header-container {
        @apply filter drop-shadow-sm;
        background-color: rgba(250, 240, 242, 0.97) !important;
        -webkit-backdrop-filter: blur(4px);
    }

    @supports (backdrop-filter: none) {
        .header-container {
            @apply bg-cameo-pink-lightest bg-opacity-90 filter drop-shadow-sm;
            backdrop-filter: blur(4px) brightness(90%);
        }
    }
</style>
