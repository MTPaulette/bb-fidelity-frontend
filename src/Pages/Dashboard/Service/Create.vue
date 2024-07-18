<template>
  <div>
    <div v-if="this.message !=''">
      <FlashAlert :message="this.message" />
    </div>
    <Breadcrumb link1="dashboard" link2="service" />
    <div class="ml-3">
      <h1 class="my-6 sm:my-8 title"> New Service  </h1>
    </div>

    <div class="w-full px-4 py-5 h-auto border border-color rounded-lg shadow">
      <div class="p-3 mb-4 rounded-lg bg-gray-50 dark:bg-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Check to the right. If the service that you find not exist, you can use the left textarea to
          <span class="font-medium text-gray-800 dark:text-white">add new service</span>.
          You can also use the trash icon to delete some service.
        </p>
      </div>

      <!-- dark:bg-gray-700  -->
      <form class="relative w-full space-y-4 md:space-y-6" @submit.prevent="newService">
        <div>
          <label for="name" class="label">Name</label>
          <input id="name" v-model="name" type="text" class="input" required />
        </div>
        <div>
          <label for="price" class="label">Price (FCFA)</label>
          <input id="price" v-model="price" type="price" class="input" required />
        </div>
        <div>
          <label for="point" class="label">Bonus Point</label>
          <input id="point" v-model="point" type="number" class="input" required />
        </div>
        <div>
          <label for="validity" class="label">Validity</label>
          <input id="validity" v-model="validity" type="text" class="input" required />
        </div>
        <div>
          <label for="service" class="label">Description</label>
          <textarea v-model="description" rows="4" class="text-area mb-4" placeholder="new service..." />
          <button type="submit" class="btn-base btn-default">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import FlashAlert from '@/Components/FlashAlert.vue'

export default {
  components: {
    Breadcrumb,
    FlashAlert
  },

  data() {
    return {
      name: null,
      price: '1000',
      point: '0',
      validity: '1 hour',
      description: null,
      message: '',
      errors: null,
    }
  },

  methods: {
    newService () {
      this.errors = null
      this.$store
      .dispatch('createService', {
        name: this.name,
        price: this.price,
        point: this.point,
        validity: this.validity,
        description: this.description
      })
      .then((res) => {
        this.message = res.data.message
        // this.$router.push({ name: 'profile' })
      })
      .catch(err => {
        this.errors = err.response.data.errors
      })
    }
  }
}

</script>
