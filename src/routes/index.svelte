<script>
	let dark = false;
	import { Button } from 'attractions';
	import { ChevronDownIcon } from 'svelte-feather-icons';
</script>

<div class="bg-white lg:pb-12">
	<div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
		<header class="flex justify-between items-center py-4 md:py-8">
			<!-- logo - start -->
			<a
				href="/"
				class="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5"
				aria-label="logo"
			>
				<svg
					width="95"
					height="94"
					viewBox="0 0 95 94"
					class="w-6 h-auto text-indigo-500"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M96 0V47L48 94H0V47L48 0H96Z" />
				</svg>

				Flowrift
			</a>
			<!-- logo - end -->

			<!-- nav - start -->
			<nav class="hidden lg:flex gap-12">
				<a
					href="#"
					class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
					>Home</a
				>
				<a href="#" class="inline-flex items-center text-indigo-500 text-lg font-semibold gap-1">
					Features
					<ChevronDownIcon size="1x" class="fill-current text-indigo-500" />
				</a>
				<a
					href="#"
					class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
					>Pricing</a
				>
				<a
					href="#"
					class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
					>About</a
				>
			</nav>
			<!-- nav - end -->

			<!-- buttons - start -->
			<div
				class="hidden lg:flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5 -ml-8"
			>
				<a
					href="#"
					class="inline-block focus-visible:ring ring-indigo-300 text-gray-500 hover:text-indigo-500 active:text-indigo-600 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 py-3"
					>Sign in</a
				>

				<a
					href="#"
					class="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
					>Sign up</a
				>
			</div>

			<button
				type="button"
				class="inline-flex items-center lg:hidden bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
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

<div class="bg-white py-6 sm:py-8 lg:py-12">
	<div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
		<div class="max-w-xl flex flex-col items-center text-center mx-auto">
			<p class="text-indigo-500 md:text-lg xl:text-xl font-semibold mb-4 md:mb-6">
				Proud to introduce
			</p>

			<h1 class="text-black-800 text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12">
				Revolutionary way to build the web
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
					
					sm:px-8 sm:py-3 
					">Take tour</Button
				>
			</div>
		</div>
	</div>
</div>

<style>
</style>
