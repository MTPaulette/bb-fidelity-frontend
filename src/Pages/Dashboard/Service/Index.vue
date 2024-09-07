<template>
  <div>
    <Breadcrumb link1="dashboard" link2="services" />
    <h1 class="ml-3 my-6 sm:my-8 title"> All Services </h1>
    <div class="my-6 md:mt-12 md:mb-16 p-5 md:px-8 rounded-lg bg-secondary" role="alert">
      <span class="font-medium">Below is a complete list of services offered by the company:</span>
      <ul class="mt-1.5 ml-4 list-disc list-inside text-secondary">
        <li>This list is in alphabetical order</li>
        <li>The most recent service is highlighted.</li>
        <li>You also have the possibility for a service to consult it, edit it, or ever delet it.</li>
      </ul>
    </div>

    <!-- filters -->
    <div class="w-full h-auto">
      <Filters @setFilters="setFilters" @resetFilters="resetFilter" :orderBy="order_by" />
    </div>

    <div class="flex flex-col-reverse md:flex-col">
      <!-- Search by date -->
      <div class="flex flex-col items-end text-start md:text-end mb-4">
        <SearchByDate @search="searchByDate" :reset="resetVal" className="w-full md:w-auto" />
      </div>

    <div class="flex flex-wrap gap-y-4 justify-between items-end py-2">
      <div class="w-full md:w-auto">
        <Search @search="search" :reset="resetVal" className="w-full md:w-auto" />
      </div>
      <div class="flex md:flex-col space-y-3 items-center w-full md:w-auto justify-end md:justify-center md:space-y-0 md:space-x-3">
        <div class="flex items-center gap-2 mt-3 sm:mt-0">
          <button class="p-2 rounded-lg shadow-md hover:bg-highlight hover:text-black-white" title="card display" :class="cardDisplay?'bg-highlight text-black-white':''" @click="cardDisplay = !cardDisplay">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
              <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
            </svg>
          </button>
          <button class="p-2 rounded-lg shadow-md hover:bg-highlight hover:text-black-white" title="table display" :class="!cardDisplay?'bg-highlight text-black-white':''" @click="cardDisplay = !cardDisplay">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    </div>


    <div v-if="!services && !errors">
      <Loading />
    </div>
    <div v-else>
      <div v-if="errors">
        <Empty :message="errors" />
      </div>

      <div v-if="services" class="w-full h-auto">
        <div v-if="cardDisplay" class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div v-for="service in services.data" :key="service.id" class="col-span-1">
            <ServiceCard :service="service" :recent-service-id="recentServiceId" />
          </div>
        </div>
        <div v-else>
          <ServiceList :services="services.data" :recent-service-id="recentServiceId" :total="services.total" />
          <div v-if="services.data.length" class="w-full flex mt-8 mb-12">
            <Pagination :links="services.links" @nextPage="nextPage" />
          </div>
        </div>
      </div>
    </div>
    <!-- new service -->
    <div class="fixed z-40 bottom-14 right-2.5">
      <router-link class="flex justify-end" to="service/create">
        <button class="bg-whitee p-2 text-xs text-white rounded-full bg-purple-500 hover:bg-green-500 shadow shadow-black dark:shadow-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import ServiceList from '@/Components/List/Service.vue'
import ServiceCard from '@/Components/Card/Service.vue'
import Loading from '@/Components/Loading.vue'
import Empty from '@/Components/Empty.vue'
import Pagination from '@/Components/PaginationTable.vue'
import Search from '@/Components/Search.vue'
import SearchByDate from '@/Components/SearchByDate.vue'
import Filters from '@/Components/Filters.vue'

export default {
  components: {
    Breadcrumb,
    ServiceList,
    ServiceCard,
    Loading,
    Empty,
    Pagination,
    Search,
    SearchByDate,
    Filters,
  },

  data() {
    return {
      order_by: ['admin_name', 'agency', 'created_at', 'credit', 'debit', 'name', 'price', 'validity'],
      services: null,
      errors: null,
      recentServiceId: null,
      selectedFilters: {
        by: 'name',
        order: 'asc',
        agency: '',
        validity: '',
        service_type: '',
        q: '',
        date: null,
        page: 1,
      },
      cardDisplay: true,
      resetVal: false,
    }
  },

  mounted() {
    // this.getAllServices(),
    this.getRecentServiceId()
    
    this.$watch(
      () => this.selectedFilters,
      this.getAllServices,
      { 
        immediate: true,
        deep: true
      }
    )
  },
  
  methods: {
    resetFilter() {
      this.resetVal = !this.resetVal
      this.selectedFilters.q = ''
      this.selectedFilters.date = ''
      this.selectedFilters.page = 1
    },
    getAllServices() {
      this.errors = null
      this.$store.dispatch("services/getAllServices", this.selectedFilters)
        .then((res) => {
          if(res) {
            this.services = res.services
          }
        })
        .catch(err => {
          if(err.response) {
            this.services = null //err.response.data.services
            this.errors = err.response.data.errors
          }
        })
    },
    getRecentServiceId() {
      //this.loading = true
      this.$store.dispatch("services/getRecentServiceId")
        .then((res) => {
          if(res) {
            this.recentServiceId = res.id
          }
          //this.loading = false
        })
    },
    nextPage(nb) {
      this.selectedFilters.page = nb
    },
    search(q) {
      this.selectedFilters.q = q
    },
    searchByDate(date){
      this.selectedFilters.date = date
    },

    setFilters(filters){
      this.selectedFilters = filters
    },
  },
}
</script>
