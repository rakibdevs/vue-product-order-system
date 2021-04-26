<template>
    <td>{{ index + 1 }}</td>
    <td class="text-center">
      <img v-if="product.image" loading="lazy" :src="product.image" :alt="product.title" width="50"  >
    </td>
    <td>{{ product.title }}</td>
    <td class="text-center">
      <strong>{{ product.price }}</strong>
    </td>
    <td class="text-center">
      <router-link
        :to="{ name: 'ProductEdit', params: { id: product.id } }"
        class="btn btn-primary btn-sm"
        title="Edit Product"
        >
        <i class="fa fa-pencil"></i></router-link
      >
      <button class="btn btn-sm btn-danger ml-2" @click="deleteProductModal(product.id)" title="Delete Product">
         <i class="fa fa-trash"></i>
      </button>
    </td>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProductDetail",
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
