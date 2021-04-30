<template>
    <div class="container">
        <div class="row" >
            <div class="col-sm-3">
                <div class="card">
                    <div class="card-body">
                        <strong class="mt-3">My Orders:</strong>
                        <p>Tatal Order : <b>{{orders.length}}</b></p>
                        <p>Tatal Amount : <b><sup>$</sup> {{totalAmount}}</b></p>
                    </div>
                </div>
            </div>
            <div class="col-sm-9">
                
                <ul class="m-0 p-0">
                    <li v-for="(item) in orders" :key="item.id" class="flex order-list-item">
                        <span class="percent-40 cursor" @click="getDetails(item.id)" title="CLick to see details">
                            <strong>{{item.order_code}}</strong><br>
                            <span class="tex-muted small text-muted text-italic">Last Update: {{item.updated_at}}</span>

                        </span>
                        <span class="percent-20 small text-muted pt-3">
                            {{item.created_at}}
                        </span>
                        <span class="percent-20 pt-2">
                            <span v-if="item.status == 'Delivered'" class="badge badge-success">Delivered</span>
                            <span v-if="item.status == 'Shipped'" class="badge badge-warning">Shipped</span>
                            <span v-if="item.status == 'Processing'" class="badge badge-danger">Processing</span>
                        </span>
                        <span class="percent-10 text-right pt-2">
                            <sup>$</sup> {{item.amount}}
                        </span>
                        <span class="percent-10 text-center pt-2">
                            <i class="fa fa-eye cursor" @click="getDetails(item.id)" ></i>
                        </span>
                    </li>
                </ul>
            </div>     
        </div>
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
                    <i class="fa fa-circle-o-notch st cursor" :class="{ 'delivery-status-active' : delivery >= 0}" title="Processing"></i>
                    <i class="fa fa-ship st cursor" :class="{ 'delivery-status-active' : delivery >= 1}" title="Shipped"></i>
                    <i class="fa fa-home st cursor" :class="{ 'delivery-status-active' : delivery >= 2}"  title="Delivered"></i>
                </div> 
            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
        return {
            active: false,
            baseUrl: process.env.VUE_APP_API_ENDPOINT
        };
    },
  computed: { 
    ...mapGetters(["orders","order","orderProducts"]),
    cartPrice(){ return this.order.amount}, 
    delivery(){
        if(this.order.status == 'Delivered') return 2;
        else if(this.order.status == 'Shipped') return 1;
        else return 0;
    },
    totalAmount(){
        if (!this.orders) {
            return 0;
        }

        return this.orders.reduce(function (total, v) {
            return total + Number(v.amount);
        }, 0);
    }
  },
  methods: {
    ...mapActions(["myOrders","getOrderProducts"]),
    hideCart(){
        this.active = false;        
    },
    getDetails(id){
      this.getOrderProducts(id);
      this.active  = true;
      console.log(this.orderProducts)

    }
  },
  created() {
    this.myOrders();
  },
};
</script>
