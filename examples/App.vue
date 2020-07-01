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
  width: 300px;
  height: 600px;
  margin: auto;
  border: 1px solid #000;
}
</style>
