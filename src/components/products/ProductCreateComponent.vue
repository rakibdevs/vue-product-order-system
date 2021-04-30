<template>
  <div class="container">
        <!-- <form v-on:submit.prevent="onSaveProduct" :validation-schema="schema"> -->
        <Form @submit="onSubmit" :validation-schema="schema">
          <!-- <Form @submit="onSaveProduct" :validation-schema="schema"> -->
          <div class="row">
            <div class="col-6 ">
                <div class="form-group product-image-preview">
                    <div v-if="!temp_image">
                        <img src="/images/select_product.png" class="product-image-display"  />
                        
                    </div>
                    <div class="product-image-display" v-else>
                        <img :src="temp_image" class="product-image-display" />
                        <button @click="removeImage">Remove image</button>
                    </div>
                            
                    <div class="form-group mt-5 text-left">
                        <label>Product Image:</label><br>
                        <input  id="image" name="image" type="file" accept="image/*" @change="onImageChange" >
                    </div>        
                    <ErrorMessage name="image" class="text-danger" />
                </div>
            </div>
            <div class="col-6 ">
                <div class="product-form-card">
                    <h4 class="vue-card-title ">Add Product</h4>
                    <div class="form-group">

                      <label>Product Name:</label>
                      <Field
                        id="title"
                        name="title"
                        type="text"
                        class="form-control"
                        v-model="product.title"
                      />
                      <ErrorMessage name="title" class="text-danger" />
                    </div>
                    <div class="form-group">
                        <label>Categories</label>
                        <select name="category_id" class="form-control" v-model="product.category_id">
                          <option selected="selected">Select Category</option>
                          <option v-for="(category, index) in categories" v-bind:value="category.id" :key="index">
                            {{category.name}}
                          </option>
                        </select>
                      </div>
                    <div class="form-group">

                      <label>Unit Price:</label>
                      <Field
                        name="price"
                        type="number"
                        class="form-control"
                        v-model="product.price"
                      />
                      <ErrorMessage name="price" class="text-danger" />
                    </div>
                    <div class="form-group">

                      <label>Description:</label>
                      <Field
                        name="description"
                        as="textarea"
                        class="form-control"
                        v-model="product.description"
                       />
                      <ErrorMessage name="description" class="text-danger" />
                    </div>
                    
                    <div class="form-group">
                        <router-link to="/products" class="btn btn-secondary mr-2"
                          >Cancel</router-link
                        >
                        <input
                          type="submit"
                          class="btn btn-primary"
                          value="Add Product"
                          v-if="!isCreating"
                        />
                        <button class="btn btn-primary" type="button" disabled v-if="isCreating">
                          <span
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Saving...
                        </button>
                      </div>
                </div>            
            </div>
          </div>
                  
        </Form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  data() {
    return {
      product: {},
      temp_image: ''
    };
  },

  components: {
    Field,
    Form,
    ErrorMessage,
  },
  created: function () {
    this.getCategories();
  },
  computed: { ...mapGetters(["isCreating", "createdData","categories"]) },

  methods: {
    ...mapActions(["storeProduct","getCategories"]),
    onSubmit() {
        const { title, price, category_id, description, image } = this.product;
        this.storeProduct({
            title: title,
            category_id: category_id,
            price: price,
            image: image,
            description: description
        });
    },/*,
    insertImage(){
        document.getElementById("image").click()
    },*/
    onImageChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length){
            this.product.image = '';
            return;
      }
      this.product.image = files[0];
      this.createImage(files[0]);
    },
    createImage(file) {
      this.temp_image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.temp_image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function () {
      this.temp_image = '';
    }
  },

  watch: {
    createdData: function () {
      if (this.createdData !== null && !this.isCreating) {
        this.$swal.fire({
          text: "Success, Product has been added.",
          icon: "success",
          position: "top-end",
          timer: 1000,
        });

        this.$router.push({ name: "Products" });
      }
    },
  },

  setup() {
    // Define a validation schema
    const schema = yup.object({
      title: yup.string().required().min(5),
      price: yup.string().required(),
      description: yup.string().required().min(5),
    });

    return {
      schema
    };
  },
};
</script>
