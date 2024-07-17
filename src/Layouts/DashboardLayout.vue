<template>
  <div>
    <Sidebar />
  
    <div class="p-4 sm:ml-52 xl:ml-64 mt-14">
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/Components/Sidebar.vue'
import Footer from '@/Components/Footer.vue'

export default {
  components: {
    Sidebar,
    Footer,
  },
  data() {
    return {
      data:{
        backendData:''
      }
    }
  },
  computed: {
    user() {
      return localStorage.getItem('user')
    },
  },
  mounted() {
    if (!this.user) {
      this.$router.push("/login");
    }
  },
}

</script>


