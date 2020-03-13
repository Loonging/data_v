<template>
    <div class="line">
        <!-- <div class="title"
             style="height: 0">{{barData[0].name}}</div> -->
        <ve-line v-if="chartData"
                 :data="chartData"
                 :height="height+'px'"
                 :extend="extend"
                 :legend-visible="false"
                 :settings="chartSettings"></ve-line>
    </div>
</template>

<script>
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
        this.chartSettings = {
            area: false,
            labelMap: {
                name: '设备名称',
                value: '通道值'
            }
        }
        this.extend = {
            grid: {
                left: '5%',
                right: '8%'
            },
            yAxis (v) {
                v.forEach(i => {
                    i.splitLine = {
                        show: true,
                        lineStyle: {
                            color: '#2d658c'
                        }

                    }
                    i.axisLabel = {
                        show: true,
                        textStyle: {
                            color: '#fff' //这里用参数代替了
                        }
                    }
                })
                return v
            },
            xAxis (v) {
                v.forEach(i => {
                    i.axisLabel = {
                        show: true,
                        textStyle: {
                            color: '#fff',//这里用参数代替了
                            fontSize: 11
                        },
                        // rotate: 18,
                        align: 'center',
                        margin: 30,
                        interval: 0,
                        rotate: 18
                    }
                    i.splitLine = {
                        show: false,
                        lineStyle: {
                            color: '#2d658c'
                        }
                    }
                    i.boundaryGap = false
                })
                return v
            },
            series (v) {
                v.forEach(i => {
                    i.labelLine = false
                    i.itemStyle = {
                        show: false
                    }
                    i.smooth = 0
                })
                return v
            }
        }
        return {
            chartData: {
                columns: ['name', 'value'],
                rows: []
            }
        }
    },
    watch: {
        barData: {
            handler (v) {
                this.chartData = v[0].chartData
            }
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