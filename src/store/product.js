import axios from 'axios';

const state = () => ({
    products                : [],
    productsPaginatedData   : null,
    product                 : null,
    isLoading               : false,
    isCreating              : false,
    createdData             : null,
    isUpdating              : false,
    updatedData             : null,
    isDeleting              : false,
    deletedData             : null
})

const getters = {
    productList             : state => state.products,
    productsPaginatedData   : state => state.productsPaginatedData,
    product                 : state => state.product,
    isLoading               : state => state.isLoading,
    isCreating              : state => state.isCreating,
    isUpdating              : state => state.isUpdating,
    createdData             : state => state.createdData,
    updatedData             : state => state.updatedData,
    isDeleting              : state => state.isDeleting,
    deletedData             : state => state.deletedData
};

const actions = {
    async fetchAllProducts({ commit }, query = null) {
        let page    = (query !== null)?query.page:'',
            search  = (query !== null)?query.search:'',
            baseApi = process.env.VUE_APP_API_ENDPOINT;

        commit('product_loading', true);
        let url = `${baseApi}products/?page=${page}&search=${search}`;

        await axios.get(url)
            .then(res => {
                console.log(res.data)
                const products = res.data;
                commit('setProducts', products);
                const pagination = {
                    total: 2,  
                    per_page: 10, 
                    current_page: 1, 
                    total_pages: 1 
                }
                res.data.pagination = pagination;
                commit('setProductsPaginated', res.data);
                commit('product_loading', false);
            }).catch(err => {
                console.log('error', err);
                commit('product_loading', false);
            });
    },

    async fetchMyProducts({ commit }, query = null) {
        let page    = (query !== null)?query.page:'',
            search  = (query !== null)?query.search:'',
            baseApi = process.env.VUE_APP_API_ENDPOINT;

        commit('product_loading', true);
        let url = (search === '')?(`${baseApi}products/?page=${page}`):(`${baseApi}product/search-my-store?keyword=${search}`);

        await axios.get(url)
            .then(res => {
                const products = res.data.data.data;
                commit('setProducts', products);
                const pagination = {
                    total: res.data.data.total,  
                    per_page: res.data.data.per_page, 
                    current_page: res.data.data.current_page, 
                    total_pages: res.data.data.last_page 
                }
                res.data.data.pagination = pagination;
                commit('setProductsPaginated', res.data.data);
                commit('product_loading', false);
            }).catch(err => {
                console.log('error', err);
                commit('product_loading', false);
            });
    },

    async fetchDetailProduct({ commit }, id) {
        commit('product_loading', true);
        await axios.get(`${process.env.VUE_APP_API_ENDPOINT}products/${id}`)
            .then(res => {
                commit('setProductDetail', res.data.data);
                commit('product_loading', false);
            }).catch(err => {
                console.log('error', err);
                commit('product_loading', false);
            });
    },

    // store image
    async storeProduct({ commit }, product) {
        const data = new FormData();
        if(product.image){
            data.append('image', product.image);
        }
        data.append('description', product.description);
        data.append('title', product.title);
        data.append('price', product.price);
        commit('product_creating', true);
        await axios.post(`${process.env.VUE_APP_API_ENDPOINT}products`, data)
            .then(res => {
                commit('save_new_product', res.data.data);
                commit('product_creating', false);
            }).catch(err => {
                console.log('error', err);
                commit('product_creating', false);
            });
    },

    async updateProduct({ commit }, product) {
        const data = new FormData();
        if(product.image){
            data.append('image', product.image);
        }
        data.append('description', product.description);
        data.append('title', product.title);
        data.append('price', product.price);
        commit('product_updating', true);
        await axios.post(`${process.env.VUE_APP_API_ENDPOINT}products/${product.id}?_method=PUT`, data)
            .then(res => {
                commit('update_product', res.data.data);
                commit('product_updating', false);
            }).catch(err => {
                console.log('error', err);
                commit('product_updating', false);
            });
    },        


    async deleteProduct({ commit }, id) {
        commit('product_deleting', true);
        await axios.delete(`${process.env.VUE_APP_API_ENDPOINT}products/${id}`)
            .then(res => {
                commit('setDeleteProduct', res.data.data.id);
                commit('product_deleting', false);
            }).catch(err => {
                console.log('error', err);
                commit('product_deleting', false);
        });
    },

    updateProductInput({ commit }, e) {
        commit('product_entry', e);
    }
}

// mutations
const mutations = {
    setProducts: (state, products) => {
        state.products = products
    },

    setProductsPaginated: (state, productsPaginatedData) => {
        state.productsPaginatedData = productsPaginatedData
    },

    setProductDetail: (state, product) => {
        state.product = product
    },

    setDeleteProduct: (state, id) => {
        state.productsPaginatedData.data.filter(x => x.id !== id);
    },

    product_entry: (state, e) => {
        let product = state.product;
        product[e.target.name] = e.target.value;
        state.product = product
    },

    save_new_product: (state, product) => {
        state.products.unshift(product)
        state.createdData = product;
    },

    update_product: (state, product) => {
        state.products.unshift(product)
        state.updatedData = product;
    },

    product_loading(state, isLoading) {
        state.isLoading = isLoading
    },

    product_creating(state, isCreating) {
        state.isCreating = isCreating
    },

    product_updating(state, isUpdating) {
        state.isUpdating = isUpdating
    },

    product_deleting(state, isDeleting) {
        state.isDeleting = isDeleting
    },

}

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}