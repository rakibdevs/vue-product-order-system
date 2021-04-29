<template>
    <div class="container">
        <h5 class="text-left mb-2">My Orders</h5>
        <div class="row" >
            <div class="col-sm-3">
                
            </div>
            <div class="col-sm-9">
                <ul>
                    <li v-for="(item) in orders" :key="item.id" class="flex order-list-item">
                        <span class="percent-40">
                            <strong>{{item.order_code}}</strong>

                        </span>
                        <span class="percent-30 small">
                            {{item.created_at}}
                        </span>
                        <span class="percent-20">
                            <span v-if="item.status == 'Delivered'" class="badge badge-success">Delivered</span>
                            <span v-if="item.status == 'Shipped'" class="badge badge-warning">Shipped</span>
                            <span v-if="item.status == 'Processing'" class="badge badge-danger">Processing</span>
                        </span>
                        <span class="percent-10 text-right">
                            <sup>$</sup> {{item.amount}}
                        </span>
                    </li>
                </ul>
            </div>     
        </div>
        
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: { ...mapGetters(["orders"]) },
  methods: {
    ...mapActions(["myOrders"])
  },
  created() {
    this.myOrders();
  },
};
</script>
