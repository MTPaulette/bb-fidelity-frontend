<template>
  <div class="overflow-x-auto relative">
    <h5 class="space-x-4 py-3">
      <span class="text-gray-500">Total purchases:</span>
      <span class="dark:text-white" v-if="total">{{ total }}</span>
    </h5>

    <table class="w-full text-sm text-left my-5">
      <thead class="text-xs uppercase bg-secondary">
        <tr>
          <th scope="col" class="px-4 py-3">User Name</th>
          <th scope="col" class="px-4 py-3">Service Name</th>
          <th scope="col" class="px-4 py-3">Pay Mode</th>
          <th scope="col" class="px-4 py-3">Price</th>
          <th scope="col" class="px-4 py-3">Credit Point</th>
          <th scope="col" class="px-4 py-3">Debit Point</th>
          <th scope="col" class="px-4 py-3">User balance</th>
          <th scope="col" class="px-4 py-3">Validity</th>
          <th scope="col" class="px-4 py-3">Agency</th>
          <th scope="col" class="px-4 py-3 whitespace-nowrap">Created by <br/> (Admin name)</th>
          <th scope="col" class="px-4 py-3">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="purchase in purchases" :key="purchase.id" class="border-b border-color hover:bg-highlight">
          <th scope="row" class="px-4 py-2 whitespace-nowrap font-normal">
            <p class="hover:text-accentuate hover:underline">
              <router-link :to="{ name: 'user.show', params: { id: purchase.user_id }}">
                {{ purchase.user_name }}
              </router-link>
            </p>
          </th>
          <td class="px-4 py-2 whitespace-nowrap ">
            <p class="hover:text-accentuate hover:underline">
              <router-link :to="{ name: 'service.show', params: { id: purchase.service_id }}">
                {{ purchase.service_name }}
              </router-link>
            </p>
          </td>
          <td class="px-4 py-2 whitespace-nowrap">
            <span v-if="purchase.by_cash">By cash</span>
            <span v-else>By using Point</span>
          </td>
          <td class="px-4 py-2 whitespace-nowrap text-accentuate">{{ purchase.price }} XAF</td>
          <td class="px-4 py-2 whitespace-nowrap text-black-white">
            <div class="flex items-center">
              <div class="inline-block w-4 h-4 mr-2 rounded-full" :class="[purchase.credit > 0 ? 'bg-green-400' : 'bg-gray-400']" />
              {{ purchase.credit }}
            </div>
          </td>
          <td class="px-4 py-2 whitespace-nowrap text-black-white">
            <div class="flex items-center">
              <div class="inline-block w-4 h-4 mr-2 rounded-full" :class="[purchase.debit > 0 ? 'bg-red-700' : 'bg-gray-400']" />
              {{ purchase.debit }}
            </div>
          </td>
          <td class="px-4 py-2 whitespace-nowrap">{{ purchase.user_balance }}</td>
          <td class="px-4 py-2 whitespace-nowrap">{{ purchase.validity }}</td>
          <td class="px-4 py-2 whitespace-nowrap">{{ purchase.agency }}</td>
          <td class="px-4 py-2 whitespace-nowrap">
            <p class="font-medium text-black-white hover:text-accentuate hover:underline">
              <router-link :to="{ name: 'user.show', params: { id: purchase.admin_id }}">
                {{ purchase.admin_name }}
              </router-link>
            </p>
          </td>
          <td class="px-4 py-2 text-black-white whitespace-nowrap">{{ formatDate(purchase.created_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { formatDate } from '@/Composables/formatDate'

  defineProps({
    purchases: Object,
    total: Number,
  })
</script>