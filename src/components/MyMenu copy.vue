<template>
  <div>
    <!-- {{menulist}} -->
    <el-menu>
      <template v-for="ment in menulist">
        <!-- <p :key="ment.name">{{ment.name}}</p> -->
        <el-submenu v-if="ment.children"
                    :key="ment.name"
                    :index="ment.name">
          <template slot="title">
            <router-link :to="ment.path">{{ment.name}}</router-link>
          </template>
          <el-menu-item :index="ment.children[0].name">
            <router-link :to="ment.children[0].path">{{ment.children[0].name}}</router-link>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else
                      :key="ment.name">
          <router-link :to="ment.path">{{ment.name}}</router-link>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MyMenu",
  computed: {
    ...mapState("route", ["menulist"])
  }
};
</script>

<style>
</style>