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

    <div v-if="errorUser">
      <Error :message="errorUser" />
    </div>

    <div v-if="user">
      <div v-if="!user.is_registered && user.role_id == 2">
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
          <p class="text-black-white"><span v-if="user.role_id == 1"> Admin (entreprise) <br /> </span> <span v-else>Client</span> since {{ formatDate(user.created_at) }}</p>
          <div v-if="user.role_id != 1" class="flex items-center mt-4 md:mt-6">
            <router-link :to="{ name: 'user.edit', params: { id: user.id }}" class="btn-base btn-blue">Edit</router-link>
            <router-link :to="{ name: 'user.history', params: { id: user.id }}"  class="btn-base btn-light ms-2" title="see user history">
              History
            </router-link><div @click="toggleModal">
            <ButtonLoading class="btn-base btn-danger-2 ms-2" label="Delete" type="button" :loading="loading" />
          </div>
          </div>
        </div>
      </div>
    </div>
    

    <!-- confirm modal -->
    <ConfirmModal :errors="errorPassword" :sending="sending" @confirm-delete="deleteUser" />
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import Loading from '@/Components/Loading.vue'
import ButtonLoading from '@/Components/ButtonLoading.vue'
import FlashAlert from '@/Components/FlashAlert.vue'
import Warning from '@/Components/Warning.vue'
import Error from '@/Components/Error.vue'
import ConfirmModal from '@/Components/ConfirmModal.vue'

export default {
  components: {
    Breadcrumb,
    Loading,
    ButtonLoading,
    FlashAlert,
    Warning,
    Error,
    ConfirmModal,
  },
  data() {
    return {
      user: null,
      loading: false,
      showMoreAction: false,
      loading: false,
      sending: false,
      point: 0,
      message: '',
      errorPassword: '',
      errorUser: '',
      malus: false,
    }
  },

  mounted() {
    this.getUserById(this.$route.params.id)
  },

  methods: {
    toggleModal() {
      document.getElementById('confirm-button').click()
    },
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
    deleteUser(password) {
      this.errorPassword = ''
      this.errorUser = ''
      this.sending = true
      this.$store
        .dispatch('auth/deleteUser', {
          id: this.$route.params.id,
          password: password
        })
        .then((res) => {
          this.message = res.data.message
          this.toggleModal()
          setTimeout(() => {
            this.message = ''
            this.$router.push({ name: 'users' })
          }, 5000)
        })
        .catch(err => {
          if(err.response) {
            if(err.response.data.password) {
              this.errorPassword = err.response.data.password
            }
            if(err.response.data.error) {
              this.errorUser = err.response.data.error
              this.toggleModal()
            }
          }
        })
        .finally(() => this.sending = false)
    }
  }
}
</script>

<script setup>
import { formatDate } from '@/Composables/formatDate'
import { onMounted } from 'vue'
import {initModals} from 'flowbite'

onMounted(() => {
initModals()
})
</script>