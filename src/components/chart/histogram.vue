<template>
    <ve-histogram v-if="chartData"
                  :data="chartData"
                  :extend="barExtend"
                  :settings="chartSettings"
                  :grid="grid"
                  :height="height+'px'"></ve-histogram>
</template>

<script>
export default {
    props: {
        chartData: {
            type: Object,
            default: () => { }
        },
        height: {
            type: Number,
            default: 0
        },
        grid: {
            type: Object,
            default: () => { }
        },
        show: {
            type: Boolean,
            defaule: false
        },
        category: {
            type: Boolean,
            defaule: false
        },
        axisSite: {
            type: Object,
            default: () => { }
        }
    },
    data () {
        this.chartSettings = {
            axisSite: this.axisSite
            //yAxisType: ['KMB', 'percent'],
            //yAxisName: ['数值', '比率']
        }
        return {
            barExtend: {
                xAxis: {
                    show: true,
                    type: 'category',
                    axisLabel: {
                        textStyle: {
                            fontSize: 15,
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    show: true,
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            fontSize: 15,
                            color: '#fff'
                        }
                    }
                },
                series: {
                    type: 'bar',
                    barWidth: 10, // 设置每个柱形的宽度
                    animation: false, //关闭动画效果
                    itemStyle: {
                        //  设置每一项的样式
                        normal: {
                            // 设置柱形为圆角大小
                            barBorderRadius: [10, 10, 0, 0]
                        }
                    },
                    label: {
                        //设置顶部数据显示
                        show: this.show,
                        position: 'top'

                    }
                },
                legend: {
                    //隐藏类型目录（extend内legend作用是为了隐藏展现不同系列的标记；）
                    show: this.category,
                    top: 0,
                    textStyle: {
                        color: '#fafafa'
                    }
                }
            }
        }
    }

}
</script>