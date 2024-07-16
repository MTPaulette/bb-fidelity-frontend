<template>
  <NavbarDashboard />
  <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 sm:w-52 xl:w-64 h-screen pt-16 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <!-- <div id="main-sidebar" class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-black"> -->
    <div id="main-sidebar" class="h-full px-3 pb-4 overflow-y-auto bg-secondary">
      <ul class="space-y-2 font-medium h-min-3/4 min-h-[60%] pt-6">
        <li v-if="user.role_id === 1">
          <router-link
            to="/room" class="flex items-center w-full p-2 hover:text-accentuate"
          >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            <span class="ml-3">room</span>
          </router-link>
        </li>
        <li v-if="user.role_id === 1">
          <router-link
            to="/category" class="flex items-center w-full p-2 hover:text-accentuate"
          >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            <span class="ml-3">category</span>
          </router-link>
        </li>
        <!-- <li v-if="user.role_id === 1">
          <button type="button" class="flex items-center w-full p-2 hover:text-accentuate" aria-controls="dropdown-add" data-collapse-toggle="dropdown-add">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd" />
            </svg>
            <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Add</span>
            <svg sidebar-toggle-item class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <ul id="dropdown-add" class="hidden py-2 space-y-2">
            <li>
              <router-link
                to="/room"
                class="sidebar-item-dropdown"
              >
              Room
              </router-link>
            </li>
            <li>
              <router-link
                to="/category"
                class="sidebar-item-dropdown"
              >
              Category
              </router-link>
            </li>
          </ul>
        </li> -->

        <!-- profile -->
        <!-- <li v-if="user.role_id === 1">
          <button type="button" class="flex items-center w-full p-2 hover:text-accentuate" aria-controls="dropdown-user" data-collapse-toggle="dropdown-user">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
            <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Users</span>
            <svg sidebar-toggle-item class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <ul id="dropdown-user" class="hidden py-2 space-y-2">
            <li>
              <router-link
                to="/user"
                class="sidebar-item-dropdown"
              >
              User List
              </router-link>
            </li>
            <li>
              <router-link
                to="/profile"
                class="sidebar-item-dropdown"
              >
              Profile
              </router-link>
            </li>
          </ul>
        </li>
         -->
        <li v-if="user.role_id === 1">
          <router-link
            to="/users" class="flex items-center w-full p-2 hover:text-accentuate"
          >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
            <span class="ml-3">User list</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/profile" class="flex items-center w-full p-2 hover:text-accentuate"
          >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
            <span class="ml-3">Profile</span>
          </router-link>
        </li>
      
        
        <!-- service -->
         
        <li v-if="user.role_id === 1">
          <router-link
            to="/services" class="flex items-center w-full p-2 hover:text-accentuate"
          >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
            <span class="ml-3">Service List</span>
          </router-link>
        </li>
        <li>
          <button type="button" @click="logout()"
            class="flex items-center w-full p-2 hover:text-accentuate"
          >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            <span class="ml-3">Logout</span>
          </button>
        </li>
      
      </ul>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'
import NavbarDashboard from '@/Components/NavBar.vue'

export default {
  components: {
    NavbarDashboard,
  },
  computed: {
    ...mapGetters([
      'isLogged'
    ]),
    user() {
      return JSON.parse(localStorage.getItem('user')).user
    },
  },

  methods: {
    logout () {
      this.$store
        .dispatch('logout')
        .then(() => {
          this.$router.push({ name: 'login' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>




<style scoped>
#main-sidebar::-webkit-scrollbar{
  width: 5px;
}

#main-sidebar::-webkit-scrollbar-track{
  box-shadow: inset 0 0 6px #FFF;
}

#main-sidebar::-webkit-scrollbar-thumb{
  outline: 1px solid #C4C4C4;
  background: #C4C4C4;
  border-radius: 8px;
}
</style>