<template>
  <div class="greetings bg-accentuate text-red-500">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur accusantium quisquam inventore id laudantium ut autem 
    quia in distinctio blanditiis, quae veniam recusandae repudiandae voluptas exercitationem quod atque numquam illo.
    
    <h3 class="bg-gray-100 p-4">{{ data.backendData }}</h3>
    <div class="my-8 p-4 border border-red-500">
      <!-- userInfo: {{ userInfo }} <br/>
      userData: {{ userData }} -->
      user: {{ user }} <br/>
    </div>

    <div class="my-10">      
      <Modal />
    </div>

    <br>
<button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

<!-- Dropdown menu -->
<div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
      </li>
    </ul>
</div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Modal from '@/Components/Modal.vue'
import {
  initDropdowns
} from 'flowbite'

onMounted(() => {
  initDropdowns();
})
</script>

<script>
export default {
  data() {
    return {
      data:{
        backendData:''
      }
    }
  },
  computed: {
    user() {
      //return this.$store.state.user;
      return localStorage.getItem('user')
    },
  },
  mounted() {
    if (!this.user) {
      this.$router.push("/login");
    }
  },
  methods:{
    getdata(){
      // step 1: get data using base url one way
      // this.axios.get(`${window.baseurl}/user`).then((res)=>{
      //   this.data.backendData = res.data;
      // });

      // step 2: get data using second ways
      this.axios.get(`/user`).then((res)=>{
        this.data.backendData = res.data;
      });
    }
  },
  mounted(){
    this.getdata();
  }
}

</script>


