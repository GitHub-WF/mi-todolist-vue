# mi-todolist-vue

## 使用方法
import MiTodolistVue from 'mi-todolist-vue'
Vue.use(MiTodolistVue);

## 参数传递
const todolist = new this.$Todolist({
      el: '.containter', // 挂在容器
      oldData: [ // 初始化便签数据，可不传
        {
          title: 111,
          content: '111',
          time: Date.now() + 111,
          id: 1
        },
        {
          title: 222,
          content: '222',
          time: Date.now() + 222,
          id: 2
        },
        {
          title: 333,
          content: '333',
          time: Date.now() + 333,
          id: 3
        },
        {
          title: 444,
          content: '444',
          time: Date.now() + 444,
          id: 4
        },
        {
          title: 555,
          content: '555',
          time: Date.now() + 555,
          id: 5
        }
      ],
      callback: newData // 便签关闭前调用，传回新数据，用于保存到数据库
    })
    function newData(data) {
      console.log(data)
    }
    todolist.close() // 关闭便签