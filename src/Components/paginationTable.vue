<template>
  <div class="flex gap-1 items-center">
    <span class="text-sm text-gray-700 dark:text-gray-400">
      Showing 

      <span class="font-semibold dark:text-white px-1.5 py-0.5">&laquo; Previous</span>

      <span v-for="i in links.length-2" :key="i">
        <span  @click="$emit('nextPage', i); selectedPage=i" class="font-semibold dark:text-white px-1.5 py-0.5" :class="{'bg-sheet-200 text-purple-500 rounded-md': selectedPage==i}" v-html="i" />
      </span>

      <span class="font-semibold dark:text-white px-1.5 py-0.5">Next &raquo;</span>
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
}
</script>