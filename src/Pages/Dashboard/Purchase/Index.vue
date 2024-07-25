<template>
  <div>
    <div v-if="loading">
      <Loading />
    </div>

    <div v-if="errors" class="my-32 text-2xl md:text-3xl font-light leading-tight tracking-tight text-primary text-center">{{ errors }}</div>

    <div v-if="purchases">
      <Breadcrumb link1="dashboard" link2="purchases" />
      <div class="ml-3">
        <h1 class="my-6 sm:my-8 title"> All purchase </h1>
      </div>
      <ListPurchase :services="purchases" />
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
  
  mounted() {
    this.$store.dispatch("purchases/getAllPurchases");
  },
}

</script>

