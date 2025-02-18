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
    const parcid = useParc.parcSuperviser?.id;
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
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px] z-50" v-if="show.showVoirAlerteData" @click="show.showVoirAlerteData = !show.showVoirAlerteData">
      <div
        class="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8 w-[30%]"
        role="alert"
        @click.stop
      >
        <div class="flex items-center gap-4">
          <span class="shrink-0 rounded-full !bg-blue-400 p-2 text-white">
            <svg
              class="size-4"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 
                18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                fill-rule="evenodd"
              />
            </svg>
          </span>

          <p class="font-medium sm:text-lg">Alerte</p>
        </div>

        <!-- <p class="mt-4 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea quo
          unde vel adipisci blanditiis voluptates eum. Nam, cum minima?
        </p> -->
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

        <div class="mt-6 sm:flex sm:gap-4">
          <a
            @click="show.showVoirAlerteData = !show.showVoirAlerteData"
            class="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
            href="#"
          >
            Fermer
          </a>

        </div>
      </div>

    </div>
  </Transition>
</template>

<style scoped>
.titre {
  /* padding: 10px 20px; */
  border-bottom: 2px solid rgb(213, 212, 212);
  /* background-color: #2d405113; */
  display: flex;
  justify-content: space-between;
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
  /* position: absolute;
  right: 33vw;
  top: 25vh; */
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
