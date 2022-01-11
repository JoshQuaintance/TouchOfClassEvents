<!-- 
    File Location: src/components/Nav.svelte
    Description: Navigation bar component
 -->
<script lang="ts">
    import { Button, DropdownShell, Dropdown } from 'attractions';
    import { headerHeight, isSignedIn } from '$utils/stores';
    import { page } from '$app/stores';
    import Icon from '$components/Icon.svelte';

    let navEl: HTMLElement;

    $: userIsSignedIn = $isSignedIn;
    $: console.log(userIsSignedIn, 'userSignedIn');

    function toggleNav() {
        navEl.classList.toggle('opened');
    }

    $: outerWidth = 0;
    $: innerWidth = 0;
    $: outerHeight = 0;
    $: innerHeight = 0;
</script>

<svelte:window bind:innerWidth bind:outerWidth bind:innerHeight bind:outerHeight />

<div class="header-container fixed top-0 z-[101] w-screen" bind:clientHeight={$headerHeight}>
    <div class="max-w-screen-2xl">
        <header class="flex justify-between items-center px-4 md:px-8 py-2 md:py-4 w-screen">
            <!-- logo - start -->
            <a href="/" class="inline-flex items-center text-black-800 md:text-3xl font-bold gap-2.5" aria-label="logo">
                <img src="images/full-logo.svg" alt="logo" class="w-[135px] md:w-[175px]" />
            </a>
            <!-- logo - end -->

            <style>
                @media (max-width: 1024px) {
                    .menu-nav {
                        clip-path: circle(0px at 100% 5%);
                        transition: clip-path 0.5s ease-in !important;
                    }

                    .menu-nav.opened {
                        clip-path: circle(100%) !important;
                        transition: clip-path 0.5s ease-out !important;
                    }
                }
            </style>

            <!-- nav - start -->
            <nav
                class="
                w-full
                menu-nav
                lg:flex z-20
                justify-around
                transition-all
                {innerWidth < 1025 &&
                    'flex fixed bg-cameo-pink-lightest w-screen h-screen top-0 left-0 flex-col justify-start p-10'}
                "
                bind:this={navEl}>
                <Button class="lg:hidden w-fit group flex" on:click={toggleNav}>
                    <span class="transform-gpu group-hover:rotate-180 transition-all">
                        <Icon icon="close-thick" />
                    </span>
                </Button>
                <Button
                    on:click={toggleNav}
                    href="/"
                    noPrefetch
                    class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 focus:bg-transparent">
                    Home
                </Button>

                <Button
                    on:click={toggleNav}
                    href="#"
                    noPrefetch
                    class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 focus:bg-transparent">
                    Make a reservation
                </Button>

                <Button
                    on:click={toggleNav}
                    href="#"
                    noPrefetch
                    class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 focus:bg-transparent">
                    Create an Event
                </Button>

                <Button
                    on:click={toggleNav}
                    href="/pricing"
                    noPrefetch
                    class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 focus:bg-transparent">
                    Pricing
                </Button>

                <Button
                    on:click={toggleNav}
                    href="/about"
                    noPrefetch
                    class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 focus:bg-transparent">
                    About
                </Button>

                {#if userIsSignedIn}
                    <Button
                        on:click={toggleNav}
                        href="/dashboard"
                        noPrefetch
                        class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 focus:bg-transparent">
                        Dashboard
                    </Button>
                {/if}

                <style>
                    input[type='button'] {
                        border: none;
                        outline: none;
                    }
                </style>
                <!-- 
                        login and sign-up - start
                        won't show if the user is 
                        signed in or in sign-up page
                     -->
                {#if !userIsSignedIn}
                    <div class="flex flex-col lg:flex-row justify-start gap-2.5 lg:ml-16">
                        <a
                            href="log-in"
                            class="inline-block focus-visible:ring ring-indigo-300 text-gray-500 hover:text-indigo-500 active:text-indigo-600 text-sm md:text-base font-semibold text-center transition duration-100"
                            ><Button rectangle>Log in</Button>
                        </a>

                        <a
                            href="sign-up"
                            class="inline-block focus-visible:ring ring-indigo-300 text-sm md:text-base font-semibold text-center transition duration-100"
                            ><Button filled rectangle class="text-white px-[1.4rem]">Sign up</Button>
                        </a>
                    </div>
                {/if}
            </nav>
            <Button
                type="button"
                class="inline-flex items-center lg:hidden bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2"
                on:click={toggleNav}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd" />
                </svg>

                Menu
            </Button>

            <!-- nav - end -->

            <style>
                .menu {
                    margin-top: +100%;
                    padding-right: +300%;
                }
            </style>

            <!-- login and sign-up - end -->
        </header>
        <!-- menu - end -->
    </div>
</div>
