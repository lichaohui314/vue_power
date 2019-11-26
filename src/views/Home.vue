<template>
  <div class="home">
    这是首页
    <button v-has="'edit_button'">编辑</button>
    <button v-has="'dele_button'">删除</button>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  components: {}
};
</script>
