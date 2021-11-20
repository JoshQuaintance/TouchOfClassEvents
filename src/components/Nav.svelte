<script lang="ts">
    import { Button, DropdownShell, Dropdown } from 'attractions';
    import { ChevronDownIcon } from 'svelte-feather-icons';
    import { headerHeight, isAuthenticated } from '$utils/stores';
    import { page } from '$app/stores';

    let userSignedIn = $isAuthenticated;
</script>

<div class="header-container fixed top-0 z-10 w-screen" bind:clientHeight={$headerHeight}>
    <div class="max-w-screen-2xl">
        <header class="flex justify-between items-center px-4 md:px-8 py-2 md:py-4 w-screen">
            <!-- logo - start -->
            <a href="/" class="inline-flex items-center text-black-800 md:text-3xl font-bold gap-2.5" aria-label="logo">
                <img src="images/full-logo.svg" alt="logo" class="w-[135px] md:w-[175px]" />
            </a>
            <!-- logo - end -->

            <!-- nav - start -->
            <nav class="hidden lg:flex gap-12">
                <Button href="/" class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-xl font-semibold transition duration-100 focus:bg-transparent">
                    Home
                </Button>
                <div>
                    <DropdownShell let:toggle >
                        <Button on:click={toggle} class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 focus:bg-transparent">
                          Features
                          <ChevronDownIcon size="1x" class="fill-current" />
                        </Button>
                        <Dropdown>
                          <div class="padded">
                            <a href="#" class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 focus:bg-transparent">
                                Seating Chart
                            </a>
                            <br>
                            <a href="#" class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100 focus:bg-transparent">
                                Option 2
                            </a>
                          </div>
                        </Dropdown>
                      </DropdownShell>         
                </div>

                  <style>
                      .dropdown {
                          /*position: absolute;*/
                          margin-left: +3%;
                          /* transform: translate(0 50%) */
                      }

                      .dropdown .padded {
                          width: 9rem;
                          height: 4rem;
                          text-align: center;
                          font-size: 1.25em;
                      }

                  </style>
                <Button href="#" class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-xl font-semibold transition duration-100 focus:bg-transparent">
                    Pricing
                </Button>
                <Button href="#" class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-xl font-semibold transition duration-100 focus:bg-transparent">
                    About
                </Button>

                <style>
                    input[type="button"] {
                        border: none;
                        outline:none;
                    }
                </style>
            </nav>
            <!-- nav - end -->

            <!-- {#if } -->
            <!-- buttons - start -->
            <div
                class="hidden lg:flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5 -ml-8"
                style="visibility: {userSignedIn || $page.path == '/sign-up' ? 'hidden' : 'visible'}"
            >
                <a
                    href="log-in"
                    class="inline-block focus-visible:ring ring-indigo-300 text-gray-500 hover:text-indigo-500 active:text-indigo-600 text-sm md:text-base font-semibold text-center transition duration-100"
                    ><Button rectangle>Log in</Button></a
                >

                <a
                    href="sign-up"
                    class="inline-block focus-visible:ring ring-indigo-300 text-sm md:text-base font-semibold text-center transition duration-100"
                    ><Button filled rectangle class="text-white px-[1.4rem]">Sign up</Button></a
                >
            </div>
            <button
                type="button"
                class="inline-flex items-center lg:hidden bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                    />
                </svg>

                Menu
            </button>
            <!-- buttons - end -->
        </header>
        <!-- menu - end -->
    </div>
</div>
