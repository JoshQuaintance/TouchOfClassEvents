<!--
    File Location: src/routes/seating-chart/utils/BuildingObject.svelte
    Description: A component to be able to toggle building objects
 -->

<script lang="ts">
    import { percent } from '$utils/math';
    import App from '../utils/App';

    export let src: string;
    export let name: string;

    function changeBuildingObject() {
        if (App.build_object == name && App.mode == 'build') return (App.mode = 'view');
        App.build_object = name;
        App.mode = 'build';
    }
</script>

<div class="obj-container relative group">
    <img
        src="images/{src}.svg"
        alt={name}
        style="height:{percent(65, percent(12, window.innerHeight))}px;"
        class="cursor-pointer peer"
        on:click={changeBuildingObject}
    />
</div>
