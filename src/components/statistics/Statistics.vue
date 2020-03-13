<template>
  <div id="statistics">
    <xc-row :space='0'
            class="statistics">
      <xc-row :space='0'
              class="statistics-menu">
        <xc-col :column='num'
                v-for="(item,index) in title"
                :key="index">
          <p>{{item}}</p>
        </xc-col>
      </xc-row>

      <xc-row :space='0'
              v-for="(item,index) in data"
              :key="index"
              class="statistics-item">
        <xc-col :column='num'>
          <p>{{item.name}}</p>
        </xc-col>
        <xc-col :column='num'>
          <p>{{item.year}}</p>
        </xc-col>
        <xc-col :column='num'>
          <p>{{item.one}}</p>
        </xc-col>
        <xc-col :column='num'>
          <p>{{item.two}}</p>
        </xc-col>
        <xc-col :column='num'>
          <p>{{item.three}}</p>
        </xc-col>
        <xc-col :column='num'>
          <p>{{item.four}}</p>
        </xc-col>
        <xc-col :column='num'>
          <p>{{item.five}}</p>
        </xc-col>
        <xc-col :column='num'>
          <p>{{item.six}}</p>
        </xc-col>
      </xc-row>
    </xc-row>
  </div>

</template>

<script>
export default {
    name: 'statistics',
    props: {
        statisticsData: {
            type: Array,
            defaule: []
        },
        title: {
            type: Array,
            defaule: []
        }
    },
    data () {
        return {
            num: 0,
            data: []
        }
    },
    mounted () {
        this.num = Math.floor(24 / this.title.length)
        this.formatting()
    },
    methods: {
        formatting () {
            let data = { id: '11', name: '张三' }
            let keyMap = { id: '序列', name: '姓名' }
            let objs = Object.keys(data).reduce((newData, key) => {
                let newKey = keyMap[key] || key
                newData[newKey] = data[key]
                return newData
            }, {})
            console.log(objs)


        }
    }
}
</script>

<style lang="scss" scoped>
#statistics {
  width: 100%;
  height: 100%;
  padding: 5px;
  .statistics {
    width: 100%;
    height: 100%;
    color: snow;
    .statistics-menu {
      margin-bottom: 5px;
    }
    .statistics-menu,
    .statistics-item {
      text-align: center;
    }
    .statistics-menu {
      color: #eeda1b;
    }
    .statistics-item {
      font-size: 12px;
    }
  }
}
</style>
