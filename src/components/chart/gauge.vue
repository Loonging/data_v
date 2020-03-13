<template>
    <div>
        <div class="title">{{name}}</div>
        <ve-gauge :data="chartData"
                  :extend="extend"
                  :height="height+'px'"></ve-gauge>
    </div>
</template>

<script>
import utils from '../../common/js/utils.js'

export default {
    props: {
        height: {
            type: Number,
            default: 0
        },
        barData: {
            type: Array,
            default: () => []
        },
        index: {
            type: Number,
            default: 0
        }
    },
    data () {
        this.extend = {
            series: {
                type: 'gauge',
                detail: {
                    show: true,
                    offsetCenter: [0, '70%']

                }
            }

        }
        return {
            chartData: {
                columns: ['name', 'value'],
                rows: []
            },
            rowsData: [],
            name: ''
        }
    },
    mounted () {
    },
    watch: {
        barData: {
            handler (v) {
                this.rowsData = v
                let rowsLength = utils.randomNum(0, this.rowsData[0].chartData.rows.length - 1)
                this.chartData.rows = [this.rowsData[0].chartData.rows[rowsLength]]
                this.name = this.rowsData[0].name ? this.rowsData[0].name : ''
            },
            deep: true
        }
    }
}
</script>
<style scoped lang="scss">
.title {
  padding-top: 10px;
  text-align: center;
  color: #fff;
}
</style>