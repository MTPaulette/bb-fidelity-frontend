<template>
  <div>
    <Breadcrumb link1="dashboard" link2="users" />
    <div class="ml-3">
      <h1 class="my-6 sm:my-8 title"> Show informations User id {{ id }} </h1>
    </div>


    <div class="w-full px-3 py-5 h-auto my-border-gray rounded-lg shadow">
      <div class="">
        {{ user }}
      </div>
    </div>
  </div>
</template>

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

  beforeMount() {
    this.showUser(this.$route.params.id);
  },

  methods: {
    showUser (id) {
      this.$store
        .dispatch('showUser', {
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