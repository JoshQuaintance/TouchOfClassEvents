<!--
    File Location: src/components/PasswordInput.svelte
    Description: Input component just for passwords
 -->
<script lang="ts">
    import { FormField, TextField } from 'attractions';
    import Icon from '$components/Icon.svelte';
    import { onMount } from 'svelte';

    export let value: string | null = null;
    let passwordExposed: boolean = false;
    export let id;

    onMount(() => {
        (document.getElementById(id) as HTMLInputElement).type = 'password';
    });

    function togglePasswordState(e) {
        passwordExposed = !passwordExposed;
        let input: HTMLInputElement = document.getElementById(id) as HTMLInputElement;

        if (passwordExposed) input.type = 'text';
        else input.type = 'password';
    }
</script>

<TextField placeholder="**********" label="Password*" outline withItem required bind:value {id} class="relative">
    <Icon icon="key" scale={1.2} class="absolute top-[50%] transform-gpu translate-y-[-50%] translate-x-2" />

    {#if !passwordExposed}
        <i on:click={togglePasswordState}>
            <Icon
                icon="visibility"
                class="absolute top-[50%] right-0 transform-gpu translate-y-[-50%] -translate-x-3 cursor-pointer"
            />
        </i>
    {:else if passwordExposed}
        <i on:click={togglePasswordState}>
            <Icon
                icon="visibility_off"
                class="absolute top-[50%] right-0 transform-gpu translate-y-[-50%] -translate-x-3 cursor-pointer"
            />
        </i>
    {/if}
</TextField>
