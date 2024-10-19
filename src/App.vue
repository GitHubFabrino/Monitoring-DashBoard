<script setup>
import WorkspaceLogin from "./views/WorkspaceLogin.vue";
import WorkspaceDashBoard from "./views/WorkspaceDashBoard.vue";
import { useShow } from "./stores/show";
import WorkspaceSinginUp from "./views/WorkspaceSinginUp.vue";
import { Cookies } from "./plugins/cookies";
import "material-icons/iconfont/material-icons.css";
import BatterieDetail from "@/components/containtes/modals/BatterieDetail.vue";

const show = useShow();
const cookies = new Cookies();
</script>

<template>
  <div class="app">
    <WorkspaceLogin v-if="show.showLogin" />
    <WorkspaceSinginUp v-if="show.showSingUp" />
    <WorkspaceDashBoard v-if="show.showDashBoard" />

    <Teleport to="body">
      <BatterieDetail />
    </Teleport>
  </div>
</template>

<style scoped></style>
