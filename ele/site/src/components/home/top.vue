<template>
    <header>
        <div class="addr">当前地址：正义路北京市人民政府，轻点两下重新选择</div>
    </header>
</template>

<script>
    export default {
        name : "top"
    }
</script>

<style scoped>
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