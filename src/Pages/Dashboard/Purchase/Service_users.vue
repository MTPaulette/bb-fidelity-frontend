<template>
  <div>
    <Breadcrumb link1="dashboard" link2="service_users" />
    <div v-if="loading">
      <Loading />
    </div>

    <div v-if="errors" class="my-32 text-2xl md:text-3xl font-light leading-tight tracking-tight text-primary text-center">{{ errors }}</div>

    <div v-if="users">
      <h1 class="ml-3 my-6 sm:my-8 title"> {{ users[0].service_name }} Historic </h1>
      <ListUser :users="users" />
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import Loading from '@/Components/Loading.vue'
import ListUser from '@/Components/List/User.vue'

export default {
  components: {
    Breadcrumb,
    Loading,
    ListUser
  },
  data() {
    return {
      users: null,
      loading: false,
      errors: null
    }
  },

  mounted() {
    this.getAllUsersOfService(this.$route.params.id)
  },

  methods: {
    getAllUsersOfService (id) {
      if(id) {
      this.loading = true
      this.$store
        .dispatch('purchases/getAllUsersOfService', {
          id: id
        })
        .then((res) => {
          this.users = res.data.users
        })
        .catch(err => {
          if(err.response) {
            this.errors = err.response.data.errors
          }
          console.log(err)
        })
        .finally(() => this.loading = false)
      }
    }
  }
}

</script>

