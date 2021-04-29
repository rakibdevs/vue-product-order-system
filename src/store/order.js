import axios from 'axios'
import router from '../router'


const state = () => ({
    products   : (state) => state.products,
    cart       : JSON.parse(localStorage.getItem('cart'))||[],
    orderCreating  : false,
    orders : [],
    total: 0
})

const getters = {
    products: (state) => state.products,
    cart:     (state) => state.cart,
    orders : (state) => state.orders,
    orderCreating : state => state.orderCreating
};


const actions = {
    addItem(context, product) {
        context.commit("add_item", product);   
    },
    removeItem(context, index) {
        context.commit("remove_item", index);
    },
    placeOrder({commit}, amount){
        return new Promise((resolve, reject) => {
            commit('order_creating', true);
            let data = {};
            data.products = this.state.cart.cart;
            data.amount = amount;
            axios.post(`${process.env.VUE_APP_API_ENDPOINT}orders/store`, data)
            .then(resp => {
                commit('order_creating', true);
                if(resp.data.status == 'success'){
                    localStorage.removeItem('cart')
                    commit('trash_cart', true);
                    router.push({name: 'MyOrders'})
                }
                resolve(resp)

            })
            .catch(err => {
                commit('order_creating', true);
                reject(err)
            })
        })
    },
    myOrders({commit}){
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.VUE_APP_API_ENDPOINT}myorders`)
            .then(resp => {
                console.log(resp.data.data)
                commit('my_orders', resp.data.data)
                resolve(resp)

            })
            .catch(err => {
                commit('order_creating', true);
                reject(err)
            })
        })
    },  
}

// mutations
const mutations = {
    add_item(state, product) {
        localStorage.removeItem('cart')
         if(state.cart.find(data => data.id === product.id)){    
            this.$swal.fire({
                text: "Already exists in the cart",
                icon: "error",
                position: "top-end",
                timer: 1000
            })
        }else{
            let item = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                qty: 1
            }
            state.cart.push(item);
            localStorage.setItem('cart',JSON.stringify(state.cart));      
        }
    },
    remove_item(state, index) {
        state.cart.splice(index, 1);
        localStorage.setItem('cart',JSON.stringify(state.cart));
    },
    order_creating(state, orderCreating) {
        state.orderCreating = orderCreating
    },
    trash_cart(state){
        state.cart = [];
    },
    my_orders(state, orders){
        state.orders = orders;
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}