<script lang="ts">
    import Icon from '$components/Icon.svelte';

    import { Button, Dialog, TextField } from 'attractions';
    import { beforeUpdate } from 'svelte';
    import App from '../utils/App';
    import { openModal } from '../utils/localStores';

    export let closeCallback: (e?: CustomEvent<{ nativeEvent: MouseEvent }>) => void;

    let value: string;
    let fontSize: string;
    let fontUnit: string = 'px';
    let unitSelection: HTMLDivElement;

    function changeUnit(unit) {
        fontUnit = unit;
        unitSelection.classList.toggle('hidden');

    }

    function toggleFilter() {
        unitSelection.classList.toggle('hidden');
    }

    function changeLabel() {
        App.new_app_event({
            event: 'label-change-input',
            additional: {
                label: value,
                fontSize: `${fontSize}${fontUnit}`
            }
        });

        value = '';

        closeCallback();
    }

    beforeUpdate(() => {
        setTimeout(() => {
            (document.querySelector('input.label-change') as HTMLInputElement).focus();
        }, 100);
    });
</script>

<Dialog title="Change Label" {closeCallback}>
    <div class="container flex flex-row">
        <div>
            <p>Insert the label here:</p>
            <TextField
                bind:value
                inputClass="label-change"
                on:keydown={(e) => {
                    if (e.detail.nativeEvent.code == 'Enter') changeLabel();
                }} />
            <br />
            <p>Font Size</p>
            <TextField bind:value={fontSize} type="number" inputClass="label-change" on:keydown={(e) => {}} />
            <div class="w-full flex justify-start items-center relative">
                <button
                    type="button"
                    on:click={toggleFilter}
                    class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    style="margin-left: auto; order: 2;">
                    Unit: &nbsp;<strong>{fontUnit}</strong>
                    <Icon icon="chevron-down" />
                </button>

                <div
                    class="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden"
                    role="menu"
                    bind:this={unitSelection}
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    style="top: 100%; z-index: 20 !important;"
                    tabindex="-1">
                    <div class="py-1 " role="none">
                        <a
                            class="text-gray-600 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-400"
                            role="menuitem"
                            tabindex="-1"
                            id="menu-item-0"
                            on:click={() => changeUnit('px')}>
                            px
                        </a>

                        <a
                            class="text-gray-600 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-400"
                            role="menuitem"
                            tabindex="-1"
                            id="menu-item-1"
                            on:click={() => changeUnit('em')}>
                            em
                        </a>

                        <a
                            class="text-gray-600 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-400"
                            role="menuitem"
                            tabindex="-1"
                            id="menu-item-1"
                            on:click={() => changeUnit('em')}>
                            rem
                        </a>
                    </div>
                </div>
            </div>

            <Button class="mt-2" on:click={changeLabel}>Confirm</Button>
        </div>
    </div>
</Dialog>
