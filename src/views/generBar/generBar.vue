<template>
    <div class="generbar">
        <v-bar :height="height"
               :show-right="right"
               :barData="charts"
               :grid="{ width:'75%'}">
            <div class="tab">
                <div class="tab-item"
                     v-for="(item,index) in tab"
                     :key="index"
                     :class="{'active':index===activeIndex}">
                    <span>{{item.channelName}}</span>
                </div>
            </div>
        </v-bar>
    </div>
</template>
<script type="es6">
import vBar from '../../components/chart/bar'

export default {
    props: {
        height: {
            type: Number,
            default: 0
        },
        showRight: {
            type: Boolean,
            default: true
        },
        barData: {
            type: Array,
            default: () => []
        },
        activeIndex: {
            type: Number,
            default: 0
        },
        tab: {
            type: Array,
            default: () => []
        }
    },
    components: {
        vBar
    },
    data () {
        return {
            right: this.showRight,
            charts: this.barData
        }
    },
    watch: {
        barData: {
            handler (v) {
                this.charts = v
            }
        }
    }
}
</script>
<style scoped lang="scss">
.tab {
  color: #fff;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: flex-end;
  padding-right: 20px;
  box-sizing: border-box;
  position: absolute;
  top: 20%;
  right: -20px;

  .tab-item {
    width: 100px;
    white-space: nowrap;
    padding: 5px;
    background: #428bca;
    border-radius: 3px;
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .active {
    background: rgb(25, 212, 174);
  }
}
</style>
