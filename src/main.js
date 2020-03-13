import Vue from 'vue'
import App from './App'
import './common/scss/reset.css'
import VCharts from 'v-charts'
import XcHeader from './components/header'
import Row from './components/grid/xc-row'
import Col from './components/grid/xc-col'
import './components/grid/xc-grid.scss'
import {
    Table,
    TableColumn
} from 'element-ui'
Vue.use(VCharts)
Vue.component('xc-header', XcHeader)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')