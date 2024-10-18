<template>
  <div class="container">
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
/* aa */

.container {
  height: 100vh;
  display: flex;
}

.cont {
  width: 80%;
  background-color: #2f333e;
}

.containte {
  background-color: #e9f0f6;
  height: 90vh;
  padding: 20px;
  /* box-shadow: 0px 0px 2px rgb(110, 110, 110); */
  /* border-radius: 4px; */
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
</style>
