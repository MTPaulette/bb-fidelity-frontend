<template>
  <div>
    <Breadcrumb link1="dashboard" link2="users" />
    <div class="ml-3">
      <h1 class="my-6 sm:my-8 title"> All users </h1>
    </div>


    <div class="w-full px-3 py-5 h-auto my-border-gray rounded-lg shadow">
      <div class="">
        <ListUser />
      </div>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import ListUser from '@/Components/List/User.vue'

// defineProps({
//   users: Object,
// })
</script>

