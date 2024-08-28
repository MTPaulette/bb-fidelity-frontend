<template>
  <div>
    <Breadcrumb link1="dashboard" link2="users" />
    <h1 class="ml-3 my-6 sm:my-8 title"> All users </h1>

    <div v-if="!users && !errors">
      <Loading />
    </div>
    <div v-else>
      <div v-if="errors">
        <Empty :message="errors" />
      </div>
    </div>
    <div v-if="users">
      <ListUser @newFilters="filteredServices" :users="users.data" :errors="errors "/>
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

export default {
  components: {
    Breadcrumb,
    ListUser,
    Loading,
    Pagination,
    Empty,
  },

  data() {
    return {
      users: null,
      errors: null,
      selectedFilters: {
        by: 'name',
        order: 'asc',
        q: '',
      },
    }
  },

  mounted() {
    this.getAllUsers()
  },
  
  methods: {
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
    nextPage (nb) {
      this.$store.dispatch("auth/getAllUsers", {
        page: nb
      })
        .then((res) => {
          if(res) {
            this.users = res.users
          }
        })
    },

    filteredServices(selectedFilters) {
      this.selectedFilters = selectedFilters
      this.getAllUsers()
    },
  },
}
</script>

