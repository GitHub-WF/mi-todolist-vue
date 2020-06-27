<template>
  <div id="leftlist">
    <!-- 无数据 -->
    <div v-if="newData.length">
      无数据
    </div>
    <!-- 有数据 -->
    <div v-else>
      有数据
    </div>
  </div>
</template>

<script>
export default {
    name: "LeftList",
    data() {
      return {

      };
    },
    props: ['newData'],
    components: {

    },
    methods: {

    },
    computed: {

    },
    watch: {

    },
    created() {

    },
    mounted() {
      console.log(this.newData)
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
