<template>
    <ve-ring :data="chartData"
             :settings="chartSettings"
             :extend="barExtend"
             :height="height+'px'"
             :title="title"></ve-ring>
</template>

<script>
export default {
    props: {
        height: {
            type: Number,
            default: 0
        },
        offsetY: {
            type: String,
            default: ''
        },
        chartData: {
            type: Object,
            default: () => { }
        },
        title: {
            type: String,
            default: ''
        },
        radius: {
            type: Array,
            default: () => []
        }
    },
    data () {
        this.title = {
            text: '挑战赛-结果发布',
            x: 'center',
            y: 'center',
            textStyle: {
                fontSize: 10,
                color: '#fafafa'
            }
        }
        this.chartSettings = {
            radius: this.radius,  // 圆的半径
            offsetY: this.offsetY, // y轴偏移量
            series: {
                type: 'ring'  // 类型必填 防止报错
            },
            label: {
                show: false, // value 是否显示
                position: 'inside', // value 显示位置
                formatter: '{d}%',
                /*
formatter:(params)=> { // value 显示样式
switch(params.name){
case '跃进村':
return `${params.percent}%`
}
}
*/
                textStyle: { // value字体设置
                    align: 'center',
                    baseline: 'middle',
                    fontFamily: '微软雅黑',
                    fontSize: '12'
                    //fontWeight :'bolder'
                }
            }

        }
        return {
            barExtend: {
                legend: { //隐藏类型目录（extend内legend作用是为了隐藏展现不同系列的标记；）
                    show: false
                }
            }
        }
    }
}
</script>