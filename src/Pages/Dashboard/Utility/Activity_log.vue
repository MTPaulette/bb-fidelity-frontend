<template>
  <div>
    <div v-if="message !=''">
      <FlashAlert :message="message" />
    </div>
    <Breadcrumb link1="dashboard" link2="activity_log" />
    <h1 class="ml-3 my-6 sm:my-8 title"> Activity Log </h1>
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
          <div @click="toggleModal">
            <ButtonLoading class="btn-base btn-danger-2 ms-2 whitespace-nowrap" label="Clear logs" type="button" :loading="loading" />
          </div>
        </div>
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
      <ListLog @newFilters="filteredActivity" :logs="logs.data" :reset="resetVal" :total="logs.total" />
      <div v-if="logs.data.length" class="w-full flex mt-8 mb-12">
        <Pagination :links="logs.links" @nextPage="nextPage" />
      </div>
    </div>
    <ConfirmModal :errors="errorPassword" :sending="sending" @confirm-delete="clearLogs" />
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import ListLog from '@/Components/List/Activity_log.vue'
import Loading from '@/Components/Loading.vue'
import Pagination from '@/Components/PaginationTable.vue'
import Empty from '@/Components/Empty.vue'
import Search from '@/Components/Search.vue'
import ButtonLoading from '@/Components/ButtonLoading.vue'
import ConfirmModal from '@/Components/ConfirmModal.vue'
import FlashAlert from '@/Components/FlashAlert.vue'
import SearchByDate from '@/Components/SearchByDate.vue'

export default {
  components: {
    Breadcrumb,
    ListLog,
    Loading,
    Pagination,
    Empty,
    Search,
    ButtonLoading,
    ConfirmModal,
    FlashAlert,
    SearchByDate,
  },

  data() {
    return {
      logs: null,
      errors: null,
      selectedFilters: {
        by: 'created_at',
        order: 'desc',
        q: '',
        date: null,
        page: 1,
      },
      resetVal: false,
      loading: false,

      message: '',
      sending: false,
      errorPassword: '',
    }
  },

  mounted() {
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
    },
    searchByDate(date){
      this.selectedFilters.date = date
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

    nextPage(nb) {
      this.selectedFilters.page = nb
    },

    filteredActivity(selectedFilters) {
      this.selectedFilters.by = selectedFilters.by
      this.selectedFilters.order = selectedFilters.order
    },
  
    clearFilters() {
      this.resetVal = !this.resetVal
      this.selectedFilters.q = ''
      this.selectedFilters.date = ''
      this.selectedFilters.page = 1
    },

    toggleModal() {
      document.getElementById('confirm-button').click()
    },

    clearLogs(password) {
      this.errorPassword = ''
      this.sending = true
      this.$store.dispatch("utilities/clearLogs", {
          password: password
      })
        .then((res) => {
          this.message = res.message
          this.toggleModal()
          setTimeout(() => {
            this.message = ''
            location.reload()
          }, 5000)
        })
        .catch(err => {
          if(err.response) {
            if(err.response.data.password) {
              this.errorPassword = err.response.data.password
            }
          }
        })
        .finally(() => this.sending = false)
    }
  },
}
</script>

