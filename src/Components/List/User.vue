<template>
  <div v-if="loading">
    <Loading />
  </div>
  <div v-if="users">
  <div v-if="this.message !=''">
    <FlashAlert :message="this.message" />
  </div>
  <div class="overflow-x-auto relative">
    <div class="block sm:flex sm:justify-between sm:items-center py-3">
      <div class="flex items-center">
        <div class="relative">
          <SearchBar placeholder="Search for users" />
        </div>
        <div>
          <button id="dropdownActionButton" data-dropdown-toggle="dropdownDotsHorizontal" class="inline-flex mt-2 ml-2 text-sm font-medium text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
          </button>
        
          <!-- Dropdown menu -->
          <div id="dropdownDotsHorizontal" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
              </li>
            </ul>
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
            </div>
          </div>
        </div>
      </div>
      <div class="flex mt-5 sm:mt-0">
        <div>
          <Button label="add user" hasicon rounded btn small>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </Button>
        </div>

        <a href="/export/users" class="ml-2">
          <Button label="export" hasicon rounded light small>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
          </Button>
        </a>
      </div>
    </div>


    <table class="w-full text-sm text-left my-5">
      <thead class="text-xs uppercase bg-secondary">
        <tr>
          <th scope="col" class="px-6 py-2.5">
            Name
          </th>
          <th scope="col" class="px-6 py-2.5">
            balance
          </th>
          <th scope="col" class="px-6 py-2.5">
            role
          </th>
          <th scope="col" class="px-6 py-2.5">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" :class="[user.id == recentUserId ? 'border-purple-700 dark:border-purple-400 bg-purple-100 dark:bg-purple-600/30': '']"  class="border-b border-color hover:bg-highlight">
          <th scope="row" class="flex items-center px-6 py-2.5 whitespace-nowrap">
            <div class="pl-3">
              <p class="font-medium text-black-white uppercase">{{ user.name }}</p>
              <p class="font-light font-[roboto]">{{ user.email }}</p>
            </div>  
          </th>
          <td class="px-6 py-2.5 whitespace-nowrap text-black-white">
            <div class="flex items-center">
              <div class="inline-block w-4 h-4 mr-2 rounded-full" :class="[user.balance > 0 ? 'bg-green-400' : 'bg-red-700']" />
              {{ user.balance }} point(s)
            </div>
            <!-- <div v-if="user.balance>0" class="text-green-500 p-2">{{ user.balance }}</div>
            <div v-else class="text-danger p-2">{{ user.balance }}</div> -->
          </td>
          <td class="px-6 py-2.5">
            <div v-if="user.role_id==1">
              Admin (Entreprise)
            </div>
            <div v-else>
              client
            </div>
          </td>
          <td>
          <div class="px-6 py-2.5 flex w-full">
            <div>
              <router-link :to="{ name: 'user.show', params: { id: user.id }}" class="btn-blue btn-extrasmall" title="voir profil client">
                Profile
              </router-link>
            </div>
            
            <div class="mx-2">
              <router-link :to="{ name: 'user.historic', params: { id: user.id }}" class="btn-extrasmall btn-light" title="voir historique">
                Historique
              </router-link>
            </div>
            <!-- <div class="px-6 py-2.5 flex justify-between w-full " v-if="edit != user.id"> -->
            <div @click="editForm(user)" class="mx-2">
              <button class="btn-extrasmall btn-success">
                crediter
              </button>
            </div>

            <div @click="editFormMalus(user)">
              <button class="btn-extrasmall btn-danger">
                debiter
              </button>
            </div>
          </div>
          <div v-if="edit == user.id">
            <form class="relative w-full my-2" @submit.prevent="update(user)">
              <div class="">
                <label for="delta" class="sr-only">bonus</label>
                <input id="delta" type="number" name="delta" v-model="balance" class="input" />
              </div>
              <p v-if="errors" class="input-error">
                <span v-if="errors">{{ errors }}</span>
              </p>
              <button type="submit" class="rounded-lg btn-base btn-blue mt-1 disabled" :disabled="balance<=0">Save</button>
            </form>
          </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  <!-- <div v-if="users">
    <div v-if="users.data.length" class="w-full flex mt-8 mb-12">
      <Pagination :links="users.links" />
    </div>
  </div> -->
</template>

<script>
import FlashAlert from '@/Components/FlashAlert.vue'
import { ref } from 'vue'
import Pagination from '@/Components/PaginationTable.vue'
import Button from '@/Components/Button.vue'
import SearchBar from '@/Components/SearchBar.vue'
import Loading from '@/Components/Loading.vue'


export default {
  components: {
    Pagination,
    FlashAlert,
    SearchBar,
    Loading
  },
  data() {
    return {
      balance: 0,
      malus: false,
      loading: false,
      message: '',
      errors: null,
      users: null,
      recentUserId: null
    }
  },
  setup() {
    const edit = ref(null)
    const malus = ref(false)
    return {
      edit,
      malus
    }
  },

  mounted() {
    this.loading = true
    this.$store.dispatch("auth/getAllUsers")
        .then((res) => {
          this.users = res.users
          this.loading = false
        })
    this.$store.dispatch("auth/getRecentUserId")
        .then((res) => {
          console.log(res)
          this.recentUserId = res.id
          this.loading = false
        })
  },

  methods: {
    editForm (user) {
      this.edit = user.id
    },
    editFormMalus (user) {
      this.edit = user.id
      this.malus = true
    },
    update (user) {
      this.errors = null
      this.malus = this.malus,
      this.$store
        .dispatch('auth/updateBalance', {
          malus: this.malus,
          balance: this.balance,
          id: user.id
        })
        .then((res) => {
          this.message = res.data.message
          this.$router.push({ name: 'users' })
          // location.reload()
        })
        .catch(err => {
          console.log(err)
          this.errors = err.response.data.errors
        })
      this.malus = false
      // this.edit = null
    }
  }
}

</script>