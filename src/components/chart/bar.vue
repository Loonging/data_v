<template>
    <xc-row>
        <xc-col :span="24"
                v-if="showRight">
            <div class="title"
                 style="height: 0">
                <span>站点总数</span>
                <span>{{num}}</span>
            </div>
            <div class="bar">
                <ve-bar v-if="chartData"
                        :data="chartData"
                        :height="height+'px'"
                        :colors="colors"
                        :legend-visible="false"
                        :extend="extend"
                        :settings="chartSettings"
                        :grid="grid"></ve-bar>
            </div>
        </xc-col>
        <xc-col :span="24"
                v-if="showRight">
            <slot></slot>
        </xc-col>

    </xc-row>
</template>

<script>
import utils from '../../common/js/utils.js'

export default {
    name: 'bar',
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
        grid: {
            type: Object,
            dafaule: {}
        }
    },
    data () {
        this.chartSettings = {
            labelMap: {
                name: '设备名称',
                value: '通道值'
            }
        }
        this.extend = {
            yAxis (v) {
                v.forEach(i => {
                    i.splitLine = {
                        show: false
                    }
                    i.axisLabel = {
                        show: true,
                        textStyle: {
                            fontSize: '13',
                            fontWeight: 'bold',
                            color: '#fff' //这里用参数代替了
                        }
                    }
                })
                return v
            },
            xAxis (v) {
                v.forEach(i => {
                    i.axisLabel = {
                        show: false
                    }
                    i.splitLine = {
                        show: false
                    }
                })
                return v
            }
            //                series(v) {
            //                    v.forEach(i => {
            //                        i.labelLine = false
            //                        i.itemStyle = {
            //                            show: false
            //                        }
            //                    })
            //                    return v
            //                }
        }
        this.colors = ['#c23531', '#2f4554', '#61a0a8',
            '#d48265', '#91c7ae', '#749f83',
            '#ca8622', '#bda29a', '#6e7074',
            '#546570', '#c4ccd3']
        return {
            chartData: {
                columns: ['日期', '访问用户'],
                rows: []
            },
            num: 0
        }
    },
    watch: {
        barData: {
            handler (v) {
                if (v) {
                    this.chartData = v[0].chartData
                    this.num = utils.normalThousand(v[0].chartData.rows.length)
                }
            }
        }
    }
}
</script>
<style scoped lang="scss">
</style>