<script context="module">
    export async function load({ params, session, fetch }) {
        const getMetadata = await fetch('/seating-chart/settings/meta-' + params?.event);

        const serialized = await getMetadata.json();

        if (getMetadata.status == 404)
            return {
                status: 404,
                error: serialized.message
            };

        if (
            session?.locals.isSignedIn == false ||
            (!session.locals.user.admin && session?.locals.user.uid != serialized.event_metadata.createdBy)
        )
            return {
                status: 403,
                error: "You really tried to get into settings didn't you. I don't know if you are signed in or not, but you ain't no admin or you didn't create the event buddy. So piss off..."
            };
        return {
            props: {
                event_id: params?.event,
                event_metadata: serialized.event_metadata
            }
        };
    }
</script>

<script lang="ts">
    import { newSnackbar } from '$utils/stores';
    import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';
    import { TextField } from 'attractions';
    import dayjs from 'dayjs';

    export let event_id;
    export let event_metadata;

    let chartLink;

    let { event_id: full_id, title, details, host, date } = event_metadata;

    async function updateEventMeta() {
        let updateData = await fetch('/seating-chart/settings/meta-' + event_id, {
            method: 'POST',
            body: JSON.stringify({
                title,
                details,
                host,
                date: new Date(date)
            })
        });

        let res = await updateData.json();

        if (res.code == 'event-modified') {
            newSnackbar({
                props: {
                    text: 'Event changes saved!',
                    class: 'bg-green-500'
                },
                component: undefined,
                duration: 5000
            });

            location.reload();
        }
    }
</script>

<div class="bg-cameo-pink-lightest py-6 sm:py-8 lg:py-12">
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <!-- text - start -->
        <div class="mb-10 md:mb-16">
            <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">Get in touch</h2>

            <p class="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">
                This is a section of some simple filler text, also known as placeholder text. It shares some
                characteristics of a real written text but is random or otherwise generated.
            </p>
        </div>
        <!-- text - end -->

        <!-- form - start -->
        <form class="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto" on:submit|preventDefault={updateEventMeta}>
            <div>
                <span class="inline-block text-gray-800 text-sm sm:text-base mb-2 font-bold">Event Short Id</span>
                <br />
                {event_id}
            </div>

            <div>
                <span class="inline-block text-gray-800 text-sm sm:text-base mb-2 font-bold">Event Full Id</span>
                <br />
                {full_id}
            </div>

            <div class="sm:col-span-2">
                <span class="inline-block text-gray-800 text-sm sm:text-base mb-2 font-bold">Title</span>
                <TextField name="title" bind:value={title} />
            </div>

            <div class="sm:col-span-2">
                <span class="inline-block text-gray-800 text-sm sm:text-base mb-2 font-bold">Host</span>
                <TextField name="host" bind:value={host} />
            </div>

            <div class="sm:col-span-2">
                <span class="inline-block text-gray-800 text-sm sm:text-base mb-2 font-bold">Date</span>
                <br />
                <DatePicker bind:selected={date} time={true}>
                    <button
                        type="button"
                        class="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                        {#if date}
                            {dayjs(new Date(date)).format('ddd, DD MMM YYYY HH:mm A')}
                        {:else}
                            Pick a Date
                        {/if}
                    </button>
                </DatePicker>
            </div>

            <div class="sm:col-span-2">
                <span class="inline-block text-gray-800 text-sm sm:text-base mb-2 font-bold">Details</span>
                <TextField multiline name="message" bind:value={details} />
            </div>

            <div class="sm:col-span-2 flex justify-between items-center">
                <button
                    class="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                    >Save Changes</button>

                <!-- A hidden input to be able to copy the link to the seating chart -->
                <input
                    bind:this={chartLink}
                    type="text"
                    class="hidden"
                    value={'https://touch-of-class-events.vercel.app/seating-chart/' + event_id}
                    disabled />

                <button
                    type="button"
                    on:click={() => {
                        chartLink.select();
                        chartLink.setSelectionRange(0, 99999); // For mobile devices

                        // Copy the text inside the text field
                        navigator.clipboard.writeText(chartLink.value);

                        newSnackbar({
                            props: {
                                text: 'Copied link to clipboard!',
                                class: 'bg-green-500'
                            },
                            component: undefined,
                            duration: 5000
                        });
                    }}
                    class="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                    Copy link to seating chart
                </button>
            </div>
        </form>
        <!-- form - end -->
    </div>
</div>
