<template>
  <div>
    <Breadcrumb link1="dashboard" link2="purchases" />
    <h1 class="ml-3 my-6 sm:my-8 title"> All purchase </h1>
    <div v-if="loading">
      <Loading />
    </div>
    <div v-if="purchases">
      <ListPurchase :services="purchases.data" />
      <div v-if="purchases.data.length" class="w-full flex mt-8 mb-12">
        <Pagination :links="purchases.links" @nextPage="nextPage" />
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import ListPurchase from '@/Components/List/Purchase.vue'
import Loading from '@/Components/Loading.vue'
import Pagination from '@/Components/PaginationTable.vue'

export default {
  components: {
    Breadcrumb,
    ListPurchase,
    Loading,
    Pagination,
  },

  data() {
    return {
      loading: false,
      purchases: null,
    }
  },

  mounted() {
    this.loading = true
    this.$store.dispatch("purchases/getAllPurchases")
        .then((res) => {
          if(res) {
            this.purchases = res.purchases
          }
          this.loading = false
        })
  },
  methods: {
    nextPage (nb) {
      this.$store.dispatch("purchases/getAllPurchases", {
        page: nb
      })
        .then((res) => {
          if(res) {
            this.purchases = res.data.purchases
          }
        })
    },
  },
}
</script>
