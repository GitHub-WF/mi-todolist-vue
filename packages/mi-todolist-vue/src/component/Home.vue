<template>
  <div class="home">
    <div class="top">
      <slot name="middle"></slot>
      <div class="setting" @click="openSetting" v-if="chooseLeft">
        <i class="iconfont icon-more2"></i>
        <transition name="settingmenu">
          <div class="settingmenu" v-if="isOpenSetting">
            <span>宫格模式</span>
            <span>设置</span>
          </div>
        </transition>
      </div>
      <div class="setting" @click="openSetting" v-else>
        <i class="iconfont icon-luomu"></i>
        <transition name="settingmenu">
          <div class="settingmenu" v-if="isOpenSetting">
            <span>宫格模式</span>
            <span>设置</span>
          </div>
        </transition>
      </div>
    </div>
    <div class="scroll">
      <div class="container">
        <slot name="middle"></slot>
        <div v-if="chooseLeft">
          <div class="search"></div>
          <!-- 便签列表 -->
          <LeftList></LeftList>
        </div>
        <div v-else>
          <div class="search"></div>
          <!-- 便签列表 -->
          <RightList></RightList>
        </div>
      </div>
    </div>
    <Add></Add>
  </div>
</template>

<script type="text/ecmascript-6">
  import LeftList from './LeftList'
  import RightList from './RightList'
  import Add from './Add'
  export default {
    name: 'Home',
    data () {
      return {
        isOpenSetting: false, // 是否打开设置列表
      }
    },
    props: ['controlMask', 'showMask', 'chooseLeft'],
    components: {
      LeftList,
      RightList,
      Add
    },
    methods: {
      openSetting () {
        this.isOpenSetting = true // 打开设置列表
        this.controlMask(this.isOpenSetting) // 显示mask
      }
    },
    watch: {
      showMask (newVal) {
        if (!newVal) {
          this.isOpenSetting = newVal // 关闭设置列表
        }
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
 .home
  height 90px
  span
    user-select none // 控制文字选中
  .top
    height 30px
    line-height 30px
    font-size 24px
    font-weight 100
    position relative
    > .middle
      position absolute
      top 50%
      left 50%
      margin-top -15px
      margin-left -47.5px
      font-size 16px
    > .setting
      float right
      height 30px
      line-height 30px
      position relative
      > i
        padding-left 14px
        float right
        font-size 18px
      > .settingmenu
        width 132px
        font-size 14px
        position absolute
        top 40px
        right 0
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
      .settingmenu-enter-active, .settingmenu-leave-active {
        transition: all .3s;
      }
      .settingmenu-enter, .settingmenu-leave-to {
        opacity: 0;
        top: 10px
      }
</style>
