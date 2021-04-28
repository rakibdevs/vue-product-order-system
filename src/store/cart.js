const state = () => ({
    products: (state) => state.products,
    cart: JSON.parse(localStorage.getItem('cart'))||[]
})

const getters = {
    products: (state) => state.products,
    cart: (state) => state.cart,
    total: state => {
        if(state.cart.length > 0) {
            return state.cart.map(item => item.price).reduce((total, amount) => total + amount);
        } else {
            return 0;
        }
    }
};


const actions = {
    addItem(context, product) {
            context.commit("add_item", product);
        
    },
    removeItem(context, index) {
        context.commit("remove_item", index);
    },
    totalAmount () {
        return this.$store.getters.total
    }

    
}

// mutations
const mutations = {
    add_item(state, product) {
         if(state.cart.find(data => data.id === product.id)){     
            alert('ALready exists in the cart')
        }else{
            let item = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                qty: 1
            }
            state.cart.push(item);
            //localStorage.removeItem('cart')
            localStorage.setItem('cart',JSON.stringify(state.cart));
            
        }
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