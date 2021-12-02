<script>
  import Icon from "$components/Icon.svelte";
  import PersonCard from './PersonCard.svelte';

</script>
<div class="bg-white py-6 sm:py-8 lg:py-12">
  <div class="max-w-screen-xl px-4 md:px-8 mx-auto">
    <!-- text - start -->
    <div class="mb-10 md:mb-16">
      <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">Meet Our Team</h2>

      <p class="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.</p>
    </div>
    <!-- text - end -->

    <div class="grid grid-cols-2 md:grid-cols-3 gap-x-4 lg:gap-x-8 gap-y-8 lg:gap-y-12">

      <PersonCard name="Quinton Skelly" role="Project Manager" emailLink="22.Quinton.Skelly@sidneycityschools.org" facebookLink="joshua.hasian.75"/>
      <PersonCard name="Joshua Pelealu" role="Lead Programmer" emailLink="22.Joshua.Pelealu@sidneycityschools.org"/>
      <PersonCard name="Ethan Napier" role="Database Developer" emailLink="22.Ethan.Napier@sidneycityschools.org"/>
      <PersonCard name="David Crosslin" role="Html and CSS Programmer" emailLink="22.David.Crosslin@sidneycityschools.org"/>

     
    </div>
  </div>
</div>