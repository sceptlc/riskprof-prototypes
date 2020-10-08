import { createApp } from 'vue'
import { store } from './store/store'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

const app = createApp(App);
app.use(store);
app.mount('#app');
