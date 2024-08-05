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
          You have a possibility to create a new service.
          <span class="font-medium text-black-white">Make sure its name is unique or not yet used</span>.
          The description will provide more information about a service. Make sure to make it as detailled as possible.
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
          <label for="price" class="label">Price (XAF)</label>
          <input id="price" v-model="service.price" type="price" class="input" required />
          <p v-if="errors" class="input-error">
            <span v-if="errors.price">{{ errors.price[0] }}</span>
          </p>
        </div>
        <div>
          <label for="credit" class="label">Credit Point</label>
          <input id="credit" v-model="service.credit" type="number" class="input" required />
          <p v-if="errors" class="input-error">
            <span v-if="errors.credit">{{ errors.credit[0] }}</span>
          </p>
        </div>
        <div>
          <label for="debit" class="label">Debit Point</label>
          <input id="debit" v-model="service.debit" type="number" class="input" required />
          <p v-if="errors" class="input-error">
            <span v-if="errors.debit">{{ errors.debit[0] }}</span>
          </p>
        </div>
        <!-- validity -->
        <div>
          <label for="validity" class="label">Validity</label>
          <select id="validity" v-model="service.validity" name="validity" class="input" required>
            <!-- <option selected>No validity selected</option> -->
            <option v-for="(validity, i) in validities" :key="i" :value="validity">{{ validity }}</option>
          </select>
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
import Validities from "@/Database/Validities.js"

export default {
  components: {
    Breadcrumb,
    FlashAlert,
    ButtonLoading
  },

  data() {
    return {
      validities: Validities,
      // new Service(name, price, credit, debit, validity, description, user_id)
      service: new Service('', '', '', '', '', '', ''),
      message: '',
      loading: false,
      errors: null,
    }
  },

  methods: {
    newService () {
      this.loading = true
      this.errors = null

      console.log(this.service)
      this.$store
      .dispatch('services/createService', this.service)
      .then((res) => {
        this.message = res.data.message

        //flashAlert will disappear after 1s
        setTimeout(() => {
          this.message = ''
        }, 5000)
      })
      .catch(err => {
        if(err.response) {
          this.errors = err.response.data.errors
        }
      })
      .finally(() => this.loading = false)
    },
  }
}

</script>
