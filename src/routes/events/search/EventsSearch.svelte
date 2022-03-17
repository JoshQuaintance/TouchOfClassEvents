<script lang="ts">
    import Icon from '$components/Icon.svelte';
    import Result from './Result.svelte';
    import { newSnackbar } from '$utils/stores';

    let searchFilter = 'title';
    let filterSelection: HTMLDivElement;
    let searchQuery: string;
    let results = [];

    function changeFilter(filter) {
        searchFilter = filter;
        toggleFilter();
    }

    function toggleFilter() {
        filterSelection.classList.toggle('hidden');
    }

    async function search() {
        let getEvents = await fetch(`/events/search/${searchFilter}-${searchQuery}`);

        let res = await getEvents.json();

        results = res.results;

        if (results.length == 0)
            newSnackbar({
                props: {
                    text: 'Cannot find any event with the query!',
                    class: 'bg-red-500'
                },
                component: undefined,
                duration: 5000
            });
    }
</script>

<div class="bg-cameo-pink-lightest py-6 sm:py-8 lg:py-12">
    <div class="max-w-screen-md px-4 md:px-8 mx-auto">
        <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8 xl:mb-12">Events Search</h2>

        <div class="pt-2 relative mx-auto text-gray-600 mb-2">
            <form on:submit|preventDefault={search}>
                <input
                    bind:value={searchQuery}
                    class="border-2 w-full last:border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="search"
                    name="search"
                    placeholder="Search by {searchFilter}" />
                <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
                    <Icon icon="search" />
                </button>
            </form>
        </div>
        <div class="w-full flex justify-start items-center relative">
            <button
                type="button"
                on:click={toggleFilter}
                class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                style="margin-left: auto; order: 2;">
                Filter by:
                <Icon icon="chevron-down" />
            </button>

            <div
                class="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden"
                role="menu"
                bind:this={filterSelection}
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                style="top: 100%; z-index: 20 !important;"
                tabindex="-1">
                <div class="py-1 " role="none">
                    <a
                        class="text-gray-600 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-400"
                        role="menuitem"
                        tabindex="-1"
                        class:font-bold={searchFilter == 'host'}
                        class:text-gray-900={searchFilter == 'host'}
                        id="menu-item-0"
                        on:click={() => changeFilter('host')}>
                        Host
                    </a>

                    <a
                        class="text-gray-600 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-400"
                        role="menuitem"
                        class:font-bold={searchFilter == 'title'}
                        class:text-gray-900={searchFilter == 'title'}
                        tabindex="-1"
                        id="menu-item-1"
                        on:click={() => changeFilter('title')}>
                        Title
                    </a>
                </div>
            </div>
        </div>

        <div class="divide-y mt-5">
            {#each results as result}
                <Result {...result} />
            {/each}
        </div>
    </div>
</div>
