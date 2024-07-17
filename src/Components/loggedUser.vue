<template>
  <button id="user-menu-button" type="button" :class="isDark?'bg-gray-500':''" class="flex p-1.5 mt-2.5 text-sm hover:text-accentuate hover:bg-transparent rounded-full md:mr-0" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </svg>
  </button>
  <div id="user-dropdown" class="z-20 hidden my-4 overflow-x-hidden max-w-xs p-2 divide-y divide-[#dadce0] dropdown text-sm">
    <div v-if="user" class="px-4 py-3">
      <p class="text-accentuate" v-if="user.role_id === 1"> Admin </p>
      <p class="font-light text-accentuate">{{ user.name }}</p>
      <p class="w-full truncate">{{ user.email }}</p>
    </div>
    <ul class="py-2" aria-labelledby="user-menu-button">
      <li v-if="user">
        <router-link to="/profile" class="px-4 py-2 item-dropdown" title="see profile">Profile</router-link>
      </li>
      <li v-else>
        <router-link to="/login" class="px-4 py-2 item-dropdown">Login</router-link>
      </li>
      <li v-if="user">
        <button type="button" @click="logout()" class="flex items-center w-full px-4 py-2 hover:text-danger">Deconnexion</button>
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
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user')).user
    },
  },

  methods: {
    logout () {
      this.$store
        .dispatch('logout')
        .then(() => {
          this.$router.push({ name: 'login' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

