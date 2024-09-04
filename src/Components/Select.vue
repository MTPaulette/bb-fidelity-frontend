<template>
  <div>
  <button class="w-full input inline-flex items-center justify-between" type="button" @click="showList = !showList">
    <span v-if="selectedValue.selectedItem">{{ selectedValue.selectedItem.name }}</span>
    <span v-else>Choose {{ label }}</span>
    <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
    </svg>
  </button>

  <!-- menu -->
  <div v-show="showList" class="z-10 h-64 over-y absolute bg-white rounded-lg shadow-md w-full dark:bg-gray-700">
    <div class="p-3">
      <Search @search="search" className="w-full" :label="label" />
    </div>
    <div v-if="errors">
      <Empty :message="errors" />
    </div>
    <ul v-else class="px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
      <li v-for="(item,i) in items" :key="item.id" @click="selectedValue.selectedItem = item; showList = false">
        <div class="flex items-center justify-start pl-7 pss-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <!-- <input :checked="selectedValue.selectedItem == item ? true : false" type="checkbox" value="" class="w-4 h-4 mr-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 border-color" /> -->
          <div v-show="selectedValue.selectedItem == item" class="w-5 h-5 -ml-7 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
            </svg>
          </div>
          <label for="checkbox-item-11" class="w-full py-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{{ item.name }}</label>
        </div>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
import Search from "@/Components/Search.vue"
import Empty from '@/Components/Empty.vue'

export default {
  components: {
    Search,
    Empty,
  },
  props: {
    items: Object,
    label: String,
    errors: {
      type: String,
      default: null,
    },
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