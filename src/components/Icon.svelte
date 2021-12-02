<!-- 
    File Location: src/components/Icon.svelte
    Description: Icons component using material design icons
    Note: https://icon-sets.iconify.design/mdi/
 -->
<script>
    import Icon from '@iconify/svelte';

    export let icon;
    export let width = 24;
    export let height = 24;
    export let color = '#FFF';
</script>

<Icon class={$$props.class} icon="mdi:{icon}" {width} {height} {color} style="stroke: initial;" />
