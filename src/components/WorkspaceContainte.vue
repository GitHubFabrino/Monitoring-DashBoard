<template>
  <div class="w-[100%] pt-3">
    <div class="w-full mb-2 pl-5 text-[#2d4051]">
      <h4>
      {{ show.activeMenu }} /
        <span>{{ show.activeMenuItem }}</span>
      </h4>
    </div>
    <div class=" h-[520px] w-full mx-auto flex justify-center items-center px-5">
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
      <WorkspaceEstimation v-if="show.showEstimation" />
      <WorkspaceEstimationDetails v-if="show.showEstimationDetails" />
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
import WorkspaceEstimation from "@/components/containtes/WorkspaceEstimation.vue";
import WorkspaceEstimationDetails from "@/components/containtes/WorkspaceEstimationDetails.vue";


const show = useShow();
</script>

<style scoped>
.card1 {
  /* background-color: #f6f8fa; */
  width: 96%;
  height: 76vh;
  margin: 0 auto;
  align-content: center;
}

.nav1 {
  width: 100%;
  margin-bottom: 10px;
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
