import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('../Components/Home.vue')
const Login = () => import('../Pages/Authentification/Login.vue')
const Register = () => import('../Pages/Authentification/Register.vue')
const Reset = () => import('../Pages/Authentification/Reset.vue')
const Profile = () => import('../Pages/Dashboard/Profile.vue')
const Users = () => import('../Pages/Dashboard/User/Index.vue')
const User = () => import('../Pages/Dashboard/User/Show.vue')
const Services = () => import('../Pages/Dashboard/Service/Index.vue')
const Service = () => import('../Pages/Dashboard/Service/Show.vue')
const ServiceCreate = () => import('../Pages/Dashboard/Service/Create.vue')
const AuthentificationLayout = () => import('@/Layouts/AuthentificationLayout.vue')
const DashboardLayout = () => import('@/Layouts/DashboardLayout.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      component: AuthentificationLayout,
      children: [
        {
          path: "/register",
          name: "register",
          component: Register,
        },
        {
          path: "/login",
          name: "login",
          component: Login,
        },
        {
          path: "/reset",
          name: "reset",
          component: Reset,
        },
      ],
    },
    {
      component: DashboardLayout,
      meta: {
        auth: true
      },
      children: [
        {
          path: "/profile",
          name: "profile",
          component: Profile,
        },
        {
          path: "/users",
          name: "users",
          component: Users,
        },
        {
          path: "/user/:id",
          name: "user",
          component: User,
          props: true
        },
        {
          path: "/services",
          name: "services",
          component: Services,
        },
        {
          path: "/service/:id",
          name: "service",
          component: Service,
          props: true
        },
        {
          path: "/service/create",
          name: "service.create",
          component: ServiceCreate,
          props: true
        },
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],

  //saved actual position on page before leave it
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },

  //defsult active link style
  linkExactActiveClass: 'text-accentuate bg-highlight'
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  
  // if user is already authenticated, redirect login to services page
  if(to.name === 'login' && loggedIn) {
    next({ name: 'home'})
  }

  // check if the user is authenticated
  if (to.matched.some(record => record.meta.auth) && !loggedIn) {
    next({ name: 'login'})
  }else {
    next()
  }
})


export default router
