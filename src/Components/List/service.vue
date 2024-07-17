<template>
  <div class="relative overflow-x-auto">
    <div class="block sm:flex sm:justify-between sm:items-center py-3">
      <div class="flex items-center">
        <div class="relative">
          <SearchBar placeholder="Search for services" />
        </div>
        <div>
          <button id="dropdownActionButton" data-dropdown-toggle="dropdownDotsHorizontal" class="inline-flex mt-2 ml-2 text-sm font-medium text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
          </button>
        
          <!-- Dropdown menu -->
          <div id="dropdownDotsHorizontal" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
              </li>
            </ul>
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete Service</a>
            </div>
          </div>
        </div>
      </div>
      <div class="flex mt-5 sm:mt-0">
        <div>
          <Button label="add service" hasicon rounded btn small>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </Button>
        </div>

        <a href="/export/services" class="ml-2">
          <Button label="export" hasicon rounded light small>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
          </Button>
        </a>
      </div>
    </div>
  </div>

  <table class="w-full text-sm text-left my-5">
      <thead class="text-xs uppercase bg-secondary ">
        <!-- <thead class="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"> -->
        <tr>
          <th scope="col" class="px-6 py-2.5">
            Name
          </th>
          <!-- <th scope="col" class="px-6 py-2.5">
            email
          </th> -->
          <th scope="col" class="px-6 py-2.5">
            price/point
          </th>
          <th scope="col" class="px-6 py-2.5">
            description
          </th>
          <th scope="col" class="px-6 py-2.5">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in services.data" :key="service.id" class="border-b border-gray-100 hover:bg-highlight">
          <th scope="row" class="flex items-center px-6 py-2.5 whitespace-nowrap">
            <div class="pl-3">
              <router-link :to="`service/${service.id}`" class="font-light"><span class="text-black-white font-semibold"> {{ service.name }}</span></router-link>
            </div>  
          </th>
          <td class="px-6 py-2.5">
            {{ service.price }}
          </td>
          <td class="px-6 py-2.5">
            {{ service.description }}
          </td>
          <td>
            <div class="px-6 py-2.5 flex justify-between w-full ">
              <div @click="buy(service.id)">
                <!-- Modal toggle -->
                <Button label="acheter" type="submit" hasicon rounded btn extrasmall>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                  </svg>
                </Button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  <div v-if="services">
    <div v-if="services.data.length" class="w-full flex mt-8 mb-12">
      <Pagination :links="services.links" />
    </div>
  </div>
</template>


<script>
import FlashAlert from '@/Components/FlashAlert.vue'
import Pagination from '@/Components/PaginationTable.vue'
import Button from '@/Components/Button.vue'
import SearchBar from '@/Components/SearchBar.vue'


export default {
  components: {
    Pagination,
    FlashAlert,
    SearchBar
  },
  data() {
    return {
      message: ''
    }
  },

  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user')).user
    },
    services() {
      return JSON.parse(localStorage.getItem('services')).services
    },
  },

  created() {
    this.$store.dispatch("getAllServices");
  },

  methods: {
    update (user) {
      this.$store
        .dispatch('updateService', {
          service_id: this.service,
          id: user.id,
        })
        .then(() => {
          this.message = "User buy this service"
          // location.reload()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>