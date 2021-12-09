<script>
    import Icon from "$components/Icon.svelte";
    import PersonCard from './PersonCard.svelte';
  </script>
  <div class="bg-cameo-pink-lightest py-6 sm:py-8 lg:py-12">
    <div class="max-w-screen-xl px-4 md:px-8 mx-auto">
      <!-- text - start -->
      <div class="mb-10 md:mb-16">
        <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">Meet Our Team</h2>
  
        <p class="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">Meet the team behind the Website, Whicth includes Quinton, Josh, Ethan and David. In the </p>
        <p class="text-gray-500 md:text-lg text-center mx-auto"> instance that you discover a problem or need asistance please contact any one of the members below.</p>
      </div>
      <!-- text - end -->
  
      <div class="grid grid-cols-2 md:grid-cols-3 gap-x-4 lg:gap-x-8 gap-y-8 lg:gap-y-12">
  
        <PersonCard src="images/Quinton.jpg"name="Quinton Skelly" role="Project Manager" emailLink="22.Quinton.Skelly@sidneycityschools.org" facebookLink="quinton.skelly.52"/>
        <PersonCard src="images/Josh.jpg" name="Joshua Pelealu" role="Lead Programmer" emailLink="22.Joshua.Pelealu@sidneycityschools.org" facebookLink="joshua.hasian.75"/>
        <PersonCard src="images/Otto.jpg" name="Ethan Napier" role="Database Developer" emailLink="22.Ethan.Napier@sidneycityschools.org" facebookLink="ethan.napier.1029"/>
        <PersonCard src="images/David.jpg" name="David Crosslin" role="Html and CSS Programmer" emailLink="22.David.Crosslin@sidneycityschools.org" facebookLink="churchcatdavid"/>
  
  
      </div>
    </div>
  </div>