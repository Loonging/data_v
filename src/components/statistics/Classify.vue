<template>
  <div id="classify">
    <xc-row :space='0'
            class="classify">
      <xc-row :space='0'
              class="classify-item">
        <xc-col :column='8'
                v-for="(item,index) in classifyData"
                :key="index">
          <p>{{item.number}}</p>
          <p>{{item.classify}}</p>
        </xc-col>
      </xc-row>
    </xc-row>
  </div>

</template>

<script>
export default {
    name: 'statistics',
    props: {
        classifyData: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style lang="scss" scoped>
#classify {
  width: 100%;
  height: 100%;
  padding: 5px;
  .classify {
    width: 100%;
    height: 100%;
    font-size: 20px;
    color: #00d2f8;
    p {
      text-align: center;
      line-height: 30px;
    }
    p:last-child {
      font-size: 14px;
      color: #3365d0;
    }
  }
}
</style>
