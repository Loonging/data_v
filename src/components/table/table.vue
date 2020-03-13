<template>
  <div id="tableList"
       :style="{'height':height+'px'}">
    <div v-if="nTitle"
         class="table-title">
      <div v-for="(item,index) in nTitle"
           :key="index">
        {{item.value}}
      </div>
    </div>
    <div v-if="nData"
         class="table-data"
         ref="tableData">
      <div class="data-container"
           ref="dataContainer">
        <div v-for="(cell,index) in nData"
             :key="index"
             class="table-data-item">
          <div v-for="(item,index) in nTitle"
               :key="index">
            {{cell[item.key]}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'table',
    props: {
        height: {
            type: Number,
            default: 200
        },
        tableData: {
            type: Array,
            default: () => []
        },
        tableTitle: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            nTitle: [],
            nData: [],
            timer: null,
            tHeight: 0,
            dHeight: 0,
            sTop: 0
        }
    },
    methods: {

        scrollData () {
            this.tHeight = 0
            this.dHeight = 0
            this.tHeight = this.$refs.tableData.offsetHeight
            this.dHeight = this.$refs.dataContainer.offsetHeight

            if (this.dHeight + this.sTop > this.tHeight) {
                this.sTop -= 20
            } else {
                this.sTop = 30
            }
            this.$refs.dataContainer.style.top = this.sTop + 'px'
            this.timer = setTimeout(() => {
                this.scrollData()
            }, 1000)
        }
    },
    watch: {
        tableData (v) {
            if (v) {
                this.nData = v

                this.$nextTick(() => {
                    this.scrollData()
                })
            }
        },
        tableTitle (v) {
            if (v) {
                this.nTitle = v
                // this.$nextTick(() => {

                // })
            }
        },
        deep: true
    }
}
</script>

<style lang="scss" scoped>
#tableList {
  width: 100%;
  height: 100%;
  .table-title {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    padding-top: 10px;
    div {
      width: 20%;
      text-align: center;
      font-weight: bold;
      letter-spacing: 4px;
    }
  }
  .table-data {
    width: 100%;
    height: 176px;
    overflow: hidden;
    position: relative;
    .data-container {
      width: 100%;
      position: absolute;
      transition: top 1s;
      .table-data-item {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        padding-top: 10px;
        div {
          width: 20%;
          text-align: center;
        }
      }
    }
  }
}
</style>
