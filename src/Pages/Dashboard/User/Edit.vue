<template>
  <div>
    <!-- <div class="border border-red-500 p-4 m-7"> user: {{ user }}</div> -->
    <div v-if="this.message !=''">
      <FlashAlert :message="this.message" />
    </div>

    <Breadcrumb link1="dashboard" link2="user edit" />
    <h1 class="ml-3 my-6 sm:my-8 title"> Edit User {{ $route.params.id }}  </h1>

    <div v-if="loading">
      <Loading />
    </div>
    <div v-if="user">
      <div v-if="!user.is_registered">
        <Warning message="This user is not yet registered with the loyalty program. He can just make cash payment" />
      </div>

      <div class="w-full px-4 py-5 h-auto border border-color rounded-lg shadow">
        <div class="p-3 mb-4 rounded-lg bg-gray-50 dark:bg-gray-700">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Check to the right. If the user that you find not exist, you can use the left textarea to
            <span class="font-medium text-black-white">add edit user</span>.
            You can also use the trash icon to delete some user.
          </p>
        </div>

        <!-- dark:bg-gray-700  -->
        <form class="relative w-full space-y-4 md:space-y-6" @submit.prevent="updateUser">
          <div>
            <label for="name" class="label">Full name</label>
            <input id="name" disabled aria-label="disabled" type="text" class="input cursor-not-allowed disabled:bg-highlight disabled:text-white" :placeholder="user.name" />
          </div>

          <div>
            <label for="email" class="label">Your email</label>
            <input id="email" disabled aria-label="disabled" type="email" class="input cursor-not-allowed disabled:bg-highlight disabled:text-white" :placeholder="user.email" />
          </div>

          <div>
            <label for="balance" class="label">Your balance</label>
            <input id="balance" disabled aria-label="disabled" type="number" class="input cursor-not-allowed disabled:bg-highlight disabled:text-white" :placeholder="user.balance" />
          </div>

          <div class="grid gap-2 sm:gap-6 grid-cols-2">
            <!-- Action -->
            <div>
              <label for="action" class="label">Action</label>
              <select id="action" v-model="userInfos.malus" name="action" class="input">
                <option value=0>Credit</option>
                <option value=1>Debit</option>
              </select>
              <p v-if="errors" class="input-error">
                <span v-if="errors.malus">{{ errors.malus[0] }}</span>
              </p>
            </div>

            <div>
              <label for="point" class="label">Point to add or remove</label>
              <input id="credit" v-model="userInfos.point" type="number" class="input" :disabled="userInfos.malus == ''" :class="userInfos.malus == ''? 'cursor-not-allowed' : ''" />
              <p v-if="errors" class="input-error">
                <span v-if="errors.point">{{ errors.point[0] }}</span>
              </p>
            </div>

            <!-- user_type -->
            <div>
              <label for="user_type" class="label">Type</label>
              <select id="user_type" v-model="userInfos.user_type" name="user_type" class="input">
                <option v-for="(user_type, i) in user_types" :key="i" :value="user_type">{{ user_type }}</option>
              </select>
              <p v-if="errors" class="input-error">
                <span v-if="errors.user_type">{{ errors.user_type[0] }}</span>
              </p>
            </div>

            <!-- is_registered -->
            <div class="flex items-center mt-6">
              <input id="is_registered" v-model="userInfos.is_registered" type="checkbox" checked class="w-4 h-4 mr-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 border-color" />
              <label for="is_registered">Register the user</label>
            </div>
          </div>
          <ButtonLoading label="Update user" :loading="sending" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import FlashAlert from '@/Components/FlashAlert.vue'
import ButtonLoading from '@/Components/ButtonLoading.vue'
import Loading from '@/Components/Loading.vue'
import Warning from '@/Components/Warning.vue'

import User_types from "@/Database/User_types.js"

export default {
  components: {
    Breadcrumb,
    FlashAlert,
    ButtonLoading,
    Loading,
    Warning
  },

  data() {
    return {
      user_types: User_types,
      user: null,
      message: '',
      loading: false,
      sending: false,
      errors: null,
      userInfos: {
        is_registered: null,
        user_type: null,
        point: 0,
        malus: true,
      }
    }
  },

  mounted() {
    this.getUserById(this.$route.params.id)
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
              this.userInfos.is_registered = this.user.is_registered
              this.userInfos.user_type = this.user.user_type
            }
          })
          .catch(err => {
            console.log('err')
            console.log(err)
            if(err) {
              this.errors = err.response.data.errors
            }
          })
          .finally(() => this.loading = false)
      }
    },

    updateUser () {
      this.sending = true
      this.errors = null
      
      this.$store
      .dispatch('auth/updateUser', {
        id: this.$route.params.id,
        user: this.userInfos
      })
      .then((res) => {
        this.message = res.data.message

        //flashAlert will disappear after 1s
        setTimeout(() => {
          this.message = ''
          this.$router.push({ name: 'user.show', params: { id: this.$route.params.id }})
          //location.reload()
        }, 5000)
      })
      .catch(err => {
        if(err.response) {
          this.errors = err.response.data.errors
        }
      })
      .finally(() => this.sending = false)
    },
  }
}

</script>
