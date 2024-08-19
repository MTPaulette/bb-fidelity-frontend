<template>
  <div class="overflow-x-auto relative">
    <h5 class="space-x-4 py-3">
      <span class="text-gray-500">Total services:</span>
      <span class="dark:text-white" v-if="services">{{ services.length }}</span>
    </h5>

    <table class="w-full text-sm text-left my-5">
      <thead class="text-xs uppercase bg-secondary">
        <tr>
          <th scope="col" class="px-4 py-3">Name</th>
          <th scope="col" class="px-4 py-3">Price</th>
          <th scope="col" class="px-4 py-3">Credit Point</th>
          <th scope="col" class="px-4 py-3">Debit Point</th>
          <th scope="col" class="px-4 py-3">Validity</th>
          <th scope="col" class="px-4 py-3">Agency</th>
          <th scope="col" class="px-4 py-3">User Type</th>
          <th scope="col" class="px-4 py-3">Date</th>
          <th scope="col" class="px-4 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in services" :key="service.id" :class="[service.id == recentServiceId ? 'border-purple-700 dark:border-purple-400 bg-purple-100 dark:bg-purple-600/30': '']"  class="border-b border-color hover:bg-highlight">
          <th scope="row" class="px-4 py-3 whitespace-nowrap">
              <p class="font-medium text-black-white">{{ service.name }}</p>
          </th>
          <td class="px-4 py-2 whitespace-nowrap text-accentuate">{{ service.price }} XAF</td>
          <td class="px-4 py-2 whitespace-nowrap text-green-500">{{ service.credit }}</td>
          <td class="px-4 py-2 whitespace-nowrap text-danger">{{ service.debit }}</td>
          <td class="px-4 py-2 whitespace-nowrap">{{ service.validity }}</td>
          <td class="px-4 py-2 whitespace-nowrap">{{ service.agency }}</td>

          <td class="px-4 py-2 text-black-white whitespace-nowrap">
            <div>
              <UserType :label="service.user_type" />
            </div>
          </td>
          <td class="px-4 py-2 text-black-white whitespace-nowrap">{{ formatDate(service.created_at) }}</td>
          <td>
            <div class="px-4 py-3 flex w-full">
              <div>
                <router-link :to="{ name: 'service.show', params: { id: service.id }}" class="btn-blue btn-extrasmall" title="voir profil client">
                  See More
                </router-link>
              </div>
              
              <div class="mx-2">
                <router-link  :to="{ name: 'service.edit', params: { id: service.id }}" class="btn-extrasmall btn-light" title="voir historique">
                  Edit
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
  import UserType from '@/Components/UserType.vue'

  defineProps({
    services: Object,
    recentServiceId: null
  })
</script>