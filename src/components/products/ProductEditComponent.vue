<template>
    <div class="container">
        <Form @submit="onSubmit" :validation-schema="schema">
            <div v-if="isLoading">
                <div class="text-center">
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  <br />
                  Fetching product
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group product-image-preview">
                        <div v-if="!temp_image && product !== null && !isLoading">

                            <img v-if="product.image" :src="baseUrl+product.image" class="product-image-display"  />
                            <img  src="/images/select_product.png" class="product-image-display" v-else />
                            
                        </div>
                        <div class="product-image-display" v-else>
                            <img :src="temp_image" class="product-image-display" />
                        </div>

                        <!-- <div class="form-group mt-5 text-left">
                            <label>Product Image:</label><br>
                            <input  id="image" name="image" type="file" accept="image/*" @change="onImageChange" >
                        </div>
                                  -->       
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="product-form-card">
                        <h4 class="vue-card-title ">Add Product</h4>
                        <div v-if="product !== null && !isLoading">
                            <input type="hidden" name="prev_image_src" :value="product.image" >
                            <input type="hidden" name="id" :value="product.id">
                            <div class="form-group">
                                <label>Product Name:</label>
                                <Field
                                  id="title"
                                  name="title"
                                  type="text"
                                  class="form-control"
                                  :value="product.title"
                                  @input="updateProductInputAction"
                                />
                                <ErrorMessage name="title" class="text-danger" />
                              </div>
                              <div class="form-group">
                                <label>Categories</label>
                                <select name="category_id" class="form-control" v-model="product.category_id">
                                  <option>Select Category</option>
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
                                  :value="product.price"
                                  @input="updateProductInputAction"
                                />
                                <ErrorMessage name="price" class="text-danger" />
                              </div>
                            <div class="form-group">
                                <label>Description:</label>
                                <Field
                                  name="description"
                                  as="textarea"
                                  class="form-control"
                                  :value="product.description"
                                  @input="updateProductInputAction"
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
                                value="Update"
                                v-if="!isUpdating"
                              />
                              <button class="btn btn-primary" type="button" disabled v-if="isUpdating">
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
      id: null,
      temp_image: null,
      baseUrl: process.env.VUE_APP_API_ENDPOINT,
    };
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },

  created: function () {
    this.id = this.$route.params.id;
    this.fetchDetailProduct(this.id);
    this.getCategories();
    
  },

  computed: { ...mapGetters(["isUpdating", "updatedData", "product", "isLoading","categories"]) },

  methods: {
    ...mapActions(["updateProduct", "updateProductInput", "fetchDetailProduct","getCategories"]),
    onSubmit() {
      const { id, title, category_id, price, description, image, prev_image_src } = this.product;

        this.updateProduct({
            id: id,
            category_id:category_id,
            title: title,
            price: price,
            image: image,
            description: description,
            prev_image_src : prev_image_src
        });
    },
    updateProductInputAction(e) {
      this.updateProductInput(e);
    },
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
    updatedData: function () {
      if (this.updatedData !== null && !this.isUpdating) {
        this.$swal.fire({
          text: "Success, Product has been updated successfully !",
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
      schema,
    };
  },
};
</script>
