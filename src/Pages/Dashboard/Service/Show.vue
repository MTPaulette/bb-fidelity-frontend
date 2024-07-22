<template>
  <div>
    <Breadcrumb link1="dashboard" link2="service" />
    <div class="ml-3">
      <h1 class="my-6 sm:my-8 title"> Service id {{ id }} Informations </h1>
    </div>

    <div class="flex w-full justify-center items-center" v-if="loading">
      <div role="status" class="my-32">
        <svg aria-hidden="true" class="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    
    <!-- <div v-if="errors" class="error">{{ errors }}</div> -->

    <div class="w-full bg-default border border-color rounded-lg shadow" v-if="service">
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
        <!-- <p class="mb-3 text-xs font-light">Created at {{ formatDate(service.created_at) }}</p> -->
        <p class="mb-3 text-xs font-light">Created at {{ service.created_at }}</p>
        <p class="mb-3 text-xs font-light">Updated at {{ service.updated_at }}</p>
        
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
  data() {
    return {
      loading: false,
      service: null
    }
  },

  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params.id,
      this.getServiceById,

      // fetch the data when the view is created and the data is already being observed
      { immediate: true }
    )
  },

  methods: {
    getServiceById (id) {
      console.log("-------------------store----------------------------")
      console.log(this.$store.state.auth.user)
      this.loading = true
      this.$store
        .dispatch('services/getServiceById', {
          id: id
        })
        .then((res) => {
          this.service = res.data.service
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => this.loading = false)
    }
  },
}

</script>