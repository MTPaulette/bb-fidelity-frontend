<template>
  <div>
    <Breadcrumb link1="dashboard" link2="historic" />
    <h1 class="ml-3 my-6 sm:my-8 title"> My Historic </h1>

    <div v-if="loading">
      <Loading />
    </div>

    <div v-if="errors">
      <Empty :message="errors" />
    </div>
  
    <div v-if="services">
      <ListPurchase :services="services" />
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import Loading from '@/Components/Loading.vue'
import ListPurchase from '@/Components/List/Purchase.vue'
import Empty from '@/Components/Empty.vue'


export default {
  components: {
    Breadcrumb,
    Loading,
    ListPurchase,
    Empty
  },
  data() {
    return {
      services: null,
      loading: false,
      errors: null
    }
  },

  mounted() {
    this.getAllServicesOfUser()
  },

  methods: {
    getAllServicesOfUser () {
      this.id = JSON.parse(localStorage.getItem('user')).id
      this.loading = true
      this.$store
        .dispatch('purchases/getAllServicesOfUser', {
          id: this.id
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

</script>

