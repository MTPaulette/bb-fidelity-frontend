<template>
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
</template>

<script setup>
import Button from '@/Components/Button.vue'
import { useForm } from '@inertiajs/vue3'
import { ref } from 'vue'

defineProps({
  crediter: Boolean,
  user: Object,
})


const form = useForm({
  delta: 0
})

const update = () => {
  form.put(
    route('user.update', {User: user}),
  )
}

</script>