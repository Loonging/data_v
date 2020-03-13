<template>
  <div class="table"
       :style="{'height':height+'px'}">
    <el-table :data="rowsData"
              style="width: 100%"
              height="250"
              ref="table">
      <el-table-column :prop="i.prop"
                       :label="i.lable"
                       v-for="(i,index) in rowTitle"
                       :key="index"
                       :width="i.prop==='name'?'200px':''"></el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
    props: {
        height: {
            type: Number,
            default: 0
        },
        tableData: {
            type: Array,
            default: () => []
        },
        title: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            rowsData: [],
            rowTitle: [],
            currentScroll: 0,
            timer: null
        }
    },
    methods: {
        scroll () {
            let ele = this.$refs.table.$el.childNodes[2]
            let scrollTop = ele.scrollTop
            let step = Math.ceil((94 * 10) / 2000)
            let start = this.currentScroll
            let t = setInterval(() => {
                start += step
                if (start >= (94 + scrollTop)) {
                    clearInterval(t)
                }
                ele.scrollTop = start
                this.currentScroll = start
            }, 10)
        },
        intervalScroll () {
            clearInterval(this.timer)
            let ele = this.$refs.table.$el.childNodes[2]
            this.timer = setInterval(() => {
                if ((ele.scrollTop + ele.clientHeight) >= ele.scrollHeight) {
                    ele.scrollTop = 0
                    this.currentScroll = 0
                    clearInterval(this.timer)
                    this.intervalScroll()
                } else {
                    this.scroll()
                }
            }, 5000)
        }
    },
    watch: {
        title: {
            handler (v) {
                if (v) {
                    this.rowTitle = v
                }
            }
        },
        tableData: {
            handler (v) {
                if (v) {
                    this.rowsData = v
                    this.$nextTick(() => {
                        this.intervalScroll()
                    })
                }
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.table {
  // background: #28385a;
  color: #fff;
  box-sizing: border-box;

  /deep/ .el-table {
    &::before {
      content: none;
    }
  }

  // /deep/ .el-table th,
  // .el-table tr {
  //   background: #28385a;
  // }

  // /deep/ .el-table td,
  // .el-table th {
  //   background: #28385a;
  // }

  // /deep/ .el-table,
  // .el-table__expanded-cell {
  //   background: #28385a;
  // }
  /deep/ .el-table__body-wrapper {
    position: relative;
    overflow: hidden;
    //border: 1px solid #fafafa;
    height: 100%;
  }
  /deep/ .el-table__header {
    line-height: 40px;
  }

  /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background: #28385a;
  }

  /deep/ .el-table .cell {
    color: #fff;
  }

  /deep/ .el-table__body {
    position: absolute;
    border: none;

    tbody {
      border: 1px solid #fafafa;
      border: none;
      .el-table__row {
        line-height: 30px;
      }
    }
  }

  /deep/ .el-table td,
  .el-table th.is-leaf {
    border: none;
  }

  padding: 0 10px;
  box-sizing: border-box;

  .table-ch {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  /deep/ .el-table th > .cell {
    white-space: nowrap;
  }
}
</style>