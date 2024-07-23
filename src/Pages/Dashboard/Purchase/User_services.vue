<template>
  <div>
    <Breadcrumb link1="dashboard" link2="historic" />
    <div v-if="loading">
      <Loading />
    </div>

    <div v-if="errors" class="error">{{ errors }}</div>

    <div class="ml-3">
      <h1 class="my-6 sm:my-8 title" v-if="user"> {{ user.name }} Historic </h1>
    </div>

    <!-- <div class="p-4 m-7"> user: {{ user }}</div> -->
    <!-- <div class="p-4 m-14"> services: {{ services }}</div> -->

    <!-- <div class="w-full bg-default border border-color rounded-lg shadow" v-if="user"> -->
    <div v-if="services">
      <ListPurchase :services="services" />
    </div>
  </div>
</template>

<script setup>
import { formatDate } from '@/Composables/formatDate'
</script>

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
      user: null,
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
      this.loading = true
      this.$store
        .dispatch('purchases/getAllServicesOfUser', {
          id: id
        })
        .then((res) => {
          this.user = res.data.user
          this.services = res.data.services
        })
        .catch(err => {
          this.errors = err.toString()
          console.log(err)
        })
        .finally(() => this.loading = false)
    }
  }
}

</script>

