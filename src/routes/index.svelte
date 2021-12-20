<!-- 
    File Location: src/routes/index.svelte 
    Description: Renders main page
 -->
<script lang="ts">
    import Typewriter from 'svelte-typewriter';
    import { Button } from 'attractions';
    import { headerHeight } from '$utils/stores';
import Icon from '$components/Icon.svelte';

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
                <Typewriter cascade cursor="#e6859e">
                    <span>Welcome to your #1</span> <br />
                    <span>source for Event-Planning</span>
                </Typewriter>
            </h1>

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
                    sm:px-8 sm:py-3 "
                    href="/about">
                    Learn more</Button
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
            <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">Example Seating Charts</h2>

            <p class="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">
                Using our seating chart creater you can map out your events seats easily and you can easily then identify who is sitting where. Just like in the examples below.
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
                    <span class="text-gray-300">Example</span>
                    <span class="text-white text-lg lg:text-xl font-semibold">Wedding seating</span>
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
                    <span class="text-gray-300">Example</span>
                    <span class="text-white text-lg lg:text-xl font-semibold">Outdoor seating</span>
                </div>
            </a>
            <!-- product - end -->
        </div>
    </div>
</div>

<!-- Content Three -->

<div class="bg-cameo-pink-lightest py-6 sm:py-8 lg:py-12" id="faqs">
    <div class="max-w-screen-xl px-4 md:px-8 mx-auto">
        <!-- text - start -->
        <div class="mb-10 md:mb-16">
            <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
                Frequently Asked Questions
            </h2>

            <p class="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">
                These are popular questions asked by our users and below <br> they have been answered by the developers.
            </p>
        </div>
        <!-- text - end -->

        <div class="grid sm:grid-cols-2 gap-4 md:gap-8">
            <!-- question - start -->
            <div class="bg-gray-100 rounded-lg p-5">
                <div class="flex justify-between items-center border-b gap-4 pb-4 mb-4">
                    <h3 class="text-indigo-500 sm:text-lg md:text-xl font-semibold">Question one?</h3>

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
                    <h3 class="text-indigo-500 sm:text-lg md:text-xl font-semibold">Queston  two?</h3>

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
                    <h3 class="text-indigo-500 sm:text-lg md:text-xl font-semibold">Question three?</h3>

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
                    <h3 class="text-indigo-500 sm:text-lg md:text-xl font-semibold">Question four?</h3>

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
                                href="about"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >About</a
                            >
                        </div>

                        <div>
                            <a
                                href="about/"
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >Social Media</a
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
                                >Changelog</a
                            >
                        </div>

                        <div>
                            <a
                                href=""
                                class="text-gray-500 hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                                >Chat</a
                            >
                        </div>

                        <div>
                            <a
                                href="/#faqs"
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
                <span class="text-gray-400 text-sm"> © 2021 - Touch of Class Events. All rights reserved. </span>
                <!-- social - start -->
                <div class="flex gap-4">
                    <a
                        href="https://www.facebook.com/Touch-Of-Class-106141705250829"
                        target="_blank"
                        class="text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100"
                    >
                        <Icon icon="facebook"/>
                    </a>

                    <a
                        href="mailto:touchofclass20214@gmail.com"
                        target="_blank"
                        class="text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100"
                    >
                        <Icon icon="email"/>
                    </a>
                <!-- social - end -->
            </div>
        </div>
    </div>
</footer>
