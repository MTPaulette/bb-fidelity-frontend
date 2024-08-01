<template>
  <section class="px-4 mx-auto max-w-screen-2xl relative overflow-hidden bg-default shadow sm:rounded-lg">
    <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
      <h5 class="space-x-4">
        <span class="text-gray-500">Total purchases:</span>
        <span class="dark:text-white" v-if="services">{{ services.length }}</span>
      </h5>
      <div v-if="user.role_id == 1" class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
        <router-link class="flex justify-end" :to="{ name: 'purchase.create'}">
          <button type="button" class="flex items-center justify-center flex-shrink-0 btn-blue btn-base">
            <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
            New purchase
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
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left">
        <thead class="text-xs uppercase bg-secondary">
          <!-- <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"> -->
          <tr>
            <th scope="col" class="p-4">
              Transaction Nbr
            </th>
            <th scope="col" class="px-4 py-3">User</th>
            <th scope="col" class="px-4 py-3">Service</th>
            <th scope="col" class="px-4 py-3">Price</th>
            <th scope="col" class="px-4 py-3">Validity</th>
            <th scope="col" class="px-4 py-3">Pay Mode</th>
            <th scope="col" class="px-4 py-3">Credit Point</th>
            <th scope="col" class="px-4 py-3">Debit Point</th>
            <th scope="col" class="px-4 py-3">Current Balance</th>
            <th scope="col" class="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="service in services" :key="service.id" class="border-b border-color hover:bg-highlight">
          <th scope="row" class="w-4 px-4 py-3">
            <!-- <div v-if="user.role_id == 1">
              <router-link :to="{ name: 'service.show', params: { id: service.pivot.id }}">
                {{ service.pivot.id }}
              </router-link>
            </div> -->
            <div>{{ service.pivot.id }}</div>
          </th>
          <td class="px-4 py-2 whitespace-nowrap text-black-white">
            <div v-if="user.role_id == 1" class="hover:text-accentuate hover:underline">
              <router-link :to="{ name: 'user.show', params: { id: service.pivot.user_id }}">
                {{ service.user_name }}
              </router-link>
            </div>
            <div v-else>{{ service.user_name }}</div>
          </td>
          <td class="px-4 py-2 whitespace-nowrap text-black-white">
            <div v-if="user.role_id == 1" class="hover:text-accentuate hover:underline">
              <router-link :to="{ name: 'service.show', params: { id: service.id }}">
                {{ service.name }}
              </router-link>
            </div>
            <div v-else>{{ service.name }}</div>
          </td>
          <td class="px-4 py-2 whitespace-nowrap text-black-white">{{ service.price }} XAF</td>
          <td class="px-4 py-2">{{ service.validity }}</td>
          <td class="px-4 py-2 whitespace-nowrap">
            <span v-if="service.pivot.by_cash">By cash</span>
            <span v-else>By using Point</span>
          </td>
          <td class="px-4 py-2 whitespace-nowrap text-black-white">
            <div class="flex items-center">
              <div class="inline-block w-4 h-4 mr-2 rounded-full" :class="[service.pivot.credit > 0 ? 'bg-green-400' : 'bg-gray-400']" />
              {{ service.pivot.credit }} point(s)
            </div>
          </td>
          <td class="px-4 py-2 whitespace-nowrap text-black-white">
            <div class="flex items-center">
              <div class="inline-block w-4 h-4 mr-2 rounded-full" :class="[service.pivot.debit > 0 ? 'bg-red-700' : 'bg-gray-400']" />
              {{ service.pivot.debit }} point(s)
            </div>
          </td>
          <td class="px-4 py-2">{{ service.pivot.user_balance }}</td>
        <td class="px-4 py-2 text-black-white whitespace-nowrap">{{ formatDate(service.pivot.created_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </section>
</template>
  
<script setup>
  import { formatDate } from '@/Composables/formatDate'
  
  defineProps({
    services: Object,
  })
</script>
  
<script>
export default {
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user'))
    },
  },
}
</script>