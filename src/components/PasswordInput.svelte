<!--
    File Location: src/components/PasswordInput.svelte
    Description: Input component just for passwords
 -->
<script lang="ts">
    import { TextField } from 'attractions';
    import { onMount } from 'svelte';
    import Icon from '$components/Icon.svelte';

    export let value: string | null = null;
    let passwordExposed = false;
    export let id: string;

    onMount(() => {
        // necessary so that the password view state can be changed later
        (document.getElementById(id) as HTMLInputElement).type = 'password';
    });

    // Show or hide password
    function togglePasswordState() {
        passwordExposed = !passwordExposed;
        let input: HTMLInputElement = document.getElementById(id) as HTMLInputElement;

        if (passwordExposed) input.type = 'text';
        else input.type = 'password';
    }
</script>

<TextField
    placeholder="**********"
    label="Password*"
    outline
    withItem
    required
    bind:value
    {id}
    class="relative outline-none">
    <Icon icon="key" scale={1.2} class="absolute top-[50%] transform-gpu translate-y-[-50%] translate-x-2" />

    <i on:click={togglePasswordState}>
        <Icon
            icon={!passwordExposed ? 'eye' : 'eye-off'}
            class="absolute top-[50%] right-0 transform-gpu translate-y-[-50%] -translate-x-3 cursor-pointer" />
    </i>
</TextField>
