<!--
    File Location: src/routes/events/new/index.svelte
    Description: Display a form to create a new event
-->
<script lang="ts">
    import { Button, TextField } from 'attractions';
    import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';
    import dayjs from 'dayjs';
    import { goto } from '$app/navigation';
    import { newSnackbar } from '$utils/stores';

    let date = null,
        title,
        host,
        details;

    async function submitNewEvent() {
        if (!date)
            return newSnackbar({
                props: {
                    text: 'Please select a date!',
                    class: 'bg-red-500'
                },
                component: undefined,
                duration: 5000
            });

        (document.getElementById('submit-btn') as HTMLButtonElement).disabled = true;

        const getMetadata = await fetch('/seating-chart/new', {
            method: 'POST',
            body: JSON.stringify({
                date: new Date(date),
                title,
                host,
                details
            })
        });

        const serialized = await getMetadata.json();

        newSnackbar({
            props: {
                text: 'Event Created! Redirecting to seating chart...',
                class: 'bg-green-500'
            },
            component: undefined,
            duration: 5000
        });

        const event_id = serialized.event_id;

        goto('/seating-chart/' + event_id.split('-')[event_id.split('-').length - 1]);
    }
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
        <form class="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto" on:submit|preventDefault={submitNewEvent}>
            <div class="sm:col-span-2">
                <label for="event-name" class="inline-block text-gray-800 text-sm sm:text-base mb-2"
                    >Event Name<i class="text-red-500">*</i></label>
                <TextField bind:value={title} name="event-name" placeholder="Very Cool Event" required />
            </div>

            <div class="sm:col-span-2">
                <label for="host" class="inline-block text-gray-800 text-sm sm:text-base mb-2"
                    >Host <span class="font-thin">(Defaults to you)</span></label>
                <TextField bind:value={host} name="host" placeholder="You" />
            </div>

            <div class="sm:col-span-2">
                <label for="when" class="inline-block text-gray-800 text-sm sm:text-base mb-2"
                    >When<i class="text-red-500">*</i></label>
                <br />
                <DatePicker bind:selected={date} time={true}>
                    <button
                        type="button"
                        class="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                        {#if date}
                            {dayjs(new Date(date)).format('ddd, DD MMM YYYY HH:mm')}
                        {:else}
                            Pick a Date
                        {/if}
                    </button>
                </DatePicker>
            </div>

            <div class="sm:col-span-2">
                <label for="details" class="inline-block text-gray-800 text-sm sm:text-base mb-2"
                    >Details<i class="text-red-500">*</i></label>
                <TextField
                    bind:value={details}
                    required
                    name="details"
                    multiline
                    placeholder="Very cool event that I am hosting, it will be really cool. We will play games have snacks, you will LOVE IT!" />
            </div>

            <div class="sm:col-span-2 flex justify-between items-center">
                <Button
                    
                    type="submit"
                    id="submit-btn"
                    class="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                    >Create Event</Button>

                <span class="text-gray-500 text-sm"><i class="text-red-500">*</i> Required</span>
            </div>
        </form>
        <!-- form - end -->
    </div>
</div>
