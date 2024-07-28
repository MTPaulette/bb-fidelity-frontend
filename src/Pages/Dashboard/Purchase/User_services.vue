<template>
  <div>
    <Breadcrumb link1="dashboard" link2="historic" />
    <div v-if="loading">
      <Loading />
    </div>

    <div v-if="errors" class="my-32 text-2xl md:text-3xl font-light leading-tight tracking-tight text-primary text-center">{{ errors }}</div>

    <h1 class="ml-3 my-6 sm:my-8 title" v-if="services"> {{ services[0].user_name }} Historic </h1>
    <div v-if="services">
      <ListPurchase :services="services" />
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import Loading from '@/Components/Loading.vue'
import ListPurchase from '@/Components/List/Purchase.vue'

export default {
  components: {
    Breadcrumb,
    Loading,
    ListPurchase
  },
  data() {
    return {
      services: null,
      loading: false,
      errors: null
    }
  },

  created() {
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
    }
  }
}

</script>

