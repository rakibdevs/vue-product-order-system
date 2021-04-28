<template>
    <div class="coupon__product_single">
        <img :src="baseUrl+product.image" :alt="product.title" loading="lazy" class="cp__product_logo"> 
        <h2 >{{ product.title }}</h2> 
        <p data-v-010f70f6="">{{ product.description}}</p> 
        <div class="couopn__pricing_tag">
            <span  class="price">
                <sup data-v-010f70f6="">$</sup> 
                <span >
                    {{ product.price}}
                    <span class="starting__text">/y</span>
                </span>
            </span>
        </div> 
        <button class="btn btn-sm claim__offer_btn" @click="addToCart(product)">Add to Cart</button>
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
  data: function() {
    return {
      baseUrl: process.env.VUE_APP_API_ENDPOINT,
    }
  },
  computed: { 
    ...mapGetters(["isDeleting", "deletedData"]) 
  },
  methods: {
    ...mapActions(["deleteProduct", "fetchAllProducts"]),
    addToCart(id) {
      this.$store.dispatch("addItem", id);
    },
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
