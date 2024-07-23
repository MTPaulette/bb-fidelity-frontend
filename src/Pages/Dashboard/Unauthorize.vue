<template>
  <div class="flex flex-col items-center justify-center w-full h-full my-32">
    <h1 class="my-10 text-4xl md:text-6xl font-bold font-[roboto] leading-tight tracking-tight text-black-white">403 - Unauthorize</h1>
    <button @click="goBack" class="inline-flex justify-center btn-base btn-light">
      <svg class="h-4 w-4 mr-1" viewBox="0 0 16 16" fill="currentColor">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>
      Back
    </button>

    <!-- <div class="w-full px-3 py-5 h-auto border-color rounded-lg shadow">
      <div class="flex flex-col items-center justify-center w-full mt-4 space-y-4 lg:mt-5 md:space-y-5">
      </div>
    </div> -->
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
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>