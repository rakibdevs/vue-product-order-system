<template>
  <div id="layout " class="bg-light">
    <Header />
    <div class="main-content">
      <div class="container mt-3">
            <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "./Footer";
import Header from "./Header";
export default {
  name: "Layout",
  props: {
    msg: String,
  },
  components: {
    Header,
    Footer,
  },
};
</script>
