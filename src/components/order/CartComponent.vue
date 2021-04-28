<template>
    <div class="cart">
        <div class="shopping-cart" @click="active = !active" :aria-pressed="active ? 'true' : 'false'">
            <div class="cart-summary">
                <span>{{ cartCount }} </span> Items
                <p>$ <span>{{cartPrice}}</span></p>
            </div>
            
        </div>
        <div class="cart-items flex" :class="{ 'show-items': active } ">
            <div class="percent-70">
                <strong>Shopping Cart</strong>
                <table border="0" width="100%" class="mt-1">
                    <tr class="cart-item"  v-for="(item, index) in storeCart" :key="index">
                        <td class="percent-20"><img :src="baseUrl+item.image" :alt="item.title" loading="lazy" ></td>
                        <td class="percent-60">{{ item.title}}</td>
                        <td class="percent-20 text-right pr-5 relative">
                            <sup>$</sup> {{ item.price}}

                            <span class="text-red small remove-cart-item" @click="removeItem(index)">X</span>
                        </td>
                    </tr>
                </table>
                <div class="flex justify-content-between mt-3">
                    <span class="pl-2 text-muted small">&#8592; Continue Shopping</span>
                    <strong class="pr-5"><sup>$</sup> {{cartPrice}}</strong>
                </div>
                
            </div>
            <div class="checkout-second">
                <button class="btn btn_checkout pull-right">Checkout</button>
            </div> 
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
    name: "Cart",
    data:function() {
        return {
          baseUrl: process.env.VUE_APP_API_ENDPOINT,
          active: false
        }
      },
    computed: {
        storeCart() {
            return this.$store.getters.cart;
        },
        cartCount() {
            return this.storeCart.length;
        },
        cartPrice(){
            if (!this.storeCart) {
                return 0;
            }

            return this.storeCart.reduce(function (total, v) {
                return total + Number(v.price);
            }, 0);
        }
    },
    methods: {
        ...mapActions(["removeItem"])
    }
};
</script>