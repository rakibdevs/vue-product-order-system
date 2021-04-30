<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2">
      <div class="col-10">
        <h5 class="text-left mb-2">Manage Your Products</h5>
      </div>
      <div class="col-2">
        <input
          type="text"
          class="form-control custom-form-control"
          placeholder="Search Products..."
          @input="searchProducts"
          v-model="query.search"
        />
      </div>
    </div>
    <div class="row" v-if="!isLoading">
        <div class="col-sm-12">
          <table class="table table-bordered  table-striped " style="width:100%">
              <thead>
                <tr class="text-center">
                  <th>Sl</th>
                  <th>Image</th>
                  <th>SKU</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="(item, index) in productsPaginatedData.data" :key="item.id">
                      <product-detail :index="index" :product="item" />
                  </tr>
              </tbody>
          </table>
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
import ProductDetail from "./ProductListItemComponent";

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
    ProductDetail,
  },
  computed: { ...mapGetters(["productList", "productsPaginatedData", "isLoading"]) },

  methods: {
    ...mapActions(["fetchMyProducts"]),

    getResults() {
      this.fetchMyProducts(this.query);
    },
    searchProducts() {
      this.fetchMyProducts(this.query);
    },
  },

  created() {
    this.fetchMyProducts(this.query);
  },
};
</script>
