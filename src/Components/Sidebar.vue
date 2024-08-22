<template>
  <Navbar :user="user" @toggleSidebar="toggleSidebar" />
  <!--desktop and tablet sidebar -->
  <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 sm:w-52 xl:w-64 h-screen pt-16 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <SidebarLinks :user="user" />
  </aside>

  <!-- mobile sidebar -->
  <div v-show="showSidebar" @click="showSidebar = false" class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30 sm:-translate-x-full" />
  <aside v-show="showSidebar" @click="showSidebar = false" id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform translate-x-0 sm:-translate-x-full" aria-label="Sidebar">
    <SidebarLinks :user="user" />
  </aside>
</template>

<script>
import Navbar from '@/Components/Navbar.vue'
import SidebarLinks from '@/Components/SidebarLinks.vue'

export default {
  components: {
    Navbar,
    SidebarLinks
  },
  props: {
    user: Object
  },
  data(){
    return {
      toggleDropdown: false,
      logout_processing: false,
      showSidebar: false,
    }
  },

  methods: {
    logout () {
      this.logout_processing = true
      this.$store
        .dispatch('auth/logout')
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar
      setTimeout(() => {
        //this.showSidebar = false
      }, 5000)
    }
  }
}
</script>


<script setup>
import { onMounted } from 'vue'
import {
  // initDropdowns,
  initFlowbite
} from 'flowbite'

onMounted(() => {
  initFlowbite();
})
</script>

<style scoped>
#main-sidebar::-webkit-scrollbar{
  width: 5px;
}

#main-sidebar::-webkit-scrollbar-track{
  box-shadow: inset 0 0 6px #FFF;
}

#main-sidebar::-webkit-scrollbar-thumb{
  outline: 1px solid #C4C4C4;
  background: #C4C4C4;
  border-radius: 8px;
}
</style>
