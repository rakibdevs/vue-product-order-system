<template>
    <div class="wedevs_product_grid_wrapper">
        <div class="wedevs_product_grid">
            <a href="" class="" >
                <img class="fit-image" loading="lazy" :src="product.image" :alt="product.title" width="150" >
            </a> 
            <p> {{ product.description}}</p> 
            <span class="product_price"> $ {{ product.price}}</span> 
            <a href="" :title="`See about ${ product.title }`" class="text-wpuf"> See more →
            </a>
            <button class="btn btn-sm btn-danger" @click="addToCart(product.id)">Add to Cart</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },

  computed: { ...mapGetters(["isDeleting", "deletedData"]) },

  methods: {
    ...mapActions(["deleteProduct", "fetchAllProducts"]),
    deleteProductModal(id) {
      this.$swal
        .fire({
          text: "Are you sure to delete the product ?",
          icon: "error",
          cancelButtonText: "Cancel",
          confirmButtonText: "Yes, Confirm Delete",
          showCancelButton: true,
        })
        .then((result) => {
          if (result["isConfirmed"]) {
            // Put delete logic
            this.deleteProduct(id);
            this.fetchAllProducts({
              page: 1,
              search: ''
            });
            this.$swal.fire({
              text: "Success, Product has been deleted.",
              icon: "success",
              position: 'top-end',
              timer: 1000,
            });
          }
        });
    },
  },
};
</script>
