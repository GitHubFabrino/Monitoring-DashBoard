<template>
  <div>
    <div class="nav">
      <h4>
        Acceuil - {{ show.activeMenu }} /
        <span>{{ show.activeMenuItem }}</span>
      </h4>
    </div>
    <div class="card">
      <WorkspaceAcceuil v-if="show.showAcceuil" />
      <WorkspaceCreationParc v-if="show.showCreationParc" />
      <WorkspaceCalendrierMaintenance v-if="show.showCalendrierM" />
      <WorkspaceRapportPerformance v-if="show.showRapportP" />
      <WorkspacePlageFonctionnement v-if="show.showPlageFonc" />
      <WorkspaceSeuilAlertes v-if="show.showSeuilA" />
      <WorkspaceListeIncidents v-if="show.showListeIncidents" />
      <WorkspaceHistoriqueIncidents v-if="show.showHistoIncidents" />
      <WorkspaceVisualisationDonnes v-if="show.showVisualisationD" />
      <WorkspaceCompressionDonnes v-if="show.showConpressionD" />
      <WorkspaceRapprotMensuel v-if="show.showRapportMensuel" />
      <WorkspaceRecommendation v-if="show.showRecommendation" />
    </div>
  </div>
</template>

<script setup>
import { useShow } from "@/stores/show";
import WorkspaceAcceuil from "@/components/containtes/WorkspaceAcceuil.vue";

import WorkspaceCreationParc from "@/components/containtes/WorkspaceCreationParc.vue";
import WorkspaceCalendrierMaintenance from "@/components/containtes/WorkspaceCalendrierMaintenance.vue";
import WorkspaceCompressionDonnes from "@/components/containtes/WorkspaceCompressionDonnes.vue";
import WorkspaceHistoriqueIncidents from "@/components/containtes/WorkspaceHistoriqueIncidents.vue";
import WorkspaceListeIncidents from "@/components/containtes/WorkspaceListeIncidents.vue";
import WorkspacePlageFonctionnement from "@/components/containtes/WorkspacePlageFonctionnement.vue";
import WorkspaceRapportPerformance from "@/components/containtes/WorkspaceRapportPerformance.vue";
import WorkspaceRapprotMensuel from "@/components/containtes/WorkspaceRapprotMensuel.vue";
import WorkspaceRecommendation from "@/components/containtes/WorkspaceRecommendation.vue";
import WorkspaceSeuilAlertes from "@/components/containtes/WorkspaceSeuilAlertes.vue";
import WorkspaceVisualisationDonnes from "@/components/containtes/WorkspaceVisualisationDonnes.vue";

const show = useShow();
</script>

<style scoped>
.card {
  background-color: #f6f8fa;
  width: 96%;
  height: 76vh;
  margin: 0 auto;
  align-content: center;
}

.nav {
  width: 100%;
  margin-bottom: 20px;
  padding-left: 20px;
  color: #2d4051;
}
.nav h4 {
  font-weight: 700;
}
span {
  color: #328ca8;
  font-weight: 700;
}
</style>
