<template>
  <div class="container">
    <div class="sideBar">
      <div class="logo">Logo</div>
    </div>
    <div class="cont">
      <WorkspaceNavigation />
      <div class="containte">containte</div>
    </div>
  </div>
</template>

<script setup>
import WorkspaceNavigation from "@/components/WorkspaceNavigation.vue";
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
}
.sideBar {
  width: 20%;
  background-color: #2f333e;
  padding: 0px 20px 20px 20px;
  border-right: 1px solid rgba(110, 110, 110, 0.235);
}
.logo {
  background-color: brown;
  height: 10vh;
  text-align: center;
}

.cont {
  width: 80%;
  background-color: #2f333e;
}

.containte {
  background-color: #1d222b;
  height: 90vh;
  padding: 20px;
  box-shadow: 0px 0px 2px rgb(110, 110, 110);
  border-radius: 4px;
}
</style>
