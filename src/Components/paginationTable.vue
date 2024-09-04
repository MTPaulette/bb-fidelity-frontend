<template>
  <div class="flex gap-1 items-center">
    <span class="text-sm text-gray-700 dark:text-gray-400">
      Showing 

      <span @click="previous" class="font-semibold dark:text-white hover:text-accentuate hover:cursor-pointer px-1.5 py-0.5" title="go to the previous page">&laquo; Previous</span>
      <span v-for="i in links.length-2" :key="i">
        <span
          @click="$emit('nextPage', i); selectedPage=i"
          class="font-semibold hover:text-accentuate hover:cursor-pointer px-1.5 py-0.5" :title="`go to page ${i}`"
          :class="{'bg-sheet-200 text-purple-500 dark:text-purple-500 rounded-md': selectedPage==i}" v-html="i"
        />
      </span>

      <span @click="next" class="font-semibold dark:text-white hover:text-accentuate hover:cursor-pointer px-1.5 py-0.5" title="go to the next page">Next &raquo;</span>
      of &nbsp;<span class="font-semibold text-black-white"> {{ links.length-2 }}</span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    links: Array,
  },
  data() {
    return {
      selectedPage: 1
    }
  },
  methods: {
    previous() {
      if(this.selectedPage > 1) {
        this.selectedPage = this.selectedPage-1
        this.$emit('nextPage', this.selectedPage)
      }
    },
    next() {
      const totalPages = this.links.length-2
      if(this.selectedPage < totalPages) {
        this.selectedPage = this.selectedPage+1
        this.$emit('nextPage', this.selectedPage)
      }
    }
  }
}
</script>