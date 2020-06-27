<template>
  <div class='mitodolistvue'>
    <Home :controlMask="controlMask" :showMask="showMask" :chooseLeft="chooseLeft" :newData="newData" @maskDown="maskDown">
      <!-- 插槽 -->
      <template v-slot:middle>
        <div class="middle">
          <div @click="openTrashCan">
            <span :class="{difColor: !chooseLeft}">便签</span>
            <i class="iconfont icon-xiajiantou" :class="{rotate: isRotate, difColor: !chooseLeft}"></i>
            <transition name="trashcan">
              <div class="trashcan" v-if="isOpenTrashCan">
                <span>废纸篓</span>
                <span>新建文件夹</span>
              </div>
            </transition>
          </div>
          <span :class="{difColor: chooseLeft}" @click="chooseLeft = false">待办</span>
        </div>
      </template>
    </Home>
    <transition name="mask" @after-leave="afterMaskLeave">
      <div class="mask" v-show="showMask" ref="mask" @click="controlMask(false)"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Home from './component/Home'
  export default {
    name: 'MiTodolistVue',
    data () {
      return {
        newData: [],
        showMask: false, // 是否显示遮罩
        isOpenTrashCan: false, // 是否打开废纸篓列表
        isRotate: false, // 箭头是否旋转
        chooseLeft: true
      }
    },
    props: ['oldData', 'callback'],
    components: {
      Home
    },
    methods: {
      controlMask (flag) { // flag = true 显示mask，flag = false 隐藏mask
        this.showMask = flag
        if (!flag) {
          this.isOpenTrashCan = flag // 关闭废纸篓列表
          this.isRotate = flag // 旋转箭头
        }
      },
      openTrashCan () {
        // 判断是否选中该项，否则先选中该项
        if (!this.chooseLeft) {
          this.chooseLeft = true
        } else {
          this.isOpenTrashCan = true // 打开废纸篓列表
          this.controlMask(this.isOpenTrashCan) // 显示mask
          this.isRotate = true // 旋转箭头
        }
      },
      maskDown () {
        this.$refs.mask.style.transform = 'translateY(50px)'
      },
      afterMaskLeave () {
        this.$refs.mask.style.transform = ''
      }
    },
    created () {
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
    min-width 180px
    padding 10px
    box-sizing border-box
    position relative
    overflow hidden
    .mask
      width 100%
      height 100%
      position absolute
      top 0
      left 0
      background-color rgba(0,0,0,.1)
      z-index 900
    .mask-enter-active, .mask-leave-active {
      transition: opacity .3s;
    }
    .mask-enter, .mask-leave-to {
      opacity: 0;
    }
    .middle
      height 30px
      line-height 30px
      font-size 24px
      font-weight 100
      .difColor
        color #ccc
      span
        user-select none // 控制文字选中
      > div:nth-child(1)
        float left
        margin-right 15px
        position relative
        > i
          float right
          transition transform .3s
        .rotate
          transform rotateX(180deg)
        > .trashcan
          width 132px
          font-size 14px
          position absolute
          top 40px
          left 0
          z-index 999
          border-radius 10px
          box-shadow 0 0 5px 5px rgba(0,0,0,.1)
          background-color #fff
          overflow hidden
          > span
            display block
            height 20px
            line-height 20px
            padding 5px 10px
            &:active
              background-color rgba(0,0,0,.3)
        .trashcan-enter-active, .trashcan-leave-active {
          transition: all .3s;
        }
        .trashcan-enter, .trashcan-leave-to {
          opacity: 0;
          top: 10px
        }
      > span:nth-child(2)
        float left
</style>
