<template>
  <div v-if="this.message !=''" class="w-full my-6 mx-0 sm:max-w-sm">
    <FlashAlert :message="this.message" positonRelative />
  </div>
  <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
    <h1 class="mb-1 text-xl font-bold leading-tight tracking-tight md:text-2xl text-black-white">
      Reset Password
    </h1>
    <p class="font-light text-gray-500 dark:text-gray-400">Your password is now rese. Please enter the new password.</p>
    <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#" @submit.prevent="resetPassword">
      <div>
        <label for="email" class="label">Your email</label>
        <input v-model="email" id="email" type="email" name="email" class="input" placeholder="" required />
        <p v-if="errors" class="input-error">
          <span v-if="errors">{{ errors[0] }}</span>
        </p>
      </div>

      <div>
        <label for="password" class="label">Password</label>
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
        <p v-if="errors" class="input-error">
          <span v-if="errors.password">{{ errors.password[0] }}</span>
        </p>
      </div>
      <ButtonLoading label="Save new password" :loading="loading" />
      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account? <a href="/login" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</a>
      </p>
    </form>
  </div>
</template>

<script>
import ButtonLoading from '@/Components/ButtonLoading.vue'
import FlashAlert from '@/Components/FlashAlert.vue'

export default {
  components: {
    ButtonLoading,
    FlashAlert,
  },
  data () {
    return {
      email: '',
      password: '',
      loading: false,
      showpassord: false,
      errors: null,
      message: '',
    }
  },

  methods: {
    resetPassword () {
      this.loading = true
      this.errors = null
        this.$store
        .dispatch('auth/resetPassword', {
          token: this.$route.query.token,
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if(res) {
            this.message = res.data.message[0]
            //flashAlert will disappear after 1s
            setTimeout(() => {
              this.message = ''
              this.$router.push({ name: 'login',})
            }, 5000)
          }
        })
        .catch(err => {
          if(err.response) {
            this.errors = err.response.data.errors
          }
        })
        .finally(() => this.loading = false)
    }
  }
}
</script>