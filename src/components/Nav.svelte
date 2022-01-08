<!-- 
    File Location: src/components/Nav.svelte
    Description: Navigation bar component
 -->
<script lang="ts">
    import { Button, DropdownShell, Dropdown } from 'attractions';
    import { headerHeight, isSignedIn } from '$utils/stores';
    import { page } from '$app/stores';
    import Icon from '$components/Icon.svelte';

    $: userIsSignedIn = $isSignedIn;
    $: console.log(userIsSignedIn, 'userSignedIn')
</script>

<div class="header-container fixed top-0 z-[101] w-screen" bind:clientHeight={$headerHeight}>
    <div class="max-w-screen-2xl">
        <header class="flex justify-between items-center px-4 md:px-8 py-2 md:py-4 w-screen">
            <!-- logo - start -->
            <a href="/" class="inline-flex items-center text-black-800 md:text-3xl font-bold gap-2.5" aria-label="logo">
                <img src="images/full-logo.svg" alt="logo" class="w-[135px] md:w-[175px]" />
            </a>
            <!-- logo - end -->

            <!-- nav - start -->
            <nav class="hidden lg:flex gap-12">
                <Button
                    href="/"
                    noPrefetch
                    class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-xl font-semibold transition duration-100 focus:bg-transparent"
                >
                    Home
                </Button>

                <!-- <div> -->
                <DropdownShell let:toggle>
                    <Button
                        on:click={toggle}
                        class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 focus:bg-transparent"
                    >
                        Features
                        <Icon icon="expand_more" class="fill-current" />
                    </Button>
                    <Dropdown>
                        <div class="padded">
                            <a
                                href="#"
                                class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 focus:bg-transparent mt-10 mb-7"
                            >
                                Make a reservation
                            </a>
                            <a
                                href="#"
                                class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 focus:bg-transparent"
                            >
                                Create an Event
                            </a>
                        </div>
                    </Dropdown>
                </DropdownShell>
                <!-- </div> -->

                <style>
                    .dropdown {
                        /*position: absolute;*/
                        margin-left: -30%;
                        /* transform: translate(0 50%) */
                    }

                    .dropdown .padded {
                        width: 12rem;
                        height: 5rem;
                        text-align: center;
                        font-size: 1.2em;
                        padding-top: 0.5em;
                    }
                </style>

                <Button
                    href="/pricing"
                    noPrefetch
                    class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-xl font-semibold transition duration-100 focus:bg-transparent"
                >
                    Pricing
                </Button>

                <Button
                    href="/about"
                    noPrefetch
                    class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-xl font-semibold transition duration-100 focus:bg-transparent"
                >
                    About
                </Button>

                {#if userIsSignedIn}
                    <Button
                        href="/dashboard"
                        noPrefetch
                        class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-xl font-semibold transition duration-100 focus:bg-transparent"
                    >
                        Dashboard
                    </Button>
                {/if}

                <style>
                    input[type='button'] {
                        border: none;
                        outline: none;
                    }
                </style>
            </nav>
            <!-- nav - end -->

            <!-- 
                login and sign-up - start
                won't show if the user is 
                signed in or in sign-up page
             -->
            {#if !userIsSignedIn}
                <div
                    class="hidden lg:flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5 -ml-8"
                >
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
