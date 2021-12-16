<script>
    import Icon from '$components/Icon.svelte';
    import PersonCard from './PersonCard.svelte';
</script>

<div class="bg-cameo-pink-lightest py-6 sm:py-8 lg:py-12">
    <div class="max-w-screen-xl px-4 md:px-8 mx-auto">
        <!-- text - start -->
        <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">About Us</h2>
        <p class="max-w-screen-md text-gray-800 md:text-lg text-center mx-auto mb-5">
            Our company was founded in 2021. Our founders started the company in an effort to ease the time restriants
            and difficulties of event planning. Our website allows you to create a seating layout and then assigns ID to
            each seat and table allowing for you to assign a name to each.
        </p>

        <p class="max-w-screen-sm text-gray-800 md:text-lg text-center mx-auto mb-5">
            You can contact our company by clicking on our company email and or Facebook Page found at the bottom of the
            website.
        </p>

        <div class="flex justify-center items-center">
            <div class="flex gap-4">
                <a
                    href="mailto:touchofclass20214@gmail.com"
                    target="_blank"
                    class="text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100"
                >
                    <Icon icon="email" />
                </a>

                <a
                    href="https://www.facebook.com/Touch-Of-Class-106141705250829"
                    target="_blank"
                    class="text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100"
                >
                    <Icon icon="facebook" />
                </a>
            </div>
        </div>

        <br />
        <div class="mb-10 md:mb-16">
            <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">Meet Our Team</h2>

            <p class="max-w-screen-md text-gray-800 md:text-lg text-center mx-auto">
                Meet the team behind the website, which includes Quinton, Josh, Ethan and David. In the
            </p>
            <p class="text-gray-800 md:text-lg text-center mx-auto">
                instance that you discover a problem or need assistance, please contact any one of the members below.
            </p>
        </div>
        <!-- text - end -->

        <div class="grid grid-cols-2 md:grid-cols-2 gap-x-4 lg:gap-x-8 gap-y-8 lg:gap-y-12">
            <PersonCard
                src="images/Quinton.jpg"
                name="Quinton Skelly"
                role="Project Manager"
                emailLink="22.Quinton.Skelly@sidneycityschools.org"
                facebookLink="quinton.skelly.52"
            />
            <PersonCard
                src="images/Josh.jpg"
                name="Joshua Pelealu"
                role="Lead Programmer"
                emailLink="22.Joshua.Pelealu@sidneycityschools.org"
                facebookLink="joshua.hasian.75"
            />
            <PersonCard
                src="images/Otto.jpg"
                name="Ethan Napier"
                role="Database Developer"
                emailLink="22.Ethan.Napier@sidneycityschools.org"
                facebookLink="ethan.napier.1029"
            />
            <!-- <PersonCard src="images/David.jpg" name="David Crosslin" role="Html and CSS Programmer" emailLink="22.David.Crosslin@sidneycityschools.org" facebookLink="churchcatdavid"/> -->
        </div>
    </div>
</div>
