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

    <div class="w-full px-3 py-5 h-auto my-border-gray rounded-lg shadow">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="service in services.data" :key="service.id" class="col-span-1">
          <ServiceCard :service="service"/>
        </div>
      </div>
    </div>
      <div v-if="services">
        <div v-if="services.data.length" class="w-full flex mt-8 mb-12">
          <Pagination :links="services.links" />
        </div>
      </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import ServiceCard from '@/Components/Card/Service.vue'
import Pagination from '@/Components/PaginationTable.vue'


export default {
  components: {
    Breadcrumb,
    Pagination,
    ServiceCard
  },

  computed: {
    services() {
      return JSON.parse(localStorage.getItem('services')).services
    },
    user_role() {
      return JSON.parse(localStorage.getItem('user')).user.user_role
    },
  },

  created() {
    this.$store.dispatch("getAllServices");
  }
}

</script>

