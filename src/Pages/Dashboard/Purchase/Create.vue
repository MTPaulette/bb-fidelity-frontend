<template>
  <div>
    <div v-if="this.message !=''">
      <FlashAlert :message="this.message" />
    </div>
    <Breadcrumb link1="dashboard" link2="purchase" />
    <div class="ml-3">
      <h1 class="my-6 sm:my-8 title"> New Purchase  </h1>
    </div>

    <div class="w-full px-4 py-5 h-auto border border-color rounded-lg shadow">
      <div class="p-3 mb-4 rounded-lg bg-gray-50 dark:bg-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Check to the right. If the purchase that you find not exist, you can use the left textarea to
          <span class="font-medium text-black-white">add new purchase</span>.
          You can also use the trash icon to delete some purchase.
        </p>
      </div>

      <!-- dark:bg-gray-700  -->
      <form class="relative w-full space-y-4 md:space-y-6" @submit.prevent="newPurchase">
        <div>
          <label for="name" class="label">Name</label>
          <input id="name" v-model="purchase.name" type="text" class="input" required />
          <p v-if="errors" class="input-error">
            <span v-if="errors.name">{{ errors.name[0] }}</span>
          </p>
        </div>
        <div>
          <label for="price" class="label">Price (FCFA)</label>
          <input id="price" v-model="purchase.price" type="price" class="input" required />
          <p v-if="errors" class="input-error">
            <span v-if="errors.price">{{ errors.price[0] }}</span>
          </p>
        </div>
        <div>
          <label for="point" class="label">Bonus Point</label>
          <input id="point" v-model="purchase.point" type="number" class="input" required />
          <p v-if="errors" class="input-error">
            <span v-if="errors.point">{{ errors.point[0] }}</span>
          </p>
        </div>
        <div>
          <label for="validity" class="label">Validity</label>
          <input id="validity" v-model="purchase.validity" type="text" class="input" required />
          <p v-if="errors" class="input-error">
            <span v-if="errors.validity">{{ errors.validity[0] }}</span>
          </p>
        </div>
        <div>
          <label for="purchase" class="label">Description</label>
          <textarea v-model="purchase.description" rows="4" class="text-area mb-4" placeholder="new purchase..." />
          <p v-if="errors" class="input-error">
            <span v-if="errors.description">{{ errors.description[0] }}</span>
          </p>
        </div>
        <ButtonLoading label="Create new purchase" :loading="loading" />
      </form>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/Components/Breadcrumb.vue'
import FlashAlert from '@/Components/FlashAlert.vue'
import ButtonLoading from '@/Components/ButtonLoading.vue'

import Purchase from "@/Models/Purchase.js"

export default {
  components: {
    Breadcrumb,
    FlashAlert,
    ButtonLoading
  },

  computed: {
    user_id() {
      return JSON.parse(localStorage.getItem('user')).id
    },
  },

  data() {
    return {
      // new Purchase(name, price, point, validity, description, user_id)
      purchase: new Purchase('', '5000', '50', '1h', "Ce forfait donne droit a une heure de temps dans l'espace open space.", ''),
      message: '',
      loading: false,
      errors: null,
    }
  },

  methods: {
    newPurchase () {
      this.loading = true
      this.errors = null
      this.purchase.user_id = this.user_id
      
      this.$store
      .dispatch('createPurchase', this.purchase)
      .then((res) => {
        this.message = res.data.message

        //flashAlert will disappear after 1s
        setTimeout(() => {
          this.message = ''
        }, 20000)

        this.errors = res.response.data.errors
        // this.$router.push({ name: 'profile' })
      })
      .catch(err => {
        this.errors = err.response.data.errors
        console.log(err)
      })
      .finally(() => this.loading = false)
    },

  
    newPurchasee () {
      this.loading = true
      this.errors = null
      this.purchase.user_id = this.user_id
      
      this.$store
      .dispatch('createPurchase', {
        name: this.name,
        price: this.price,
        point: this.point,
        validity: this.validity,
        description: this.description,
        user_id: this.user_id
      })
      .then((res) => {
        this.message = res.data.message

        //flashAlert will disappear after 1s
        setTimeout(() => {
          this.message = ''
        }, 20000)

        this.errors = res.response.data.errors
        // this.$router.push({ name: 'profile' })
      })
      .catch(err => {
        this.errors = err.response.data.errors
        console.log(err)
      })
      .finally(() => this.loading = false)
    }
  }
}

</script>
