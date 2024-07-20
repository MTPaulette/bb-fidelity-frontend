<template>
  <div>
    <Breadcrumb link1="dashboard" link2="service" />
    <div class="ml-3">
      <h1 class="my-6 sm:my-8 title"> Service id {{ id }} Informations </h1>
    </div>
    <div class="border border-red-600 p-4 m-5">service: {{ service }}</div>
    <div class="w-full bg-default border border-color rounded-lg shadow">
      <div class="flex flex-col items-centerr p-6 md:p-12">
        <!-- <img class="w-24 h-24 mb-3 shadow-lg rounded-full" src="./../../../assets/s.png"> -->
        <div>
          <svg class="w-24 h-24 mb-5 rounded-full shadow-lg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5z"/>
          </svg>
        </div>

        <h5 class="mb-2 text-2xl uppercase font-bold tracking-tight text-black-white">{{ service.name }}</h5>
        <div class="mt-3 mb-5">
          <p>Validity: &nbsp;<span class="text-black-white font-medium"> {{ service.validity }} </span></p>
          <p>Price: &nbsp;<span class="text-accentuate"> {{ service.price }} FCFA </span></p>
          <p>Bonus Point: &nbsp;<span class="text-green-500"> {{ service.point }} Point(s) </span></p>
        </div>
        <div>
          Description: <br />
          <p class="mt-1 mb-3 text-secondary text-justify">{{ service.description }}</p>
        </div>
        <p class="mb-3 text-xs font-light">Created at {{ formatDate(service.created_at) }}</p>
        <p class="mb-3 text-xs font-light">Updated at {{ formatDate(service.updated_at) }}</p>
        
        <div class="flex items-center mt-4 md:mt-6">
          <router-link :to="{ name: 'service.edit', params: { id: service.id }}" class="inline-flex items-center btn-base btn-blue rounded-lg">Edit</router-link>
          <router-link :to="{ name: 'service.show', params: { id: service.id }}" class="btn-base btn-success rounded-lg ml-3">Buy</router-link>
          <!-- <router-link :to="`service/${service.id}/buy`" class="btn-base btn-success rounded-lg ml-3">Buy</router-link> -->
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
    // this.getServiceById(this.$route.params.id);
    this.getServiceById(this.id);
  },

  methods: {
    getServiceById (id) {
      this.$store
        .dispatch('getServiceById', {
          id: id
        })
        .then((res) => {
          this.service = res.data.service
          //this.$router.push({ name: 'service', params })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

</script>