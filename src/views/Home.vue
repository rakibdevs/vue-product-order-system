<template>
  <div class="home">
        <div class="product-background">
            <h1>
                <span style="color: rgb(134 194 60);font-size: 35px;">Our Journey</span> So Far
            </h1>
        </div>
            
      <div class="product-container">
            <product-list-component></product-list-component>
      </div>
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
