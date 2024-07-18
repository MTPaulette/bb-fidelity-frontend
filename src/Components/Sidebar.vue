<template>
  <NavbarDashboard />
  <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 sm:w-52 xl:w-64 h-screen pt-16 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div id="main-sidebar" class="h-full px-3 pb-4 overflow-y-auto bg-secondary">
      <ul class="space-y-2 font-medium h-min-3/4 min-h-[60%] pt-6">

        <!-- users list -->
         <li v-if="user.role_id === 1">
          <router-link
            to="/users" class="-px-4 py-2 item-dropdown"
          >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
            <span class="ml-3">Users</span>
          </router-link>
        </li>

        <!-- profile -->
        <li>
          <router-link
            to="/profile" class="-px-4 py-2 item-dropdown"
          >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
            <span class="ml-3">Profile</span>
          </router-link>
        </li>
        
        <!-- service -->
        <li v-if="user.role_id === 1">
          <button type="button" class="-px-4 py-2 item-dropdown" aria-controls="dropdown-article" data-collapse-toggle="dropdown-article">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
            <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>Services</span>
            <svg sidebar-toggle-item class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
          </button>
          <ul id="dropdown-article" class="hidden py-2 space-y-2">
            <li>
              <router-link
                to="/services" class="pl-11 item-dropdown"
              >
                Services
              </router-link>
            </li>
            <li>
              <router-link
                to="/service/create" class="pl-11 item-dropdown"
              >
                New service
              </router-link>
            </li>
          </ul>
        </li>
                <!-- :class="{'text-accentuate bg-highlight rounded-lg': $page.url.startsWith('/admin/service/create')}" -->

        <!-- logout -->
        <li>
          <button type="button" @click="logout()"
            class="flex items-center w-full p-2 hover:text-danger"
          >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            <span class="ml-3">Deconnexion</span>
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