<template>
    <div class="row">
        <div class="col-sm-7 background-auth">
            
        </div>
        <div class="col-sm-5">
            <div class="auth_card">
                <h4>Login</h4>
                <div class="alert alert-danger" v-if="error">
                    <p>There was an error, unable to sign in with those credentials.</p>
                </div>
                <form autocomplete="off" @submit.prevent="loginUser" method="post">
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="user.email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" v-model="user.password" required>
                    </div>
                    <button type="submit" class="btn btn-success">Login</button>
                </form>
            </div>
            
        </div>
        
    </div>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    data(){
      return {
         user:{}
      }
    },
    methods: {
        ...mapActions(["login"]),
        loginUser: function () {
            const { email, password } = this.user;
            this.login({
                email: email,
                password: password
            });
        }
    }
  }
</script>