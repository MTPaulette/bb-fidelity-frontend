<template>
    <div class="max-w-sm bg-default hover:bg-highlight border border-color rounded-lg shadow p-5">
        <div class="flex justify-between">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-black-white w-full truncate">{{ service.name }}</h5>
            <div>
                <router-link :to="`/service/edit/${service.id}`" class="hover:text-accentuate" title="Edit service">
                    <svg class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </router-link>
            </div>
        </div>
        <div class="my-3">
          <p>Validity: &nbsp;<span class="text-black-white font-medium"> {{ service.validity }} </span></p>
          <p>Price: &nbsp;<span class="text-accentuate"> {{ service.price }} FCFA </span></p>
          <p>Bonus Point: &nbsp;<span class="text-green-500"> {{ service.point }} Point(s) </span></p>
        </div>
        <!-- <p class="text-accentuate"> {{ service.price }} FCFA</p>
        <p class="text-green-500">{{ service.price }} point(s)</p> -->
        <p class="mb-1 text-secondary w-full h-12 overflow-hidden">{{ service.description }}</p>
        <p class="mb-3 text-xs font-light">Cree il y'a {{ formatDate(service.created_at) }}</p>
        <div class="flex items-center">
          <router-link :to="`service/${service.id}`" class="btn-base btn-blue">
              Voir plus
          </router-link>
          <router-link :to="`service/buy/${service.id}`" class="btn-base btn-success rounded-lg ms-2">Acheter</router-link>
        </div>
    </div>
</template>

<script setup>
import { formatDate } from '@/Composables/formatDate'

defineProps({
  service: Object,
})
</script>
