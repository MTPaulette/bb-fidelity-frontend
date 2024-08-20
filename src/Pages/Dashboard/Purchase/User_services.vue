<template>
  <div>
    <Breadcrumb link1="dashboard" link2="historic" />
    <div v-if="loading">
      <Loading />
    </div>

    <div v-if="errors">
      <Empty :message="errors" />
    </div>

    <div v-if="services">
      <h1 class="ml-3 my-6 sm:my-8 title"> {{ services.data[0].user_name }} Historic </h1>
      <ListPurchase :services="services.data" />
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
    Pagination
  },
  data() {
    return {
      services: null,
      loading: false,
      errors: null,
    }
  },

  mounted() {
    this.getAllServicesOfUser(this.$route.params.id)
  },
  createdd() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params.id,
      this.getAllServicesOfUser,

      // fetch the data when the view is created and the data is already being observed
      { immediate: true }
    )
  },

  methods: {
    getAllServicesOfUser (id) {
      if(id) {
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
          console.log(err)
        })
        .finally(() => this.loading = false)
      }
    },
    nextPage (nb) {
      this.$store
        .dispatch('purchases/getAllServicesOfUser', {
        id: this.$route.params.id,
        page: nb
      })
        .then((res) => {
          console.log(res)
          if(res) {
            this.services = res.data.services
          }
        })
    },
  },
}
</script>
