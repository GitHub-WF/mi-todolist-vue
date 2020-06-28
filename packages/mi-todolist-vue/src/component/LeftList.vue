<template>
  <div id="leftlist">
    <!-- 无数据 -->
    <div v-if="newData.length === 0" class="nodata">
      <div>
        <i class="iconfont icon-bsm_bianqian-"></i>
        <span>没有便签</span>
      </div>
    </div>
    <!-- 有数据 -->
    <div v-else class="havedata">
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
      
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #leftlist
    > .nodata
      height 200px
      position relative
      > div
        width 60px
        height 60px
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        display flex
        flex-direction column
        justify-content center
        align-items center
        color #ccc
        > i
          font-size 30px
        > span
          font-size 12px
    > .havedata
      height 200px
</style>
