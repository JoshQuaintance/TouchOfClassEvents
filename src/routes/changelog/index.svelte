<script lang="ts">
    import { onMount } from 'svelte';
    import DOMPurify from 'dompurify';
    import marked from 'marked';
    import { headerHeight } from '$utils/stores';

    let content = 'Fetching Changelogs...';

    onMount(async () => {
        const data = await fetch('CHANGELOG.md');
        let text = await data.text();
        let parsed = marked(text);

        content = DOMPurify.sanitize(parsed, { USE_PROFILES: { html: true } });

        // content = DOMPurify.sanitize(marked(await data.text()), { USE_PROFILES: { html: true } });
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
    @import './style.css';
</style>
