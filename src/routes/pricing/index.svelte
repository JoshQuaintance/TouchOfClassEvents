<!-- 
    File Location: 'routes/pricing/index.svelte'
    This file is the location where pricing information is located
 -->

 <svelte:head>
  <title>Pricing - Touch Of Class Events</title>
</svelte:head>

 <div class="bg-cameo-pink-lightest py-6 sm:py-8 lg:py-12">
    <div class="max-w-screen-xl px-4 md:px-8 mx-auto">
      <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8 xl:mb-12">Pick your plan</h2>
  
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-12 mb-6 md:mb-8">
        <!-- plan - start -->
        <div class="flex flex-col space-y-4">
          <div class="bg-white flex flex-col border rounded-lg gap-4 p-4 pt-6">
            <h3 class="text-gray-800 text-2xl font-semibold text-center">Free</h3>
  
            <div class="flex justify-center items-end gap-1">
              <span class="text-4xl text-gray-800 font-bold">$0</span>
              <span class="text-gray-500">/ month</span>
            </div>
  
            <div class="flex justify-center items-center text-gray-500 text-sm gap-1 mb-4">
              14-day money backguarantee
  
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
  
            <a href="#" class="block bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Select Free</a>
          </div>
  
          <div class="flex-1 bg-gray-100 rounded-lg space-y-3 px-4 py-6">
            <!-- check - start -->
            <div class="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
  
              <span class="text-gray-600">1.000 MB file storage</span>
            </div>
            <!-- check - end -->
  
            <!-- check - start -->
            <div class="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
  
              <span class="text-gray-600">2.000 MB bandwidth per month</span>
            </div>
            <!-- check - end -->
  
            <!-- check - start -->
            <div class="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
  
              <span class="text-gray-600">200 tasks per month</span>
            </div>
            <!-- check - end -->
  
            <!-- check - start -->
            <div class="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
  
              <span class="text-gray-600">Comunity support</span>
            </div>
            <!-- check - end -->
          </div>
        </div>
        <!-- plan - end -->
  
        <!-- plan - start -->
        <div class="flex flex-col space-y-4">
          <div class="bg-white flex flex-col border border-indigo-500 rounded-lg relative gap-4 p-4 pt-6">
            <div class="flex justify-center absolute -top-3 inset-x-0">
              <span class="h-6 flex justify-center items-center bg-indigo-500 text-white text-xs font-semibold tracking-widest uppercase rounded-full px-3 py-1">most popular</span>
            </div>
  
            <h3 class="text-gray-800 text-2xl font-semibold text-center">Team</h3>
  
            <div class="flex justify-center items-end gap-1">
              <span class="text-4xl text-gray-800 font-bold">$19</span>
              <span class="text-gray-500">/ month</span>
            </div>
  
            <div class="flex justify-center items-center text-gray-500 text-sm gap-1 mb-4">
              14-day money backguarantee
  
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
  
            <a href="#" class="block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Select Team</a>
          </div>
  
          <div class="flex-1 bg-gray-100 rounded-lg space-y-3 px-4 py-6">
            <!-- check - start -->
            <div class="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
  
              <span class="text-gray-600">Unlimited file storage</span>
            </div>
            <!-- check - end -->
  
            <!-- check - start -->
            <div class="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
  
              <span class="text-gray-600">10 GB bandwidth per month</span>
            </div>
            <!-- check - end -->
  
            <!-- check - start -->
            <div class="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
  
              <span class="text-gray-600">10.000 tasks per month</span>
            </div>
            <!-- check - end -->
  
            <!-- check - start -->
            <div class="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
  
              <span class="text-gray-600">Email support</span>
            </div>
            <!-- check - end -->
  
            <!-- check - start -->
            <div class="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
  
              <span class="text-gray-600">100 Webhooks</span>
            </div>
            <!-- check - end -->
          </div>
        </div>
        <!-- plan - end -->
  
        <!-- plan - start -->
        <div class="flex flex-col space-y-4">
          <div class="bg-white flex flex-col border rounded-lg gap-4 p-4 pt-6">
            <h3 class="text-gray-800 text-2xl font-semibold text-center">Enterprise</h3>
  
            <div class="flex justify-center items-end gap-1">
              <span class="text-4xl text-gray-800 font-bold">$49</span>
              <span class="text-gray-500">/ month</span>
            </div>
  
            <div class="flex justify-center items-center text-gray-500 text-sm gap-1 mb-4">
              14-day money backguarantee
  
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
  
            <a href="#" class="block bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Select Enterprise</a>
          </div>
  
          <div class="flex-1 bg-gray-100 rounded-lg space-y-3 px-4 py-6">
            <!-- check - start -->
            <div class="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
  
              <span class="text-gray-600">Unlimited file storage</span>
            </div>
            <!-- check - end -->
  
            <!-- check - start -->
            <div class="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
  
              <span class="text-gray-600">Unlimited bandwidth per month</span>
            </div>
            <!-- check - end -->
  
            <!-- check - start -->
            <div class="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
  
              <span class="text-gray-600">1.000.000 tasks per month</span>
            </div>
            <!-- check - end -->
  
            <!-- check - start -->
            <div class="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
  
              <span class="text-gray-600">Email and phone support</span>
            </div>
            <!-- check - end -->
  
            <!-- check - start -->
            <div class="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
  
              <span class="text-gray-600">Unlimited Webhooks</span>
            </div>
            <!-- check - end -->
          </div>
        </div>
        <!-- plan - end -->
      </div>
    </div>
  </div>