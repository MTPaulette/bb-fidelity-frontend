<template>
  <div>
    <Breadcrumb link1="dashboard" link2="purchases" />
    <h1 class="ml-3 my-6 sm:my-8 title"> All purchase </h1>
    <div v-if="!(purchases && user)">
      <Loading />
    </div>
    <div v-if="purchases && user">
      <ListPurchase :services="purchases" :user="user" />
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import ListPurchase from '@/Components/List/Purchase.vue'
import Loading from '@/Components/Loading.vue'

export default {
  components: {
    Breadcrumb,
    ListPurchase,
    Loading
  },

  data() {
    return {
      purchases: null,
      user: null,
    }
  },

  mounted() {
    this.$store.dispatch("purchases/getAllPurchases")
        .then((res) => {
          if(res) {
            this.purchases = res.purchases
          }
        })
    this.$store.dispatch("auth/getAuthenticatedUser")
        .then((res) => {
          if(res) {
            this.user = res.user
          }
        })
  },
}
</script>

