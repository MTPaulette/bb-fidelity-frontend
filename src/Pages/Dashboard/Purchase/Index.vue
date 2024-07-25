<template>
<div v-if="purchases">
      <Breadcrumb link1="dashboard" link2="purchases" />
      <div class="ml-3">
        <h1 class="my-6 sm:my-8 title"> All purchase </h1>
      </div>
      <ListPurchase :services="purchases" />
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

