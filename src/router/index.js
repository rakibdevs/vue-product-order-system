import { createRouter, createWebHistory } from 'vue-router'
import NProgress    from 'nprogress';


import axios from "axios";
import store from '../store';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/auth/Register.vue'),
        meta: {
            disableIfLoggedIn: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/Login.vue'),
        meta: {
            disableIfLoggedIn: true
        }
    },
    {
        path: '/logout',
        name: 'Logout',
        component: {
            beforeRouteEnter() {
                store.commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                router.push('/login')
            }
        },
        meta: {
            disableIfLoggedIn: true
        }
    },
    {
        path: '/products',
        name: 'Products',
        component: () => import('../views/products/ProductList.vue'),
        meta: { 
            isAdmin: true
        }
    },
    {
        path: '/products/create',
        name: 'Product Create',
        component: () => import('../views/products/ProductCreate.vue'),
        meta: { 
            isAdmin: true
        }
    },
    {
        path: '/products/edit/:id',
        name: 'ProductEdit',
        component: () => import('../views/products/ProductEdit.vue'),
        meta: { 
            isAdmin: true
        }
    },
    {
        path: '/my-orders',
        name: 'MyOrders',
        component: () => import('../views/orders/MyOrders.vue'),
        meta: { 
            isCustomer: true
        }
    },
    {
        path: '/orders',
        name: 'Orders',
        component: () => import('../views/orders/Orders.vue'),
        meta: { 
            isAdmin: true
        }
    }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
    
    const token = localStorage.getItem('token')
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn && token != null) {
            next(); return;
        }
        next('/login') 
    }else if(to.matched.some(record => record.meta.isAdmin)){
        if (store.getters.isAdmin && token != null) {
            next(); return;
        }
        router.back();
    }else if(to.matched.some(record => record.meta.isCustomer)){
        if (store.getters.isCustomer && token != null) {
            next(); return;
        }
        router.back();
    }else {
        next() 
    } 
})

// Add a request interceptor
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
},
error => {
    Promise.reject(error)
});


//Add a response interceptor
axios.interceptors.response.use((response) => {
    return response
}, function(error) {
    if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('cart');
        localStorage.removeItem('user')
        localStorage.removeItem('role')
        router.push({ name: 'login' })
    }
    return Promise.reject(error);
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
});

router.afterEach(() => {
  NProgress.done()
});

export default router
