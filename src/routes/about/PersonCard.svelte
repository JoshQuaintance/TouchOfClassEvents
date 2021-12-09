
<script lang="ts">
    import Icon from "$components/Icon.svelte";

    export let src: string;
    export let emailLink: string;
    export let facebookLink: string;
    export let name: string;
    export let role: string; 

    $: fbLink= `https://facebook.com/${facebookLink}`
    //fix Facebook

</script>

<div>
    <div class="h-48 sm:h-60 md:h-80 bg-gray-100 overflow-hidden rounded-lg shadow-lg mb-2 sm:mb-4">
        <img {src} loading="lazy" alt={$$props.alt} class="w-full h-full object-cover object-center" />
    </div>

    <div>
        <div class="text-indigo-500 md:text-lg font-bold">{name}</div>
        <p class="text-gray-500 text-sm md:text-base mb-3 md:mb-4">{role}</p>

        <!-- social - start -->
        <div class="flex">
            <div class="flex gap-4">
                <a href="mailto:{emailLink}" target="_blank" class="text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100">
                    <Icon icon="email" />
                </a>

                <a href={fbLink} target="_blank" class="text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100">
                    <Icon icon="facebook"/>
                </a>
            </div>
        </div>
        <!-- social - end -->
    </div>
</div>