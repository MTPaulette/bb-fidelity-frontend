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
      return JSON.parse(localStorage.getItem('services')).services
    }
  },

  created() {
    this.$store.dispatch("getAllServices");
  }
}

</script>

