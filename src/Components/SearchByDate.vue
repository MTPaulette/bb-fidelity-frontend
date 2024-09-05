<template>
  <div :class="className">
    <label for="input-group-date" class="whitespace-nowrap text-sm font-[roboto] text-black-white">Filter by date</label>
    <input @change="$emit('search', date);" v-model="date" type="date" id="input-group-date" class="block mt-1 w-full min-w-[250px] p-2 ps-3 text-sm input" :placeholder="`Search ${label}`">
  </div>
</template>
<script>
export default {
  props: {
    className: {
      type: String,
      default: '',
      // default: 'w-[230px] sm:w-auto max-w-sm',
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
      date: ''
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
        this.date = ''
      // }
    }
  }
}
</script>