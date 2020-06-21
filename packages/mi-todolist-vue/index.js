import Vue from 'vue'
import MiTodolistVue from './src/mi-todolist-vue.vue' // 引入主代码
let MiTodolistVueConstructor = Vue.extend(MiTodolistVue) // 生成Vue构造器子类

MiTodolistVue.install = (Vue) => {
  Vue.prototype.$Todolist = class Todolist {
    constructor(options) {
      // 判断el是否是正确选择器
      if (typeof options.el === "string") {
        this.containerNode = document.querySelector(options.el)
        this.parentNode = this.containerNode.parentNode
        if (this.containerNode) {
          // 替换指定容器
          this.component = new MiTodolistVueConstructor({
            propsData: {
              oldData: options.oldData,
              callback: options.callback,
            },
          }).$mount(this.containerNode);
        } else {
          throw Error("未找到指定DOM对象");
        }
      } else {
        throw Error("请传入正确的CSS选择器");
      }
    }
    close() {
      this.component.$destroy()
      this.parentNode.replaceChild(this.containerNode, this.parentNode.firstChild)
    }
  };
}

export default MiTodolistVue;