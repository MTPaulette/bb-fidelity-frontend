<template>
  <div class="flex p-3 mb-4 rounded-lg font-medium border border-red-600 text-danger">
    <svg class="w-7 h-7 mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
    </svg>
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  message: String,
})
</script>