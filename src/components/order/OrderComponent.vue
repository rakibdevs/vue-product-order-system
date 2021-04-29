<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2">
      <div class="col-10">
        <h5 class="text-left mb-2">My Orders</h5>
      </div>
    </div>
    <div class="row" >
        <div class="col-sm-12">
          <table class="table table-bordered  table-striped " style="width:100%">
              <thead>
                <tr class="text-center">
                  <th>Sl</th>
                  <th>Image</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="(item, index) in orders" :key="item.id">
                      <td>{{index}}</td>
                  </tr>
              </tbody>
          </table>
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
