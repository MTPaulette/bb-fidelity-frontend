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
      <ul class="flex flex-wrap items-center text-secondary gap-1.5 md:gap-2 py-4 md:py-6 px-2 md:px-4 text-xs">
        <li>
          <button
            class="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium border rounded-full
            disabled text-purple-700 border-purple-700 focus:ring-purple-300 dark:border-purple-400 dark:text-purple-400"
          >
            <svg fill="currentColor" class="w-5 h-5" viewBox="0 0 16 16">
              <path d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z" />
            </svg>
            <span class="ml-1">Filters</span>
          </button>
        </li>

        <!-- by's list -->
        <li class="relative">
          <div @click="showBy = !showBy" :class="selectedFilters.by?'bg-highlight':''" class="flex justify-between py-1 px-3 rounded-lg border border-color font-['roboto']">
            <div class="ml-3 mr-2 font-medium"> {{ selectedFilters.by }}</div>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <div v-show="showBy" class="over-y absolute mt-1 z-10 divide-y divide-[#dadce0] w-32 max-h-[100px] dropdown">
            <ul class="py-2 text-sm" @click="showBy = false">
              <li v-for="(by, i) in order_by" :key="i" class="cursor-pointer">
                <span class="dropdown-item-filter" @click="selectedFilters.by = by">
                  {{ by }}
                </span>
              </li>
            </ul>
          </div>
        </li>

        <!-- order's list -->
        <li class="relative">
          <div @click="showOrder = !showOrder" :class="selectedFilters.order?'bg-highlight':''" class="flex justify-between py-1 px-3 rounded-lg border border-color font-['roboto']">
            <div class="ml-3 mr-2 font-medium"> {{ selectedFilters.order }}</div>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <div v-show="showOrder" class="over-y absolute mt-1 z-10 divide-y divide-[#dadce0] w-32 max-h-[100px] dropdown">
            <ul class="py-2 text-sm" @click="showOrder = false">
              <li v-for="(order, i) in asc_desc" :key="i" class="cursor-pointer">
                <span class="dropdown-item-filter" @click="selectedFilters.order = order">
                  {{ order }}
                </span>
              </li>
            </ul>
          </div>
        </li>

        <!-- Agency's list -->
        <li class="relative">
          <div @click="showAgency = !showAgency" :class="selectedFilters.agency?'bg-highlight':''" class="flex justify-between py-1 px-3 rounded-lg border border-color font-['roboto']">
            <div class="ml-3 mr-2 font-medium">
              <span v-if="selectedFilters.agency">{{ selectedFilters.agency }}</span>
              <span v-else>All agency</span>
            </div>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <div v-show="showAgency" class="over-y absolute mt-1 z-10 divide-y divide-[#dadce0] w-32 max-h-[100px] dropdown">
            <ul class="py-2 text-sm" @click="showAgency = false">
              <li class="border-b border-color">
                <span class="dropdown-item-filter" @click="selectedFilters.agency = ''">
                  All agency
                </span>
              </li>
              <li v-for="(agency, i) in agencies" :key="i" class="cursor-pointer">
                <span class="dropdown-item-filter" @click="selectedFilters.agency = agency">
                  {{ agency }}
                </span>
              </li>
            </ul>
          </div>
        </li>

        <!-- Validity's list -->
        <li class="relative">
          <div @click="showValidity = !showValidity" :class="selectedFilters.validity?'bg-highlight':''" class="flex justify-between py-1 px-3 rounded-lg border border-color font-['roboto']">
            <div class="ml-3 mr-2 font-medium">
              <span v-if="selectedFilters.validity">{{ selectedFilters.validity }}</span>
              <span v-else>All validity</span>
            </div>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
      
          <div v-show="showValidity" class="over-y absolute mt-1 z-10 divide-y divide-[#dadce0] w-32 max-h-[100px] dropdown">
            <ul class="py-2 text-sm" @click="showValidity = false">
              <li class="border-b border-color">
                <span class="dropdown-item-filter" @click="selectedFilters.validity = ''">
                  All validity
                </span>
              </li>
              <li v-for="(validity, i) in validities" :key="i" class="cursor-pointer">
                <span class="dropdown-item-filter" @click="selectedFilters.validity = validity">
                  {{ validity }}
                </span>
              </li>
            </ul>
          </div>
        </li>

        <!-- Service_type's list -->
        <li class="relative">
          <div @click="showService_type = !showService_type" :class="selectedFilters.service_type?'bg-highlight':''" class="flex justify-between py-1 px-3 rounded-lg border border-color font-['roboto']">
            <div class="ml-3 mr-2 font-medium">
              <span v-if="selectedFilters.service_type">{{ selectedFilters.service_type }}</span>
              <span v-else>All Type</span>
            </div>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
      
          <div v-show="showService_type" class="over-y absolute mt-1 z-10 divide-y divide-[#dadce0] w-32 max-h-[100px] dropdown">
            <ul class="py-2 text-sm" @click="showService_type = false">
              <li class="border-b border-color">
                <span class="dropdown-item-filter" @click="selectedFilters.service_type = ''">
                  All type
                </span>
              </li>
              <li v-for="(service_type, i) in service_types" :key="i" class="cursor-pointer">
                <span class="dropdown-item-filter" @click="selectedFilters.service_type = service_type">
                  {{ service_type }}
                </span>
              </li>
            </ul>
          </div>
        </li>

        <!-- User_type's list -->
        <li class="relative">
          <div @click="showUser_type = !showUser_type" :class="selectedFilters.user_type?'bg-highlight':''" class="flex justify-between py-1 px-3 rounded-lg border border-color font-['roboto']">
            <div class="ml-3 mr-2 font-medium">
              <span v-if="selectedFilters.user_type">{{ selectedFilters.user_type }}</span>
              <span v-else>All User Type</span>
            </div>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
      
          <div v-show="showUser_type" class="over-y absolute mt-1 z-10 divide-y divide-[#dadce0] w-32 max-h-[100px] dropdown">
            <ul class="py-2 text-sm" @click="showUser_type = false">
              <li class="border-b border-color">
                <span class="dropdown-item-filter" @click="selectedFilters.user_type = ''">
                  All type
                </span>
              </li>
              <li v-for="(user_type, i) in user_types" :key="i" class="cursor-pointer">
                <span class="dropdown-item-filter" @click="selectedFilters.user_type = user_type">
                  {{ user_type }}
                </span>
              </li>
            </ul>
          </div>
        </li>

        <!-- reset -->
        <li @click="reset">
          <button type="button" class="font-medium text-sm hover:text-danger">Clear all</button>
        </li>
      </ul>
    </div>

    <div class="w-full block sm:flex justify-center sm:justify-between items-center px-2">
      <Search @search="search" />
    <!--display type -->
    <div class="flex justify-end items-center gap-2 mt-3 sm:mt-0">
      <button class="p-2 rounded-lg shadow-md" title="card display" @click="cardDisplay = !cardDisplay" :class="cardDisplay?'bg-highlight text-black-white':''">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
          <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
        </svg>
      </button>
      <button class="p-2 rounded-lg shadow-md" title="table display" @click="cardDisplay = !cardDisplay" :class="!cardDisplay?'bg-highlight text-black-white':''">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
        </svg>
      </button>
    </div>
    </div>


    <div v-if="loading">
      <Loading />
    </div>
    <div v-else>
    <div v-if="errors">
      <Empty :message="errors" />
    </div>

    <div v-if="services" class="w-full h-auto">
      <div v-if="cardDisplay" class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div v-for="service in services.data" :key="service.id" class="col-span-1">
          <ServiceCard :service="service" :recentServiceId="recentServiceId" />
        </div>
      </div>
      <div v-else>
        <ServiceList :services="services.data" :recentServiceId="recentServiceId" />
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
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
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


import Agencies from '@/Database/Agencies.js'
import Validities from "@/Database/Validities.js"
import Service_types from "@/Database/Service_types.js"
import User_types from "@/Database/User_types.js"


export default {
  components: {
    Breadcrumb,
    ServiceList,
    ServiceCard,
    Loading,
    Empty,
    Pagination,
    Search
  },

  data() {
    return {
      agencies: Agencies,
      validities: Validities,
      service_types: Service_types,
      user_types: User_types,
      order_by: ['name', 'created_at'],
      asc_desc: ['asc', 'desc'],

      loading: false,
      services: null,
      errors: null,
      recentServiceId: null,
      selectedFilters: {
        by: 'name',
        order: 'asc',
        agency: '',
        validity: '',
        service_type: '',
        user_type: '',
        q: '',
      },
      showBy: false,
      showOrder: false,
      showAgency: false,
      showService_type: false,
      showUser_type: false,
      showValidity: false,
      cardDisplay: true,
    }
  },

  mounted() {
    this.getAllServices(),
    this.getRecentServiceId()
    
    this.$watch(
      () => this.selectedFilters,
      this.getAllServices,
      { immediate: true,
        
        deep: true
       }
    )
  },
  
  methods: {
    reset() {
      this.selectedFilters.by = 'name'
      this.selectedFilters.order = 'asc'
      this.selectedFilters.agency = ''
      this.selectedFilters.validity = ''
      this.selectedFilters.service_type = ''
      this.selectedFilters.user_type = ''
      this.selectedFilters.q = ''
    },
    getAllServices() {
      this.errors = null
      this.loading = true
      this.$store.dispatch("services/getAllServices", this.selectedFilters)
          .then((res) => {
            if(res) {
              this.services = res.services
            }
            this.loading = false
          })
          .catch(err => {
            if(err.response) {
              this.services = err.response.data.services
              this.errors = err.response.data.errors
            }
            console.log(err)
          })
          .finally(() => this.loading = false)
    },
    getRecentServiceId() {
    this.loading = true
    this.$store.dispatch("services/getRecentServiceId")
        .then((res) => {
          if(res) {
            this.recentServiceId = res.id
          }
          this.loading = false
        })
    },
    nextPage (nb) {
      this.$store.dispatch("services/getAllServices", {
        page: nb
      })
        .then((res) => {
          if(res) {
            this.services = res.services
          }
        })
    },
    search(q) {
      this.selectedFilters.q = q
    },
  }
}
</script>
