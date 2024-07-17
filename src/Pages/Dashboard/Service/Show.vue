<template>
  <div>
    <Breadcrumb link1="dashboard" link2="service" />
    <div class="ml-3">
      <h1 class="my-6 sm:my-8 title"> Service id {{ id }} Informations </h1>
    </div>

    <div class="w-full bg-default border border-color rounded-lg shadow">
      <div class="flex flex-col items-center py-10">
        <div>
          <svg class="w-24 h-24 mb-3 rounded-full shadow-lg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5z"/>
          </svg>
        </div>

        <h5 class="mb-2 text-2xl font-bold tracking-tight text-black-white">{{ service.name }}</h5>
        <p>
          <span class="text-green-500" v-if="service.price>0"> {{ service.price }} prix/point(s) </span>
          <span class="text-danger" v-else>{{ service.price }} prix/point(s)</span>
        </p>
        <p class="my-3 text-secondary h-12">{{ service.description }}</p>
        <p class="mb-3 text-xs font-light">Cree il y'a {{ formatDate(service.created_at) }}</p>
        
        <div class="flex items-center mt-4 md:mt-6">
          <router-link :to="`service/${service.id}`" class="inline-flex items-center btn-base btn-blue rounded-lg">
              Utiliser
              <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
          </router-link>
          <div v-if="user_role === 1">
            <router-link :to="`service/edit/${service.id}`" class="btn-base btn-success rounded-lg ml-3">Editer</router-link>
          </div>
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

  computed: {
    user_role() {
      return JSON.parse(localStorage.getItem('user')).user.role_id
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