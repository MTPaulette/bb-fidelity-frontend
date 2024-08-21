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
          For a new purchase, you must enter the customer, the service to be purchased and the payment method.
          <span class="font-medium text-black-white">Administrators cannot make purchases.</span>.
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

          
    <!-- filters -->
    <div class="w-full h-auto">
      <ul class="flex flex-wrap items-center text-secondary gap-1.5 md:gap-2 py-4 md:py-6 px-2 md:px-4 text-xs">
        <!-- <li>
          <button
            class="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium border rounded-full
            disabled text-purple-700 border-purple-700 focus:ring-purple-300 dark:border-purple-400 dark:text-purple-400"
          >
            <svg fill="currentColor" class="w-5 h-5" viewBox="0 0 16 16">
              <path d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z" />
            </svg>
            <span class="ml-1">Filters</span>
          </button>
        </li> -->

        <!-- by's list -->
        <li class="relative">
          <div @click="showBy = !showBy" :class="selectedFilters.by?'bg-highlight':''" class="flex justify-between py-1 px-3 rounded-lg border border-color font-['roboto']">
            <div class="ml-3 mr-2 font-medium"> {{ selectedFilters.by }}</div>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <div v-show="showBy" class="over-y absolute mt-1 z-10 divide-y divide-[#dadce0] w-32 max-h-[100px] dropdown">
            <ul class="py-2 text-sm" @click="showBy = false">
              <li v-for="(by, i) in order_by" :key="i" class="cursor-pointer">
                <span class="dropdown-item-filter" @click="selectedFilters.by = by">
                  {{ by }}
                </span>
              </li>
            </ul>
          </div>
        </li>

        <!-- order's list -->
        <li class="relative">
          <div @click="showOrder = !showOrder" :class="selectedFilters.order?'bg-highlight':''" class="flex justify-between py-1 px-3 rounded-lg border border-color font-['roboto']">
            <div class="ml-3 mr-2 font-medium"> {{ selectedFilters.order }}</div>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <div v-show="showOrder" class="over-y absolute mt-1 z-10 divide-y divide-[#dadce0] w-32 max-h-[100px] dropdown">
            <ul class="py-2 text-sm" @click="showOrder = false">
              <li v-for="(order, i) in asc_desc" :key="i" class="cursor-pointer">
                <span class="dropdown-item-filter" @click="selectedFilters.order = order">
                  {{ order }}
                </span>
              </li>
            </ul>
          </div>
        </li>

        <!-- Agency's list -->
        <li class="relative">
          <div @click="showAgency = !showAgency" :class="selectedFilters.agency?'bg-highlight':''" class="flex justify-between py-1 px-3 rounded-lg border border-color font-['roboto']">
            <div class="ml-3 mr-2 font-medium">
              <span v-if="selectedFilters.agency">{{ selectedFilters.agency }}</span>
              <span v-else>All agency</span>
            </div>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <div v-show="showAgency" class="over-y absolute mt-1 z-10 divide-y divide-[#dadce0] w-32 max-h-[100px] dropdown">
            <ul class="py-2 text-sm" @click="showAgency = false">
              <li class="border-b border-color">
                <span class="dropdown-item-filter" @click="selectedFilters.agency = ''">
                  All agency
                </span>
              </li>
              <li v-for="(agency, i) in agencies" :key="i" class="cursor-pointer">
                <span class="dropdown-item-filter" @click="selectedFilters.agency = agency">
                  {{ agency }}
                </span>
              </li>
            </ul>
          </div>
        </li>

        <!-- Validity's list -->
        <li class="relative">
          <div @click="showValidity = !showValidity" :class="selectedFilters.validity?'bg-highlight':''" class="flex justify-between py-1 px-3 rounded-lg border border-color font-['roboto']">
            <div class="ml-3 mr-2 font-medium">
              <span v-if="selectedFilters.validity">{{ selectedFilters.validity }}</span>
              <span v-else>All validity</span>
            </div>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
      
          <div v-show="showValidity" class="over-y absolute mt-1 z-10 divide-y divide-[#dadce0] w-32 max-h-[100px] dropdown">
            <ul class="py-2 text-sm" @click="showValidity = false">
              <li class="border-b border-color">
                <span class="dropdown-item-filter" @click="selectedFilters.validity = ''">
                  All validity
                </span>
              </li>
              <li v-for="(validity, i) in validities" :key="i" class="cursor-pointer">
                <span class="dropdown-item-filter" @click="selectedFilters.validity = validity">
                  {{ validity }}
                </span>
              </li>
            </ul>
          </div>
        </li>

        <!-- Service_type's list -->
        <li class="relative">
          <div @click="showService_type = !showService_type" :class="selectedFilters.service_type?'bg-highlight':''" class="flex justify-between py-1 px-3 rounded-lg border border-color font-['roboto']">
            <div class="ml-3 mr-2 font-medium">
              <span v-if="selectedFilters.service_type">{{ selectedFilters.service_type }}</span>
              <span v-else>All Type</span>
            </div>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
      
          <div v-show="showService_type" class="over-y absolute mt-1 z-10 divide-y divide-[#dadce0] w-32 max-h-[100px] dropdown">
            <ul class="py-2 text-sm" @click="showService_type = false">
              <li class="border-b border-color">
                <span class="dropdown-item-filter" @click="selectedFilters.service_type = ''">
                  All type
                </span>
              </li>
              <li v-for="(service_type, i) in service_types" :key="i" class="cursor-pointer">
                <span class="dropdown-item-filter" @click="selectedFilters.service_type = service_type">
                  {{ service_type }}
                </span>
              </li>
            </ul>
          </div>
        </li>

        <!-- reset -->
        <li @click="reset">
          <button type="button" class="font-medium text-sm hover:text-danger">Clear all</button>
        </li>
      </ul>
    </div>

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
        {{ loading }}
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
import Agencies from '@/Database/Agencies.js'
import Validities from "@/Database/Validities.js"
import Service_types from "@/Database/Service_types.js"

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
      newBalance: 0,

      
      agencies: Agencies,
      validities: Validities,
      service_types: Service_types,
      order_by: ['name', 'created_at'],
      asc_desc: ['asc', 'desc'],
      selectedFilters: {
        by: 'name',
        order: 'asc',
        agency: '',
        validity: '',
        service_type: '',
        no_pagination: true,
      },
      showBy: false,
      showOrder: false,
      showAgency: false,
      showService_type: false,
      showValidity: false,
    }
  },

  mounted() {
    this.getAllUsers()
    this.getAllServices()
    
    this.$watch(
      () => this.selectedFilters,
      this.getAllServices,
      { immediate: true,
        
        deep: true
       }
    )
  },

  methods: {
    getAllUsers() {
      this.$store.dispatch("auth/getAllUsers", {
        no_pagination: true
      })
          .then((res) => {
            if(res) {
              this.users = res.users
            }
          })
    },

    getAllServices() {
      this.errors = null
      this.loading = true
      this.$store.dispatch("services/getAllServices", this.selectedFilters)
          .then((res) => {
            if(res) {
              this.services = res.services
            }
            this.loading = false
          })
          .catch(err => {
            if(err.response) {
              this.services = err.response.data.services
              this.errors = err.response.data.errors
            }
            console.log(err)
          })
          .finally(() => this.loading = false)
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
        this.newBalance = parseFloat(this.selectedUser.balance) + parseFloat(this.selectedService.credit)
      } else {
        this.newBalance = parseFloat(this.selectedUser.balance) - parseFloat(this.selectedService.debit)
        // this.newBalance = this.selectedUser.balance - this.selectedService.price
        if(this.newBalance < 0) {
          this.errors = "The user's balance is insuffisant to buy this service."
          this.canSubmit = false
          this.loading = false
        }
      }
    },

    summaryy() {
      this.loading = !this.loading
      this.errors = null
      document.getElementById('summaryButton').click()
      if(this.selectedUser.role_id == 1) {
        this.errors = "Only client can make purchase. not Admin."
        this.canSubmit = false
      }

      if(this.purchase.by_cash) {
        this.newBalance = parseFloat(this.selectedUser.balance) + parseFloat(this.selectedService.credit)
      } else {
        this.newBalance = parseFloat(this.selectedUser.balance) - parseFloat(this.selectedService.debit)
        // this.newBalance = this.selectedUser.balance - this.selectedService.price
        if(this.newBalance < 0) {
          this.errors = "The user's balance is insuffisant to buy this service."
          this.canSubmit = false
          this.loading = false
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
        
        this.sending = flashAlert
          console.log('res')
          console.log(res)
          document.getElementById('summaryButton').click()
          if(res) { this.message = res.data.message }

          //flashAlert will disappear after 1s
          setTimeout(() => {
            this.message = ''
            this.getAllUsers()
          }, 5000)

          //this.errors = res.response.data.errors
        })
        .catch(err => {
          if(err) {
            this.errors = err.response.data.errors
          }
        

          console.log(err)
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