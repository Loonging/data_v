<template>
  <div class="page">
    <xc-header :backgroud="headerBg"
               :title="title"
               ref="header">
    </xc-header>
    <xc-row :space="0"
            :style="{'height':middleHeight*0.7+'px'}"
            class="container-top">
      <xc-col :column="7">
        <!-- 上左 -->
        <div class="comparison">
          <p>{{subheading.one}}</p>
          <div :style="{'height':middleHeight*0.42+'px'}">
            <gener-bar :height="middleHeight*0.52"
                       :bar-data="realCharts"
                       :activeIndex="activeIndex"
                       :tab="chartsTitle" />
          </div>
          <div class="vue-table-tab catalog">
            <div class="tab-item"
                 :class="{'active':index===dayActive}"
                 v-for="(item,index) in realData.dataList"
                 :key="index"
                 @click="dayActive=index">
              {{item.name}}
            </div>
          </div>
        </div>
      </xc-col>
      <xc-col :column="10">
        <!-- 上中  -->
        <div class="map">
          <img src="../../../public/map.png"
               alt="map">
          <div class="landmark"
               v-for="(item,index) in realData.dataList"
               :key="index"
               :class="item.class"
               :style="{'display':index===dayActive?'block':'none'}">
            <div class="title"> {{item.name}}</div>
            <div class="content">
              <div v-for="(cell,index) in chartsTitle"
                   :key="index">
                {{cell.channelName}}：{{item[cell.key]}}
              </div>
            </div>
          </div>
        </div>
      </xc-col>
      <xc-col :column="7">
        <!-- 上右 -->
        <div class="comparison">
          <p>{{subheading.two}}</p>
          <gauge :height="middleHeight*0.28"
                 :index="dayActive"
                 :bar-data="dayCharts"></gauge>

          <VeLine :height="middleHeight*0.45"
                  :index="dayActive"
                  :bar-data="dayCharts"
                  style="width: 100%" />

        </div>
      </xc-col>
    </xc-row>

    <xc-row :space="0"
            :style="{'height':middleHeight*0.3+'px'}"
            class="container-bottom">
      <xc-col :column="12">
        <!-- 下左 -->
        <div class="reserve">
          <p>{{subheading.three}}</p>
          <x-table :height="middleHeight*0.24"
                   :tableTitle="realData.titleList"
                   :tableData="realData.dataList"></x-table>

        </div>
      </xc-col>
      <xc-col :column="12">
        <!-- 下右 -->
        <div class="reserve">
          <p>{{subheading.two}} </p>
          <x-table :height="middleHeight*0.24"
                   :tableTitle="dayData.titleList"
                   :tableData="dayData.dataList"></x-table>
        </div>
      </xc-col>
    </xc-row>
    <div class="sss">{{todos[`${list.keys}`]}}</div>
  </div>
</template>

<script>
// import utils from '../../common/js/utils.js'
// import { BASE_URL } from '../../../api/base_url.js'
//import { createTable } from '../../common/js/createTable'
import { createTitle } from '../../common/js/formattingTitle.js'
import { getRealData, getDayData, getCompanyInfo } from '../../../api/api.js'
import VeBar from '../../components/chart/bar'
import VeLine from '../../components/chart/line'
import Gauge from '../../components/chart/gauge'
import GenerBar from '../generBar/generBar'
import ChartTable from '../chartTable/chartTable'
import vueTable from '../table/vueTable'
import xTable from '../../components/table/table'


export default {
    data () {
        return {
            headerBg: '',
            mapFlag: false,
            title: { headline: '华蓥市乡镇污水处理站在线监测平台', subheading: '' },
            subheading: { one: '实时数据对比', two: '日表数据对比', three: '实时数据' },
            middleHeight: 849,
            chartsTitle: [],
            realData: [],
            realCharts: [],
            realTimer: null,
            dayData: [],
            dayCharts: [],
            dayTimer: null,
            activeIndex: 0,
            dayActive: 0,
            company: 0,
            todos: {
                key: 'you'
            },
            list: {
                keys: 'key'
            }

        }
    },
    created () {
        let url = window.location.href
        if (url.indexOf('?') !== -1) {
            this.company = window.location.href.split('?')[1].split('=')[1]
            localStorage.setItem('company', this.company)
        }

        this.getReal()
        this.getDay()
        // TODO 公司信息
        getCompanyInfo({}).then(res => {
            this.title.headline = res.sys_name
        }).catch(err=>{
              alert(err)
            })


    },
    mounted () {
        this.$nextTick(() => {
            this.init()
        })
        addEventListener('resize', () => {
            this.init()
        })


    },
    methods: {
        init () {
            let topHeight = this.$refs.header.$el.offsetHeight
            let winHeight = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight
            this.middleHeight = winHeight - topHeight
        },
        getReal () {
            // TODO:处理实时数据
            getRealData({}).then(res => {
                this.realData = res
                this.chartsTitle = createTitle(this.realData.titleList)
                this.chartsTitle.shift()
                this.realData.dataList.map(item => {
                    switch (item.name) {
                    case '华龙镇污水处理站': return item.class = 'landmark-9'
                    case '溪口镇污水处理站': return item.class = 'landmark-8'
                    case '庆华镇污水处理站': return item.class = 'landmark-7'
                    case '阳和镇污水处理站': return item.class = 'landmark-6'
                    case '明月镇污水处理站': return item.class = 'landmark-5'
                    case '禄市镇月亮坡污水处理站': return item.class = 'landmark-3'
                    case '禄市镇小驴山污水处理站': return item.class = 'landmark-4'
                    case '永兴镇污水处理站': return item.class = 'landmark-1'
                    case '观音溪镇污水处理站': return item.class = 'landmark-0'
                    case '天池镇污水处理站': return item.class = 'landmark-2'
                    }
                })
                this.real(this.realData)
            }).catch(err=>{
              alert(err)
            })
        },
        getDay () {
            // TODO：处理日报数据
            getDayData({}).then(res => {
                this.dayData = res
                this.dayReport(this.dayData)

            }).catch(err=>{
              alert(err)
            })
        },

        // TODO:图表数据处理(左边)
        real (data) {
            clearTimeout(this.realTimer)
            if (data) {
                let obj = {}
                obj.name = data.titleList[this.activeIndex + 1].value
                obj.key = data.titleList[this.activeIndex + 1].key
                obj.decicveNum = data.dataList.length
                obj.chartData = {}
                obj.chartData.columns = ['name', 'value']
                obj.chartData.rows = []
                if (data.dataList) {
                    data.dataList.forEach(item => {
                        let cell = {}
                        cell.name = item.name
                        cell.value = item[obj.key]
                        obj.chartData.rows.push(cell)
                    })
                }
                this.realCharts = []
                this.realCharts.push(obj)
                this.activeIndex++
                if (this.activeIndex > data.titleList.length - 2) {
                    this.activeIndex = 0
                }
                this.dayActive++
                if (this.dayActive > data.dataList.length) {
                    this.dayActive = 0
                    this.getReal()
                }
            }


            this.realTimer = setTimeout(() => {
                this.real(this.realData)

            }, 3000)

        },
        // TODO:图表数据处理(右边)
        dayReport (data) {
            clearTimeout(this.dayTimer)
            if (data) {
                let obj = {}
                obj.name = data.titleList[this.activeIndex + 1].value
                obj.key = data.titleList[this.activeIndex + 1].key
                obj.decicveNum = data.dataList.length
                obj.chartData = {}
                obj.chartData.columns = ['name', 'value']
                obj.chartData.rows = []
                if (data.dataList) {
                    data.dataList.forEach(item => {
                        let cell = {}
                        cell.name = item.name
                        cell.value = item[obj.key]
                        obj.chartData.rows.push(cell)
                    })
                }
                this.dayCharts = []
                this.dayCharts.push(obj)
            }

            this.dayTimer = setTimeout(() => {
                this.dayReport(this.dayData)

            }, 3000)

        }


    },
    components: {
    // eslint-disable-next-line vue/no-unused-components
        vueTable, ChartTable, GenerBar, VeBar, VeLine, Gauge, xTable
    }
}
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  overflow: hidden;
  background: url('../../../public/backdrop.jpg');
  color: #fafafa;
  padding-left: 6px;
  p {
    text-align: left;
  }
  .xc-col {
    height: 100%;
  }
  .comparison {
    width: 98%;
    height: 98%;
    padding: 14px;
    border-radius: 10px;
    box-shadow: inset 0 0 25px #fafafa;
    position: relative;
    .line {
      position: absolute;
      top: 40%;
      left: 0;
    }
  }
  .map {
    width: 98%;
    height: 98%;
    margin-left: 2px;
    padding: 14px;
    box-shadow: inset 0 0 25px #fafafa;
    border-radius: 10px;
    position: relative;
    p {
      position: absolute;
      font-size: 18px;
      letter-spacing: 4px;
    }
    img {
      margin-top: 4px;
      height: 100%;
    }
    // &:after {
    //   content: '';
    //   display: block;
    //   width: 0;
    //   height: 0;
    //   position: absolute;
    //   top: 100px;
    //   left: 50px;
    //   border-top: solid 30px #428bca;
    //   border-left: solid 30px red; /* 白色小三角形 */
    //   border-right: solid 30px yellow;
    //   border-bottom: solid 30px green;
    // }
    .landmark {
      width: 200px;
      height: 120px;
      background: #428bca;
      box-shadow: inset 0 0 5px #fafafa;
      border-radius: 8px;
      position: absolute;
      display: none;
      .title {
        padding-left: 12%;
        padding-top: 5px;
        font-size: 16px;
      }
      .content {
        border-top: 1px solid #fafafa;
        div {
          padding-left: 6px;
          padding-top: 4px;
          line-height: 14px;
          font-size: 14px;
          text-align: left;
        }
      }
    }
    // TODO 地图坐标
    .landmark-0 {
      // 观音溪镇
      top: 54%;
      left: 15%;
      &::after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        right: -26px;
        top: 60px;
        box-shadow: inset 0 0 5px #fafafa;
        border-top: solid 10px transparent;
        border-left: solid 40px #428bca;
        border-bottom: solid 10px transparent;
      }
    }

    .landmark-1 {
      // 永兴镇
      top: 8.5%;
      left: 19%;
      &::after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        right: -26px;
        top: 26px;
        border-top: solid 10px transparent;
        border-left: solid 40px #428bca; /* 白色小三角形 */
        border-bottom: solid 10px transparent;
        box-shadow: inset 0 0 5px #fafafa;
      }
    }
    .landmark-2 {
      // 天池镇
      top: 10.5%;
      left: 70%;
      &::after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        left: -26px;
        top: 50px;
        box-shadow: inset 0 0 5px #fafafa;
        border-top: solid 10px transparent;
        border-bottom: solid 10px transparent;
        border-right: solid 30px #428bca;
      }
    }
    .landmark-3 {
      // 禄市镇月亮坡污水处理站
      top: 3.5%;
      left: 62%;
      &::after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        left: -27px;
        top: 30px;
        box-shadow: inset 0 0 5px #fafafa;
        border-top: solid 10px transparent;
        border-bottom: solid 10px transparent;
        border-right: solid 30px #428bca;
      }
    }
    .landmark-4 {
      // 禄市镇小驴山污水处理站
      top: 3.5%;
      left: 29%;
      &::after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        right: -26px;
        top: 26px;
        box-shadow: inset 0 0 5px #fafafa;
        border-top: solid 10px transparent;
        border-left: solid 40px #428bca; /* 白色小三角形 */
        border-bottom: solid 10px transparent;
      }
    }
    .landmark-5 {
      //明月镇污水处理站
      top: 24%;
      left: 8%;
      &::after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        right: -26px;
        top: 26px;
        box-shadow: inset 0 0 5px #fafafa;
        border-top: solid 10px transparent;
        border-left: solid 40px #428bca; /* 白色小三角形 */
        border-bottom: solid 10px transparent;
      }
    }
    .landmark-6 {
      //阳和镇污水处理站
      top: 38.5%;
      left: 16%;
      &::after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        right: -26px;
        top: 26px;
        box-shadow: inset 0 0 5px #fafafa;
        border-top: solid 10px transparent;
        border-left: solid 40px #428bca; /* 白色小三角形 */
        border-bottom: solid 10px transparent;
      }
    }
    .landmark-7 {
      // 庆华镇污水处理站
      top: 49.5%;
      left: 12%;
      &::after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        left: 78%;
        bottom: -20px;
        box-shadow: inset 0 0 5px #fafafa;
        border-top: solid 24px #428bca;
        border-left: solid 10px transparent; /* 白色小三角形 */
        border-right: solid 10px transparent;
      }
    }
    .landmark-8 {
      //溪口镇污水处理站
      top: 74.5%;
      left: 2%;
      &::after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        right: -26px;
        top: 26px;
        box-shadow: inset 0 0 5px #fafafa;
        border-top: solid 10px transparent;
        border-left: solid 40px #428bca; /* 白色小三角形 */
        border-bottom: solid 10px transparent;
      }
    }
    .landmark-9 {
      //华龙镇污水处理站
      top: 11%;
      left: 60%;
      &::after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        left: -27px;
        top: 30px;
        box-shadow: inset 0 0 5px #fafafa;
        border-top: solid 10px transparent;
        border-bottom: solid 10px transparent;
        border-right: solid 30px #428bca;
      }
    }
  }
  .reserve {
    width: 99%;
    height: 98%;
    padding: 14px;
    box-shadow: inset 0 0 25px #fafafa;
    border-radius: 10px;
    overflow: hidden;
  }
}
.vue-table-tab {
  display: flex;
  flex-wrap: wrap;
  white-space: nowrap;
  color: #fff;
  padding: 10px;
  box-sizing: border-box;
  margin-top: -20px;
}
.catalog {
  position: absolute;
  left: 10px;
  bottom: 3%;
}

.vue-table-tab .tab-item {
  padding: 5px;
  box-sizing: border-box;
  margin: 0 5px 5px 0;
  background: #428bca;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}

.vue-table-tab .tab-item.active {
  background: #19d4ae;
}
</style>