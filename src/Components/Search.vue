<template>
  <div :class="className">
    <label for="input-group-search" class="sr-only">Search</label>
    <div class="relative">
      <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      <input @keyup="$emit('search', q);" v-model="q" type="text" id="input-group-search" class="block w-full p-2 ps-10 text-sm input" :placeholder="`Search ${label}`">
    </div>
  </div>
</template>
<!-- <template>
  <div class="flex items-center" :class="className">
    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
            </svg>
        </div>
        <input type="text" v-model="q" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full ps-10 p-2.5 input" placeholder="Search branch name..." />
    </div>
    <button type="button" @click="$emit('search', q);" class="p-2.5 ms-2 btn-default">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search</span>
    </button>
  </div>
</template> -->
<script>
export default {
  props: {
    className: {
      type: String,
      default: 'w-[230px] sm:w-auto max-w-sm',
    },
    label: {
      type: String,
      default: '',
    },
    reset: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      q: ''
    }
  },

  mounted() {
    this.$watch(
      () => this.reset,
      this.clearFilters,
      { 
        immediate: true,
        deep: true
      }
    )
  },

  methods: {
    clearFilters() {
      // if(this.reset) {
        this.q = ''
      // }
    }
  }
}
</script>