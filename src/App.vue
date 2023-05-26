<template>
  <div id="app">
    <UserList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserList from "@/components/UserList.vue";

export default defineComponent({
  name: "App",
  components: {
    UserList,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
