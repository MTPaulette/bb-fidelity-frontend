<template>
  <div>
    <div v-if="message !=''">
      <FlashAlert :message="message" />
    </div>

    <Breadcrumb link1="dashboard" link2="service" />
    <h1 class=" ml-3 my-6 sm:my-8 title"> Service {{ $route.params.id }} Informations </h1>

    <div v-if="errors.service">
      <Error :message="errors.service" />
    </div>
    <div v-if="loading">
      <Loading />
    </div>

    <div v-if="service" class="w-full bg-default border border-color rounded-lg shadow">
      <div class="flex flex-col p-6 md:p-12">
        <!-- <img class="w-24 h-24 mb-3 shadow-lg rounded-full" src="./../../../assets/s.png"> -->
        <div>
          <svg class="w-24 h-24 mb-5 rounded-full shadow-lg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5z" />
          </svg>
        </div>

        <div class="mb-4">
          <h5 class="text-2xl uppercase font-bold tracking-tight text-black-white">{{ service.name }}</h5>
          <div class="flex mt-2 text-sm font-thin">
            <div class="pr-4 border-r border-purple-500 flex items-center">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
              </svg>
              <span class="ml-2">{{ service.validity }}</span>
            </div>
            <div class="px-4 border-r border-purple-500 flex items-center">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
              </svg>
              <span class="ml-2">{{ service.service_type }}</span>
            </div>
            <div class="px-4 border-r border-purple-500 flex items-center">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/>
              </svg>
              <span class="ml-2">{{ service.agency }}</span>
            </div>
            <div class="px-4 border-r border-purple-500 flex items-center">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5zm16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z"/>
              </svg>
              <span class="ml-2">{{ service.price }} XAF</span>
            </div>
            <div class="pl-4 flex items-center">
              <UserType :label="service.user_type" />
            </div>
          </div>
        </div>
        <div class="mt-3 mb-5">
          <p>Type: &nbsp;<span class="text-black-white font-medium"> {{ service.service_type }} </span></p>
          <p>Validity: &nbsp;<span class="text-black-white font-medium"> {{ service.validity }} </span></p>
          <p>Price: &nbsp;<span class="text-accentuate"> {{ service.price }} XAF </span></p>
          <p>Credit Point: &nbsp;<span class="text-green-500"> {{ service.credit }} Point(s) </span></p>
          <p>Debit Point: &nbsp;<span class="text-danger"> {{ service.debit }} Point(s) </span></p>
          <p>Agency: &nbsp;<span class="text-black-white font-medium"> {{ service.agency }} </span></p>
          <p>User type: This service is intended for &nbsp;<span class="text-black-white font-medium">{{ service.user_type }} </span> users.</p>
        </div>
        <div>
          Description: <br />
          <p class="mt-1 mb-3 text-secondary text-justify">{{ service.description }}</p>
        </div>
        <p class="mb-3 text-xs font-light">Created at {{ service.created_at }}</p>
        <p class="mb-3 text-xs font-light">Updated at {{ service.updated_at }}</p>
        
        <div class="flex items-center mt-4 md:mt-6">
          <router-link :to="{ name: 'service.edit', params: { id: service.id }}" class="btn-base btn-blue">Edit</router-link>
          <router-link :to="{ name: 'service.users', params: { id: service.id }}" class="btn-base btn-light ms-2"> All Users </router-link>
          <div @click="toggleModal">
            <ButtonLoading class="btn-base btn-danger-2 ms-2" label="Delete" type="button" :loading="loading" />
          </div>
        </div>
      </div>
    </div>

    <!-- confirm modal -->
    <button id="confirm-button" data-modal-target="confirm-modal" data-modal-toggle="confirm-modal" class="sr-only" type="button">Save purchase</button>

    <div id="confirm-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-primary rounded-lg shadow">
          <!-- <button type="button" class="absolute top-3 end-2.5 text-primary hover:text-danger" data-modal-toggle="confirm-modal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
            <span class="sr-only">Close modal</span>
          </button> -->
          <form class="p-4 md:p-5 text-center">
            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <div>
              <h3 class="mb-5 text-lg text-primary">Are you sure you want to delete this service? Please, enter your password</h3>
              <div class="w-full relative">
                <input id="password" v-model="password" :type="showpassord ? 'text': 'password'" class="input" placeholder="" />
                <div class="absolute right-2 top-1/3 text-gray-600 text-sm dark:text-gray-400 hover:text-black dark:hover:text-white">
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
              </div>
              <p v-if="errors" class="input-error mb-5">
                <span v-if="errors.password">{{ errors.password }}</span>
              </p>
            </div>
            <!-- <button data-modal-hide="confirm-modal" type="button" class="btn-base btn-danger">
              Yes, I'm sure
            </button> -->
            <div class="flex w-full justify-center">
              <div @click.stop="deleteService">
                <ButtonLoading :loading="sending" type="button" class="btn-base btn-danger" label="Yes, I'm sure" />
              </div>
              <button data-modal-hide="confirm-modal" type="button" class="btn-base btn-light-2 ms-2">No, cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import FlashAlert from '@/Components/FlashAlert.vue'
import Loading from '@/Components/Loading.vue'
import ButtonLoading from '@/Components/ButtonLoading.vue'
import Error from '@/Components/Error.vue'
import UserType from '@/Components/UserType.vue'


export default {
  components: {
    Breadcrumb,
    FlashAlert,
    Loading,
    ButtonLoading,
    Error,
    UserType,
  },
  data() {
    return {
      service: null,
      message: '',
      password: '',
      showpassord: false,
      loading: false,
      sending: false,
      errors: {
        password: '',
        service: ''
      }
    }
  },

  mounted() {
    this.getServiceById(this.$route.params.id)
  },

  methods: {
    toggleModal() {
      document.getElementById('confirm-button').click()
    },
    getServiceById(id) {
      if(id) {
        this.loading = true
        this.$store
          .dispatch('services/getServiceById', {
            id: id
          })
          .then((res) => {
            if(res) {
              this.service = res.service
            }
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => this.loading = false)
      }
    },
    deleteService() {
      this.errors.password = ''
      this.errors.service = ''
      this.sending = true
      this.$store
        .dispatch('services/deleteService', {
          id: this.$route.params.id,
          password: this.password
        })
        .then((res) => {
          this.message = res.data.message
          this.toggleModal()
          setTimeout(() => {
            this.message = ''
            this.$router.push({ name: 'services' })
          }, 5000)
        })
        .catch(err => {
          if(err.response) {
            if(err.response.data.password) {
              this.errors.password = err.response.data.password
            }
            if(err.response.data.error) {
              this.errors.service = err.response.data.error
              this.toggleModal()
            }
          }
          console.log(err)
        })
        .finally(() => this.sending = false)
    }
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