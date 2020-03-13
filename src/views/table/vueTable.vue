<template>
  <div class="table">
    <el-table :data="tableData"
              style="width: 100%; "
              ref="vueTable"
              :height="height"
              v-if="tableData.length">
      <el-table-column prop="name"
                       label="站点"
                       width="180">
      </el-table-column>
      <el-table-column prop="b00-rtd"
                       label="出水流量总(m3)"
                       width="180">
      </el-table-column>
      <el-table-column prop="011-rtd"
                       label="化学需氧量(mg/l)">
      </el-table-column>
      <el-table-column prop="060-rtd"
                       label="出水氨氮(mg/l)">
      </el-table-column>
      <el-table-column prop="101-rtd"
                       label="出水总磷(mg/l)">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
    props: {
        tableData: {
            type: Array,
            default: () => []
        },
        height: {
            type: Number,
            default: 200
        }
    },
    data () {
        return {
            currentScroll: 0,
            timer: null,
            vueTable: null
        }
    },
    methods: {
        scroll () {
            let ele = this.$refs.vueTable.$el.childNodes[2]
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
        tableIntervalScroll () {
            clearInterval(this.timer)
            let ele = this.$refs.vueTable.$el.childNodes[2]
            this.timer = setInterval(() => {
                if ((ele.scrollTop + ele.clientHeight) >= ele.scrollHeight) {
                    ele.scrollTop = 0
                    this.currentScroll = 0
                    clearInterval(this.timer)
                    this.tableIntervalScroll()
                } else {
                    this.scroll()
                }
            }, 5000)
        }
    },
    watch: {
        tableData: {
            handler (v) {
                if (v) {
                    this.$nextTick(() => {

                        this.vueTable = this.$refs.vueTable.$el.childNodes[2]
                        this.vueTable.scrollTop = 0
                        this.currentScroll = 0
                        this.tableIntervalScroll()
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