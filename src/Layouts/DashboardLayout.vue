<template>
  <div v-if="user">
    <Sidebar :user="user" />
  
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
      user: null
    }
  },
  beforeMount() {
    this.$store.dispatch("auth/getAuthenticatedUser")
        .then((res) => {
          if(res) {
            this.user = res.user
          }
        })
  },
}

</script>
<style>
.over-x {
  overflow-x: scroll;
}
.over-y {
  overflow-y: scroll;
}

.over-x::-webkit-scrollbar{
  height: 2px;
}

.over-y::-webkit-scrollbar{
  width: 2px;
}

.over-x::-webkit-scrollbar-track,
.over-y::-webkit-scrollbar-track{
  box-shadow: inset 0 0 6px transparent;
}

.over-x::-webkit-scrollbar-thumb,
.over-y::-webkit-scrollbar-thumb{
  outline: 1px solid #C4C4C4;
  background: #C4C4C4;
  border-radius: 8px;
}

</style>


