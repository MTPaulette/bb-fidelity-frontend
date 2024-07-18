<template>
  <div>
    <Breadcrumb link1="dashboard" link2="service" />
    <div class="ml-3">
      <h1 class="my-6 sm:my-8 title"> Service id {{ id }} Informations </h1>
    </div>
    <div class="w-full bg-default border border-color rounded-lg shadow">
      <div class="flex flex-col items-center py-10">
        <!-- <img class="w-24 h-24 mb-3 shadow-lg rounded-full" src="./../../../assets/s.png"> -->
        <div>
          <svg class="w-24 h-24 mb-3 rounded-full shadow-lg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5z"/>
          </svg>
        </div>

        <h5 class="mb-2 text-2xl font-bold tracking-tight text-black-white">{{ service.name }}</h5>
        <div class="my-3">
          <p>Validity: &nbsp;<span class="text-black-white font-medium"> {{ service.price }} month </span></p>
          <p>Price: &nbsp;<span class="text-accentuate"> {{ service.price }} FCFA </span></p>
          <p>Bonus Point: &nbsp;<span class="text-green-500"> {{ service.price }} Point(s) </span></p>
        </div>
        <p class="mb-3 text-secondary h-12">{{ service.description }}</p>
        <p class="mb-3 text-xs font-light">Created at {{ formatDate(service.created_at) }}</p>
        <p class="mb-3 text-xs font-light">Updated at {{ formatDate(service.updated_at) }}</p>
        
        <div class="flex items-center mt-4 md:mt-6">
          <router-link :to="`service/edit/${service.id}`" class="inline-flex items-center btn-base btn-blue rounded-lg">Editer</router-link>
          <router-link :to="`service/buy/${service.id}`" class="btn-base btn-success rounded-lg ml-3">Acheter</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from '@/Composables/formatDate'
</script>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'

export default {
  components: {
    Breadcrumb
  },
  props: {
    id: String,
  },
  data() {
    return {
      service: null
    }
  },

  // created() {
  beforeMount() {
    this.showService(this.$route.params.id);
  },

  methods: {
    showService (id) {
      this.$store
        .dispatch('showService', {
          id: id
        })
        .then((res) => {
          this.service = res.data.service
          this.$router.push({ name: 'service', params })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

</script>