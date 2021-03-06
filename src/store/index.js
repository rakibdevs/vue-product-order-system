
import { createStore, createLogger } from 'vuex';
import product from './product';
import auth from './auth';
import cart from './order';
import createPersistedState from "vuex-persistedstate";

const debug = process.env.NODE_ENV !== 'production'

const Store = createStore({
  modules: {
    auth,
    cart,
    product
  },
  strict: debug,
  plugins: debug ? [createLogger(),createPersistedState()] : [createPersistedState()]
})

export default Store;