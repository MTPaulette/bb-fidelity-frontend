<template>
  <div v-if="users && recentUserId" class="overflow-x-auto relative">
    <h5 class="space-x-4">
      <span class="text-gray-500">Total users:</span>
      <span class="dark:text-white" v-if="users">{{ users.length }}</span>
    </h5>

    <table class="w-full text-sm text-left my-5">
      <thead class="text-xs uppercase bg-secondary">
        <tr>
          <th scope="col" class="px-4 py-3">
            <div class="flex">
              <span>Name</span>
              <span v-if="selectedFilters.by != 'name'" class="ml-2" @click="sortByName">
                <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                  <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                </svg>
              </span>
              <span v-else class="flex">
                <span v-if="selectedFilters.asc" class="ml-2 text-accentuate" @click="sortByName">
                  <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                    <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                  </svg>
                </span>
                <span v-else class="ml-2 text-accentuate" @click="sortByName">
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
              <span class="whitespace-nowrap">Is registered</span>
              <span :class="selectedFilters.is_registered? 'text-accentuate': ''" class="ml-2" @click="sortByStatus">
                <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
              </span>
            </div>
          </th>
          <th scope="col" class="px-4 py-3">
            <div class="flex">
              <span>Balance</span>
              <span v-if="selectedFilters.by != 'balance'" class="ml-2" @click="sortByBalance">
                <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fill-rule="evenodd" d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
                  <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
                </svg>
              </span>
              <span v-else class="flex">
                <span v-if="selectedFilters.asc" class="ml-2 text-accentuate" @click="sortByBalance">
                  <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z"/>
                    <path fill-rule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
                    <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                  </svg>
                </span>
                <span v-else class="ml-2 text-accentuate" @click="sortByBalance">
                  <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path fill-rule="evenodd" d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
                    <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
                  </svg>
                </span>
              </span>
            </div>
          </th>
          <th scope="col" class="px-4 py-3">
            <div class="flex">
              <span>Role</span>
              <span v-if="selectedFilters.by != 'role_id'" class="ml-2" @click="sortByRole">
                <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                  <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                </svg>
              </span>
              <span v-else class="flex">
                <span v-if="selectedFilters.asc" class="ml-2 text-accentuate" @click="sortByRole">
                  <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                    <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                  </svg>
                </span>
                <span v-else class="ml-2 text-accentuate" @click="sortByRole">
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
              <span>Date</span>
              <span v-if="selectedFilters.by != 'date'" class="ml-2" @click="sortByDate">
                <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fill-rule="evenodd" d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
                  <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
                </svg>
              </span>
              <span v-else class="flex">
                <span v-if="selectedFilters.asc" class="ml-2 text-accentuate" @click="sortByDate">
                  <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z"/>
                    <path fill-rule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
                    <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                  </svg>
                </span>
                <span v-else class="ml-2 text-accentuate" @click="sortByDate">
                  <svg class="h-3.5 w-3.5" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path fill-rule="evenodd" d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
                    <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
                  </svg>
                </span>
              </span>
            </div>
          </th>
          <th scope="col" class="px-4 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" :class="[user.id == recentUserId ? 'border-purple-700 dark:border-purple-400 bg-purple-100 dark:bg-purple-600/30': '']"  class="border-b border-color hover:bg-highlight">
          <th scope="row" class="px-4 py-3 pr-3 whitespace-nowrap">
            <p class="font-medium text-black-white uppercase">{{ user.name }}</p>
            <p v-if="user.role_id != 3" class="font-light font-[roboto]">{{ user.email }}</p>
          </th>
          <td  class="px-2 py-1 text-center">
            <div v-if="user.role_id == 2">
              <span v-if="user.is_registered" class="text-green-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
              </span>
              <span v-else class="text-red-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </span>
            </div>
          </td>
          <td class="px-4 py-3 whitespace-nowrap text-black-white">
            <div v-if="user.role_id == 2" class="flex items-center">
              <div class="inline-block w-4 h-4 mr-2 rounded-full" :class="[user.balance > 0 ? 'bg-green-400' : 'bg-red-700']" />
              {{ user.balance }} point(s)
            </div>
          </td>
          <td class="px-4 py-3">
            <div v-if="user.role_id==1">
              Admin
            </div>
            <div v-else-if="user.role_id==3">
              SuperAdmin
            </div>
            <div v-else>
              Client
            </div>
          </td>
          <td class="px-4 py-2 text-black-white whitespace-nowrap">{{ formatDate(user.created_at) }}</td>
          <td>
            <div class="px-4 py-3 flex w-full">
              <div v-if="user.role_id != 3">
                <router-link :to="{ name: 'user.show', params: { id: user.id }}" class="btn-blue btn-extrasmall" title="see profil client">
                  Profile
                </router-link>
              </div>
              
              <div v-if="user.role_id == 2" class="mx-2">
                <router-link :to="{ name: 'user.history', params: { id: user.id }}" class="btn-extrasmall btn-light" title="see user history">
                  History
                </router-link>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script setup>
  import { formatDate } from '@/Composables/formatDate'
</script>

<script>
export default {
  props: {
    users: Object,
    reset: Boolean,
  },
  data() {
    return {
      recentUserId: null,
      selectedFilters: {
        by: 'name',
        asc: true,
        is_registered: null,
      },
    }
  },

  mounted() {
    this.$store.dispatch("auth/getRecentUserId")
      .then((res) => {
        if(res) {
          this.recentUserId = res.id
        }
      }),

    this.$watch(
      () => this.selectedFilters,
      this.filteredUsers,
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
        this.selectedFilters.by = 'name'
        this.selectedFilters.asc = true
        this.selectedFilters.is_registered = null
      }
      console.log("clearfilter user: "+this.selectedFilters)
    },
    sortByName() {
      this.selectedFilters.by = 'name'
      this.selectedFilters.asc = !this.selectedFilters.asc
    },

    sortByRole() {
      this.selectedFilters.by = 'role_id'
      this.selectedFilters.asc = !this.selectedFilters.asc
    },

    sortByDate() {
      this.selectedFilters.by = 'date'
      this.selectedFilters.asc = !this.selectedFilters.asc
    },

    sortByBalance() {
      this.selectedFilters.by = 'balance'
      this.selectedFilters.asc = !this.selectedFilters.asc
    },

    sortByStatus() {
      this.selectedFilters.is_registered = !this.selectedFilters.is_registered
    },

    filteredUsers() {
      this.$emit('newFilters', {
        by: this.selectedFilters.by,
        order: this.selectedFilters.asc ? 'asc':'desc',
        is_registered: this.selectedFilters.is_registered
      })
    },
  },
}

</script>