<template>
  <div>
    <Breadcrumb link1="dashboard" link2="purchases" />
    <h1 class="ml-3 my-6 sm:my-8 title"> All services of user <span v-if="purchases"><span v-if="purchases.data[0]">{{purchases.data[0].user_name}}</span></span> </h1>

    <!-- filters -->
    <div class="w-full h-auto">
      <Filters @setFilters="setFilters" @resetFilters="resetFilter"/>
    </div>

    <div class="flex flex-col-reverse md:flex-col">
    <div class="flex flex-wrap gap-y-4 justify-between items-end py-2">
      <div class="flex items-center w-full md:w-auto">
        <span class="text-gray-500 mr-4">User balance:</span>
          <div class="flex items-center text-lg" v-if="purchases">
            <div class="inline-block w-4 h-4 mr-2 rounded-full" :class="[purchases.data[0].user_current_balance > 0 ? 'bg-green-400' : 'bg-red-700']" />
              {{purchases.data[0].user_current_balance}} point(s)
          </div>
        <!-- <Search @search="search" :reset="resetVal" className="w-full md:w-auto" /> -->
      </div>
      <div class="text-end">
        <SearchByDate @search="searchByDate" :reset="resetVal" className="w-full md:w-auto" />
      </div>
    </div>
    </div>

    <div v-if="!purchases && !errors">
      <Loading />
    </div>
    <div v-else>
      <div v-if="errors">
        <Empty :message="errors" />
      </div>

      <div v-if="purchases" class="w-full h-auto">
        <PurchaseList :purchases="purchases.data" :total="purchases.total" />
        <div v-if="purchases.data.length" class="w-full flex mt-8 mb-12">
          <Pagination :links="purchases.links" @nextPage="nextPage" />
        </div>
      </div>
    </div>
    <!-- new purchase -->
    <div class="fixed z-40 bottom-14 right-2.5">
      <router-link class="flex justify-end" to="purchase/create">
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
import PurchaseList from '@/Components/List/Purchase2.vue'
import Loading from '@/Components/Loading.vue'
import Empty from '@/Components/Empty.vue'
import Pagination from '@/Components/PaginationTable.vue'
// import Search from '@/Components/Search.vue'
import SearchByDate from '@/Components/SearchByDate.vue'
import Filters from '@/Components/Filters.vue'

export default {
  components: {
    Breadcrumb,
    PurchaseList,
    Loading,
    Empty,
    Pagination,
    // Search,
    SearchByDate,
    Filters,
  },

  data() {
    return {
      purchases: null,
      errors: null,
      selectedFilters: {
        by: 'created_at',
        order: 'desc',
        agency: '',
        validity: '',
        service_type: '',
        q: '',
        date: null,
        page: 1
      },
      resetVal: false,
    }
  },

  mounted() {
    this.getAllServicesOfUser(),
    this.$watch(
      () => this.selectedFilters,
      this.getAllServicesOfUser,
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
    getAllServicesOfUser() {
      this.errors = null
      this.$store.dispatch("purchases/getAllServicesOfUser", {
        id: this.$route.params.id,
        selectedFilters: this.selectedFilters
      })
        .then((res) => {
          if(res) {
            this.purchases = res.purchases
          }
        })
        .catch(err => {
          if(err.response) {
            this.purchases = null //err.response.data.purchases
            this.errors = err.response.data.errors
          }
        })
    },
    nextPage(nb) {
      this.selectedFilters.page = nb
    },
    // search(q) {
    //   this.selectedFilters.q = q
    // },
    searchByDate(date){
      this.selectedFilters.date = date
    },

    setFilters(filters){
      this.selectedFilters = filters
    },
  },
}
</script>
