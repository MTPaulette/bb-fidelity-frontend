<template>
  <div>
    <Breadcrumb link1="dashboard" link2="purchases" />
    <div v-if="loading">
      <Loading />
    </div>

    <div v-if="errors" class="my-32 text-2xl md:text-3xl font-light leading-tight tracking-tight text-primary text-center">{{ errors }}</div>

    <div class="ml-3">
      <h1 class="my-6 sm:my-8 title"> All purchase </h1>
    </div>

    <!-- <div class="p-4 m-7"> user: {{ user }}</div> -->
    <!-- <div class="p-4 m-14"> purchases: {{ purchases }}</div> -->

    <!-- <div class="w-full bg-default border border-color rounded-lg shadow" v-if="user"> -->
    <div v-if="purchases">
      purchases: {{ purchases[4].users }}
      <!-- <ListPurchase :services="purchases" /> -->
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import ListPurchase from '@/Components/List/Purchase.vue'

export default {
  components: {
    Breadcrumb,
    ListPurchase
  },

  computed: {
    purchases() {
      return JSON.parse(localStorage.getItem('purchases'))
    }
  },
  
  created() {
    this.$store.dispatch("purchases/getAllPurchases");
  },
}

</script>

