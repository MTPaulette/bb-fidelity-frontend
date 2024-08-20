<template>
  <div>
    <Breadcrumb link1="dashboard" link2="service_users" />
    <div v-if="loading">
      <Loading />
    </div>

    <div v-if="errors">
      <Empty :message="errors" />
    </div>

    <div v-if="users">
      <h1 class="ml-3 my-6 sm:my-8 title"> {{ users.data[0].service_name }} Historic </h1>
      <ListUser :users="users.data" />
      <div v-if="users.data.length" class="w-full flex mt-8 mb-12">
        <Pagination :links="users.links" @nextPage="nextPage" />
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import Loading from '@/Components/Loading.vue'
import ListUser from '@/Components/List/User.vue'
import Empty from '@/Components/Empty.vue'
import Pagination from '@/Components/PaginationTable.vue'


export default {
  components: {
    Breadcrumb,
    Loading,
    ListUser,
    Empty,
    Pagination,
  },
  data() {
    return {
      users: null,
      loading: false,
      errors: null
    }
  },

  mounted() {
    this.getAllUsersOfService(this.$route.params.id)
  },

  methods: {
    getAllUsersOfService (id) {
      if(id) {
      this.loading = true
      this.$store
        .dispatch('purchases/getAllUsersOfService', {
          id: id
        })
        .then((res) => {
          this.users = res.data.users
        })
        .catch(err => {
          if(err.response) {
            this.errors = err.response.data.errors
          }
          console.log(err)
        })
        .finally(() => this.loading = false)
      }
    },
    nextPage (nb) {
      this.$store
        .dispatch('purchases/getAllUsersOfService', {
          id: this.$route.params.id,
          page: nb
      })
        .then((res) => {
          if(res) {
            this.users = res.data.users
          }
        })
    },
  }
}

</script>

