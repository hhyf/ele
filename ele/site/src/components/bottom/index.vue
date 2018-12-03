<template>
    <footer>
        <div  @click="changeIndex(1)">
          <router-link to="/home"  :class="{active:index === 1}" >
            <span class="index_ico">&#xe722;</span>
            <b>首页</b>
          </router-link>
        </div>
        <div  @click="changeIndex(2)" >
          <router-link to="/search"    :class="{active:index === 2}">
            <span>&#xe746;</span>
            <b>发现</b>
          </router-link>
        </div>
        <div  @click="changeIndex(3)">
          <router-link to="/order"    :class="{active:index === 3}" >
            <span>&#xe65d;</span>
            <b>订单</b>
          </router-link>
        </div>
        <div  @click="changeIndex(4)" >
          <router-link to="/my"   :class="{active:index === 4}" >
            <span>&#xe621;</span>
            <b>我的</b>
          </router-link>
        </div>
    </footer>
</template>

<script>
    export default {
        name : "bottom",
        data(){
          return {
            index : 1
          }
        },
        methods : {
          changeIndex(i){
            this.index = i;
          }
        }
    }
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
@font-face {
  font-family: iconfont;
  src: url("../../font/iconfont.svg"), url("../../font/iconfont.woff"), url("../../font/iconfont.eot"), url("../../font/iconfont.ttf");
}
footer {
  width: 100%;
  height: 0.44rem;
  position: fixed;
  bottom : 0;
  left :0;
  box-shadow : 0 -1px 1px #eaeaea;
  background : #fff;
  z-index : 100;
}
a{
  text-decoration: none;
  color : #333;
}
footer div{
  width: 25%;
  height: 0.44rem;
  float: left;
  text-align: center
}
footer div a{
  float: left;
  display: block;
  width: 100%;
  text-align: center;
  font-size: 0.09rem;
  padding-top: 0.1rem;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
}
footer div span {
  display: block;
  height: 0.17rem;
  font-size: 0.16rem;
  font-family: iconfont;
}
footer div .index_ico {
  font-size: 0.3rem;
  line-height: .5;
}
footer div b {
  display: block;
  height: 0.14rem;
}
footer .active {
  color: #00a5ff;
}

.clearfloat {
  clear: both;
}

.fl {
  float: left;
}

.fr {
  float: right;
}
</style>