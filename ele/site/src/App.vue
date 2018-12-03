<template>
  <div id="app">
    <router-view/>
    <bottom v-if="$route.meta.isShow"></bottom>
  </div>
</template>

<script>
import bottom from "@/components/bottom"
export default {
  name: 'App',
  components :{
    bottom
  }
}
</script>

<style>
body,ul,li,dl,dt,dd,p,ol,h1,h2,h3,h4,h5,h6,form,img,table,fieldset,legend{margin:0; padding:0;}
ul,li,ol{list-style:none;}
img,fieldset{border:0; }
img{display:block;}
h1,h2,h3,h4,h5,h6{font-weight:100;}
body{ font-family:"微软雅黑";}
input,a{outline:none;}
header {
  height: 0.45rem;
  width: 100%;
  background: #0092ff;
  padding-top: 0.18rem;
  padding-left: 0.1rem;
  box-sizing: border-box;
}
header .addr {
  width: 1.71rem;
  font-size: 0.14rem;
  color: #fff;
  font-weight: bolder;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
