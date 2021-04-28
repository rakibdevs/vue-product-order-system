
import { createStore, createLogger } from 'vuex';
import product from './product';
import auth from './auth';
import cart from './cart';

const debug = process.env.NODE_ENV !== 'production'

const Store = createStore({
  modules: {
    auth,
    cart,
    product
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default Store;