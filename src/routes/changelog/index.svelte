<!--
    File Location: src/routes/changelog/index.svelte
    Description: Renders the changelog
-->
<script lang="ts">
    import './style.css';
    import { onMount } from 'svelte';
    import DOMPurify from 'dompurify';
    import marked from 'marked';
    import { headerHeight } from '$utils/stores';

    let content = 'Fetching Changelogs...';

    onMount(async () => {
        // fetches the changelog that is loaded statically
        // Changelog location: static/CHANGELOG.md
        const data = await fetch('CHANGELOG.md');
        let text = await data.text();
        let parsed = marked(text);

        // sanitize!! make sure nothing was injected in the process of importing the changelog
        content = DOMPurify.sanitize(parsed, { USE_PROFILES: { html: true } });
    });
</script>

<div
    class="container flex flex-col justify-center items-center min-w-full py-16 px-6 whitespace-line-wrap"
    style="margin-top: {$headerHeight}px;"
>
    <div id="changelog-content">
        {@html content}
    </div>
</div>

<style>
</style>
