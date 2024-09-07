<template>
  <div>
    <Breadcrumb link1="dashboard" link2="users" />
    <h1 class="ml-3 my-6 sm:my-8 title"> All users </h1>
    <div class="flex flex-col-reverse md:flex-col">
      <!-- Search by date -->
      <div class="flex flex-col items-end text-start md:text-end mb-4">
        <SearchByDate @search="searchByDate" :reset="resetVal" className="w-full md:w-auto" />
      </div>
      <div class="flex flex-wrap gap-y-4 justify-between items-center py-3">
        <div class="w-full md:w-auto">
          <Search @search="search" :reset="resetVal" className="w-full md:w-auto" />
        </div>
        <div class="flex space-y-3 items-center w-full md:w-auto justify-end md:space-y-0 md:space-x-3">
          <button type="button" class="text-sm hover:text-danger btn-base" title="reset filter" @click="clearFilters">
            Clear filters
          </button>
          <router-link class="flex justify-end" :to="{ name: 'user.create'}">
            <button type="button" class="flex items-center justify-center flex-shrink-0 btn-blue btn-base" title="create user">
              <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
              </svg>
              <span class="ml-2">New user</span>
              <!-- <span class="ml-2 hidden sm:inline">New user</span> -->
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="!users && !errors">
      <Loading />
    </div>
    <div v-else>
      <div v-if="errors">
        <Empty :message="errors" />
      </div>
    </div>
    <div v-if="users">
      <ListUser @newFilters="filteredUsers" :users="users.data" :reset="resetVal" :total="users.total" />
      <div v-if="users.data.length" class="w-full flex mt-8 mb-12">
        <Pagination :links="users.links" @nextPage="nextPage" />
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import ListUser from '@/Components/List/User.vue'
import Loading from '@/Components/Loading.vue'
import Pagination from '@/Components/PaginationTable.vue'
import Empty from '@/Components/Empty.vue'
import Search from '@/Components/Search.vue'
import SearchByDate from '@/Components/SearchByDate.vue'

export default {
  components: {
    Breadcrumb,
    ListUser,
    Loading,
    Pagination,
    Empty,
    Search,
    SearchByDate,
  },

  data() {
    return {
      users: null,
      errors: null,
      selectedFilters: {
        by: 'name',
        order: 'asc',
        is_registered: null,
        q: '',
        date: null,
        page: 1,
      },
      resetVal: false,
    }
  },

  mounted() {
    this.$watch(
      () => this.selectedFilters,
      this.getAllUsers,
      { 
        immediate: true,
        deep: true
      }
    )
  },
  
  methods: {
    search(q) {
      this.selectedFilters.q = q
    },
    searchByDate(date){
      this.selectedFilters.date = date
    },

    getAllUsers() {
      this.errors = null
      this.$store.dispatch("auth/getAllUsers", this.selectedFilters)
        .then((res) => {
          if(res) {
            this.users = res.users
          }
        })
        .catch(err => {
          if(err.response) {
            this.users = null
            this.errors = err.response.data.errors
          }
        })
    },
    nextPage(nb) {
      this.selectedFilters.page = nb
    },

    filteredUsers(selectedFilters) {
      this.selectedFilters.by = selectedFilters.by
      this.selectedFilters.order = selectedFilters.order
      this.selectedFilters.is_registered = selectedFilters.is_registered
    },

    clearFilters() {
      this.resetVal = !this.resetVal
      this.selectedFilters.q = ''
      this.selectedFilters.date = ''
      this.selectedFilters.page = 1
    }
  },
}
</script>

