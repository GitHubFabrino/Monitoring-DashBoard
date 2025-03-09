
<template>
  <Transition>
    <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px] z-50"
      @click="show.showDoingMaintenance = !show.showDoingMaintenance"
      v-if="show.showDoingMaintenance"
    >
      <div class="formModal" @click.stop>
        <div class="w-full h-[440px]">
          <div class="flex items-center justify-between">
            <div class="flex items-center mb-2">
              <div
                class="w-[40px] h-[40px] flex justify-center items-center"
                @click="show.showDoingMaintenance = !show.showDoingMaintenance"
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
                Faire cette maintenance
              </h2>
            </div>
            <div class="block text-gray-700 font-bold mb-2 mr-2 text-sm">
              Fréquence : {{ frequence }}
            </div>
          </div>

          <div class="flex justify-between w-full px-4 text-sm">
            <div class="w-[45%]">
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Date :</div>
                <input
                  type="date"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  v-model="date_execution"
                />
              </div>

              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Batterie :</div>
                <select
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  v-model="batterie_id"
                >
                  <option disabled value="">Sélectionnez une batterie</option>
                  <option
                    v-for="batterie in batterie.allBatteryData"
                    :key="batterie.id"
                    :value="batterie.id"
                  >
                    {{ batterie.nom }}
                  </option>
                </select>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">
                  Type d'Intervention :
                </div>
                <select
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  v-model="type_intervention"
                >
                  <option value="" disabled>Préventive / Corrective</option>
                  <option value="preventive">Préventive</option>
                  <option value="corrective">Corrective</option>
                </select>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Tâche :</div>
                <textarea
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  placeholder="(Sélectionner la tâche réalisée)"
                  rows="2"
                  v-model="tache"
                ></textarea>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Description :</div>
                <textarea
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  placeholder="Décrivez la maintenance"
                  rows="4"
                  v-model="description"
                ></textarea>
              </div>
            </div>
            <div class="w-[45%] flex flex-col justify-center items-center">
              <div class="mb-2 w-full">
                <div class="block text-gray-700 font-bold">
                  Nom du Technicien :
                </div>

                <select
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-white focus:outline-none"
                  v-model="technicien_nom"
                >
                  <option
                    v-for="personnel in personnel.personnelData"
                    :key="personnel.id"
                    :value="personnel.id"
                  >
                    {{ personnel.name }}
                  </option>
                </select>
              </div>
              <div class="mb-4 w-full">
                <div class="block text-gray-700 font-bold mb-2">
                  Travaux Réalisés :
                </div>
                <textarea
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  placeholder="Décrivez les travaux réalisés"
                  rows="4"
                  v-model="travaux_realises"
                ></textarea>
              </div>
              <div class="mb-4 w-full">
                <div class="block text-gray-700 font-bold mb-2">Images :</div>
                <div
                  class="shadow appearance-none border rounded w-full p-1 text-gray-700 leading-tight flex"
                >
                  <div
                    @click="
                      show.showImageMaintenance = !show.showImageMaintenance
                    "
                    class="w-[100px] h-[100px]   m-1 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  >
                    <div class="cardFile">
                      <img
                        v-if="show.showDoingMaintenanceData?.files?.[0]?.file_url"
                        :src="show.showDoingMaintenanceData?.files[0]?.file_url"
                        alt=""
                        class="card-image object-containe"
                      />

                      <div class="absolute">
                        <div class="file-input-container">
                          <input
                            type="file"
                            @change="
                              (event) => onFileChange(event, show.showDoingMaintenanceData?.maintenance.id)
                            "
                            id="file-upload"
                          />
                          <label for="file-upload" class="file-input-label">
                            <i class="pi pi-camera"></i>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    @click="
                      show.showImageMaintenance = !show.showImageMaintenance
                    "
                    class="w-[100px] h-[100px]   m-1 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  >
                    <div class="cardFile">
                      <img
                        v-if="show.showDoingMaintenanceData?.files?.[1]?.file_url"
                        :src="show.showDoingMaintenanceData?.files[1]?.file_url"
                        alt=""
                        class="card-image object-containe"
                      />

                      <div class="absolute">
                        <div class="file-input-container">
                          <input
                            type="file"
                            @change="
                              (event) => onFileChange(event, show.showDoingMaintenanceData?.maintenance.id)
                            "
                            id="file-upload"
                          />
                          <label for="file-upload" class="file-input-label">
                            <i class="pi pi-camera"></i>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    @click="
                      show.showImageMaintenance = !show.showImageMaintenance
                    "
                    class="w-[100px] h-[100px]   m-1 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  >
                    <div class="cardFile">
                      <img
                        v-if="show.showDoingMaintenanceData?.files?.[2]?.file_url"
                        :src="show.showDoingMaintenanceData?.files[2]?.file_url"
                        alt=""
                        class="card-image object-containe"
                      />

                      <div class="absolute">
                        <div class="file-input-container">
                          <input
                            type="file"
                            @change="
                              (event) => onFileChange(event, show.showDoingMaintenanceData?.maintenance.id)
                            "
                            id="file-upload"
                          />
                          <label for="file-upload" class="file-input-label">
                            <i class="pi pi-camera"></i>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    @click="
                      show.showImageMaintenance = !show.showImageMaintenance
                    "
                    class="w-[100px] h-[100px]   m-1 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  >
                    <div class="cardFile">
                      <img
                        v-if="show.showDoingMaintenanceData?.files?.[3]?.file_url"
                        :src="show.showDoingMaintenanceData?.files[3]?.file_url"
                        alt=""
                        class="card-image object-containe"
                      />

                      <div class="absolute">
                        <div class="file-input-container">
                          <input
                            type="file"
                            @change="
                              (event) => onFileChange(event, show.showDoingMaintenanceData?.maintenance.id)
                            "
                            id="file-upload"
                          />
                          <label for="file-upload" class="file-input-label">
                            <i class="pi pi-camera"></i>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="w-[50%] bg-indigo-500 flex justify-center items-center py-2 text-white font-bold rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                @click="addMaintenance"
              >
                <h1>Enregistrer</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup>
import { useShow } from "@/stores/show";
import { useMaintenanceStore } from "@/stores/maintenanceStore";
import { ref, onMounted, watch } from "vue";
import { parcStore } from "@/stores/parcStore";
import { useBatterie } from "@/stores/batterieStore";
import { personnelStore } from "@/stores/personnel";
import axios from "axios";

const show = useShow();
const maintenanceStore = useMaintenanceStore();
const useParc = parcStore();
const batterie = useBatterie();
const personnel = personnelStore();

// {{ show.showDoingMaintenanceData }}
const date_execution = ref(
  show.showDoingMaintenanceData?.maintenance.date_execution
);
const batterie_id = ref(show.showDoingMaintenanceData?.batterie.id);
const type_intervention = ref(
  show.showDoingMaintenanceData?.maintenance.type_intervention
);
const tache = ref(show.showDoingMaintenanceData?.maintenance.tache);
const description = ref(show.showDoingMaintenanceData?.maintenance.details);
const travaux_realises = ref("");
const technicien_nom = ref("");
const frequence = ref("");
const dataComplete = ref();

function remplirParDefaut() {
  dataComplete.value = show.showDoingMaintenanceData;
  date_execution.value =
    show.showDoingMaintenanceData?.maintenance.date_execution;
  batterie_id.value = show.showDoingMaintenanceData?.batterie.id;
  type_intervention.value =
    show.showDoingMaintenanceData?.maintenance.type_intervention;
  tache.value = show.showDoingMaintenanceData?.maintenance.tache;
  description.value = show.showDoingMaintenanceData?.maintenance.details;
  frequence.value = show.showDoingMaintenanceData?.maintenance.frequence;
}

// Charger les parcs au montage du composant
onMounted(() => {
  show.showDoingMaintenanceData ? remplirParDefaut() : "";

  try {
    const parcid = useParc.parcSuperviser?.id;
    batterie.getBatteriesByParcId(parcid);
  } catch (error) {
    console.error(error);
  }
});

watch(
  () => show.showDoingMaintenanceData,
  () => {
    remplirParDefaut();
  }
);

watch(
  () => useParc?.parcSuperviser?.id,
  (newId, oldId) => {
    console.log("niova", newId, oldId);
    if (newId) {
      personnel.getUsersByParc();
    }
  }
);

onMounted(() => {
  if (useParc?.parcSuperviser?.id) {
    personnel.getUsersByParc();
  }
});

// Fonction pour ajouter une maintenance
const addMaintenance = () => {
  const maintenanceData = {
    user_id: technicien_nom.value,
    complete: 1,
    travaux_realiser: travaux_realises.value,
  };
  console.log("Maintenance Data:", maintenanceData);
  console.log("Maintenance Data Id:", dataComplete.value.maintenance.id);
  maintenanceStore.updateMaintenance(
    dataComplete.value.maintenance.id,
    maintenanceData
  );
};

const onFileChange = async (event, IdMaint) => {
  const file = event.target.files[0];
  if (!file) {
    console.warn("Aucun fichier sélectionné.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      `http://localhost:8000/api/maintenance/${IdMaint}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Mettre à jour la liste des fichiers après upload
    await getFilesByMaintenanceId(IdMaint);

    console.log("Upload réussi :", response.data.url);
  } catch (error) {
    console.error("Erreur lors de l'upload du fichier :", error.response || error);
  }
};

// Fonction pour récupérer les fichiers liés à une maintenance
const getFilesByMaintenanceId = async (IdMaint) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/maintenanceFiles/${IdMaint}`
    );

    // Mise à jour du store avec les fichiers récupérés
    maintenanceStore.maintenanceDataModifier.files = response.data.files;
    show.showDoingMaintenanceData.files=response.data.files;

    console.log("Fichiers récupérés :", maintenanceStore.maintenanceDataModifier.files);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des fichiers :",
      error.response || error
    );
  }
};

// Charger les fichiers associés à la maintenance au montage
onMounted(() => {
  try {
    const IdMaint = maintenanceStore.maintenanceDataModifier?.maintenance?.id;
    if (IdMaint) {
      getFilesByMaintenanceId(IdMaint);
    } else {
      console.warn("Aucune maintenance sélectionnée pour récupérer les fichiers.");
    }
  } catch (error) {
    console.error("Erreur lors du montage du composant :", error);
  }
});
</script>
<style scoped>
.formModal {
  width: 75%;
  height: 550px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}

.cardFile {
  width: 100%;
  height: 100%;
  background-color: #b2b0b030;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image {
  width: 100%;
  height: 100%;
  border-radius: 5px 5px 0px 0px;
  box-sizing: border-box;
  object-fit: cover; /* Cette propriété permet de conserver le ratio de l'image tout en la remplissant */
}

input[type="file"] {
  display: block;
  margin-top: 10px;
}

.file-input-container {
  position: relative;
  width: 30px;
  height: 30px;
  /* background-color: #f5572c; */
}

.file-input-label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #e1dada;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
}

.file-input-label i {
  color: #555;
}

input[type="file"] {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
