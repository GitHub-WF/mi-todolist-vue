<template>
  <div id="leftlist" ref="leftlist">
    <!-- 无数据 -->
    <div v-if="newData.length === 0" class="nodata">
      <div>
        <i class="iconfont icon-bsm_bianqian-"></i>
        <span>没有便签</span>
      </div>
    </div>
    <!-- 有数据 -->
    <div v-else class="havedata">
      <ul class="ulList" ref="ulList">
        <li v-for="(item, index) in newData" :key="item.id" :ref="item.id" @mousedown="downMouse(item.id)" @mouseup="upMouse(item.id)">
          <span>{{item.title}}</span>
          <span>{{item.content}}</span>
          <span>{{item.time}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: "LeftList",
    data() {
      return {
        listLiDis: [],
        liPrePosition: {
          top: 0,
          left: 0
        },
        moveLiId: null,
        moveIndex: 0,
        flag: true
      };
    },
    props: ['newData', 'chooseLeft'],
    components: {

    },
    methods: {
      docMouseUp () {
        if (this.moveLiId) {
          this.$refs.ulList.childNodes.forEach(item => {
            item.style.transform = 'scale(1)'
          })
          this.$refs[this.moveLiId][0].style.zIndex = 0
          this.$refs[this.moveLiId][0].style.border = 'none'
          document.removeEventListener('mousemove', this.moveMouse)
        }
      },
      downMouse (id, $event) {
        var e = $event || window.event
        this.moveLiId = id
        this.flag = true
        this.liPrePosition.top = e.pageY
        this.liPrePosition.left = e.pageX
        this.$refs[id][0].style.transform = 'scale(0.95)'
        this.$refs[id][0].style.zIndex = 1
        this.$refs[id][0].style.border = '1px solid #f90'
        document.addEventListener('mousemove', this.moveMouse)
      },
      upMouse (id) {
        this.$refs[id][0].style.transform = 'scale(1)'
      },
      moveMouse (event) {
        var e = event || window.event
        var moveLiNode = this.$refs[this.moveLiId][0]
        var xDis = e.pageX - this.liPrePosition.left
        var yDis = e.pageY - this.liPrePosition.top
        moveLiNode.style.transform = `translate(${xDis}px, ${yDis}px) scale(0.95)`
        // 处理Li之间的位移问题
        // 获取当前元素具体顶部距离
        this.moveLiPositionY = moveLiNode.offsetTop + moveLiNode.clientHeight / 2 + yDis
        // 获取当前元素的index
        if (this.flag) {
          this.moveIndex = this.listLiDis.findIndex(dis => {
          this.flag = false
          return this.moveLiPositionY > dis - 3 && this.moveLiPositionY < dis + 3
        })
        }
        console.log(this.moveIndex)
        // 判断相互位置并交换数据
        this.listLiDis.forEach((dis, index) => {
          
        })
      }
    },
    computed: {
      liDis () {
        return this.listLiDis[1] - this.listLiDis[0]
      }
    },
    watch: {

    },
    created() {

    },
    mounted() {
      // 创建li距离数组数据
      this.$refs.ulList.childNodes.forEach(item => {
        var disData = item.offsetTop + item.clientHeight / 2
        this.listLiDis.push(disData)
      })
      // 给document添加mouseup事件，当鼠标释放，所有li的scale(1)
      document.addEventListener('mouseup', this.docMouseUp)
      // 便签销毁时，给document解绑mouseup事件
      this.$once('hook:beforeDestroy', () => {
        document.removeEventListener('mouseup', this.docMouseUp)
      })
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
          user-select none
          font-size 12px
    > .havedata
      > .ulList
        margin 0
        padding 0
        > li
          list-style none
          background-color #ccc
          margin-top 5px
          border-radius 10px
          padding 5px
          box-sizing border-box
          display flex
          flex-direction column
          position relative
          transition transform 0.1s linear 0s
          span
            user-select none
            font-size 16px
            &:nth-child(2)
              font-weight 100
            &:nth-child(3)
              font-size 12px
</style>
