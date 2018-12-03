<template>
    <div >
        <div class="banner">
            <a href="javascript:;" class="btn" v-for="(v,i) in $store.state.shopTypeList[index]" :key="i" @click="toDetail(v._id,v.shopTypeName)">
                <div class="pic"><img :src="v.shopTypePic | imgUrl" alt=""></div>
                <p>{{v.shopTypeName}}</p>
            </a>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import shopType from "./shopType"
    export default {
        name : "banner",
        props : ["index"],
        components : {
            shopType
        },
        methods : {
            toDetail(id,name){
                this.$router.push("/detail/"+id +"/"+name);
                // this.$store.commit("CHANGE_COM",2)
            }
        },
        mounted() {
        },
    }
</script>

<style scoped>
.banner{
    width: 100%;
    height: 1.53rem;
}
.btn {
  width: 20%;
  float: left;
  margin-bottom: 0.1rem;
  font-size: 0.1rem;
  text-decoration: none;
  color : #333
}
.btn .pic {
  display: flex;
  justify-content: center;
  align-content: center;
}
 .btn .pic img {
  width: 0.42rem;
  height: 0.42rem;
}
 .btn p {
  
  text-align: center;
}
</style>