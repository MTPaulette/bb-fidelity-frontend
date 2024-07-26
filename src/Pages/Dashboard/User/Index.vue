<template>
  <div>
    <Breadcrumb link1="dashboard" link2="users" />
    <h1 class="ml-3 my-6 sm:my-8 title"> All users </h1>


    <div class="w-full px-3 py-5 h-auto border-color rounded-lg shadow">
      <ListUser />
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import ListUser from '@/Components/List/User.vue'
</script>

