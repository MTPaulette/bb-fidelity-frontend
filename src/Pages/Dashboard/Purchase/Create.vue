<template>
  <div>
    <div v-if="message !=''">
      <FlashAlert :message="message" />
    </div>
    <Breadcrumb link1="dashboard" link2="purchase" />
    <h1 class="ml-3 my-6 sm:my-8 title"> New Purchase  </h1>

    <div v-if="!(users && services)">
      <Loading />
    </div>
  
    <div v-if="users && services" class="w-full px-4 py-5 h-auto border border-color rounded-lg shadow">
      <div class="p-3 mb-4 rounded-lg bg-gray-50 dark:bg-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Check to the right. If the purchase that you find not exist, you can use the left textarea to
          <span class="font-medium text-black-white">add new purchase</span>.
          You can also use the trash icon to delete some purchase.
        </p>
      </div>
      <form class="relative w-full space-y-4 md:space-y-6" @submit.prevent="summary">
        <!-- user -->
        <div>
          <label for="user" class="label">Choose User</label>
          <select id="user" v-model="selectedUser" name="user" class="input" required>
            <option selected>No user selected</option>
            <!-- <option v-for="user in users" :key="user.id" :value="user">{{ user.name }}</option> -->
            <option v-for="user in users" :key="user.id" :value="user">
              <span v-if="user.role_id == 1"> {{ user.name }} (Admin)</span>
              <span v-else>{{ user.name }}</span>
            </option>
          </select>
        </div>

        <!-- service -->
        <div>
          <label for="service" class="label">Choose Service</label>
          <select id="service" v-model="selectedService" name="service" class="input" required>
            <option selected>No service selected</option>
            <option v-for="service in services" :key="service.id" :value="service">{{ service.name }}</option>
          </select>
          <p v-if="errors" class="input-error">{{ errors }}</p>
        </div>

        <!-- by_cash -->
        <div class="flex items-center">
          <input id="payment" v-model="purchase.by_cash" type="checkbox" checked class="w-4 h-4 mr-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 border-color" />
          <label for="payment" class="sr-onlyy">Payment by cash</label>
        </div>
        <ButtonLoading label="Save purchase" :loading="loading" />
      </form>
    </div>
  </div>

  <!-- toggle modal -->
  <button id="summaryButton" data-modal-target="summaryModal" data-modal-toggle="summaryModal" class="sr-only" type="button">Save purchase</button>

  <!-- Summary modal -->
  <div id="summaryModal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal">
    <div class="relative p-4 w-full max-w-2xl h-full">
      <!-- Modal content -->
      <div class="relative bg-primary rounded-lg shadow p-5 md:p-8">
        <!-- Modal header -->
        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-color">
          <h3 class="title"> Purchase summary </h3>
          <button type="button" class="text-primary hover:text-danger" data-modal-toggle="summaryModal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        
        <div v-if="errors">
          <Error :message="errors" />
        </div>
      
        <div class="grid gap-4 mt-6 pb-6 mb-10 sm:grid-cols-2 rounded-t border-b ">
          <div class="border-r border-color mb-6 sm:mb-0">
            <h4 class="subtitle">User information</h4>
            <div v-if="selectedUser" class="w-full mt-4 sm:mt-8">
              <div>
                <svg class="w-16 h-16 mb-3 rounded-full shadow-lg" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
              </div>
              <h5 class="subtitle">{{ selectedUser.name }}</h5>
              <span class="text-sm text-blue-500 my-1">{{ selectedUser.email }}</span>
              <div v-if="selectedUser.role_id != 1" class="flex items-center">
                <div class="inline-block w-4 h-4 mr-2 rounded-full" :class="[selectedUser.balance > 0 ? 'bg-green-400' : 'bg-red-700']" />
                {{ selectedUser.balance }} point(s)
              </div>
            </div>
          </div>

          <div>
            <h4 class="subtitle">Service information</h4>
            <div v-if="selectedService" class="w-full mt-4 sm:mt-8">
              <div>
                <svg class="w-16 h-16 mb-5 rounded-full shadow-lg" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5z" />
                </svg>
              </div>

              <h5 class="subtitle">{{ selectedService.name }}</h5>
              <div class="my-2">
                <p>Validity: &nbsp;<span class="text-black-white font-medium"> {{ selectedService.validity }} </span></p>
                <p>Price: &nbsp;<span class="text-accentuate"> {{ selectedService.price }} XAF </span></p>
                <p>Bonus Point: &nbsp;<span class="text-green-500"> {{ selectedService.point }} Point(s) </span></p>
              </div>
              <!-- <div>
                  Description: <br />
                  <p class="mt-1 mb-3 w-full h-8 overflow-hidden text-secondary text-xs">{{ selectedService.description }}</p>
                </div> -->
              <p class="mb-1 text-xs font-light">Created at {{ selectedService.created_at }}</p>
            </div>
          </div>
        </div>
        <!-- Modal body -->
        <div class="mb-4" v-if="selectedService && selectedUser">
          <p>
            You (admin) want to buy
            <span v-if="purchase.by_cash" class="text-black-white font-medium">with cash payment</span>
            <span v-else class="text-black-white font-medium">by using user's point</span>
            the service <span class="text-black-white font-medium">{{ selectedService.name }}</span>
            valid <span class="text-black-white font-medium">{{ selectedService.validity }}</span> for <span class="text-black-white font-medium"> {{ selectedUser.name }}</span>.
          </p>

          <p>This purchase will cost <span class="text-accentuate font-medium">{{ selectedService.price }} XAF</span>.</p>

          <p>
            The user balance will be 
            <span v-if="purchase.by_cash" class="text-green-400">credit on {{ selectedService.point }} points.</span>
            <span v-else class="text-danger">debit on {{ selectedService.price }} points.</span><br />
          </p>
          <p class="text-black-white font-[Roboto] font-bold text-2xl mt-4 mb-12">
            The user new balance is 
            <span :class="[newBalance < 0 ? 'text-danger': 'text-accentuate']"> {{ newBalance }} points.</span><br />
          </p>
        </div>

        <!-- confirm and cancel btn-->
        <div class="flex items-center space-x-4">
          <ButtonLoading @click="newPurchase" :loading="sending" :disabled="!canSubmit" type="button" class="btn-base btn-blue" label="Confirm purchase" />
          <button @click="summary" type="button" class="btn-base btn-light-2">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import FlashAlert from '@/Components/FlashAlert.vue'
import ButtonLoading from '@/Components/ButtonLoading.vue'
import Loading from '@/Components/Loading.vue'
import Error from '@/Components/Error.vue'

import Purchase from "@/Models/Purchase.js"

export default {
  components: {
    Breadcrumb,
    FlashAlert,
    ButtonLoading,
    Loading,
    Error
  },

  data() {
    return {
      // new Purchase(admin_id, service_id, admin_id, by_cash)
      users: null,
      services: null,
      purchase: new Purchase("", "", "", true),
      message: '',
      selectedUser: null,
      selectedService: null,
      errors: null,
      loading: false,
      canSubmit: true,
      sending: false,
      newBalance: 0
    }
  },

  mounted() {
    this.getAllUsers()
    this.getAllServices()
  },

  methods: {
    getAllUsers() {
      this.$store.dispatch("auth/getAllUsers")
          .then((res) => {
            if(res) {
              this.users = res.users
            }
          })
    },
    getAllServices() {
      this.$store.dispatch("services/getAllServices")
        .then((res) => {
          if(res) {
            this.services = res.services
          }
        })
    },
    summary() {
      this.loading = !this.loading
      this.errors = null
      document.getElementById('summaryButton').click()
      if(this.selectedUser.role_id == 1) {
        this.errors = "Only client can make purchase. not Admin."
        this.canSubmit = false
      }

      if(this.purchase.by_cash) {
        this.newBalance = parseInt(this.selectedUser.balance) + parseInt(this.selectedService.price)
      } else {
        this.newBalance = parseInt(this.selectedUser.balance) - parseInt(this.selectedService.price)
        // this.newBalance = this.selectedUser.balance - this.selectedService.price
        if(this.newBalance < 0) {
          this.errors = "The user's balance is insuffisant to buy this service."
          this.canSubmit = false
        }
      }
    },
    newPurchase() {
      this.sending = true
      this.errors = null

      // this.purchase.admin_id = this.admin_id
      this.purchase.service_id = this.selectedService.id
      this.purchase.user_id = this.selectedUser.id
      
      this.$store
        .dispatch('purchases/createPurchase', this.purchase)
        .then((res) => {
          this.sending = false
          this.loading = false
          this.message = res.data.message
          document.getElementById('summaryButton').click()

          //flashAlert will disappear after 1s
          setTimeout(() => {
            this.message = ''
            this.getAllUsers()
          }, 5000)

          //this.errors = res.response.data.errors
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
          this.sending = false
        })
    },
  },
}

</script>

<script setup>
import { onMounted } from 'vue'
import {
  initModals
} from 'flowbite'

onMounted(() => {
  initModals();
})
</script>