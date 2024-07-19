<template>
  <div class="post">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
import { getPost } from './api.js'

export default {
  data() {
    return {
      loading: false,
      post: null,
      error: null,
    }
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params.id,
      this.fetchData,
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
  methods: {
    async fetchData(id) {
      this.error = this.post = null
      this.loading = true

      try {
        // replace `getPost` with your data fetching util / API wrapper
        this.post = await getPost(id)
      } catch (err) {
        this.error = err.toString()
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
