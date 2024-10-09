<template>
  <div class="containerContact">
    <div class="titreContainer">
      <h3>
        Contacts <span v-if="show.clientActive">Clients</span>
        <span v-if="show.entrepriseActive">Entreprises</span>
      </h3>
      <h6>5963 fichiers d'informations</h6>
    </div>
    <div class="selectContact">
      <div class="client" v-if="show.clientActive" @click="show.active()">
        <h4>Clients</h4>
      </div>
      <div
        class="client color"
        v-if="show.clientInactive"
        @click="show.active()"
      >
        <h4>Clients</h4>
      </div>
      <div
        class="entreprise"
        v-if="show.entrepriseActive"
        @click="show.active()"
      >
        <h4>Entreprises</h4>
      </div>
      <div
        class="entreprise color"
        @click="show.active()"
        v-if="show.entrepriseInactive"
      >
        <h4>Entreprises</h4>
      </div>
    </div>
    <WorkspaceClientTable v-if="show.clientActive" />
    <WorkspaceEntrepriseTable v-if="show.entrepriseActive" />
  </div>
</template>

<script setup>
import WorkspaceClientTable from "@/components/WorkspaceClientTable.vue";
import WorkspaceEntrepriseTable from "@/components/WorkspaceEntrepriseTable.vue";
import { useShow } from "../stores/show";

const show = useShow();
</script>

<style scoped>
.containerContact {
  width: 90%;
  /* background-color: aqua; */
  margin: auto;
  padding-top: 40px;
}
h3 {
  padding-left: 20px;
  font-weight: 700;
  color: #328ca8;
  font-size: 25px;
}

.titreContainer {
  margin-bottom: 10px;
}

.selectContact {
  display: flex;
  justify-content: space-between;
  width: 20%;
  /* background-color: #fb7a58; */
}
.client {
  width: 150px;
  /* background-color: rebeccapurple; */
  padding: 8px;
  text-align: center;
  background-color: #e9f0f6;
  cursor: pointer;
}
.client h4,
.entreprise h4 {
  font-weight: 600;
}
.entreprise {
  width: 150px;
  /* background-color: rebeccapurple; */
  padding: 8px;
  text-align: center;
  background-color: #e9f0f6;
  cursor: pointer;
}
.color {
  border: 1px solid #2d405137;
  background-color: #fff;
}
span {
  color: #fb7a58;
}
</style>
