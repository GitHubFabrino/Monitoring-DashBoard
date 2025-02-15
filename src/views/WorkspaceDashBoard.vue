<template>
  <div class="flex overflow-hidden w-[200%] h-screen bg-[#f4e6e6]">
    <WorkspaceSideBar />
    <div class="w-[80%] bg-[#2f333e]">
      <WorkspaceNavigation />
      <div class="w-full bg-[#e9f0f6] h-full ">
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
</style>


