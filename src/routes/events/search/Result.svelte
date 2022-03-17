<script lang="ts">
    import { newSnackbar } from '$utils/stores';

    import { Button, Divider } from 'attractions';
    import dayjs from 'dayjs';

    export let details: string;
    export let title: string;
    export let host: string;
    export let date: string | number | Date;
    export let event_id: string;

    function goToEvent() {
        newSnackbar({
            props: {
                text: 'Redirecting!',
                class: 'bg-green-500'
            },
            component: undefined,
            duration: 5000
        });

        location.replace('/seating-chart/' + event_id?.split('-')[event_id?.split('-').length - 1]);
    }
</script>

<div class="flex flex-col gap-3 py-4 md:py-8 ">
    <div>
        <span class="block text-sm lg:text-lg font-bold">{title}</span>
        <span class="block text-gray-500 text-sm">by {host}</span>
        <span class="block text-gray-500 text-sm">{dayjs(new Date(date)).format('ddd, DD MMM YYYY HH:mm A')}</span>
    </div>
    <span class="block text-gray-500 text-sm">Details</span>

    <p class="text-gray-600">
        {details}
    </p>

    <Button class="text-right" on:click={goToEvent}>View Event Seating Chart</Button>
</div>
<Divider />
