<template>
  <div>
    <div v-if="message !=''">
      <FlashAlert :message="message" />
    </div>
    <Breadcrumb link1="dashboard" link2="user" />
    <h1 class="ml-3 my-6 sm:my-8 title"> New User </h1>

    <div class="w-full px-4 py-5 h-auto border border-color rounded-lg shadow">
      <div class="p-3 mb-4 rounded-lg bg-gray-50 dark:bg-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          You have a possibility to register a new user.
          <span class="font-medium text-black-white">Make sure its email is unique or not yet used</span>.
          The user after creating his account to modify his information (except his email) from his profile.
        </p>
      </div>

      <!-- dark:bg-gray-700  -->
      <form class="relative w-full space-y-4 md:space-y-6" @submit.prevent="newUser">
        <div class="grid gap-2 sm:gap-6 grid-cols-2">
        <div>
          <label for="name" class="label">User full name<span class="required">*</span></label>
          <input id="name" v-model="user.name" type="text" class="input" required />
          <p v-if="errors" class="input-error">
            <span v-if="errors.name">{{ errors.name[0] }}</span>
          </p>
        </div>
        <div>
          <label for="email" class="label">User email<span class="required">*</span></label>
          <input id="email" v-model="user.email" type="email" class="input" required />
          <p v-if="errors" class="input-error">
            <span v-if="errors.email">{{ errors.email[0] }}</span>
          </p>
        </div>
        <div>
          <label for="password" class="label">Password<span class="required">*</span></label>
          <div class="w-full relative">
            <input id="password" v-model="user.password" :type="showpassord ? 'text': 'password'" class="input" placeholder="" required />
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
          <p v-if="errors" class="input-error">
            <span v-if="errors.password">{{ errors.password[0] }}</span>
          </p>
        </div>
          
        <div>
          <label for="balance" class="label">User balance</label>
          <input id="credit" v-model="user.balance" type="number" class="input" />
          <p v-if="errors" class="input-error">
            <span v-if="errors.balance">{{ errors.balance[0] }}</span>
          </p>
        </div>

        <!-- is_registered -->
        <div class="col-span-2 flex items-center mt-6">
          <input id="is_registered"  v-model="user.is_registered"  type="checkbox" checked class="w-4 h-4 mr-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 border-color" />
          <label for="is_registered" class="text-black-white">
            Register the user
            <span class="text-primary font-light text-sm">(Check this box to register the user to the bb-fidelity program.)</span>
          </label>
        </div>
        </div>

        <ButtonLoading label="Create new user" :loading="loading" />
      </form>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import FlashAlert from '@/Components/FlashAlert.vue'
import ButtonLoading from '@/Components/ButtonLoading.vue'

import User from '@/Models/User.js'

export default {
  components: {
    Breadcrumb,
    FlashAlert,
    ButtonLoading,
  },

  data() {
    return {
      // new User(name, email, password, balance, is_registered, user_id)
      user: new User('', '', '', '0', '', ''),
      message: '',
      loading: false,
      errors: null,
      showpassord: false,
    }
  },

  methods: {
    newUser () {
      this.loading = true
      this.errors = null
      this.$store
        .dispatch('auth/newUser', this.user)
        .then((res) => {
          this.message = res.data.message

          //flashAlert will disappear after 1s
          setTimeout(() => {
            this.message = ''
            this.$router.push({ name: 'user.show', params: { id: res.data.user_id }})
          }, 5000)
        })
        .catch(err => {
          if(err.response) {
            this.errors = err.response.data.errors
          }
        })
        .finally(() => this.loading = false)
    },
  },
}

</script>
