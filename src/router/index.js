import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Components/Home.vue'
import Login from '../Pages/Authentification/Login.vue'
import Register from '../Pages/Authentification/Register.vue'
import Reset from '../Pages/Authentification/Reset.vue'
import Profile from '../Pages/Dashboard/Profile.vue'
import Users from '../Pages/Dashboard/User/Index.vue'
import User from '../Pages/Dashboard/User/Show.vue'

import Services from '../Pages/Dashboard/Service/Index.vue'
import Service from '../Pages/Dashboard/Service/Show.vue'
import ServiceCreate from '../Pages/Dashboard/Service/Create.vue'
import ServiceEdit from '../Pages/Dashboard/Service/Edit.vue'

import PurchaseCreate from '../Pages/Dashboard/Purchase/Create.vue'

import AuthentificationLayout from '@/Layouts/AuthentificationLayout.vue'
import DashboardLayout from '@/Layouts/DashboardLayout.vue'

import NotFound from '../Pages/NotFound.vue'

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
          name: "user.show",
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
          name: "service.show",
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
          path: "/service/:id/edit",
          name: "service.edit",
          component: ServiceEdit,
          props: true
        },
        {
          path: "/purchase/create",
          name: "purchase.create",
          component: PurchaseCreate,
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
    
    {
      component: AuthentificationLayout,
      children: [
        {
          path: '/:pathMatch(.*)*',
          name: 'notFound',
          component: NotFound
        }
      ]
    },
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
