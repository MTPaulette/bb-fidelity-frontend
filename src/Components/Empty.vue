<template>
  <h2 class="my-32 text-2xl md:text-3xl font-light leading-tight tracking-tight text-primary text-center">
    {{ message }}
  </h2>
</template>

<script setup>
defineProps({
  message: String,
})
</script>