<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2">
      <div class="col-10">
        <h5 class="text-left mb-2">Manage Orders</h5>
      </div>
      <div class="col-2">
        <input
          type="text"
          class="form-control custom-form-control"
          placeholder="Search Orders..."
          @input="searchProducts"
          v-model="query.search"
        />
      </div>
    </div>
    <div class="row" >
        <div class="col-sm-12">
          <table class="table table-bordered  table-striped " style="width:100%">
              <thead>
                <tr class="text-center">
                  <th>Sl</th>
                  <th>Order Code</th>
                  <th>Created</th>
                  <th>Amount</th>
                  <th>Satus</th>
                  <th>Last Updated</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="(item, index) in ordersPaginatedData.data" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td class="text-center" @click="getDetails(item.id)">
                          {{ item.order_code }}
                      </td>
                      <td>{{ item.created_at }}</td>
                      
                      <td class="text-center">
                        <strong><sup>$</sup> {{ item.amount }}</strong>
                      </td>
                      <td class="text-center">
                          <span v-if="item.status == 'Delivered'" class="badge badge-success">Delivered</span>
                            <span v-if="item.status == 'Shipped'" class="badge badge-warning">Shipped</span>
                            <span v-if="item.status == 'Processing'" class="badge badge-danger">Processing</span>
                      </td>
                      <td>{{ item.updated_at }}</td>
                      <td class="text-center">
                        <button class="btn btn-sm btn-danger ml-2" @click="deleteitemModal(item.id)" title="Delete Product">
                           <i class="fa fa-trash"></i>
                        </button>
                      </td>
                  </tr>
              </tbody>
          </table>
    </div>

      <!-- <div v-if="isLoading" class="text-center mt-5 mb-5">
        Loading Products...
        <div class="spinner-grow" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div> -->
    </div>

    <!-- Insert Pagination Part -->
    <!-- <div v-if="ordersPaginatedData !== null" class="vertical-center mt-2 mb-5">
      <v-pagination
        v-model="query.page"
        :pages="ordersPaginatedData.pagination.total_pages"
        :range-size="2"
        active-color="#DCEDFF"
        @update:modelValue="getResults"
      />
    </div> -->

    <order-product :active="active" :products="order_product" :order="order" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import OrderProduct from './OrderProductsComponent';
//import VPagination from "vue3-pagination";

export default {
  data() {
    return {
      active: false,
      order_product: [],
      order: [],
      query: {
        page: 1,
        search: "",
      },
    };
  },
  components: {
    OrderProduct
  },
  computed: { 
    ...mapGetters([
      "order", 
      "ordersPaginatedData", 
      "isLoading",
      "orderProducts"
    ])
  },
  methods: {
    ...mapActions(["fetchOrders","getOrderProducts"]),

    getResults() {
      this.fetchOrders(this.query);
    },
    searchProducts() {
      this.fetchOrders(this.query);
    },
    getDetails(id){
      this.getOrderProducts(id);
      this.active  = 1;
      this.order_product  = [];
      this.order = [];
    }
  },

  created() {
    this.fetchOrders(this.query);
  },
};
</script>
