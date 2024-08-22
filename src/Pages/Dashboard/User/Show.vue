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
            <router-link :to="{ name: 'user.edit', params: { id: user.id }}" class="btn-base btn-blue">Edit</router-link>
            <router-link :to="{ name: 'user.historic', params: { id: user.id }}"  class="btn-base btn-light ms-2" title="voir historique">
              Historique
            </router-link>
          </div>
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
    }
  }
}

</script>