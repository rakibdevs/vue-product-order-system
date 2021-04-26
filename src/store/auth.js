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
        user : localStorage.getItem('user') || {}
    },
    mutations: {
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state, user){
            state.status = 'success'
            state.token = user.access_token
            state.user = user
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
            state.token = ''
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
                    localStorage.setItem('user', user)
                    // Add the following line:
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    commit('auth_success', user)
                    resolve(resp)
                    router.push({name: 'Products'})
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
                    localStorage.setItem('user', user)
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
                delete axios.defaults.headers.common['Authorization']
                resolve()
                router.push({name: 'Home'})
            })
        }

    },
    getters : {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        isAdmin: state => state.user.role == 'admin' ,
        isCustomer: state => state.user.role == 'customer'
    }
}