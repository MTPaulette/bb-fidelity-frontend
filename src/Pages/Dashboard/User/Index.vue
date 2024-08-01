<template>
  <div>
    <Breadcrumb link1="dashboard" link2="users" />
    <h1 class="ml-3 my-6 sm:my-8 title"> All users </h1>
    <div v-if="loading">
      <Loading />
    </div>
    <div v-if="users">
      <ListUser :users="users" />
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import ListUser from '@/Components/List/User.vue'
import Loading from '@/Components/Loading.vue'

export default {
  components: {
    Breadcrumb,
    ListUser,
    Loading
  },

  data() {
    return {
      loading: false,
      users: null,
    }
  },

  mounted() {
    this.loading = true
    this.$store.dispatch("auth/getAllUsers")
        .then((res) => {
          if(res) {
            this.users = res.users
          }
          this.loading = false
        })
  },
}

</script>

