<script>
    import { Button, TextField } from 'attractions';
    import { Datepicker } from 'svelte-calendar';
    import dayjs from 'dayjs';

    let store;
</script>

<div class="bg-cameo-pink-lightest py-6 sm:py-8 lg:py-12">
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <!-- text - start -->
        <div class="mb-10 md:mb-16">
            <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">Create a new event!</h2>

            <p class="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">
                Fill out the necessary information to create a new event
            </p>
        </div>
        <!-- text - end -->

        <!-- form - start -->
        <form class="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto">
            <div class="sm:col-span-2">
                <label for="event-name" class="inline-block text-gray-800 text-sm sm:text-base mb-2"
                    >Event Name<i class="text-red-500">*</i></label>
                <TextField name="event-name" placeholder="Very Cool Event" />
            </div>

            <div class="sm:col-span-2">
                <label for="host" class="inline-block text-gray-800 text-sm sm:text-base mb-2"
                    >Host <span class="font-thin">(Defaults to you)</span></label>
                <TextField name="host" placeholder="You" />
            </div>

            <div class="sm:col-span-2">
                <label for="when" class="inline-block text-gray-800 text-sm sm:text-base mb-2"
                    >When<i class="text-red-500">*</i></label>
                <br />
                <Datepicker bind:store let:key let:send let:receive>
                    <button
                        in:receive={{ key }}
                        class="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                        {#if $store?.hasChosen}
                            {dayjs($store.selected).format('ddd MMM D, YYYY')}
                        {:else}
                            Pick a Date
                        {/if}
                    </button>
                </Datepicker>
            </div>

            <div class="sm:col-span-2">
                <label for="details" class="inline-block text-gray-800 text-sm sm:text-base mb-2"
                    >Details<i class="text-red-500">*</i></label>
                <TextField
                    name="details"
                    multiline
                    placeholder="Very cool event that I am hosting, it will be really cool. We will play games have snacks, you will LOVE IT!" />
            </div>

            <div class="sm:col-span-2 flex justify-between items-center">
                <Button
                    class="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                    >Create Event</Button>

                <span class="text-gray-500 text-sm"><i class="text-red-500">*</i> Required</span>
            </div>
        </form>
        <!-- form - end -->
    </div>
</div>
