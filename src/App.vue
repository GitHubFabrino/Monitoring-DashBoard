<script setup>
import WorkspaceUsers from "./views/WorkspaceUsers.vue";
import WorkspaceProfil from "./components/WorkspaceProfil.vue";
import WorkspaceDeconnexion from "./components/WorkspaceDeconnexion.vue";
import WorkspaceAddContact from "./components/WorkspaceAddContact.vue";
import WorkspaceSupprimer from "./components/WorkspaceSupprimer.vue";
import WorkspaceModifierContact from "./components/WorkspaceModifierContact.vue";
import WorkspaceAddContactEntreprise from "./components/WorkspaceAddContactEntreprise.vue";
import WorkspaceModifierContactEntreprise from "./components/WorkspaceModifierContactEntreprise.vue";
import WorkspaceProfilModifier from "./components/WorkspaceProfilModifier.vue";
import WorkspaceLogin from "./views/WorkspaceLogin.vue";
import Alert from "@/components/Alert.vue";
import { useShow } from "./stores/show";
import WorkspaceSinginUp from "./views/WorkspaceSinginUp.vue";
import { Cookies } from "./plugins/cookies";
import { onBeforeMount } from "vue";

import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";

import InputText from "primevue/inputtext";

const show = useShow();
const cookies = new Cookies();

onBeforeMount(() => {
  if (
    cookies.get("accessToken") &&
    cookies.get("idPersonne") &&
    cookies.get("status")
  )
    show.showUserFunc();
  else show.showLoginFunc();
});
</script>

<template>
  <div class="app">
    <WorkspaceLogin v-if="false" />
    <WorkspaceSinginUp v-if="true" />

    <Teleport to="body">
      <WorkspaceProfil />
    </Teleport>
  </div>
</template>

<style scoped>
.app {
  background-color: red;
}
</style>
