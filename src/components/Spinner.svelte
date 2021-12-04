<!-- 
    File Location: src/components/Spinner.svelte
    Description: A spinner component for loading
    Note: https://tobiasahlin.com/spinkit/
 -->
<script>
    import { Button } from 'attractions';
</script>

<div class="spinner-container relative flex flex-col justify-center items-center w-screen h-screen">
    <div class="spinner">
        <div class="double-bounce1" />
        <div class="double-bounce2" />
    </div>

    <h5 class="text-indigo-800 md:text-lg xl:text-xl font-semibold mb-4 md:mb-6">Please Wait</h5>
    
    <Button
        href="/"
        noPrefetch
        class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-xl font-semibold transition duration-100 focus:bg-transparent"
    >
        Back to Home
    </Button>
</div>

<style>
    .spinner {
        @apply w-16 h-16;
        @apply relative my-[100px] mx-auto;
    }

    .double-bounce1,
    .double-bounce2 {
        @apply bg-cameo-pink-dark;
        @apply w-full h-full rounded-[50%] opacity-50;
        @apply absolute top-0 left-0;

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
