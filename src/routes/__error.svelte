<!--
    File Location: src/routes/__error.svelte
    Description: Layout/template for error page
-->
<script context="module">
    export const load = ({ error, status }) => ({
        props: {
            error,
            status
        }
    });
</script>

<script>
    import Nav from '$components/Nav.svelte';

    export let error;
    export let status;
</script>

<div class="error-page bg-cameo-pink-lightest w-screen h-screen top-0 fixed left-0 z-[100] overflow-hidden">
    <Nav />

    <!-- <div style="margin-top: {$headerHeight}px;" /> -->

    <div class="error-container w-full h-full flex flex-col justify-center items-center">

        <h1 class="text-indigo-800 md:[5.125rem] xl:text-[5.25rem] font-semibold mb-14 md:mb-16">{status}</h1>
        <h5 class="mt-6 md:mt-8">{error.message}</h5>
    </div>
</div>
