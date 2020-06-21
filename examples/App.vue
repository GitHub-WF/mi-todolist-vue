<template>
  <div id="app">
    <div class="containter"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    const todolist = new this.$Todolist({
      el: '.containter',
      oldData: [
        {
          name: 111,
          content: '111'
        },
        {
          name: 222,
          content: '222'
        }
      ],
      callback: newData
    })
    function newData(data) {
      console.log(data)
    }
    // todolist.close()
  }
}
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
}
#app{
  width: 400px;
  height: 800px;
  margin: auto;
  border: 1px solid #000;
}
</style>
