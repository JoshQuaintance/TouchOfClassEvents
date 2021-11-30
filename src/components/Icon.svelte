<!-- 
    File Location: src/components/Icon.svelte
    Description: Icons component using material design icons
    Note: https://fonts.google.com/ https://github.com/marella/material-icons
 -->
 
<script>
    export let data;
</script>

<i class="material-icons-outlined {$$props.class}" style={$$props.style} id={$$props.id}>
    {data}
</i>
