<template>
  <div>
  <div v-if="logs" class="overflow-x-auto relative">
    <h5 class="space-x-4">
      <span class="text-gray-500">Total logs:</span>
      <span class="dark:text-white" v-if="total">{{ total }}</span>
    </h5>

    <!-- <table class="w-full text-sm text-left my-5 block h-auto max-h-[500px] over-y over-x">
      <thead class="text-xs uppercase bg-secondary sticky top-0 z-40"> -->
    <table class="w-full text-sm text-left my-5">
      <thead class="text-xs uppercase bg-secondary">
        <tr>
          <th scope="col" class="px-4 py-3">
            <div class="flex">
              <span>Description</span>
              <span v-if="selectedFilters.by != 'description'" class="ml-2" @click="sortByDescription">
                <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                  <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                </svg>
              </span>
              <span v-else class="flex">
                <span v-if="selectedFilters.asc" class="ml-2 text-accentuate" @click="sortByDescription">
                  <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                    <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                  </svg>
                </span>
                <span v-else class="ml-2 text-accentuate" @click="sortByDescription">
                  <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                    <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
                  </svg>
                </span>
              </span>
            </div>
          </th>
          <th scope="col" class="px-4 py-3">
            <div class="flex">
              <span class="whitespace-nowrap">Admin</span>
              <span v-if="selectedFilters.by != 'userId'" class="ml-2" @click="sortByUserId">
                <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                  <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                </svg>
              </span>
              <span v-else class="flex">
                <span v-if="selectedFilters.asc" class="ml-2 text-accentuate" @click="sortByUserId">
                  <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                    <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                  </svg>
                </span>
                <span v-else class="ml-2 text-accentuate" @click="sortByUserId">
                  <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                    <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
                  </svg>
                </span>
              </span>
            </div>
          </th>
          <th scope="col" class="px-4 py-3">Url</th>
          <th scope="col" class="px-4 py-3">
            <div class="flex">
              <span>Method</span>
              <span v-if="selectedFilters.by != 'method'" class="ml-2" @click="sortByMethod">
                <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                  <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                </svg>
              </span>
              <span v-else class="flex">
                <span v-if="selectedFilters.asc" class="ml-2 text-accentuate" @click="sortByMethod">
                  <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                    <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                  </svg>
                </span>
                <span v-else class="ml-2 text-accentuate" @click="sortByMethod">
                  <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                    <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
                  </svg>
                </span>
              </span>
            </div>
          </th>
          <th scope="col" class="px-4 py-3">Ip</th>
          <th scope="col" class="px-4 py-3">Agent</th>
          <th scope="col" class="px-4 py-3">
            <div class="flex">
              <span>Date</span>
              <span v-if="selectedFilters.by != 'created_at'" class="ml-2" @click="sortByDate">
                <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z"/>
                  <path fill-rule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
                  <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                </svg>
              </span>
              <span v-else class="flex">
                <span v-if="selectedFilters.asc" class="ml-2 text-accentuate" @click="sortByDate">
                  <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path fill-rule="evenodd" d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
                    <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
                  </svg>
                </span>
                <span v-else class="ml-2 text-accentuate" @click="sortByDate">
                  <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z"/>
                    <path fill-rule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
                    <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                  </svg>
                </span>
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="text-black-white">
        <tr v-for="log in logs" :key="log.id" :class="[log.description.includes('failed') ? 'text-danger': '', log.description.includes('updated') ? 'text-accentuate': '']" class="border-b border-color hover:bg-highlight">
        <!-- <tr v-for="log in logs" :key="log.id" class="border-b border-color hover:bg-highlight"> -->
          <!-- <td class="px-4 py-1 whitespace-nowrap">{{ log.description }}</td> -->
          <td class="px-4 py-1 whitespace-nowrap"><p v-html="log.description" /></td>
          <td class="px-4 py-1 text-black-white whitespace-nowrap">
            <p class="text-black-white hover:text-accentuate hover:underline">
              <router-link :to="{ name: 'user.show', params: { id: log.user_id }}">
                {{ log.user_name }}
              </router-link>
            </p>
          </td>
          <td class="px-4 py-1 whitespace-nowrap">{{ log.url }}</td>
          <td class="px-4 py-1">{{ log.method }}</td>
          <td class="px-4 py-1">{{ log.ip }}</td>
          <td class="px-4 py-1 whitespace-nowrap">{{ log.agent }}</td>
          <td class="px-4 py-2 text-black-white whitespace-nowrap">{{ formatDate(log.created_at) }}</td>
        </tr>
      </tbody>
    </table>
    
  </div>
  </div>
</template>

<script setup>
  import { formatDate } from '@/Composables/formatDate'
</script>

<script>
export default {
  props: {
    logs: Object,
    reset: Boolean,
    total: Number,
  },
  data() {
    return {
      selectedFilters: {
        by: 'created_at',
        asc: false,
      },
    }
  },

  mounted() {
    this.$watch(
      () => this.selectedFilters,
      this.filteredLogs,
      { 
        immediate: true,
        deep: true
      }
    ),

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
      if(this.reset) {
        this.selectedFilters.by = 'created_at'
        this.selectedFilters.asc = false
      }
    },
    sortByDescription() {
      this.selectedFilters.by = 'description'
      this.selectedFilters.asc = !this.selectedFilters.asc
    },
    sortByMethod() {
      this.selectedFilters.by = 'method'
      this.selectedFilters.asc = !this.selectedFilters.asc
    },
    sortByUserId() {
      this.selectedFilters.by = 'userId'
      this.selectedFilters.asc = !this.selectedFilters.asc
    },

    sortByDate() {
      this.selectedFilters.by = 'created_at'
      this.selectedFilters.asc = !this.selectedFilters.asc
    },

    filteredLogs() {
      this.$emit('newFilters', {
        by: this.selectedFilters.by,
        order: this.selectedFilters.asc ? 'asc':'desc',
      })
    },
  },
}

</script>