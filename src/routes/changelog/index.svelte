<!-- 
	Description: Index file for changelog route
	File Location: src/routes/changelog/index.svelte 
 -->
<script lang="ts">
    export const prerender = true;
    import { onMount } from 'svelte';
    import DOMPurify from 'dompurify';
    import marked from 'marked';
    import { headerHeight } from '../stores';
    import { Divider } from 'attractions';

    let content;

    onMount(async () => {
        const data = await fetch('CHANGELOG.md');
        let text = await data.text();
        let parsed = marked(text);

        content = DOMPurify.sanitize(parsed, { USE_PROFILES: { html: true } });
    });
</script>

<svelte:head>
    <title>Changelog - Touch of Class Events</title>
</svelte:head>

<Divider style="margin-top: {$headerHeight}px; opacity: 0;" />
{#if content}
    <div
        class="relative container flex flex-col justify-center items-center min-w-full pb-16 px-6 whitespace-line-wrap mt-16"
    >
        <div id="changelog-content">
            {@html content}
        </div>
    </div>
{:else}
    <div class="fixed w-screen h-screen bg-gray-800 bg-opacity-90 z-40 backdrop-filter blur-lg" />

    <div
        class="fixed w-screen h-screen bg-transparent flex flex-col justify-center items-center z-50 text-cameo-pink-lightest"
    >
        <!-- Loading spinner got from https://tobiasahlin.com/spinkit -->
        <div class="spinner">
            <div class="double-bounce1" />
            <div class="double-bounce2" />
        </div>

        Fetching Changelogs ...
    </div>
{/if}

<style>
    @import './style.css';
</style>
