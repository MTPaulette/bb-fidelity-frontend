import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Components/Home.vue'
import Login from '../Pages/Authentification/Login.vue'
import Register from '../Pages/Authentification/Register.vue'
import Reset from '../Pages/Authentification/Reset.vue'
import Profile from '../Pages/Dashboard/User/Profile.vue'
import Users from '../Pages/Dashboard/User/Index.vue'
import User from '../Pages/Dashboard/User/Show.vue'
import Services from '../Pages/Dashboard/Service/Index.vue'
import Service from '../Pages/Dashboard/Service/Show.vue'
import ServiceCreate from '../Pages/Dashboard/Service/Create.vue'
import Index from '../Pages/Dashboard/Index.vue'
import AuthentificationLayout from '@/Layouts/AuthentificationLayout.vue'
import DashboardLayout from '@/Layouts/DashboardLayout.vue'

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
      path: '',
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
        {
          path: "/dashboard",
          name: "index",
          meta: {
            auth: true
          },
          component: Index,
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
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if(to.name === 'login') {
    if(loggedIn) {
      next('/home')
    }
  }

  if (to.matched.some(record => record.meta.auth) && !loggedIn) {
    next('/login')
    return
  }
  next()
})


export default router
