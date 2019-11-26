<template>
  <div id="app">
    <div id="nav">
      <MyMenu :menulist="menulist"></MyMenu>
    </div>
    <router-view />
  </div>
</template>
<script>
import MyMenu from "./components/MyMenu";
import { mapState } from "vuex";
export default {
  components: {
    MyMenu
  },
  computed: {
    ...mapState("route", ["menulist"])
  }
};
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  width: 200px;
  position: absolute;
  left: 0px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
