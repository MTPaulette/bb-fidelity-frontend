<template>
  <div>
      <div>
        service: {{ id }}
      </div>
      <br>
      <div>
        service: {{ service.id }}
      </div>

      <br />
      <div>
        data: {{ this.$data }}
      </div>
      <!-- <div v-if="service.id">id {{ service.id }}</div> -->
  </div>
</template>

<script setup>
import { formatDate } from '@/Composables/formatDate'
</script>

<script>
import { ref } from 'vue'
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
      service: null
    }
  },
  computed: {
    servicee() {
      return 'null'
    },
  },

  
  setup() {
    const servicee = ref(null)
    return servicee
  },
  // created() {
  //   this.$router.onReady(() => {
  //     if(this.$route.name === "services") {
  //       // if(this.$route.name === `service/${this.$route.params.id}`) {
  //       console.log('ppppppppppppppppppprrrrrrrrrrrrreeeeeeeeeeetttttttttttttt')
  //     }
  //   })
  // },

  // created() {
  // beforeMount() {
  mounted() {
    this.getServiceById(this.id);
    // this.getServiceById(this.$route.params.id);
  },

  methods: {
    getServiceById (id) {
      this.$store
        .dispatch('getServiceById', {
          id: id
        })
        .then((resp) => {
          this.service = resp.data.service

          // this.$router.push({ name: 'service', params })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

</script>
