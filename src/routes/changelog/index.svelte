<!--
    File Location: src/routes/changelog/index.svelte
    Description: Renders the changelog
-->
<script lang="ts">
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
    @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@700&display=swap');

    #changelog-content h1 {
        @apply text-4xl md:text-6xl text-indigo-900 font-extrabold;
        @apply mb-14;
    }

    #changelog-content h2 {
        @apply relative;
        @apply text-3xl md:text-5xl font-bold mb-6 mt-10 font-neue;
    }

    #changelog-content h2::after {
        @apply rounded-full opacity-40;
        @apply absolute -bottom-3 left-2;
        @apply w-[5%] h-[2px] bg-black;

        content: '';
    }

    #changelog-content h3 {
        @apply text-2xl font-semibold md:text-3xl font-neue text-gray-900;
        @apply mb-4 mt-12;
    }

    #changelog-content h5 {
        @apply font-bold text-base md:text-xl mb-4 mt-2 text-indigo-900 text-opacity-90;
    }

    #changelog-content a {
        @apply relative;

        color: rgba(0, 47, 255, 0.9);
    }

    #changelog-content a::after {
        @apply absolute;
        @apply opacity-[65];

        width: 2%;
        height: 0%;
        left: 0;
        bottom: 2px;
        z-index: -1;
        transition: width 0.3s ease, height 0.3s ease-in-out 0.3s;
        background-color: rgba(0, 174, 255, 0.534);

        content: '';
    }

    #changelog-content a:hover::after {
        height: 100%;
        width: 95%;
        transition: width 0.3s ease 0.3s, height 0.3s ease-in-out;
    }

    #changelog-content p {
        @apply mb-3 md:text-2xl font-neue text-gray-700;
    }

    #changelog-content ul {
        @apply list-inside;
    }

    #changelog-content li {
        @apply list-disc md:text-xl font-neue text-gray-700;
        @apply ml-4 md:ml-8;

        /* @apply my-2; */
    }

    #changelog-content li ul li {
        @apply text-gray-600;
        @apply ml-6 md:ml-12;

        list-style-type: circle;
    }

    #changelog-content code {
        @apply bg-gray-500 text-white;
        @apply rounded;
        @apply p-1;
    }

    /* From  https://tobiasahlin.com/spinkit/ */
    .spinner {
        width: 40px;
        height: 40px;

        position: relative;
        margin: 100px auto;
    }

    .double-bounce1,
    .double-bounce2 {
        @apply bg-cameo-pink-lightest;

        width: 100%;
        height: 100%;
        border-radius: 50%;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;

        -webkit-animation: sk-bounce 2s infinite ease-in-out;
        animation: sk-bounce 2s infinite ease-in-out;
    }

    .double-bounce2 {
        -webkit-animation-delay: -1s;
        animation-delay: -1s;
    }

    @-webkit-keyframes sk-bounce {
        0%,
        100% {
            -webkit-transform: scale(0);
        }
        50% {
            -webkit-transform: scale(1);
        }
    }

    @keyframes sk-bounce {
        0%,
        100% {
            transform: scale(0);
            -webkit-transform: scale(0);
        }
        50% {
            transform: scale(1);
            -webkit-transform: scale(1);
        }
    }
</style>
