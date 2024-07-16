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
  </div>
</template>

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


