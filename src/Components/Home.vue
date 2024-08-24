<template>
  <div class="flex flex-col items-center justify-center h-full w-full mt-4 space-y-4 lg:mt-5 md:space-y-5">
    <h1 class="my-10 text-4xl md:text-6xl font-bold font-[roboto] leading-tight tracking-tight text-black-white text-center">Welcome to Brain Booster Fidelity System.</h1>
    <h4 class="text-primary title text-center mb-6">Please, login first</h4>
    <router-link :to="{ name: 'login'}" class="btn-base btn-blue">
      Login
    </router-link>
  </div>
</template>