<template>
  <div class="home">
      <product-list-component></product-list-component>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductListComponent from '../components/products/ProductsComponent.vue';
export default {
  components: { ProductListComponent },
  name: "Home",

  computed: { ...mapGetters(["productsPaginatedData"]) },

  methods: {
    ...mapActions(["fetchAllProducts"]),
  },

  created() {
    this.fetchAllProducts(1);
  },
};
</script>
