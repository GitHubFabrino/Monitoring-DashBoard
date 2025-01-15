<script setup>
import WorkspaceLogin from "./views/WorkspaceLogin.vue";
import WorkspaceDashBoard from "./views/WorkspaceDashBoard.vue";
import { useShow } from "./stores/show";
import WorkspaceSinginUp from "./views/WorkspaceSinginUp.vue";
import { Cookies } from "./plugins/cookies";
import "material-icons/iconfont/material-icons.css";
import BatterieDetail from "@/components/containtes/modals/BatterieDetail.vue";
import AjoutCalendrierMaintenance from "@/components/containtes/modals/AjoutCalendrierMaintenance.vue";
import CreationBatterieParam from "@/components/containtes/modals/CreationBatterieParam.vue";
import SpinnerComponent from "@/components/containtes/modals/SpinnerComponent.vue";
import AlertComponent from "@/components/containtes/modals/AlertComponent.vue";
import ProfilUser from "./components/containtes/modals/ProfilUser.vue";
import Logout from "./components/containtes/modals/Logout.vue";
import NotificationComponent from "./components/containtes/modals/NotificationComponent.vue";

const show = useShow();
const cookies = new Cookies();
if (
  document.cookie.includes("access_token") &&
  localStorage.getItem("user") &&
  localStorage.getItem("user") !== ""
) {
  show.showDashBoard = true;
  show.showLogin = false;
} else {
  show.showDashBoard = false;
  show.showLogin = true;
}
</script>

<template>
  <div class="app">
    <WorkspaceLogin v-if="show.showLogin" />
    <WorkspaceSinginUp v-if="show.showSingUp" />
    <WorkspaceDashBoard v-if="show.showDashBoard" />

    <Teleport to="body">
      <BatterieDetail />
    </Teleport>
    <Teleport to="body">
      <AjoutCalendrierMaintenance />
    </Teleport>
    <Teleport to="body">
      <CreationBatterieParam />
    </Teleport>
    <Teleport to="body">
      <SpinnerComponent />
    </Teleport>
    <Teleport to="body">
      <AlertComponent />
    </Teleport>
    <Teleport to="body">
      <ProfilUser />
    </Teleport>
    <Teleport to="body">
      <Logout />
    </Teleport>
    <Teleport to="body">
      <NotificationComponent />
    </Teleport>
  </div>
</template>

<style scoped></style>
