<template>
  <div>
    <Breadcrumb link1="dashboard" link2="user" />
    <div class="ml-3">
      <h1 class="my-6 sm:my-8 title"> User id {{ id }} Informations </h1>
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
        <p>
          <span class="text-green-500" v-if="user.balance>0"> {{ user.balance }} point(s) </span>
          <span class="text-danger" v-else>{{ user.balance }} point(s)</span>
        </p>
        <p class="text-black-white"><span v-if="user.role_id === 1"> Admin </span> <span v-else>Client</span> depuis le {{ formatDate(user.created_at) }}</p>
        <div class="flex mt-4 md:mt-6">
          <router-link :to="`user/${user.id}/historique`" class="btn-base btn-blue" title="voir historique">
            Historique
          </router-link>
          <a href="#" class="ms-2 btn-base text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Edit Point</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from '@/Composables/formatDate'
</script>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'

export default {
  components: {
    Breadcrumb
  },
  props: {
    id: String,
  },
  data() {
    return {
      user: null
    }
  },

  computed: {
    userrr() {
      return null
    },
  },

  // created() {
  beforeMount() {
    this.getUserById(this.$route.params.id);
  },

  methods: {
    getUserById (id) {
      this.$store
        .dispatch('getUserById', {
          id: id
        })
        .then((res) => {
          this.user = res.data.user
          this.$router.push({ name: 'user', params })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

</script>