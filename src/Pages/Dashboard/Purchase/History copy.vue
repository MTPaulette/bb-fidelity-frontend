<template>
  <div>
    <Breadcrumb link1="dashboard" link2="history" />
    <h1 class="ml-3 my-6 sm:my-8 title"> My History </h1>

    <div v-if="loading">
      <Loading />
    </div>

    <div v-if="errors">
      <Empty :message="errors" />
    </div>
  
    <div v-if="services && user">
      <ListPurchase :services="services.data" :user="user" />
      <div v-if="services.data.length" class="w-full flex mt-8 mb-12">
        <Pagination :links="services.links" @nextPage="nextPage" />
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import Loading from '@/Components/Loading.vue'
import ListPurchase from '@/Components/List/Purchase.vue'
import Empty from '@/Components/Empty.vue'
import Pagination from '@/Components/PaginationTable.vue'


export default {
  components: {
    Breadcrumb,
    Loading,
    ListPurchase,
    Empty,
    Pagination,
  },
  data() {
    return {
      services: null,
      loading: false,
      errors: null,
      id: null,
      user: null,
    }
  },

  mounted() {
    this.$store.dispatch("auth/getAuthenticatedUser")
        .then((res) => {
          if(res) {
            this.id = res.user.id
            this.user = res.user
            this.getAllServicesOfUser(this.id)
          }
        })
  },

  methods: {
    getAllServicesOfUser (id) {
      this.loading = true
      this.$store
        .dispatch('purchases/getAllServicesOfUser', {
          id: id
        })
        .then((res) => {
          this.services = res.data.services
        })
        .catch(err => {
          if(err.response) {
            this.errors = err.response.data.errors
          }
          // console.log(err)
        })
        .finally(() => this.loading = false)
    },
    nextPage (nb) {
      this.$store
        .dispatch('purchases/getAllServicesOfUser', {
          id: this.id,
          page: nb
      })
        .then((res) => {
          if(res) {
            this.services = res.data.services
          }
        })
    },

  }
}

</script>

