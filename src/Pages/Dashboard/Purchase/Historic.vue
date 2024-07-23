<template>
  <div> id: {{ id }}
    <Breadcrumb link1="dashboard" link2="historic" />
    <div v-if="loading">
      <Loading />
    </div>

    <div v-if="errors" class="error">{{ errors }}</div>

    <div class="ml-3">
      <h1 class="my-6 sm:my-8 title" v-if="user"> My Historic </h1>
    </div>

    <section v-if="services" class="px-4 mx-auto max-w-screen-2xl relative overflow-hidden bg-default shadow sm:rounded-lg">
      <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
        <h5 class="space-x-4">
          <span class="text-gray-500">Total purchases:</span>
          <span class="dark:text-white">{{ services.length }}</span>
        </h5>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="text-xs uppercase bg-secondary">
            <!-- <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"> -->
            <tr>
              <th scope="col" class="p-4">
                Transaction Nbr
              </th>
              <th scope="col" class="px-4 py-3">Service</th>
              <th scope="col" class="px-4 py-3">Price</th>
              <th scope="col" class="px-4 py-3">Validity</th>
              <th scope="col" class="px-4 py-3">Pay Mode</th>
              <th scope="col" class="px-4 py-3">Bonus Point</th>
              <th scope="col" class="px-4 py-3">Current Balance</th>
              <th scope="col" class="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="service in services" :key="service.id" class="border-b border-color hover:bg-highlight">
              <th scope="row" class="w-4 px-4 py-3"> {{ service.pivot.id }} </th>
              <td class="px-4 py-2 whitespace-nowrap text-black-white hover:text-accentuate hover:underline"> {{ service.name }} </td>
              <td class="px-4 py-2 whitespace-nowrap text-black-white">{{ service.price }} FCFA</td>
              <td class="px-4 py-2">{{ service.validity }}</td>
              <td class="px-4 py-2 whitespace-nowrap">
                <span v-if="service.pivot.by_cash">By cash</span>
                <span v-else>By using Point</span>
              </td>
              <td class="px-4 py-2 whitespace-nowrap text-black-white">
                <div class="flex items-center">
                  <div class="inline-block w-4 h-4 mr-2 rounded-full" :class="[service.pivot.bonus_point > 0 ? 'bg-green-400' : 'bg-red-700']" />
                  {{ service.pivot.bonus_point }} point(s)
                </div>
              </td>
              <td class="px-4 py-2">{{ service.pivot.user_balance }}</td>
              <td class="px-4 py-2 text-black-white">Just Now</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { formatDate } from '@/Composables/formatDate'
</script>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import Loading from '@/Components/Loading.vue'
import ListPurchase from '@/Components/List/Purchase.vue'

export default {
  components: {
    Breadcrumb,
    Loading,
    ListPurchase
  },
  data() {
    return {
      user: null,
      services: null,
      loading: false,
      errors: null
    }
  },

  created() {
    this.getAllServicesOfUser()
  },

  methods: {
    getAllServicesOfUser () {
      this.id = JSON.parse(localStorage.getItem('user')).id
      this.loading = true
      this.$store
        .dispatch('purchases/getAllServicesOfUser', {
          id: this.id
        })
        .then((res) => {
          this.user = res.data.user
          this.services = res.data.services
        })
        .catch(err => {
          this.errors = err.toString()
          console.log(err)
        })
        .finally(() => this.loading = false)
    }
  }
}

</script>

