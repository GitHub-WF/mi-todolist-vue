<template>
  <div class='mitodolistvue'>
    <Header></Header>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from './component/Header'
import List from './component/List'
import Add from './component/Add'
  export default {
    name: 'MiTodolistVue',
    data () {
      return {
        newData: []
      }
    },
    props: {
      oldData: {
        type: Array
      },
      callback: {
        type: Function
      }
    },
    components: {
      Header,
      List,
      Add
    },
    mounted () {
      this.newData = this.oldData;
    },
    beforeDestroy () {
      console.log('beforeDestroy')
      this.callback(this.newData)
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
.mitodolistvue
  width 100%
  height 100%
  padding 20px
  box-sizing border-box
</style>
