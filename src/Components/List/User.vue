<template>
  <div v-if="!(users && recentUserId)">
    <Loading />
  </div>
  <div v-else class="overflow-x-auto relative">
    <div class="block sm:flex sm:justify-between sm:items-center py-3">
      <h5 class="space-x-4">
        <span class="text-gray-500">Total users:</span>
        <span class="dark:text-white" v-if="users">{{ users.length }}</span>
      </h5>
      <div class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
        <!-- <div class="flex mt-5 sm:mt-0"> -->
        <router-link class="flex justify-end" to="#">
          <!-- <router-link class="flex justify-end" :to="{ name: 'user.create'}"> -->
          <button type="button" class="flex items-center justify-center flex-shrink-0 btn-blue btn-base">
            <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
            New user
          </button>
        </router-link>
  
        <button type="button" class="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          Export
        </button>
      </div>
    </div>

    <table class="w-full text-sm text-left my-5">
      <thead class="text-xs uppercase bg-secondary">
        <tr>
          <th scope="col" class="px-4 py-3">
            Name
          </th>
          <th scope="col" class="px-4 py-3">
            balance
          </th>
          <th scope="col" class="px-4 py-3">
            role
          </th>
          <th scope="col" class="px-4 py-3">Date</th>
          <th scope="col" class="px-4 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" :class="[user.id == recentUserId ? 'border-purple-700 dark:border-purple-400 bg-purple-100 dark:bg-purple-600/30': '']"  class="border-b border-color hover:bg-highlight">
          <th scope="row" class="flex items-center px-4 py-3 whitespace-nowrap">
            <div class="pl-3">
              <p class="font-medium text-black-white uppercase">{{ user.name }}</p>
              <p class="font-light font-[roboto]">{{ user.email }}</p>
            </div>  
          </th>
          <td class="px-4 py-3 whitespace-nowrap text-black-white">
            <div v-if="user.role_id != 1" class="flex items-center">
              <div class="inline-block w-4 h-4 mr-2 rounded-full" :class="[user.balance > 0 ? 'bg-green-400' : 'bg-red-700']" />
              {{ user.balance }} point(s)
            </div>
            <!-- <div v-if="user.balance>0" class="text-green-500 p-2">{{ user.balance }}</div>
            <div v-else class="text-danger p-2">{{ user.balance }}</div> -->
          </td>
          <td class="px-4 py-2 text-black-white whitespace-nowrap">{{ formatDate(user.created_at) }}</td>
          <td class="px-4 py-3">
            <div v-if="user.role_id==1">
              Admin (Entreprise)
            </div>
            <div v-else>
              client
            </div>
          </td>
          <td>
            <div class="px-4 py-3 flex w-full">
              <div>
                <router-link :to="{ name: 'user.show', params: { id: user.id }}" class="btn-blue btn-extrasmall" title="voir profil client">
                  Profile
                </router-link>
              </div>
              
              <div v-if="user.role_id != 1" class="mx-2">
                <router-link :to="{ name: 'user.historic', params: { id: user.id }}" class="btn-extrasmall btn-light" title="voir historique">
                  Historique
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
import Loading from '@/Components/Loading.vue'

export default {
  components: {
    Loading
  },
  props: {
    users: Object
  },
  data() {
    return {
      recentUserId: null
    }
  },

  mounted() {
    this.$store.dispatch("auth/getRecentUserId")
        .then((res) => {
          if(res) {
            this.recentUserId = res.id
          }
        })
  }
}

</script>