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
                      <td class="text-center cursor" @click="getDetails(item.id)">
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
    <div class="cart" >
        <div class="cart-items flex" :class="{ 'show-items': active } ">
            <div class="percent-70">
                <strong># {{order.order_code}}</strong><br>
                <small class="text-muted">Last Update: {{order.updated_at}}</small>
                <table border="0" width="100%" class="mt-1">
                    <tr class="cart-item"  v-for="(item, index) in orderProducts" :key="index">
                        <td class="percent-20"><img :src="baseUrl+item.image" :alt="item.title" loading="lazy" ></td>
                        <td class="percent-60">{{ item.title}}</td>
                        <td class="percent-20 text-right pr-5 relative">
                            <sup>$</sup> {{ item.unit_price}}
                        </td>
                    </tr>
                </table>
                <div class="flex justify-content-between mt-3">
                    <span class="pl-2 text-muted small cursor" @click="hideCart()">&#8592; Hide</span>
                    <strong class="pr-5"><sup>$</sup> {{cartPrice}}</strong>
                </div>
                
            </div>
            <div class="checkout-second order-step text-center pt-3">
                <p class="text-white">Select Status</p>
                <i class="fa fa-circle-o-notch st cursor" :class="{ 'delivery-status-active' : delivery >= 0}" @click="setStatus(order.id,'Processing')" title="Set status to Processing"></i>
                <i class="fa fa-ship st cursor" :class="{ 'delivery-status-active' : delivery >= 1}" @click="setStatus(order.id,'Shipped')" title="Set status to Shipped"></i>
                <i class="fa fa-home st cursor" :class="{ 'delivery-status-active' : delivery >= 2}" @click="setStatus(order.id,'Delivered')" title="Set status to Delivered"></i>
            </div> 
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//import VPagination from "vue3-pagination";

export default {
    data() {
        return {
            active: false,
            query: {
                page: 1,
                search: "",
            },
            baseUrl: process.env.VUE_APP_API_ENDPOINT
        };
    },
    computed: { 
        ...mapGetters([
          "order", 
          "ordersPaginatedData", 
          "isLoading",
          "orderProducts"
        ]),
        cartPrice(){ return this.order.amount},
        delivery(){
            if(this.order.status == 'Delivered') return 2;
            else if(this.order.status == 'Shipped') return 1;
            else return 0;
        }

    },
    methods: {
    ...mapActions(["fetchOrders","getOrderProducts","setOrderStatus"]),

    getResults() {
      this.fetchOrders(this.query);
    },
    searchProducts() {
      this.fetchOrders(this.query);
    },
    getDetails(id){
      this.getOrderProducts(id);
      this.active  = true;
      console.log(this.orderProducts)

    },
    hideCart(){
        this.active = false;        
    },
    setStatus(id,status){
        let data = {};
        data.id = id;
        data.status = status;
        this.setOrderStatus(data)
    }
  },

  created() {
    this.fetchOrders(this.query);
  },
};
</script>
