import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Components/Home.vue'
import Login from '../Pages/Authentification/login.vue'
import Register from '../Pages/Authentification/register.vue'
import Profile from '../Pages/Dashboard/User/Profile.vue'
import Users from '../Pages/Dashboard/User/List.vue'
import Services from '../Pages/Dashboard/Service/List.vue'
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
          beforeEnter: alreadyLogged,
        },
      ],
    },
    {
      path: '',
      component: DashboardLayout,
      children: [
        {
          path: "/profile",
          name: "profile",
          meta: {
            auth: true
          },
          component: Profile,
        },
        {
          path: "/user",
          name: "users",
          component: Users,
        },
        {
          path: "/service",
          name: "services",
          component: Services,
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

  if (to.matched.some(record => record.meta.auth) && !loggedIn) {
    next('/login')
    return
  }
  next()
})


export default router
