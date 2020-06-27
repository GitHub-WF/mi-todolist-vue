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
        <div :class="{transup: isUp}" v-if="chooseLeft">
          <div class="search">
            <div>
              <i class="iconfont icon-fangdajing"></i>
              <input type="text" placeholder="搜索便签" @focus="inSearch" @blur="outSearch"  :class="{indent: isUp}">
              <span :class="{disleft: isUp}">取消</span>
            </div>
          </div>
          <!-- 便签列表 -->
          <LeftList :newData='newData'></LeftList>
        </div>
        <div :class="{transup: isUp}" v-else>
          <div class="search">
            <div>
              <i class="iconfont icon-fangdajing"></i>
              <input type="text" placeholder="搜索待办" @focus="inSearch" @blur="outSearch"  :class="{indent: isUp}">
              <span :class="{disleft: isUp}">取消</span>
            </div>
          </div>
          <!-- 待办列表 -->
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
        isUp: false
      }
    },
    props: ['controlMask', 'showMask', 'chooseLeft', 'newData'],
    components: {
      LeftList,
      RightList,
      Add
    },
    methods: {
      openSetting () {
        this.isOpenSetting = true // 打开设置列表
        this.controlMask(this.isOpenSetting) // 显示mask
      },
      inSearch () {
        this.isUp = true
        this.controlMask(this.isUp) // 显示mask
        this.$emit('maskDown') // 触发mask下移
      },
      outSearch () {
        this.isUp = false
        this.controlMask(this.isUp) // 关闭mask
        this.$emit('maskDown') // 关闭mask下移
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
  .scroll
    > .container
      > .transup
        transform translateY(-60px)
      > div
        background-color #fff
        transition transform 0.1s linear 0s
        > .search
          height 30px
          padding 5px 0
          > div
            height 100%
            position relative
            > i
              position absolute
              top 4px
              left 10px
            > input
              width 100%
              height 100%
              border none
              padding 0
              outline none
              text-indent 30px
              background-color #ededed
              border-radius 15px
              transition width 0.1s linear 0s
              &.indent
                width 80%
            > span
              position absolute
              top 6px
              right -40px
              color #0688ff
              font-size 14px
              transition right 0.1s linear 0s
              &.disleft
                right 5px
</style>
