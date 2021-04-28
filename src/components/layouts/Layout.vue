<template>
  <div id="layout" class="bg-light " :class="getRouteName">
    <Header />
    <div class="main-content">
      <div class="container mt-3">
          <router-view />
          <div v-if="isCustomer">
            <cart></cart>
          </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "./Footer";
import Header from "./Header";
import Cart from '../order/CartComponent'
export default {
  name: "Layout",
  props: {
    msg: String,
  },
  components: {
    Header,
    Footer,
    Cart
  },
  computed : {
      isLoggedIn : function(){ 
          return this.$store.getters.isLoggedIn
      },
      isAdmin : function(){ 
          return this.$store.getters.isAdmin
      },
      isCustomer : function(){ 
          return this.$store.getters.isCustomer
      },
      getRouteName() {
        return this.$route.name;
      }
  }
};
</script>
