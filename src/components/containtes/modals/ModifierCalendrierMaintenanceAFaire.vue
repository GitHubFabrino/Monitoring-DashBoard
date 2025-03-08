<script setup>
import { useShow } from "@/stores/show";
import { useMaintenanceStore } from "@/stores/maintenanceStore";
import { ref, onMounted } from "vue";
import { parcStore } from "@/stores/parcStore";
import { useBatterie } from "@/stores/batterieStore";

const show = useShow();
const maintenanceStore = useMaintenanceStore();
const useParc = parcStore();
const batterie = useBatterie();


// Charger les parcs au montage du composant
onMounted(() => {
  try {
    const parcid = useParc.parcSuperviser?.id;
    batterie.getBatteriesByParcId(parcid);
  } catch (error) {
    console.error(error);
  }
});

// Fonction pour ajouter une maintenance
const modifier = () => {
  // console.log('tiiiiiiiiii', item);
  const maintenanceData = {
    date_execution: maintenanceStore.maintenanceDataModifier.maintenance.date_execution,
    details: maintenanceStore.maintenanceDataModifier.maintenance.details,
    frequence: maintenanceStore.maintenanceDataModifier.maintenance.frequence,
    tache: maintenanceStore.maintenanceDataModifier.maintenance.tache,
    type_intervention: maintenanceStore.maintenanceDataModifier.maintenance.type_intervention
  };
  console.log("rrrrr", maintenanceData);
  maintenanceStore.updateMaintenance(
    maintenanceStore.idMataitenanceM,
    maintenanceData
  );
};
</script>

<template>
  <Transition>
    <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px] z-50"
      @click="
        show.showModifierMaintenanceAFaire = !show.showModifierMaintenanceAFaire
      "
      v-if="show.showModifierMaintenanceAFaire"
    >
    <div class="formModal" @click.stop>
      <div class="w-full ">
        <div class="flex items-center justify-between">
          <div class="flex items-center mb-2">
            <div
              class="w-[40px] h-[40px] flex justify-center items-center"
              @click="
                  show.showModifierMaintenanceAFaire =
                    !show.showModifierMaintenanceAFaire
                "
            >
              <a
                class="inline-block rounded-full border border-indigo-500 bg-indigo-500 p-1 text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
                href="#"
              >
                <svg
                  class="h-4 w-4 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </a>
            </div>

            <h2 class="text-xl font-bold text-gray-700">
              Modifier cette maintenance A Faire
            </h2>
          </div>
        </div>
        <div class="flex justify-between w-full px-4 text-sm">
          <div class="w-[45%]">

          <div class="mb-2">
                <div class="block text-gray-700 font-bold">Batterie :</div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                {{maintenanceStore.maintenanceDataModifier.batterie.nom}}
                </div>
              </div>

            <div class="mb-2">
              <div class="block text-gray-700 font-bold">Date :</div>
              <input
                type="date"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                v-model="maintenanceStore.maintenanceDataModifier.maintenance.date_execution"
              />
            </div>

            <div class="mb-2">
              <div class="block text-gray-700 font-bold">
                Type d'Intervention :
              </div>
              <select
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none"
                v-model="maintenanceStore.maintenanceDataModifier.maintenance.type_intervention"
              >
                <option value="" disabled>
                  Préventive / Corrective
                </option>
                <option value="preventive">Préventive</option>
                <option value="corrective">Corrective</option>
              </select>
            </div>

            <div class="mb-2">
              <div class="block text-gray-700 font-bold">Tâche :</div>
              <textarea
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                placeholder="Décrivez la tâche"
                rows="2"
                v-model="maintenanceStore.maintenanceDataModifier.maintenance.tache"

              ></textarea>
            </div>
          </div>
          <div class="w-[45%] flex flex-col">
            <div class="mb-1 w-full">
              <div class="block text-gray-700 font-bold">Fréquence :</div>
              <select
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none"
                v-model="maintenanceStore.maintenanceDataModifier.maintenance.frequence"

              >
                <option value="hebdomadaire">Hebdomadaire</option>
                <option value="mensuelle">Mensuelle</option>
                <option value="annuelle">Annuelle</option>
              </select>
            </div>
            <div class="mb-1 w-full">
              <div class="block text-gray-700 font-bold">
                Description
              </div>
              <textarea
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                placeholder="Décrivez la maintenance"
                rows="4"
                v-model="maintenanceStore.maintenanceDataModifier.maintenance.details"

              ></textarea>
            </div>

            <div
              class="w-[50%] bg-indigo-500 flex justify-center items-center py-2 text-white font-bold rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              @click="modifier"
            >
            <h1>Modifier</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </div>
  </Transition>
</template>


<style scoped>
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
  right: 300px;
  top: 300px; */
  align-items: center;
  display: flex;
  justify-content: center;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  width: 75%;
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
