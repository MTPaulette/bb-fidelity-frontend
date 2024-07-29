<template>
  <div>
    <div v-if="this.message !=''">
      <FlashAlert :message="this.message" />
    </div>
    <Breadcrumb link1="dashboard" link2="service" />
    <h1 class="ml-3 my-6 sm:my-8 title"> New Service  </h1>

    <div class="w-full px-4 py-5 h-auto border border-color rounded-lg shadow">
      <div class="p-3 mb-4 rounded-lg bg-gray-50 dark:bg-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Check to the right. If the service that you find not exist, you can use the left textarea to
          <span class="font-medium text-black-white">add new service</span>.
          You can also use the trash icon to delete some service.
        </p>
      </div>

      <!-- dark:bg-gray-700  -->
      <form class="relative w-full space-y-4 md:space-y-6" @submit.prevent="newService">
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
          <textarea v-model="service.description" rows="4" class="text-area mb-4" placeholder="new service..." />
          <p v-if="errors" class="input-error">
            <span v-if="errors.description">{{ errors.description[0] }}</span>
          </p>
        </div>
        <ButtonLoading label="Create new service" :loading="loading" />
      </form>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import FlashAlert from '@/Components/FlashAlert.vue'
import ButtonLoading from '@/Components/ButtonLoading.vue'

import Service from "@/Models/Service.js"

export default {
  components: {
    Breadcrumb,
    FlashAlert,
    ButtonLoading
  },

  data() {
    return {
      // new Service(name, price, point, validity, description, user_id)
      service: new Service('', '5000', '50', '1h', "Ce forfait donne droit a une heure de temps dans l'espace open space.", ''),
      message: '',
      loading: false,
      errors: null,
    }
  },

  methods: {
    newService () {
      this.loading = true
      this.errors = null

      this.$store
      .dispatch('services/createService', this.service)
      .then((res) => {
        this.message = res.data.message

        //flashAlert will disappear after 1s
        setTimeout(() => {
          this.message = ''
        }, 20000)
      })
      .catch(err => {
        if(err.response) {
          this.errors = err.response.data.errors
          if(err.response.status == 403) {
            router.push({ name: 'forbidden' })
          }
        }
      })
      .finally(() => this.loading = false)
    },
  }
}

</script>
