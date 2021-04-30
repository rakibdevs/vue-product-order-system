<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2">
     
    </div>
    <div class="">
      <div class="row products_grid" v-if="!isLoading">

        <div class="col-sm-4" v-for="(item, index) in productsPaginatedData.data" :key="item.id">
          <product-card :index="index" :product="item" />
        </div>
      </div>

      <div v-if="isLoading" class="text-center mt-5 mb-5">
        Loading Products...
        <div class="spinner-grow" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
       
    </div>
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductCard from "./ProductCardComponent";

export default {
  data() {
    return {
      query: {
        page: 1,
        search: "",
      },
    };
  },
  components: {
    ProductCard,
  },
  computed: { ...mapGetters(["productList", "productsPaginatedData", "isLoading"]) },

  methods: {
    ...mapActions(["fetchAllProducts"]),

    getResults() {
      this.fetchAllProducts(this.query);
    },
    searchProducts() {
      this.fetchAllProducts(this.query);
    },
  },

  created() {
    this.fetchAllProducts(this.query);
  },
};
</script>
