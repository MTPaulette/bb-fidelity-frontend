
<template>
  <label for="toggle" :class="isDark?'bg-gray-500':''" class="p-1.5 rounded-full flex items-center justify-center cursor-point hover:text-accentuate hover:bg-transparent">
          
    <!-- <label for="toggle" class="inline-flex relative items-center cursor-pointer ml-4 hover:text-accentuate"> -->
    <button type="button" :class="isDark?'hidden':'inline'" title="swith to dark mode">
      <svg class="w-5 h-5 hover:text-secondary text-accentuate" fill="currentColor" viewBox="0 0 16 16">
        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
      </svg>
    </button>
    <button type="button" :class="isDark?'inline':'hidden'" title="swith to light mode">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
      </svg>
    </button>
    <input id="toggle" type="checkbox" class="absolute overflow-hidden opacity-0 border-0 w-3 h-3 mt-1 peer" :checked="isDark" @click="toggleDark()" />
    <!-- <input id="toggle" type="checkbox" class="sr-only peer" :checked="isDark" @click="toggleDark()" /> -->
  </label>
</template>

<script setup>
import { useToggle, useDark } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
