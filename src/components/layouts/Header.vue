<template>
    <nav class="navbar navbar-expand navbar-light bg-light">
        <div class="d-flex container justify-content-between pl-4 pr-4">
            <router-link to="/" class="navbar-brand">
                <img :src="`/images/weDevs-color-logo.png`" height="35"> | Products
            </router-link>
            <div class="navbar-nav">
                <li class="nav-item" v-if="isAdmin">
                    <router-link  to="/products" class="nav-link">
                        Products 
                    </router-link>
                </li>
                <li class="nav-item" v-if="isAdmin">
                    <router-link to="/products/create" class="nav-link">
                        Add Product
                    </router-link>
                </li>
                <li class="nav-item" v-if="isCustomer">
                    <router-link to="/my-orders/" class="nav-link">
                        Orders
                    </router-link>
                </li>
                <li class="nav-item" v-if="isAdmin">
                    <router-link to="/orders/" class="nav-link">
                        Orders 
                    </router-link>
                </li>
                <li class="nav-item" v-if="!isLoggedIn" >
                    <router-link to="/login" class="nav-link">
                        Login
                    </router-link>
                </li>
                <li class="nav-item" v-if="!isLoggedIn">
                    <router-link to="/register" class="nav-link">
                        Register
                    </router-link>
                </li>
                <li class="nav-item" v-if="isLoggedIn">
                    <router-link to="/logout" class="nav-link">
                        Logout
                    </router-link>
                </li>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Header",
    computed : {
        isLoggedIn : function(){ 
            return this.$store.getters.isLoggedIn
        },
        isAdmin : function(){ 
            return this.$store.getters.isAdmin
        },
        isCustomer : function(){ 
            return this.$store.getters.isCustomer
        }
    }
};
</script>
