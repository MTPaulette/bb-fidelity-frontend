<template>
  <div>
    <Breadcrumb link1="dashboard" link2="services" />
    <div class="ml-3">
      <h1 class="my-6 sm:my-8 title"> Tous les services </h1>
    </div>
    <div class="my-6 md:mt-12 md:mb-16 p-5 md:px-8 rounded-lg bg-secondary" role="alert">
      <span class="font-medium">Ensure that these requirements are met:</span>
        <ul class="mt-1.5 ml-4 list-disc list-inside text-secondary">
          <li>At least 10 characters (and up to 100 characters)</li>
          <li>At least one lowercase character</li>
          <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
        </ul>
    </div>

    <div class="w-full h-auto">
      <!-- <div class="w-full px-3 py-5 h-auto border-color rounded-lg shadow"> -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="service in services" :key="service.id" class="col-span-1">
          <ServiceCard :service="service"/>
        </div>
      </div>
    </div>

    <!-- new service -->
    <div class="fixed z-40 bottom-14 right-2.5">
      <router-link class="flex justify-end" to="service/create">
        <button class="bg-whitee p-2 text-xs text-white rounded-full bg-purple-500 hover:bg-green-500 shadow shadow-black dark:shadow-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import ServiceCard from '@/Components/Card/Service.vue'


export default {
  components: {
    Breadcrumb,
    ServiceCard
  },

  computed: {
    services() {
      return JSON.parse(localStorage.getItem('services'))
    }
  },

  mounted() {
    this.$store.dispatch("services/getAllServices");
  }
}

</script>

