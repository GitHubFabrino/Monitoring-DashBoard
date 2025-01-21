<template>
  <div class="container1">
    <WorkspaceSideBar />
    <div class="cont">
      <WorkspaceNavigation />
      <div class="containte">
        <WorkspaceContainte />
      </div>
    </div>
  </div>
</template>

<script setup>
import WorkspaceNavigation from "@/components/WorkspaceNavigation.vue";
import WorkspaceSideBar from "@/components/WorkspaceSideBar.vue";
import WorkspaceContainte from "@/components/WorkspaceContainte.vue";
</script>

<style scoped>
.container1 {
  display: flex;
  overflow: hidden;
  width: 200%;
  height: 100vh;
  background-color: rgb(244, 230, 230) !important;
}
.cont {
  flex-grow: 1;
  background-color: #2f333e;
}
.containte {
  flex-grow: 1;
  background-color: #e9f0f6;
  height: 100%;
  padding: 20px;
}
</style>
