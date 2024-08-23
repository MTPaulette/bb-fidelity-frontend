<template>
  <div v-if="this.message !=''" class="w-full my-6 mx-0 sm:max-w-sm">
    <FlashAlert :message="this.message" positonRelative />
  </div>
  <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
    <h1 class="mb-1 text-xl font-bold leading-tight tracking-tight md:text-2xl text-black-white">
      Forgot your password?
    </h1>
    <p class="font-light text-gray-500 dark:text-gray-400">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
    
    <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#" @submit.prevent="forgotPassword">
      <div>
        <label for="email" class="label">Your email</label>
        <input v-model="email" id="email" type="email" name="email" class="input" placeholder="" required />
        <p v-if="errors" class="input-error">
          <span v-if="errors">{{ errors }}</span>
        </p>
      </div>
      <ButtonLoading label="Send Reset Link" :loading="loading" />
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
      loading: false,
      errors: null,
      message: '',
    }
  },

  methods: {
    forgotPassword () {
      this.loading = true
      this.errors = null
        this.$store
        .dispatch('auth/forgotPassword', {
          email: this.email,
        })
        .then((res) => {
          console.log('res')
          console.log(res)
          if(res) {
            this.message = res.data.message[0]
          }
        })
        .catch(err => {
          console.log('err')
          console.log(err)
          if(err.response) {
            this.errors = err.response.data.errors[0]
          }
        })
        .finally(() => this.loading = false)
    }
  }
}
</script>