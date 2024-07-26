<template>
  <div>
    <!-- <div class="border border-red-500 p-4 m-7"> service: {{ service }}</div> -->
    <div v-if="this.message !=''">
      <FlashAlert :message="this.message" />
    </div>
    <Breadcrumb link1="dashboard" link2="service" />
    <h1 class="ml-3 my-6 sm:my-8 title"> Edit Service  </h1>

    <div v-if="loading">
      <Loading />
    </div>

    <div class="w-full px-4 py-5 h-auto border border-color rounded-lg shadow" v-if="service">
      <div class="p-3 mb-4 rounded-lg bg-gray-50 dark:bg-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Check to the right. If the service that you find not exist, you can use the left textarea to
          <span class="font-medium text-black-white">add edit service</span>.
          You can also use the trash icon to delete some service.
        </p>
      </div>

      <!-- dark:bg-gray-700  -->
      <form class="relative w-full space-y-4 md:space-y-6" @submit.prevent="updateService">
        <div>
          <label for="name" class="label">Name</label>
          <input id="name" v-model="service.name" type="text" class="input" required />
          <p v-if="errors" class="input-error">
            <span v-if="errors.name">{{ errors.name[0] }}</span>
          </p>
        </div>
        <div>
          <label for="price" class="label">Price (FCFA)</label>
          <input id="price" v-model="service.price" type="price" class="input" required />
          <p v-if="errors" class="input-error">
            <span v-if="errors.price">{{ errors.price[0] }}</span>
          </p>
        </div>
        <div>
          <label for="point" class="label">Bonus Point</label>
          <input id="point" v-model="service.point" type="number" class="input" required />
          <p v-if="errors" class="input-error">
            <span v-if="errors.point">{{ errors.point[0] }}</span>
          </p>
        </div>
        <div>
          <label for="validity" class="label">Validity</label>
          <input id="validity" v-model="service.validity" type="text" class="input" required />
          <p v-if="errors" class="input-error">
            <span v-if="errors.validity">{{ errors.validity[0] }}</span>
          </p>
        </div>
        <div>
          <label for="service" class="label">Description</label>
          <textarea v-model="service.description" rows="4" class="text-area mb-4 min-h-40 h-auto" placeholder="edit service..." />
          <p v-if="errors" class="input-error">
            <span v-if="errors.description">{{ errors.description[0] }}</span>
          </p>
        </div>
        <ButtonLoading label="Update service" :loading="loading" />
      </form>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import FlashAlert from '@/Components/FlashAlert.vue'
import ButtonLoading from '@/Components/ButtonLoading.vue'
import Loading from '@/Components/Loading.vue'

import Service from "@/Models/Service.js"

export default {
  components: {
    Breadcrumb,
    FlashAlert,
    ButtonLoading,
    Loading
  },

  data() {
    return {
      service: null,
      name: null,
      price: '1000',
      point: '10',
      validity: '1 hour',
      description: "Ce forfait donne droit a une heure de temps dans l'espace open space.",
      message: '',
      loading: false,
      errors: null,
    }
  },

  computed: {
    user_id() {
      return JSON.parse(localStorage.getItem('user')).id
    },
  },

  mountedd() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params.id,
      this.getServiceById,

      // fetch the data when the view is created and the data is already being observed
      { immediate: true }
    )
  },
  mounted() {
    this.getServiceById(this.$route.params.id)
  },

  methods: {
    getServiceById (id) {
      this.loading = true
      this.$store
        .dispatch('services/getServiceById', {
          id: id
        })
        .then((res) => {
          // this.service = res.data.service
          const serviceData = res.service
          this.service = new Service(serviceData.name, serviceData.price, serviceData.point, serviceData.validity, serviceData.description, serviceData.user_id)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => this.loading = false)
    },

    updateService () {
      console.log('============')
      console.log(this.id)
      this.loading = true
      this.errors = null
      this.service.user_id = this.user_id
      
      this.$store
      .dispatch('services/updateService', {
        id: this.$route.params.id,
        service: this.service
      })
      .then((res) => {
        this.message = res.data.message
        // location.reload()

        //flashAlert will disappear after 1s
        setTimeout(() => {
          this.message = ''
        }, 20000)

        this.errors = res.response.data.errors
        // this.$router.push({ name: 'profile' })
      })
      .catch(err => {
        this.errors = err.response.data.errors
        console.log(err)
      })
      .finally(() => this.loading = false)
    },
  }
}

</script>
