<template>
  <button id="user-menu-button" type="button" :class="isDark?'bg-gray-500':''" class="flex p-1.5 mt-2.5 text-sm hover:text-accentuate hover:bg-transparent rounded-full md:mr-0" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </svg>
  </button>
  <div id="user-dropdown" class="z-20 hidden my-4 overflow-x-hidden max-w-xs px-4 py-3 divide-y divide-[#dadce0] dropdown text-sm">
    <div v-if="user" class="px-4 py-3">
      <span class="block text-accentuate">role {{ user.role_id }}</span>
      <span class="block text-accentuate">point: {{ user.point }}</span>
      <span class="block text-accentuate">{{ user.name }}</span>
      <span class="block font-medium truncate">{{ user.email }}</span>
    </div>
    <ul class="py-2" aria-labelledby="user-menu-button">
      <li v-if="user">
        <router-link to="/dashboard" class="block px-4 py-2 hover:text-accentuate hover:bg-highlight">Dashboard</router-link>
      </li>
      <li v-else>
        <router-link to="/login" class="block px-4 py-2 hover:text-accentuate hover:bg-highlight">Login</router-link>
      </li>
      <li>
        <router-link to="#" class="block px-4 py-2 hover:text-accentuate hover:bg-highlight">Reglages</router-link>
      </li>
      <li v-if="user">
        <router-link to="/logout" method="DELETE" as="btn" class="block px-4 py-2 hover:text-accentuate hover:bg-highlight">Deconnexion</router-link>
      </li>
    </ul>
  </div>
</template>


<script>

export default {
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user'))
    },
  },
}
</script>

