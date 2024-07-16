<template>
  <div>
    <Breadcrumb link1="dashboard" link2="services" />
    <div class="ml-3">
      <h1 class="my-6 sm:my-8 title"> All services </h1>
    </div>


    <div class="w-full px-3 py-5 h-auto my-border-gray rounded-lg shadow">
      <div class="">
        <ListService />
      </div>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import ListService from '@/Components/Service/ListService.vue'

</script>

