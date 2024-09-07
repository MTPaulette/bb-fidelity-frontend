<template>
    <div :class="[service.id == recentServiceId ? 'border-purple-700 dark:border-purple-400 bg-purple-100 dark:bg-purple-600/30': '']" class="max-w-sm bg-default hover:bg-highlight border border-color rounded-lg shadow p-5">
        <div class="flex justify-between">
            <h5 class="text-2xl font-bold tracking-tight text-black-white w-full truncate">{{ service.name }}</h5>
            <div>
                <router-link :to="{ name: 'service.edit', params: { id: service.id }}" class="hover:text-accentuate" title="Edit service">
                    <svg class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </router-link>
            </div>
        </div>
        <div class="flex mt-0.5 mb-4 text-xs font-thin">
            <div class="pr-4 border-r border-purple-500 flex items-center">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
              </svg>
              <span class="ml-2">{{ service.service_type }}</span>
            </div>
            <div class="px-4 border-r border-purple-500 flex items-center">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/>
              </svg>
              <span class="ml-2">{{ service.agency }}</span>
            </div>
          </div>
        <div class="my-3">
          <p>Validity: &nbsp;<span class="text-black-white font-medium"> {{ service.validity }} </span></p>
          <p>Price: &nbsp;<span class="text-accentuate"> {{ service.price }} XAF </span></p>
          <p>Credit Point: &nbsp;<span class="text-green-500"> {{ service.credit }} Point(s) </span></p>
          <p>Debit Point: &nbsp;<span class="text-danger"> {{ service.debit }} Point(s) </span></p>
        </div>
        <p class="mb-1 text-secondary w-full h-12 overflow-hidden">{{ service.description }}</p>
        <p class="mb-3 text-xs font-light">
          created since {{ formatDate(service.created_at) }} by 
          <span class="font-medium text-black-white hover:text-accentuate hover:underline">
            <router-link :to="{ name: 'user.show', params: { id: service.user_id }}">
              {{ service.user_name }}
            </router-link>
          </span>
        </p>
        <div class="flex items-center">
          <router-link :to="{ name: 'service.show', params: { id: service.id }}" class="btn-base btn-blue">
            <!-- <router-link :to="`service/${service.id}`" class="btn-base btn-blue"> -->
              See More
          </router-link>
          <!-- <router-link :to="{ name: 'service.show', params: { id: service.id }}" class="btn-base btn-danger-2 ms-2">Delete</router-link> -->
        </div>
    </div>
</template>

<script setup>
import { formatDate } from '@/Composables/formatDate'

defineProps({
  service: Object,
  recentServiceId: Number
})
</script>
