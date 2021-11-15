<!-- 
    Description: Index file for main page
    File Location: src/routes/index.svelte 
 -->
<script lang="ts">
    let dark = false;
    // @ts-ignore
    import { Button } from 'attractions';
    import anime from 'animejs';
    import { onMount } from 'svelte';
    import { headerHeight } from '$utils/stores';

    let textWrapper: HTMLSpanElement;
    let textWrapper2: HTMLSpanElement;
    onMount(() => {
        textWrapper.innerHTML = textWrapper.textContent.replace(
            /([a-z#A-Z0-9\-])/g,
            "<span class='letter inline-block'>$&</span>"
        );

        textWrapper2.innerHTML = textWrapper2.textContent.replace(
            /([a-z#A-Z0-9\-])/g,
            "<span class='letter inline-block'>$&</span>"
        );

        let lettersWidth = document.querySelector('.ml11 .letters-2').getBoundingClientRect().width;

        textWrapper.style.opacity = '1';
        textWrapper2.style.opacity = '1';

        anime
            .timeline({
                easing: 'easeOutExpo',
                loop: false
            })
            .add({
                targets: '.ml11 .line',
                scaleY: [0, 1],
                opacity: [0.5, 1],
                duration: 700
            })
            .add({
                targets: '.ml11 .line',
                translateX: [0, lettersWidth + 10],
                duration: 700,
                delay: 100
            })
            .add(
                {
                    targets: '.ml11 .letter',
                    opacity: [0, 1],
                    duration: 600,
                    delay: (el, i) => 34 * (i + 1)
                },
                '-=750'
            )
            .add(
                {
                    targets: '.ml11 .line',
                    scaleY: [1, 0],
                    opacity: [1, 0.5],
                    duration: 700
                },
                '-=200'
            );
    });
</script>

<svelte:head>
    <title>Home - Touch of Class Events</title>
</svelte:head>

<!-- custom color -->
<div
    id="call-to-action"
    class="bg-cameo-pink-lightest py-6 sm:py-8 lg:py-10 flex justify-center items-center"
    style="height: calc(100vh - {$headerHeight}px) !important;"
>
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div class="max-w-3xl flex flex-col items-center text-center">
            <p class="text-indigo-500 md:text-lg xl:text-xl font-semibold mb-4 md:mb-6" />

            <h1 class="ml11 text-black-800 text-3xl sm:text-2xl md:text-5xl font-bold mb-8 md:mb-12">
                <span class="text-wrapper" style="width: fit-content;">
                    <span class="line line1" />
                    <span class="letters inline-block" bind:this={textWrapper} style="opacity: 0;"
                        >Welcome to your #1
                    </span>
                    <br />
                    <span class="letters-2 inline-block" bind:this={textWrapper2} style="opacity: 0;"
                        >source for Event-Planning</span
                    >
                </span>
            </h1>

            <style>
                .ml11 {
                    font-weight: 700;
                    font-size: 3.5em;
                }

                .ml11 .line {
                    opacity: 0;
                    position: absolute;
                    left: 0;
                    height: 100%;
                    width: 3px;
                    background-color: black;
                    transform-origin: 0 50%;
                }

                .ml11 .line1 {
                    top: 0;
                    left: 0;
                }

                .ml11 .text-wrapper {
                    position: relative;
                    display: inline-block;
                    padding-top: 0.1em;
                    padding-right: 0.05em;
                    padding-bottom: 0.15em;
                }

                .ml11 .letter {
                    display: inline-block;
                    line-height: 1em;
                }
            </style>

            <div class="w-full flex flex-col sm:flex-row sm:justify-center gap-5 text-indigo-800">
                <Button
                    rectangle
                    filled
                    class="hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white font-semibold  
                    text-base text-center sm:text-center
                    py-6 
                    sm:px-8 sm:py-3 
                    transition-all ease-in-out
                    bg-indigo-500
                    "
                    style="background-color: rgba(99, 102, 241, 1) !important">Start now</Button
                >

                <Button
                    rectangle
                    class="text-indigo-900 active:text-gray-700 hover:bg-gray-300 transition-all ease-in-out 
                    
                    sm:px-8 sm:py-3 
                    ">Learn more</Button
                >
            </div>
        </div>
    </div>
</div>

<!-- Content One -->

<div class="bg-cameo-pink-lightest py-6 sm:py-8 lg:py-12">
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <!-- text - start -->
        <div class="mb-10 md:mb-16">
            <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
                Our competitive advantage
            </h2>

            <p class="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">
                This is a section of some simple filler text, also known as placeholder text. It shares some
                characteristics of a real written text but is random or otherwise generated.
            </p>
        </div>
        <!-- text - end -->

        <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 xl:gap-16">
            <!-- feature - start -->
            <div class="flex gap-4 md:gap-6">
                <div
                    class="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center flex-shrink-0 bg-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                    </svg>
                </div>

                <div>
                    <h3 class="text-lg md:text-xl font-semibold mb-2">Growth</h3>
                    <p class="text-gray-500 mb-2">
                        Filler text is dummy text which has no meaning however looks very similar to real text.
                    </p>
                    <a
                        href="#"
                        class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100"
                        >More</a
                    >
                </div>
            </div>
            <!-- feature - end -->

            <!-- feature - start -->
            <div class="flex gap-4 md:gap-6">
                <div
                    class="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center flex-shrink-0 bg-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                </div>

                <div>
                    <h3 class="text-lg md:text-xl font-semibold mb-2">Security</h3>
                    <p class="text-gray-500 mb-2">
                        Filler text is dummy text which has no meaning however looks very similar to real text.
                    </p>
                    <a
                        href="#"
                        class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100"
                        >More</a
                    >
                </div>
            </div>
            <!-- feature - end -->

            <!-- feature - start -->
            <div class="flex gap-4 md:gap-6">
                <div
                    class="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center flex-shrink-0 bg-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                        />
                    </svg>
                </div>

                <div>
                    <h3 class="text-lg md:text-xl font-semibold mb-2">Cloud</h3>
                    <p class="text-gray-500 mb-2">
                        Filler text is dummy text which has no meaning however looks very similar to real text.
                    </p>
                    <a
                        href="#"
                        class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100"
                        >More</a
                    >
                </div>
            </div>
            <!-- feature - end -->

            <!-- feature - start -->
            <div class="flex gap-4 md:gap-6">
                <div
                    class="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center flex-shrink-0 bg-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    </svg>
                </div>

                <div>
                    <h3 class="text-lg md:text-xl font-semibold mb-2">Speed</h3>
                    <p class="text-gray-500 mb-2">
                        Filler text is dummy text which has no meaning however looks very similar to real text.
                    </p>
                    <a
                        href="#"
                        class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100"
                        >More</a
                    >
                </div>
            </div>
            <!-- feature - end -->

            <!-- feature - start -->
            <div class="flex gap-4 md:gap-6">
                <div
                    class="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center flex-shrink-0 bg-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </svg>
                </div>

                <div>
                    <h3 class="text-lg md:text-xl font-semibold mb-2">Support</h3>
                    <p class="text-gray-500 mb-2">
                        Filler text is dummy text which has no meaning however looks very similar to real text.
                    </p>
                    <a
                        href="#"
                        class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100"
                        >More</a
                    >
                </div>
            </div>
            <!-- feature - end -->

            <!-- feature - start -->
            <div class="flex gap-4 md:gap-6">
                <div
                    class="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center flex-shrink-0 bg-indigo-500 text-white rounded-lg md:rounded-xl shadow-lg"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                    </svg>
                </div>

                <div>
                    <h3 class="text-lg md:text-xl font-semibold mb-2">Dark Mode</h3>
                    <p class="text-gray-500 mb-2">
                        Filler text is dummy text which has no meaning however looks very similar to real text.
                    </p>
                    <a
                        href="#"
                        class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100"
                        >More</a
                    >
                </div>
            </div>
            <!-- feature - end -->
        </div>
    </div>
</div>
<!-- Content Two -->

<div class="bg-cameo-pink-lightest py-6 sm:py-8 lg:py-12">
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <!-- text - start -->
        <div class="mb-10 md:mb-16">
            <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">Collections</h2>

            <p class="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">
                This is a section of some simple filler text, also known as placeholder text. It shares some
                characteristics of a real written text but is random or otherwise generated.
            </p>
        </div>
        <!-- text - end -->

        <div class="grid sm:grid-cols-2 gap-6">
            <!-- product - start -->
            <a href="#" class="group h-80 flex items-end bg-gray-100 rounded-lg overflow-hidden shadow-lg relative p-4">
                <img
                    src="https://images.unsplash.com/photo-1620243318482-fdd2affd7a38?auto=format&q=75&fit=crop&w=750"
                    loading="lazy"
                    alt="Photo by Fakurian Design"
                    class="w-full h-full object-cover object-center absolute inset-0 transform group-hover:scale-110 transition duration-200"
                />

                <div
                    class="bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50 absolute inset-0 pointer-events-none"
                />

                <div class="flex flex-col relative">
                    <span class="text-gray-300">Home</span>
                    <span class="text-white text-lg lg:text-xl font-semibold">Decoration</span>
                </div>
            </a>
            <!-- product - end -->

            <!-- product - start -->
            <a href="#" class="group h-80 flex items-end bg-gray-100 rounded-lg overflow-hidden shadow-lg relative p-4">
                <img
                    src="https://images.unsplash.com/photo-1620241608701-94ef138c7ec9?auto=format&q=75&fit=crop&w=750"
                    loading="lazy"
                    alt="Photo by Fakurian Design"
                    class="w-full h-full object-cover object-center absolute inset-0 transform group-hover:scale-110 transition duration-200"
                />

                <div
                    class="bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50 absolute inset-0 pointer-events-none"
                />

                <div class="flex flex-col relative">
                    <span class="text-gray-300">Modern</span>
                    <span class="text-white text-lg lg:text-xl font-semibold">Furniture</span>
                </div>
            </a>
            <!-- product - end -->
        </div>
    </div>
</div>

<!-- Content Three -->

<div class="bg-cameo-pink-lightest py-6 sm:py-8 lg:py-12">
    <div class="max-w-screen-xl px-4 md:px-8 mx-auto">
        <!-- text - start -->
        <div class="mb-10 md:mb-16">
            <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
                Frequently asked questions
            </h2>

            <p class="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">
                This is a section of some simple filler text, also known as placeholder text. It shares some
                characteristics of a real written text but is random or otherwise generated.
            </p>
        </div>
        <!-- text - end -->

        <div class="grid sm:grid-cols-2 gap-4 md:gap-8">
            <!-- question - start -->
            <div class="bg-gray-100 rounded-lg p-5">
                <div class="flex justify-between items-center border-b gap-4 pb-4 mb-4">
                    <h3 class="text-indigo-500 sm:text-lg md:text-xl font-semibold">How does the product work?</h3>

                    <span
                        class="w-8 h-8 inline-flex justify-center items-center flex-shrink-0 bg-gray-300 text-gray-500 rounded-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                </div>

                <p class="text-gray-500">
                    This is a section of some simple filler text, also known as placeholder text. It shares some
                    characteristics of a real written text but is random or otherwise generated.
                </p>
            </div>
            <!-- question - end -->

            <!-- question - start -->
            <div class="bg-gray-100 rounded-lg p-5">
                <div class="flex justify-between items-center border-b gap-4 pb-4 mb-4">
                    <h3 class="text-indigo-500 sm:text-lg md:text-xl font-semibold">What are the features?</h3>

                    <span
                        class="w-8 h-8 inline-flex justify-center items-center flex-shrink-0 bg-gray-300 text-gray-500 rounded-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                </div>

                <p class="text-gray-500">
                    This is a section of some simple filler text, also known as placeholder text. It shares some
                    characteristics of a real written text but is random or otherwise generated.
                </p>
            </div>
            <!-- question - end -->

            <!-- question - start -->
            <div class="bg-gray-100 rounded-lg p-5">
                <div class="flex justify-between items-center border-b gap-4 pb-4 mb-4">
                    <h3 class="text-indigo-500 sm:text-lg md:text-xl font-semibold">What about integrations?</h3>

                    <span
                        class="w-8 h-8 inline-flex justify-center items-center flex-shrink-0 bg-gray-300 text-gray-500 rounded-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                </div>

                <p class="text-gray-500">
                    This is a section of some simple filler text, also known as placeholder text. It shares some
                    characteristics of a real written text but is random or otherwise generated.
                </p>
            </div>
            <!-- question - end -->

            <!-- question - start -->
            <div class="bg-gray-100 rounded-lg p-5">
                <div class="flex justify-between items-center border-b gap-4 pb-4 mb-4">
                    <h3 class="text-indigo-500 sm:text-lg md:text-xl font-semibold">Is support available?</h3>

                    <span
                        class="w-8 h-8 inline-flex justify-center items-center flex-shrink-0 bg-gray-300 text-gray-500 rounded-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                </div>

                <p class="text-gray-500">
                    This is a section of some simple filler text, also known as placeholder text. It shares some
                    characteristics of a real written text but is random or otherwise generated.
                </p>
            </div>
            <!-- question - end -->
        </div>
    </div>
</div>

<!-- Footer -->
<footer class="bg-cameo-pink-lightest">
    <div class="pt-4 sm:pt-10 lg:pt-12 pb-16">
        <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border-t gap-12 lg:gap-8 pt-10 lg:pt-12">
                <div class="col-span-full lg:col-span-2">
                    <!-- logo - start -->
                    <div class="lg:-mt-2 mb-4">
                        <a
                            href="/"
                            class="inline-flex items-center text-black-800 text-xl md:text-2xl font-bold gap-2"
                            aria-label="logo"
                        >
                            <svg
                                width="95"
                                height="94"
                                viewBox="0 0 95 94"
                                class="w-5 h-auto text-indigo-500"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M96 0V47L48 94H0V47L48 0H96Z" />
                            </svg>

                            Flowrift
                        </a>
                    </div>
                    <!-- logo - end -->

                    <p class="text-gray-500 sm:pr-8">
                        Filler text is dummy text which has no meaning however looks very similar to real text.
                    </p>
                </div>

                <!-- nav - start -->
                <div>
                    <div class="text-gray-800 font-bold tracking-widest uppercase mb-4">Products</div>

                    <nav class="flex flex-col gap-4">
                        <div>
                            <a
                                href="#"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >Overview</a
                            >
                        </div>

                        <div>
                            <a
                                href="#"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >Solutions</a
                            >
                        </div>

                        <div>
                            <a
                                href="#"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >Pricing</a
                            >
                        </div>

                        <div>
                            <a
                                href="#"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >Customers</a
                            >
                        </div>
                    </nav>
                </div>
                <!-- nav - end -->

                <!-- nav - start -->
                <div>
                    <div class="text-gray-800 font-bold tracking-widest uppercase mb-4">Company</div>

                    <nav class="flex flex-col gap-4">
                        <div>
                            <a
                                href="#"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >About</a
                            >
                        </div>

                        <div>
                            <a
                                href="#"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >Investor Relations</a
                            >
                        </div>

                        <div>
                            <a
                                href="#"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >Jobs</a
                            >
                        </div>

                        <div>
                            <a
                                href="#"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >Press</a
                            >
                        </div>

                        <div>
                            <a
                                href="#"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >Blog</a
                            >
                        </div>
                    </nav>
                </div>
                <!-- nav - end -->

                <!-- nav - start -->
                <div>
                    <div class="text-gray-800 font-bold tracking-widest uppercase mb-4">Support</div>

                    <nav class="flex flex-col gap-4">
                        <div>
                            <a
                                href="#"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >Contact</a
                            >
                        </div>

                        <div>
                            <a
                                href="#"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >Documentation</a
                            >
                        </div>

                        <div>
                            <a
                                href="#"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >Chat</a
                            >
                        </div>

                        <div>
                            <a
                                href="#"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >FAQ</a
                            >
                        </div>

                        <div>
                            <a
                                href="/changelog"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >Changelog</a
                            >
                        </div>
                    </nav>
                </div>
                <!-- nav - end -->

                <!-- nav - start -->
                <div>
                    <div class="text-gray-800 font-bold tracking-widest uppercase mb-4">Legal</div>

                    <nav class="flex flex-col gap-4">
                        <div>
                            <a
                                href="#"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >Terms of Service</a
                            >
                        </div>

                        <div>
                            <a
                                href="#"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >Privacy Policy</a
                            >
                        </div>

                        <div>
                            <a
                                href="#"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >Cookie settings</a
                            >
                        </div>
                    </nav>
                </div>
                <!-- nav - end -->
            </div>
        </div>
    </div>

    <div class="bg-gray-100">
        <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
            <div class="flex justify-between items-center gap-4 py-8">
                <span class="text-gray-400 text-sm"> © 2021 - Present Flowrift. All rights reserved. </span>

                <!-- social - start -->
                <div class="flex gap-4">
                    <a
                        href="#"
                        target="_blank"
                        class="text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100"
                    >
                        <svg
                            class="w-5 h-5"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                            />
                        </svg>
                    </a>

                    <a
                        href="#"
                        target="_blank"
                        class="text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100"
                    >
                        <svg
                            class="w-5 h-5"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                            />
                        </svg>
                    </a>

                    <a
                        href="#"
                        target="_blank"
                        class="text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100"
                    >
                        <svg
                            class="w-5 h-5"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                            />
                        </svg>
                    </a>

                    <a
                        href="#"
                        target="_blank"
                        class="text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100"
                    >
                        <svg
                            class="w-5 h-5"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                            />
                        </svg>
                    </a>
                </div>
                <!-- social - end -->
            </div>
        </div>
    </div>
</footer>

<style>
    #svelte {
        overflow-x: none;
    }
</style>
