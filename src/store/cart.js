import axios from 'axios';

const state = () => ({
    products: [],
    cart: [],
})

const getters = {
    products: (state) => state.products,
    cart: (state) => state.cart,
};

const actions = {
    addItem(context, id) {
        context.commit("add_item", id);
    },
    removeItem(context, index) {
        context.commit("remove_item", index);
    },

    
}

// mutations
const mutations = {
    add_item(state, id) {
        state.cart.push(id);
    },
    remove_item(state, index) {
        state.cart.splice(index, 1);
    },

}

export default {
    state,
    getters,
    actions,
    mutations
}