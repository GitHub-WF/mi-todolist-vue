import Vue from 'vue'
import App from './App.vue'
import MiTodolistVue from '../packages/mi-todolist-vue/index'

Vue.config.productionTip = false

Vue.use(MiTodolistVue);

new Vue({
  render: h => h(App),
}).$mount('#app')
