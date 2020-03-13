<template>
  <div class="header"
       :style="{'background-image':`url(${backgroud})`}">
    <div class="left">
      <p>{{day}}</p>
    </div>
    <div class="middle-backdrop">
      <img src="../../public/bg.png"
           alt="logo"
           class="logo" />
    </div>
    <div class="middle">
      <p>{{title.headline}}</p>
      <p>{{title.subheading}}</p>
    </div>
    <div class="right">
      <p>{{time}}</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'xcHeader',
    props: {
        backgroud: {
            type: String,
            default: '',
            required: true
        },
        title: {
            type: Object,
            default: () => { },
            required: true
        }
    },
    data () {
        return {
            day: '',
            time: '',
            timer: null
        }
    },
    mounted () {
        this.getTime()
    },
    methods: {
        getTime () {
            clearTimeout(this.timer)
            let date = new Date()
            let y = date.getFullYear().toString().padStart(2, '0')
            let m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
            m.toString().padStart(2, '0')
            let d = date.getDate().toString().padStart(2, '0')
            let hh = date.getHours().toString().padStart(2, '0')
            let mm = date.getMinutes().toString().padStart(2, '0')
            let ss = date.getSeconds().toString().padStart(2, '0')
            this.day = `${y}-${m}-${d}`
            this.time = ` ${hh}:${mm}:${ss}`
            this.timer = setTimeout(() => {
                this.getTime()
            }, 1000)
        }

    }

}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  width: 100%;
  height: 8em;
  font-size: 16px;
  color: #7badf6;
  .middle-backdrop {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .middle {
    font-size: 35px;
    letter-spacing: 6px;
    padding-top: 2%;
    flex: 4;
    color: #fafafa;
    p:last-child {
      margin-top: 10px;
      font-size: 10px;
      letter-spacing: 2px;
    }
  }
  .left {
    //border: 1px solid #fff;
    flex: 3;
    position: relative;
    p {
      position: absolute;
      right: 0;
      top: 70%;
    }
  }
  .right {
    flex: 3;
    position: relative;
    p {
      position: absolute;
      left: 0;
      top: 70%;
    }
  }
}
</style>