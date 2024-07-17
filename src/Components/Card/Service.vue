<template>
    <div class="max-w-sm bg-default hover:bg-highlight border border-color rounded-lg shadow p-5">
        <div class="flex justify-between">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-black-white w-full truncate">{{ service.name }}</h5>
            <div v-if="user_role === 1">
                <router-link :to="`/service/edit/${service.id}`" class="hover:text-accentuate" title="Edit service">
                    <svg class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </router-link>
            </div>
        </div>
        <p>
          <span class="text-green-500" v-if="service.price>0"> {{ service.price }} prix/point(s) </span>
          <span class="text-danger" v-else>{{ service.price }} prix/point(s)</span>
        </p>
        <p class="mb-1 text-secondary w-full h-12 overflow-hidden">{{ service.description }}</p>
        <p class="mb-3 text-xs font-light">Cree il y'a {{ formatDate(service.created_at) }}</p>
        <div class="flex items-center">
          <router-link :to="`service/${service.id}`" class="inline-flex items-center btn-base btn-blue rounded-lg">
              Voir plus
              <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
          </router-link>
          <!-- <router-link :to="`service/${service.id}`" class="btn-base btn-blue rounded-lg">Utiliser</router-link> -->
        </div>
        
      <!-- new service -->
      <div v-if="user_role === 1" class="fixed z-40 bottom-28 md:bottom-14 right-2.5">
        <router-link class="flex justify-end mb-4" to="service/create">
          <button class="bg-white p-2 text-xs rounded-full border-[6px] border-purple-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="btn-default-2" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
          </button>
        </router-link>
      </div>
    </div>
</template>

<script setup>
import { formatDate } from '@/Composables/formatDate'
defineProps({
  service: Object,
})

</script>



<script>
export default {
  components: {
  },

  computed: {
    user_role() {
      return JSON.parse(localStorage.getItem('user')).user.role_id
    },
  }
}
</script>
