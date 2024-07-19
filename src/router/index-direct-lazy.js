import { createRouter, createWebHistory } from 'vue-router'
import AuthentificationLayout from '@/Layouts/AuthentificationLayout.vue'
import DashboardLayout from '@/Layouts/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../Components/Home.vue')
    },
    {
      path: '/login',
      component: AuthentificationLayout,
      children: [
        {
          path: "/register",
          name: "register",
          component: () => import('../Pages/Authentification/Register.vue'),
        },
        {
          path: "/login",
          name: "login",
          component: () => import('../Pages/Authentification/Login.vue'),
        },
        {
          path: "/reset",
          name: "reset",
          component: () => import('../Pages/Authentification/Reset.vue'),
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
          component: () => import('../Pages/Dashboard/Profile.vue'),
        },
        {
          path: "/users",
          name: "users",
          component: () => import('../Pages/Dashboard/User/Index.vue'),
        },
        {
          path: "/user/:id",
          name: "user",
          component: () => import('../Pages/Dashboard/User/Show.vue'),
          props: true
        },
        {
          path: "/services",
          name: "services",
          component: () => import('../Pages/Dashboard/Service/Index.vue'),
        },
        {
          path: "/service/:id",
          name: "service",
          component: () => import('../Pages/Dashboard/Service/Show.vue'),
          props: true
        },
        {
          path: "/service/create",
          name: "service.create",
          component: () => import('../Pages/Dashboard/Service/Create.vue'),
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
