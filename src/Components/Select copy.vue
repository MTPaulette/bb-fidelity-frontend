<template> q: {{ selectedValue.q }}
  <button class="w-full input inline-flex items-center justify-between" type="button" @click="showList = !showList">
    <span v-if="selectedValue.selectedItem">{{ selectedValue.selectedItem.name }}</span>
    <span v-else>Choose an user</span>
    <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
    </svg>
  </button>

  <!-- menu -->
  <div v-show="showList" class="z-10 h-64 over-y absolute bg-white rounded-lg shadow-md w-full dark:bg-gray-700">
    <div class="p-3">
      <Search @search="search" className="w-full" />
    </div>
    <!-- <div class="p-3">
      <label for="input-group-search" class="sr-only">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input type="text" id="input-group-search" class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user">
      </div>
    </div> -->
    <ul class="px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
      <li v-for="(item,i) in items" :key="item.id" @click="selectedValue.selectedItem = item; showList = false">
        <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input :checked="selectedValue.selectedItem == item ? true : false" type="checkbox" value="" class="w-4 h-4 mr-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 border-color" />
          <label for="checkbox-item-11" class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{{ item.name }}</label>
        </div>
      </li>
      <li>
        <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <input checked id="checkbox-item-12" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
            <label for="checkbox-item-12" class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Jese Leos</label>
          </div>
      </li>
      <li>
        <div class="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="checkbox-item-15" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
          <label for="checkbox-item-15" class="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Joseph Mcfall</label>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Search from "@/Components/Search.vue"

export default {
  components: {
    Search,
  },
  props: {
    items: Object,
    errors: ''
  },
  data() {
    return {
      selectedValue: {
        q: '',
        selectedItem: null,
      },
      showList: false
    }
  },

  mounted() {
    this.$watch(
      () => this.selectedValue,
      this.setselectedValue,
      { immediate: true,
        
        deep: true,
      },
    )
  },

  methods: {
    search(q) {
      this.selectedValue.q = q
    },
    setselectedValue() {
      this.$emit('selectedValue', this.selectedValue)
    }
  }
}
</script>