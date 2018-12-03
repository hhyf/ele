<template>
    <div id="activity_home">
        <section class="info_link">
            <div class="info_link_main img_bg_1 fl">
                <h3>品质套餐</h3>
                <p>搭配齐全吃的好</p>
                <a href="javascript:;">立即抢购&gt;</a>
            </div>
            <div class="info_link_main img_bg_2 fr">
                <h3>限时抢购</h3>
                <p>超值美味9.9元起</p>
                <a href="javascript:;"><b>1877人</b>正在抢&gt;</a>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name : "activity_home"
    }
</script>

<style scoped>
#activity_home {
  width: 100%;
  padding-left: 0.1rem;
  padding-right: 0.07rem;
  box-sizing: border-box;
  height: 1.22rem;
}
#activity_home .info_link {
  width: 100%;
  height: 1.22rem;
}
#activity_home .info_link .info_link_main {
  width: 49%;
  height: 1.22rem;
  box-sizing: border-box;
  padding-left: 0.13rem;
  padding-top: 0.12rem;
}
#activity_home .info_link .info_link_main h3 {
  font-size: 0.14rem;
}
#activity_home .info_link .info_link_main p {
  font-size: 0.11rem;
  line-height: 0.25rem;
  color: #76717b;
}
#activity_home .info_link .info_link_main a {
  font-size: 0.1rem;
  display: block;
  color: #a9744c;
  text-decoration: none
}
#activity_home .info_link .img_bg_1 {
  background: #f9f9f9 url("../../img/16ff085900d62b8d60fa7e9c6b65dpng.png") no-repeat right bottom/1rem;
}
#activity_home .info_link .img_bg_2 {
  background: #f9f9f9 url("../../img/0fa0ed514c093a7138b0b9a50d61fpng.png") no-repeat right bottom/1rem;
}
#activity_home .info_link .img_bg_2 h3 {
  color: #e70807;
}
.activity_home .info_link .img_bg_2 a {
  color: #323136;
}
activity_home .info_link .img_bg_2 b {
  color: #e70a0a;
}
.fr{
    float: right;
}
.fl{
    float: left;
}
</style>