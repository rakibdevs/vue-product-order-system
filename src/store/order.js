import axios from 'axios'
import router from '../router'


const state = () => ({
    products   : (state) => state.products,
    cart       : JSON.parse(localStorage.getItem('cart'))||[],
    orderCreating  : false,
    orders : [],
    total: 0,
    ordersPaginatedData   : [],
    orderProducts: [],
    order: []
})

const getters = {
    products: (state) => state.products,
    cart:     (state) => state.cart,
    orders : (state) => state.orders,
    orderCreating : state => state.orderCreating,
    orderList             : state => state.orders,
    ordersPaginatedData   : state => state.ordersPaginatedData,
    order : state => state.order,
    orderProducts : state => state.orderProducts
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
                commit('my_orders', resp.data.data)
                resolve(resp)

            })
            .catch(err => {
                commit('order_creating', true);
                reject(err)
            })
        })
    },  
    fetchOrders({commit}, query = null){
        let page    = (query !== null)?query.page:'';

        axios.get(`${process.env.VUE_APP_API_ENDPOINT}orders/?page=${page}`)
        .then(resp => {
            const orders = resp.data.data;
            commit('set_orders', orders);
            const pagination = {
                total: 2,  
                per_page: 10, 
                current_page:1, 
                total_pages: 1 
            }
            resp.data.pagination = pagination;
            
            commit('set_order_paginated', resp.data);
        }).catch(err => {
            console.log('error', err);
        });
    },
    getOrderProducts({commit}, id){
        axios.get(`${process.env.VUE_APP_API_ENDPOINT}orders/${id}`)
        .then(resp => {
            const order = resp.data.data;
            commit('set_orders_poducts', order);
        }).catch(err => {
            console.log('error', err);
        });
    },
    setOrderStatus({commit}, data){
        
        console.log(data);
        axios.post(`${process.env.VUE_APP_API_ENDPOINT}orders/${data.id}/update`,data)
        .then(resp => {
            commit('set_orders_status', data);
            console.log(resp)
        }).catch(err => {
            console.log('error', err);
        });
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
    },
    set_orders(state, orders){
        state.orders = orders;
    },
    set_order_paginated(state, paginatedData){
        state.ordersPaginatedData = paginatedData;
    },
    set_orders_poducts(state, order){
        state.order = order.order
        state.orderProducts = order.products
    },
    set_orders_status(state,data){
        state.order.status = data.status;
        let items = state.orders;
        console.log(state.orderProducts)
        items.forEach((element, index) => {
            if(element.id === data.id) {
                items[index].status = data.status;
            }
        });
        state.orders = items
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}