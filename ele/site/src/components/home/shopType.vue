<template>
    <div class="shopType">
        <a href="javascript:;" class="btn">
            <div class="pic"><img src="../../img/a867c870b22bc74c87c348b75528djpeg.jpeg" alt=""></div>
            <p>美食</p>
        </a>
    </div>
</template>

<script>
    export default {
        name : "shopType"
    }
</script>

<style scoped>
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