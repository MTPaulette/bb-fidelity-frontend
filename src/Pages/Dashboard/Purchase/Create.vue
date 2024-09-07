<template>
  <div>
    <div v-if="message !=''">
      <FlashAlert :message="message" />
    </div>
    <Breadcrumb link1="dashboard" link2="purchase" />
    <h1 class="ml-3 my-6 sm:my-8 title"> New Purchase  </h1>

    <!-- <div v-if="!(users && services)"> -->
      <div v-if="!(users && services)">
      <Loading />
    </div>
  
    <div v-if="users && services" class="w-full px-4 py-5 h-auto border border-color rounded-lg shadow">
      <div class="p-3 mb-4 rounded-lg bg-gray-50 dark:bg-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          For a new purchase, you must enter the customer, the service to be purchased and the payment method.
          <span class="font-medium text-black-white">Administrators cannot make purchases.</span>.
        </p>
      </div>
      <form class="relative w-full space-y-4 md:space-y-6" @submit.prevent="summary">
        
        <div v-if="errors">
          <Error :message="errors" />
        </div>

        <!-- user -->
        <div>
          <p class="label">User<span class="required">*</span></p>
          <MySelect :items="users" @selectedValue="setUser_q" label="user" :errors="errorUser" />
        </div>
        <!-- service -->
        <div>
          <p class="label">Service<span class="required">*</span></p>
          <MySelect :items="services" @selectedValue="setService_q" label="service" :errors="errorService"/>
        </div>
        <!-- by_cash -->
        <div>
          <p class="label">Payment Mode<span class="required">*</span></p>
          <div class="grid grid-cols-2 items-center mt-3">
          <!-- <div class="flex justify-between items-center mt-2"> -->
            <div class="flex items-center">
              <input id="payment" type="radio" v-model="purchase.by_cash" :value="trueval" class="w-4 h-4 mr-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 border-color" />
              <label for="payment" class="text-black-white">
                By cash
                <!-- <span class="text-primary font-light text-sm">(uncheck if you want to use your loyalty points)</span> -->
              </label>
            </div>
            <div class="flex items-center">
              <input id="payment" type="radio" v-model="purchase.by_cash" :value="!trueval" class="w-4 h-4 mr-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 border-color" />
              <label for="payment" class="text-black-white">By point</label>
            </div>
          </div>
        </div>

        <!-- by_cash -->
        <!-- <div class="flex items-center">
          <input id="payment" v-model="purchase.by_cash" type="checkbox" checked class="w-4 h-4 mr-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 border-color" />
          <label for="payment" class="text-black-white">
            Payment by cash
            <span class="text-primary font-light text-sm">(uncheck if you want to use your loyalty points)</span>
          </label>
        </div> -->
        <ButtonLoading label="Save purchase" :loading="loading" :disabled="!(selectedUser && selectedService && purchase.by_cash != null)" />
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
        </div>
        
        <div v-if="errors">
          <Error :message="errors" />
        </div>
        
        <div v-if="selectedUser">
          <div v-if="!selectedUser.is_registered">
            <Warning message="This user is not yet registered with the loyalty program. He can just make cash payment" />
          </div>
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
              <h5 class="subtitle flex items-center">
                {{ selectedUser.name }}
                <div v-if="selectedUser.role_id == 2" class="ms-2">
                  <span v-if="selectedUser.is_registered" title="registered user" class="text-green-500">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                    </svg>
                  </span>
                  <span v-else class="text-red-500" title="unregistered user">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </span>
                </div>
              </h5>
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
                <p>Credit Point: &nbsp;<span class="text-green-500"> {{ selectedService.credit }} Point(s) </span></p>
                <p>Debit Point: &nbsp;<span class="text-danger"> {{ selectedService.debit }} Point(s) </span></p>
              </div>
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
            <span v-if="purchase.by_cash" class="text-green-400">credit on {{ selectedService.credit }} points.</span>
            <span v-else class="text-danger">debit on {{ selectedService.debit }} points.</span><br />
          </p>
        </div>

        <!-- confirm and cancel btn-->
        <div class="flex items-center space-x-4 mt-12">
          <ButtonLoading @click="newPurchase" :loading="sending" :disabled="!canSubmit" type="button" class="btn-base btn-blue" label="Confirm purchase" />
          <button @click="close" type="button" class="btn-base btn-light-2">Cancel</button>
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
import Warning from '@/Components/Warning.vue'
import MySelect from '@/Components/Select.vue'

import Purchase from "@/Models/Purchase.js"

export default {
  components: {
    Breadcrumb,
    FlashAlert,
    ButtonLoading,
    Loading,
    Error,
    Warning,
    MySelect,
  },

  data() {
    return {
      trueval: true,
      // new Purchase(admin_id, service_id, admin_id, by_cash)
      users: null,
      services: null,
      purchase: new Purchase("", "", "", null),
      message: '',
      selectedUser: '',
      selectedService: '',

  
      errors: null,
      loading: false,
      canSubmit: true,
      sending: false,
      new_balance: null,

      user_q: null,
      service_q: null,
      errorService: null,
      errorUser: null,
    }
  },

  mounted() {
    // this.getAllUsers()
    // this.getAllServices()
    
    this.$watch(
      () => this.user_q,
      this.getAllUsers,
      { 
        immediate: true,
        deep: true
      }
    )
    this.$watch(
      () => this.service_q,
      this.getAllServices,
      { 
        immediate: true,
        deep: true
      }
    )
  },

  methods: {
    setUser_q(selectedValue) {
      this.selectedUser = selectedValue.selectedItem
      this.user_q = selectedValue.q
    },
    setService_q(selectedValue) {
      this.selectedService = selectedValue.selectedItem
      this.service_q = selectedValue.q
    },
    getAllUsers() {
      this.errorUser = null
      this.$store.dispatch("auth/getAllUsers", {
            no_pagination: true,
            q: this.user_q,
            by: 'name',
            order: 'asc'
          })
          .then((res) => {
            if(res) {
              this.users = res.users
            }
          })
          .catch(err => {
            if(err.response) {
              this.errorUser = err.response.data.errors
            }
          })
    },

    getAllServices() {
      this.errorService = null
      this.$store.dispatch("services/getAllServices", {
            no_pagination: true,
            q: this.service_q,
            by: 'name',
            order: 'asc'
          })
          .then((res) => {
            if(res) {
              this.services = res.services
            }
          })
          .catch(err => {
            if(err.response) {
              this.errorService = err.response.data.errors
            }
          })
    },

    summary() {
      this.loading = true
      this.errors = null
      document.getElementById('summaryButton').click()

      if(this.selectedUser.role_id != 2) {
        this.errors = "Only client can make purchase. not Admin."
        this.canSubmit = false
      }
    },

    close() {
      this.canSubmit = true
      document.getElementById('summaryButton').click()
      this.loading = false
    },

    newPurchase() {
      this.sending = true
      this.errors = null

      this.purchase.service_id = this.selectedService.id
      this.purchase.user_id = this.selectedUser.id
      
      this.$store
        .dispatch('purchases/createPurchase', this.purchase)
        .then((res) => {
          this.sending = false
          this.close()
          if(res) { 
            this.message = res.data.message
          }

          //flashAlert will disappear after 1s
          setTimeout(() => {
            this.message = ''
            this.users = null
            this.getAllUsers()
          }, 5000)

        })
        .catch(err => {
          if(err) {
            this.errors = err.response.data.errors
          }
          this.sending = false
        })
        .finally(() => {
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