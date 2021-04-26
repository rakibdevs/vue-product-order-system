import { createApp } from 'vue';
import App from './App.vue';
import Axios from 'axios';
import store       from './store';
import router      from './router';
import VueSweetalert2 from 'vue-sweetalert2';

import 'bootstrap/dist/css/bootstrap.css';
import 'vue3-pagination/dist/vue3-pagination.css';
import 'font-awesome/css/font-awesome.min.css';
import '../node_modules/nprogress/nprogress.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import './assets/css/style.css';

const app = createApp(App);
app.config.globalProperties.$http = Axios;
app.config.globalProperties.$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const token = localStorage.getItem('token')
if (token) {
	app.config.globalProperties.$http.defaults.headers.common['Authorization'] = 'bearer '+token;
}

app.config.devtools = true;
app
.use(router)
.use(store)
.use(VueSweetalert2)
.mount('#app');
