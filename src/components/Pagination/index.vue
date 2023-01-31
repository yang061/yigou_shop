<template>
  <div class="pagination">
    <!-- @click="$emit('getPageNo', pageNo - 1)点击触发自定义事件 -->
    <button @click="$emit('getPageNo', pageNo - 1)" :disabled="pageNo == 1">
      上一页
    </button>
    <!-- 上 -->
    <!-- 连续数字的起始页比1大的时候才显示，避免重复 -->
    <button
      v-if="startNumAndEndNum.startNum > 1"
      @click="$emit('getPageNo', 1)"
    >
      1
    </button>
    <!--连续数字的起始页比2大的时候才显示，否则不需要 【...后面应该显示3，才可以看出省略了数据(2)否则没必要0】  -->
    <button v-if="startNumAndEndNum.startNum > 2">···</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNumAndEndNum.endNum"
      :key="index"
      v-show="page >= startNumAndEndNum.startNum"
      @click="$emit('getPageNo', page)"
    >
      {{ page }}
    </button>

    <!-- 下 -->
    <!-- 连续数字结束符应该是小于totalPage - 1才应该显示省略号 -->
    <button v-if="startNumAndEndNum.endNum < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.endNum < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :disabled="pageNo == totalPage"
    >
      {{ totalPage }}
    </button>
    <button @click="$emit('getPageNo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
  
  <script>
export default {
  name: "myPagination",
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 计算总共多少页
    totalPage () {
      // Math.ceil 向上取整
      return Math.ceil(this.total / this.pageSize)
    },
    //   计算出连续的页码的起始数据和结束数据[至少是5]
    startNumAndEndNum () {
      // 因为数据存到this身上，所以可以解构出，少写this
      const { pageNo, continues, totalPage } = this
      // 定义两个变量存取起始数据和结束数据
      let startNum = 0, endNum = 0
      if (continues > totalPage) {
        //   连续页码数至少为5，如果出现异常显示【总页数小于continues】
        // 起始为1，结束位为当前总页数
        startNum = 1
        endNum = totalPage
      } else {
        //正常现象【总页数大于continues】
        // 5页时应该减2，7页应该减3,parseInt整除
        startNum = pageNo - parseInt(continues / 2)
        endNum = pageNo + parseInt(continues / 2)
        // 把出现不正常的现象【startNum数字出现0||负数】 纠正
        if (startNum < 1) {
          startNum = 1
          //   结束位是当前连续数字的个数
          endNum = continues
        }
        // 最后一位比总页数还大 ---纠正
        if (endNum > totalPage) {
          endNum = totalPage
          // total=【99】  pageSize =【5】  pageNo= 19    continues 5  
          // startNum=20-5+1=16  连续页数【16 17 18 19 20】
          startNum = totalPage - continues + 1
        }
      }

      return { startNum, endNum }
    }
  }
}
  </script>
  
  <style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>