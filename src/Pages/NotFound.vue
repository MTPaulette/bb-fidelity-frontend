<template>
  <div class="flex flex-col items-center justify-center w-full mt-4 space-y-4 lg:mt-5 md:space-y-5">
    <h1 class="my-10 text-4xl md:text-6xl font-bold font-[roboto] leading-tight tracking-tight text-black-white text-center">404 - page not found</h1>
    <button @click="goBack" class="inline-flex justify-center btn-base btn-light-2">
      <svg class="h-4 w-4 mr-1" viewBox="0 0 16 16" fill="currentColor">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>
      Back
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    goBack () {
      this.$router.go(-2)
    }
  }
}
</script>