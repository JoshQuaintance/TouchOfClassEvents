<!--
    File Location: src/components/PageTransition.svelte
    Description: Component that gives an animation on page transition
 -->
<script>
    import { scale } from 'svelte/transition';
    export let refresh = '';
</script>

<!-- 
    every single time the variable refresh changes
    the elements in it will be destroyed and rerendered
-->
{#key refresh}
    <div
        in:scale={{ opacity: 0, start: 0.5, duration: 500, delay: 500 }}
        out:scale={{ opacity: 0, start: 0, duration: 500 }}>
        <slot />
    </div>
{/key}
