<template>
  <div>
    <Breadcrumb link1="dashboard" link2="users" />
    <div class="ml-3">
      <h1 class="my-6 sm:my-8 title"> All users </h1>
    </div>


    <div class="w-full px-3 py-5 h-auto border-color rounded-lg shadow">
      <div class="">
        <ListPurchase />
      </div>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import ListPurchase from '@/Components/List/Purchase.vue'

// defineProps({
//   users: Object,
// })
</script>

