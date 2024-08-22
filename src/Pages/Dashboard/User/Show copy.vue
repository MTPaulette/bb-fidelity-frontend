<template>
  <div>
    <div v-if="message !=''">
      <FlashAlert :message="message" />
    </div>
    <Breadcrumb link1="dashboard" link2="user" />
    <h1 class="ml-3 my-6 sm:my-8 title"> User {{ $route.params.id }} Informations </h1>
    

    <div v-if="loading">
      <Loading />
    </div>

    <div v-if="user">
      <div v-if="!user.is_registered">
        <Warning message="This user is not yet registered with the loyalty program. He can just make cash payment" />
      </div>
      
      <div class="w-full bg-default border border-color rounded-lg shadow">
        <div class="flex flex-col items-center py-10">
          <div>
            <svg class="w-24 h-24 mb-3 rounded-full shadow-lg" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
          </div>
          <h5 class="text-xl font-medium text-black-white">{{ user.name }}</h5>
          <span class="text-sm text-blue-500 my-1">{{ user.email }}</span>
          <div v-if="user.role_id != 1" class="flex items-center">
            <div class="inline-block w-4 h-4 mr-2 rounded-full" :class="[user.balance > 0 ? 'bg-green-400' : 'bg-red-700']" />
            {{ user.balance }} point(s)
          </div>
          <div v-if="user.role_id==2">
            <UserType :label="user.user_type" />
          </div>
          <p class="text-black-white"><span v-if="user.role_id == 1"> Admin (entreprise) <br /> </span> <span v-else>Client</span> depuis le {{ formatDate(user.created_at) }}</p>
          <div v-if="user.role_id != 1" class="flex items-center mt-4 md:mt-6">
            <router-link :to="{ name: 'user.historic', params: { id: user.id }}"  class="btn-base btn-blue" title="voir historique">
              Historique
            </router-link>

            <div class="relative ms-2">
              <button @click="showMoreAction = !showMoreAction" class="inline-flex justify-center items-center btn-base">
                More Action
                <svg aria-hidden="true" class="w-5 h-5 ml-2" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
              </button>
              
              <div v-show="showMoreAction" class="over-y absolute ml-20 z-10 divide-y divide-[#dadce0] w-24 max-h-[100px] dropdown">
                <ul class="py-2 text-sm" @click="showMoreAction = false">
                  <li class="px-4 py-2 item-dropdown rounded-none" @click="toggleBonusModal">Credit</li>
                  <li class="px-4 py-2 item-dropdown rounded-none border-t border-color" @click="toggleMalusModal">Debit</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <!-- more modal -->
    <button id="more-action-button" data-modal-target="more-action-modal" data-modal-toggle="more-action-modal" class="sr-only" type="button">Show modal</button>

    <div id="more-action-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-primary rounded-lg shadow">
          <form class="p-4 md:p-5">
            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <div>
              <h3 class="mb-5 text-lg text-primary text-center">
                Please, enter the value to be 
                  <span v-if="malus">debited</span>
                  <span v-else>credited</span> as well as your password.
              </h3>
              
              <div>
                <label for="credit" class="label font-normal">
                  <span v-if="malus">Debit Point</span>
                  <span v-else>Credit Point</span>
                </label>
                <input id="credit" v-model="point" type="number" class="input" required />
                <p v-if="errors" class="input-error">
                  <span v-if="errors.point">{{ errors.point }}</span>
                </p>
              </div>

              <div class="w-full relative my-3">
                <label for="credit" class="label font-normal">Password</label>
                <input id="password" v-model="password" :type="showpassord ? 'text': 'password'" class="input" placeholder="" />
                <div class="absolute right-2 top-10 text-gray-600 text-sm dark:text-gray-400 hover:text-black dark:hover:text-white">
                  <svg v-if="showpassord" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="currentColor" viewBox="0 0 16 16" @click="showpassord = !showpassord">  
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="currentColor" viewBox="0 0 16 16" @click="showpassord = !showpassord">  
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                </div>
                <p v-if="errors" class="input-error mb-5">
                  <span v-if="errors.password">{{ errors.password }}</span>
                </p>
              </div>
            </div>
            <div class="flex w-full justify-center mt-4">
              <div @click.stop="credit">
                <ButtonLoading :loading="sending" type="button" class="btn-base" :class="malus?'btn-danger':'btn-success-1'" :label="malus?'Debit':'Credit'" />
              </div>
              <button data-modal-hide="more-action-modal" type="button" class="btn-base btn-light-2 ms-2">No, cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from '@/Composables/formatDate'
import { onMounted } from 'vue'
import {
  initModals
} from 'flowbite'

onMounted(() => {
initModals()
})
</script>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import Loading from '@/Components/Loading.vue'
import UserType from '@/Components/UserType.vue'
import ButtonLoading from '@/Components/ButtonLoading.vue'
import FlashAlert from '@/Components/FlashAlert.vue'
import Warning from '@/Components/Warning.vue'


export default {
  components: {
    Breadcrumb,
    Loading,
    UserType,
    ButtonLoading,
    FlashAlert,
    Warning,
  },
  data() {
    return {
      user: null,
      loading: false,
      showMoreAction: false,
      loading: false,
      sending: false,
      point: 0,
      password: '',
      message: '',
      errors: {
        password: '',
        point: ''
      },
      showpassord: false,
      malus: false,
    }
  },

  mounted() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params.id,
      this.getUserById,

      // fetch the data when the view is created and the data is already being observed
      { immediate: true }
    )
  },

  methods: {
    getUserById (id) {
      if(id) {
        this.loading = true
        this.$store
          .dispatch('auth/getUserById', {
            id: id
          })
          .then((res) => {
            if(res) {
              this.user = res.user
            }
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => this.loading = false)
      }
    },
    
    toggleBonusModal() {
      this.malus = false
      document.getElementById('more-action-button').click()
    },
    toggleMalusModal() {
      document.getElementById('more-action-button').click()
      this.malus = true
    },
    credit() {
      this.errors.password = ''
      this.errors.credit = ''
      this.sending = true
      
      this.malus = this.malus,
      this.$store
        .dispatch('auth/updatePoint', {
          malus: this.malus,
          point: this.point,
          id: this.$route.params.id,
          password: this.password
        })
        .then((res) => {
          if(res) { this.message = res.data.message }
          this.toggleBonusModal()
          setTimeout(() => {
            this.message = ''
            location.reload()
          }, 5000)
        })
        .catch(err => {
          if(err.response) {
            if(err.response.data.password) {
              this.errors.password = err.response.data.password
              this.errors.point = err.response.data.point
            }
            if(err.response.data.error) {
              this.errors.point = err.response.data.error
              this.toggleBonusModal()
            }
          }
          console.log(err)
        })
        .finally(() => this.sending = false)
    }
  }
}

</script>