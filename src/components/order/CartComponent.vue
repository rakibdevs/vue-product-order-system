<template>
    <div class="cart">
        <div class="shopping-cart" @click="showCart()">
            <div class="cart-summary">
                <span>{{ cartCount }} </span> Items
                <p>$ <span>{{cartPrice}}</span></p>
            </div>
            
        </div>
        <div class="cart-items">
            <li v-for="(item, index) in storeCart" :key="index">
                <img :src="baseUrl+item.image" :alt="item.title" loading="lazy" > {{ item.title}}
            </li>
        </div>
    </div>
</template>
<script>
export default {
    name: "Cart",
    data:function() {
        return {
          baseUrl: process.env.VUE_APP_API_ENDPOINT,
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
        removeItem(index) {
            this.$store.dispatch("removeItem", index);
        },
        showCart() {
            let modal = document.getElementById("shoppingList");
            let btn = document.getElementById("show");
            btn.onclick = function() {
                modal.style.display = "block";
            };
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
        }
    }
};
</script>