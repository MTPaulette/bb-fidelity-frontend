<template>
  <div v-if="user">
    <div v-if="this.message !=''">
      <FlashAlert :message="this.message" />
    </div>
    <Breadcrumb link1="dashboard" link2="profile" />
    <h1 class="ml-3 my-6 sm:my-8 title"> Profile </h1>

    <div class="w-full h-auto">
        <!-- general informations -->
        <div class="mt-4 md:mt-0 w-full px-5 py-5 h-auto rounded-lg shadow-dropdown-light dark:shadow-dropdown-dark">
          <div class="mb-4">
            <h2 class="title"> General Information </h2>
          </div>
          <div class="p-4 mb-8 bg-secondary rounded-lg">
            You have: <span  :class="[user.balance> 0 ? 'text-green-400' : 'text-danger']">{{ user.balance }} point(s)</span>
          </div>
          <form method="PUT" class="flex flex-col justify-between w-full h-auto" @submit.prevent="updateUserInformation">
            <div class="grid gap-2 sm:gap-6 grid-cols-2">
              <div>
                <label for="first_name" class="label">Full name</label>
                <input id="first_name" v-model="name" type="text" class="input" :placeholder="user.name" />
              </div>
              <div>
                <label for="email" class="label">Email address</label>
                <input id="email" disabled aria-label="disabled" type="email" class="input cursor-not-allowed disabled:bg-highlight dark:disabled:opacity-50 disabled:text-white" :placeholder="user.email" />
              </div>
            </div>
            
            <div class="mt-3">
              <ButtonLoading :loading="loading" />
            </div>
          </form>
        </div>

      <!-- password information -->
      <div class="my-4 md:my-5 lg:my-12 md:col-span-2 w-full px-5 py-5 h-auto rounded-lg shadow-dropdown-light dark:shadow-dropdown-dark">
        <h2 class="title mb-4"> Password Information </h2>
        <form method="PUT" class="flex flex-col justify-between w-full h-auto" @submit.prevent="updatePassword">
          <div class="grid gap-2 sm:gap-6 grid-cols-2">
            <div class="col-span-2">
              <label for="current_password" class="label">Current Password</label>
              <input id="current_password" v-model="current_password" type="password" class="input" placeholder="********" required />
              <p v-if="errors" class="input-error">
                <span v-if="errors.current_password">{{ errors.current_password[0] }}</span>
              </p>
            </div> 
          <div class="col-span-2">
            <label for="password" class="label">New Password</label>
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
              <p v-if="errors" class="input-error">
                <span v-if="!errors.password && !errors.current_password">{{ errors }}</span>
              </p>
              <p v-if="errors" class="input-error">
                <span v-if="errors.password">{{ errors.password[0] }}</span>
              </p>
            </div>
          </div>
          </div>

          <!-- <div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> -->
          <div class="my-6 text-base" role="alert">
            <span class="font-medium">Ensure that these requirements are met:</span>
            <ul class="mt-1.5 ml-4 list-disc list-inside text-gray-500 dark:text-gray-400">
              <li>At least 10 characters (and up to 100 characters)</li>
              <li>At least one lowercase character</li>
              <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
            </ul>
          </div>
          <ButtonLoading :loading="loading" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import FlashAlert from '@/Components/FlashAlert.vue'
import ButtonLoading from '@/Components/ButtonLoading.vue'

export default {
  components: {
    Breadcrumb,
    FlashAlert,
    ButtonLoading,
  },
  data () {
    return {
      email: '',
      name: '',
      current_password: '',
      password: '',
      showpassord: false,
      message: '',
      loading: false,
      errors: null
    }
  },
  
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user'))
      //return localStorage.getItem('user')
    },
  },

  methods: {
    updateUserInformation () {
      this.loading = true
      this.$store
        .dispatch('auth/profile', {
          name: this.name
        })
        .then((res) => {
          this.message = res.message
          setTimeout(() => {
            this.message = ''
            location.reload()
          }, 2000)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => this.loading = false)
    },

    updatePassword () {
      this.loading = true
      this.errors = null
      this.$store
        .dispatch('auth/password', {
          current_password: this.current_password,
          password: this.password
        })
        .then((res) => {
          this.message = res.message

          //flashAlert will disappear after 1s
          setTimeout(() => {
            this.message = ''
            location.reload()
          }, 5000)
        })
        .catch(err => {
          console.log(err)
          this.errors = err.response.data.errors
        })
        .finally(() => this.loading = false)
    }
  }
}
</script>



