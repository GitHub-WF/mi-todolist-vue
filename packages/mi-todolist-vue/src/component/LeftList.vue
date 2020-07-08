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
        <li v-for="(item, index) in newData" :data-index="index" :key="item.id" :ref="item.id" @mousedown="downMouse(item.id)" @mouseup="upMouse(item.id)">
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
        oldListLiDis: [], // 原始li距离数据数组
        listLiDis: [], // 变化的li距离数据数组
        liPrePosition: {
          top: 0,
          left: 0
        },
        moveLiId: null,
        moveIndex: 0,
        flag: true, // 只获取一次index标识
        moveLiPosY: 0,
        emptyIndex: 0 // 位置空的index
      };
    },
    props: ['newData', 'chooseLeft', 'updateData'],
    components: {

    },
    methods: {
      docMouseUp () {
        if (this.moveLiId) {
          this.oldListLiDis.forEach((item, index) => {
            var num = this.listLiDis.findIndex((li, index) => {
              return li === item
            })
            if (num === -1) {
              let num = index - this.moveIndex
              if (num > 0) {
                this.$refs.ulList.childNodes[this.moveIndex].style.transform = `translateY(${Math.abs(num) * this.liDis}px) scale(1)`
              } else if (num < 0) {
                this.$refs.ulList.childNodes[this.moveIndex].style.transform = `translateY(-${Math.abs(num) * this.liDis}px) scale(1)`
              } else {
                this.$refs.ulList.childNodes[this.moveIndex].style.transform = 'scale(1)'
              }
              this.$refs.ulList.childNodes[this.moveIndex].dataset.index = index
              var numArr = []
              this.$refs.ulList.childNodes.forEach(item => {
                numArr.push(item.dataset.index)
              })
              this.updateData(numArr, this.$refs.ulList.childNodes)
            }
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
        // 判断相互位置并交换数据
        this.listLiDis.forEach((dis, index) => {
          if (this.moveIndex !== index && this.moveLiPositionY >= this.listLiDis[index] - this.liDis / 2 && this.moveLiPositionY <= this.listLiDis[index] + this.liDis / 2) {
            if (yDis - this.moveLiPosY > 0) {
              this.moveLiPosY = yDis
              // 下移
              // 判断交叉index移动
              if (this.moveLiPositionY > this.listLiDis[index]) {
                // 交叉index上移
                var li = this.$refs.ulList.childNodes[index]
                var preTranslateY = li.style.transform.replace(/[^0-9\-]/ig,"") * 1
                if (preTranslateY !== 0) {
                  li.style.transform = `translateY(0px)`
                  li.dataset.index = index
                  this.listLiDis[index] = this.oldListLiDis[index]
                } else {
                  li.style.transform = `translateY(-${this.liDis}px)`
                  li.dataset.index = index - 1
                  this.listLiDis[index] -= this.liDis
                }
              }
            } else if (yDis - this.moveLiPosY < 0) {
              this.moveLiPosY = yDis
              // 上移
              // 判断交叉index移动
              if (this.moveLiPositionY < this.listLiDis[index]) {
                // 交叉index下移
                var li = this.$refs.ulList.childNodes[index]
                var preTranslateY = li.style.transform.replace(/[^0-9\-]/ig,"") * 1
                if (preTranslateY !== 0) {
                  li.style.transform = `translateY(0px)`
                  li.dataset.index = index - 1
                  this.listLiDis[index] = this.oldListLiDis[index]
                } else {
                  li.style.transform = `translateY(${this.liDis}px)`
                  li.dataset.index = index + 1
                  this.listLiDis[index] += this.liDis
                }
              }
            }
          }
        })
      }
    },
    computed: {
      liDis () {
        return this.listLiDis[1] - this.listLiDis[0]
      }
    },
    watch: {
      newData () {
        // 更新li距离数组数据
        this.$refs.ulList.childNodes.forEach(item => {
          var disData = item.offsetTop + item.clientHeight / 2
          this.listLiDis.push(disData)
          // 保存原始li距离数据数组
          this.oldListLiDis.push(disData)
        })
      }
    },
    created() {
      
    },
    mounted() {
      // 创建li距离数组数据
      this.$refs.ulList.childNodes.forEach(item => {
        var disData = item.offsetTop + item.clientHeight / 2
        this.listLiDis.push(disData)
        // 保存原始li距离数据数组
        this.oldListLiDis.push(disData)
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
