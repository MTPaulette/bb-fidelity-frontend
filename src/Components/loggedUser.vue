<template>
  <button id="user-menu-button" type="button" class="flex p-1.5 mt-2.5 text-sm hover:text-accentuate hover:bg-transparent rounded-full md:mr-0" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </svg>
  </button>
  <div id="user-dropdown" class="z-20 hidden my-4 overflow-x-hidden max-w-xs p-2 divide-y divide-[#dadce0] dropdown text-sm">
    <div v-if="user" class="px-4 py-3">
      <p class="font-light text-accentuate">{{ user.name }}</p>
      <p class="w-full truncate">{{ user.email }}</p>
      <p class="text-black-white capitalize">{{ user.role_name}}</p>
    </div>
    <ul class="py-2" aria-labelledby="user-menu-button">
      <li v-if="user">
        <router-link :to="{ name: 'profile'}" class="dropdown-item" title="see profile">Profile</router-link>
      </li>
      <li v-else>
        <router-link :to="{ name: 'login'}" class="dropdown-item">Login</router-link>
      </li>
      <li v-if="user">
        <button type="button" @click="logout()" :class="logout_processing?'cursor-progress':''" class="flex items-center w-full px-4 py-2 hover:text-danger">Logout</button>
      </li>
    </ul>
  </div>
</template>


<script setup>
import { onMounted } from 'vue'
import {
  initDropdowns
} from 'flowbite'

onMounted(() => {
  initDropdowns();
})
</script>


<script>
export default {
  data() {
    return {
      logout_processing: false
    }
  },
  props: {
    user: Object
  },

  methods: {
    logout () {
      this.logout_processing = true
      this.$store
        .dispatch('auth/logout')
    }
  }
}
</script>

