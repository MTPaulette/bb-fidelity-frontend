<template>
  <div>
    <div v-if="this.message !=''">
      <FlashAlert :message="this.message" />
    </div>
    <Breadcrumb link1="dashboard" link2="service" />
    <h1 class="ml-3 my-6 sm:my-8 title"> New Service </h1>

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
          <label for="name" class="label">Name<span class="required">*</span></label>
          <input id="name" v-model="service.name" type="text" class="input" required />
          <p v-if="errors" class="input-error">
            <span v-if="errors.name">{{ errors.name[0] }}</span>
          </p>
        </div>
        <div>
          <label for="price" class="label">Price (XAF)<span class="required">*</span></label>
          <input id="price" v-model="service.price" type="price" class="input" required />
          <p v-if="errors" class="input-error">
            <span v-if="errors.price">{{ errors.price[0] }}</span>
          </p>
        </div>
        
        <div class="grid gap-2 sm:gap-6 grid-cols-2">
          <div>
            <label for="credit" class="label">Credit Point<span class="required">*</span></label>
            <input id="credit" v-model="service.credit" type="number" class="input" required />
            <p v-if="errors" class="input-error">
              <span v-if="errors.credit">{{ errors.credit[0] }}</span>
            </p>
          </div>
          <div>
            <label for="debit" class="label">Debit Point<span class="required">*</span></label>
            <input id="debit" v-model="service.debit" type="number" class="input" required />
            <p v-if="errors" class="input-error">
              <span v-if="errors.debit">{{ errors.debit[0] }}</span>
            </p>
          </div>
          <!-- validity -->
          <div>
            <label for="validity" class="label">Validity<span class="required">*</span></label>
            <select id="validity" v-model="service.validity" name="validity" class="input" required>
              <option disabled value="">Choose a validity</option>
              <option v-for="(validity, i) in validities" :key="i" :value="validity">{{ validity }}</option>
            </select>
            <p v-if="errors" class="input-error">
              <span v-if="errors.validity">{{ errors.validity[0] }}</span>
            </p>
          </div>

          <!-- agency -->
          <div>
            <label for="agency" class="label">Agency<span class="required">*</span></label>
            <select id="agency" v-model="service.agency" name="agency" class="input" required>
              <option disabled value="">Choose an agency</option>
              <option v-for="(agency, i) in agencies" :key="i" :value="agency">{{ agency }}</option>
            </select>
            <p v-if="errors" class="input-error">
              <span v-if="errors.agency">{{ errors.agency[0] }}</span>
            </p>
          </div>
        </div>

        <div class="grid gap-2 sm:gap-6 grid-cols-2">
          <!-- service_type -->
          <div>
            <label for="service_type" class="label">Type of Service<span class="required">*</span></label>
            <select id="service_type" v-model="service.service_type" name="service_type" class="input" required>
              <option disabled value="">Choose a type</option>
              <option v-for="(service_type, i) in service_types" :key="i" :value="service_type">{{ service_type }}</option>
            </select>
            <p v-if="errors" class="input-error">
              <span v-if="errors.service_type">{{ errors.service_type[0] }}</span>
            </p>
          </div>
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

import Service from '@/Models/Service.js'
import Agencies from '@/Database/Agencies.js'
import Validities from "@/Database/Validities.js"
import Service_types from "@/Database/Service_types.js"

export default {
  components: {
    Breadcrumb,
    FlashAlert,
    ButtonLoading
  },

  data() {
    return {
      agencies: Agencies,
      validities: Validities,
      service_types: Service_types,
      // new Service(name, price, credit, debit, validity, service_type, agency, description, user_id)
      service: new Service('', '', '', '', '', '', '', '',''),
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
            this.$router.push({ name: 'service.show', params: { id: res.data.service_id }})
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
