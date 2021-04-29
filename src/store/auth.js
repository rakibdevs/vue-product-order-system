import { createApp } from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

const app = createApp()
app.use(Vuex)


export default {
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user : JSON.parse(localStorage.getItem('user')),
        role : localStorage.getItem('role') || ''

    },
    mutations: {
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state, user){
            state.status = 'success'
            state.token = user.access_token
            state.user = user
            state.role = user.role
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
            state.token = ''
            state.user = ''
            state.role = ''
        },
    },
    actions: {
        login({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.post(`${process.env.VUE_APP_API_ENDPOINT}login`, user)
                .then(resp => {
                    const token = resp.data.data.access_token
                    const user = resp.data.data
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))
                    localStorage.setItem('role', user.role)
                    // Add the following line:
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    commit('auth_success', user)
                    resolve(resp)
                    if(user.role == 'admin'){
                        router.push({name: 'Products'})
                    }else{
                        router.push({name: 'Home'})
                    }
                })
                .catch(err => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(err)
                })
            })
        },
        register({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.post(`${process.env.VUE_APP_API_ENDPOINT}register`, user)
                .then(resp => {
                    const token = resp.data.data.access_token
                    const user = resp.data.data
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))
                    localStorage.setItem('role', user.role)
                    // Add the following line:
                    axios.defaults.headers.common['Authorization'] = 'bearer' +token;
                    commit('auth_success', user)
                    resolve(resp)
                    router.push({name: 'Products'})
                })
                .catch(err => {
                    commit('auth_error', err)
                    localStorage.removeItem('token')
                    reject(err)
                })
            })
        },
        logout({commit}){
            return new Promise((resolve, reject) => {
                console.log(reject)
                commit('logout')
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                localStorage.removeItem('cart')
                localStorage.setItem('role')
                delete axios.defaults.headers.common['Authorization']
                resolve()
                router.push({name: 'Home'})
            })
        }

    },
    getters : {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        isAdmin: state =>  state.role == 'admin',
        isCustomer: state =>  state.role == 'customer'
    }
}