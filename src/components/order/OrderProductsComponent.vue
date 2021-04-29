<template>
    <div class="cart" >
        <div class="cart-items flex" :class="{ 'show-items': active } ">
            <div class="percent-70">
                <strong>Shopping Cart</strong>
                <table border="0" width="100%" class="mt-1">
                    <tr class="cart-item"  v-for="(item, index) in orderProducts" :key="index">
                        <td class="percent-20"><img :src="baseUrl+item.image" :alt="item.title" loading="lazy" ></td>
                        <td class="percent-60">{{ item.title}}</td>
                        <td class="percent-20 text-right pr-5 relative">
                            <sup>$</sup> 
                        </td>
                    </tr>
                </table>
                <div class="flex justify-content-between mt-3">
                    <span class="pl-2 text-muted small cursor" @click="hideCart()">&#8592; Hide</span>
                    <strong class="pr-5"><sup>$</sup> {{cartPrice}}</strong>
                </div>
                
            </div>
            <div class="checkout-second">
                
            </div> 
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
    name: "OrderProduct",
    props: ['orderProducts','order','active'],
    data:function() {
        return {
            baseUrl: process.env.VUE_APP_API_ENDPOINT
        }
    },
    computed:{
        cartPrice(){ return this.order.amount},
        order_products(){ return this.orderProducts}
    },
    methods: {
        ...mapActions(["updateStatus"]),
        hideCart(){
            //this.active = false;
            
        }
    },
    watch: {
        createdData: function () {
            if (this.createdData !== null && !this.orderCreating) {
                this.$swal.fire({
                    text: "Success, Order has been added.",
                    icon: "success",
                    position: "top-end",
                    timer: 1000,
            });
      }
    },
  },
};
</script>