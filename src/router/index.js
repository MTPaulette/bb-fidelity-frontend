import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

// import Home from '../Components/Home.vue'
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
import Purchases from '../Pages/Dashboard/Purchase/Index.vue'

import Historic from '../Pages/Dashboard/Purchase/Historic.vue'
import User_Services from '../Pages/Dashboard/Purchase/User_services.vue'
import Service_Users from '../Pages/Dashboard/Purchase/Service_users.vue'

import AuthentificationLayout from '@/Layouts/AuthentificationLayout.vue'
import DashboardLayout from '@/Layouts/DashboardLayout.vue'

import Forbidden from '../Pages/Dashboard/Forbidden.vue'
import NotFound from '../Pages/NotFound.vue'


const router = createRouter({
  //history: createWebHistory(),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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

    // user routes
    {
      component: DashboardLayout,
      meta: {
        auth: true,
      },
      children: [
        {
          path: "/forbidden",
          name: "forbidden",
          component: Forbidden,
          props: true
        },
        {
          path: "/profile",
          name: "profile",
          component: Profile,
        },
        {
          path: "/historic",
          name: "historic",
          component: Historic,
          props: true
        },
      ],
    },

    // admin routes
    {
      component: DashboardLayout,
      meta: {
        auth: true,
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
          props: true,
          meta: {
            admin: true,
          },
        },
        {
          path: "/service/:id/edit",
          name: "service.edit",
          component: ServiceEdit,
          props: true
        },
        {
          path: "/purchases",
          name: "purchases",
          component: Purchases,
        },
        {
          path: "/purchase/create",
          name: "purchase.create",
          component: PurchaseCreate,
          props: true,
          meta: {
            admin: true,
          },
        },
        {
          path: "/user/:id/historic",
          name: "user.historic",
          component: User_Services,
          props: true,
          meta: {
            admin: true,
          },
        },
        {
          path: "/service/:id/users",
          name: "service.users",
          component: Service_Users,
          props: true,
          meta: {
            admin: true,
          },
        },
      ],
    },
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
  linkExactActiveClass: 'text-accentuate bg-highlight rounded-lg'
})

router.beforeEach((to, from) => {
  const loggedIn = localStorage.getItem('user')
  
  // if user is already authenticated, redirect login to services page
  if(to.name == 'login' && loggedIn) {
    if(loggedIn.role_id != 1) {
      return { name: 'historic'}
    } else {
      return { name: 'services'}
    }
  }

  if (to.matched.some(record => record.meta.auth) && !loggedIn) {
    return { name: 'login' }
  }
  else {
    // check if the user is authenticated
    if (to.meta.admin) {
      const role_id = JSON.parse(loggedIn).role_id
      if( role_id != 1) {
        return { name: 'forbidden'}
      }
    }
  }
})

// complete the animation of the route progress bar
router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      NProgress.start()
  }
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})


export default router
