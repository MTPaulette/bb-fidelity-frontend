
<template>
  <nav class="fixed top-0 z-50 w-full bg-default md:shadow-light md:dark:shadow-dark">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <!-- <button @click="$emit('toggleSidebar')"
            data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" 
            class="inline-flex items-center p-2 text-sm rounded-lg sm:hidden
            text-black-white hover:text-accentuate"
            > -->
          <button @click="$emit('toggleSidebar')"
            type="button"
            class="inline-flex items-center p-2 text-sm rounded-lg sm:hidden
            text-black-white hover:text-accentuate"
            >
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
            </svg>
          </button>
          <a href="#" class="shrink-0 ml-2 md:mr-24">
            <img src="./../assets/logo_bb.png" alt="brain booster logo" class="h-[48px] w-auto" />
          </a>
        </div>
        <div class="flex items-center">
          <!-- <div class="flex items-center ml-3"> -->
          <!-- search -->
          <div class="relative mr-2 sm:mr-3">
            <SearchBar />
          </div>
          <!-- dark mode toggle  -->
          <div class="mr-4 mt-2">
            <DarkMode />
          </div>
          <!-- user's info dropdown menu -->
          <div>
            <LoggedUser :user="user" />
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

import SearchBar from '@/Components/SearchBar.vue'
import LoggedUser from '@/Components/LoggedUser.vue'
import DarkMode from '@/Components/DarkMode.vue'

export default {
  components: {
    SearchBar,
    LoggedUser,
    DarkMode
  },
  props: {
    user: Object
  },
}
</script>