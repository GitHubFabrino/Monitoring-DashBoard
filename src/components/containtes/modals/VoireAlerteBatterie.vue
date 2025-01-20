<script setup>
import { onMounted, ref } from "vue";
import { useShow } from "@/stores/show";
import { useBatterie } from "@/stores/batterieStore";
import { parcStore } from "@/stores/parcStore";
import { useAlerteBatterieStore } from "@/stores/alerteBatterie";
const show = useShow();
const batterie = useBatterie();
const useParc = parcStore();
const alerteBatterieStore = useAlerteBatterieStore();

const details = ref("");
const batterie_id = ref("");
const marque = ref("");

// Charger les parcs au montage du composant
onMounted(() => {
  try {
    const parcid = useParc.parcSuperviser.id;
    batterie.getBatteriesByParcId(parcid);
  } catch (error) {
    console.error(error);
  }
});

function formatDateTime(dateString) {
  const date = new Date(dateString);

  const mois = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ]; // Récupérer le jour, le mois et l'année
  const jour = date.getDate();
  const moisNom = mois[date.getMonth()];
  const annee = date.getFullYear();

  const heures = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Construire la chaîne de date et heure formatée
  return `${jour} ${moisNom} ${annee} à ${heures}h${minutes}`;
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showVoirAlerteData">
      <div class="formModal">
        <div class="titre">
          <h2>Alerte</h2>
        </div>
        <div class="name">
          <h5>{{ alerteBatterieStore.voirAlerteData.batterie.nom }}</h5>
        </div>
        <div class="msg">
          <h3>{{ alerteBatterieStore.voirAlerteData.message }}</h3>
        </div>
        <div class="msg">
          <h6>
            recu via : {{ alerteBatterieStore.voirAlerteData.contact.valeur }}
          </h6>
        </div>
        <div class="msg">
          <h6>
            {{ formatDateTime(alerteBatterieStore.voirAlerteData.created_at) }}
          </h6>
        </div>
      </div>
      <div
        class="closeForm"
        @click="show.showVoirAlerteData = !show.showVoirAlerteData"
      >
        <i class="pi pi-times" style="font-size: 18px; color: #2d4051"></i>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.titre {
  padding: 10px 20px;
  border-bottom: 2px solid rgb(213, 212, 212);
  background-color: #2d405113;
}
.titre h2 {
  color: #b0b1b2;
  font-size: 20px;
  font-weight: 700;
}
.name {
  padding: 10px;
  /* background-color: red; */
}
.msg {
  padding: 10px;
}
.msg h3 {
  font-weight: 600;
}
.name h5 {
  font-size: 30px;
  font-weight: 900;
}
.btn {
  border: none;
  width: 35%;
  padding: 10px;
  border-radius: 4px;
  font-weight: 600;
}
.enregistrer {
  background-color: #2d4051;
  color: #fff;
}
span {
  color: red;
}
.closeForm {
  background-color: rgb(231, 230, 230);
  width: 40px;
  height: 40px;
  border-radius: 100%;
  position: absolute;
  right: 425px;
  top: 300px;
  align-items: center;
  display: flex;
  justify-content: center;
}
.showModal {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(92, 90, 90, 0.927);
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  background: rgba(43, 38, 38, 0.801);
  justify-content: center;
  align-items: center;
}

.formModal {
  width: 30%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}

.itemContainer {
  width: 100%;
  margin: 10px 2px;
}

.input {
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #a2a2a9;
  color: #6b6e72;
}

.input:hover {
  background-color: #eaeaea;
}
</style>
