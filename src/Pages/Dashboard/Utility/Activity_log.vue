<template>
  <div>
    <Breadcrumb link1="dashboard" link2="activity_log" />
    <h1 class="ml-3 my-6 sm:my-8 title"> Activity Log </h1>
    <div class="flex flex-wrap gap-y-4 justify-between items-center py-3">
      <div class="w-full md:w-auto">
        <Search @search="search" :reset="reset" className="w-full md:w-auto" />
      </div>
      <div class="flex space-y-3 items-center w-full md:w-auto justify-end md:space-y-0 md:space-x-3">
        <button type="button" class="text-sm hover:text-danger btn-base" title="reset filter" @click="reset = !reset">
          Clear filters
        </button>
        <router-link class="flex justify-end" :to="{ name: 'user.create'}">
          <button type="button" class="flex items-center justify-center flex-shrink-0 btn-blue btn-base" title="create log">
            <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
            <span class="ml-2">New log</span>
          </button>
        </router-link>
      </div>
    </div>

    <div v-if="!logs && !errors">
      <Loading />
    </div>
    <div v-else>
      <div v-if="errors">
        <Empty :message="errors" />
      </div>
    </div>
    <div v-if="logs">
      <ListLog @newFilters="filteredActivity" :logs="logs.data" :reset="reset"/>
      <div v-if="logs.data.length" class="w-full flex mt-8 mb-12">
        <Pagination :links="logs.links" @nextPage="nextPage" />
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import ListLog from '@/Components/List/Activity_log.vue'
import Loading from '@/Components/Loading.vue'
import Pagination from '@/Components/PaginationTable.vue'
import Empty from '@/Components/Empty.vue'
import Search from '@/Components/Search.vue'

export default {
  components: {
    Breadcrumb,
    ListLog,
    Loading,
    Pagination,
    Empty,
    Search,
  },

  data() {
    return {
      logs: null,
      errors: null,
      selectedFilters: {
        by: 'description',
        order: 'asc',
        q: '',
      },
      reset: false,
    }
  },

  mounted() {
    //this.getActivityLog()
    
    this.$watch(
      () => this.selectedFilters,
      this.getActivityLog,
      { 
        immediate: true,
        deep: true
      }
    )
  },
  
  methods: {
    search(q) {
      this.selectedFilters.q = q
      // this.getActivityLog()
    },

    getActivityLog() {
      this.errors = null
      this.reset = false,
      this.$store.dispatch("utilities/getActivityLog", this.selectedFilters)
        .then((res) => {
          if(res) {
            this.logs = res.logs
          }
        })
        .catch(err => {
          if(err.response) {
            this.logs = null
            this.errors = err.response.data.errors
          }
        })
    },
    nextPage (nb) {
      this.$store.dispatch("utilities/getActivityLog", {
        page: nb
      })
        .then((res) => {
          if(res) {
            this.logs = res.logs
          }
        })
    },

    filteredActivity(selectedFilters) {
      this.selectedFilters = selectedFilters
      // this.getActivityLog()
    },
  },
}
</script>

