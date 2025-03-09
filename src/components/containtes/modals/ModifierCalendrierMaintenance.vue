<!-- <script setup>
import { useShow } from "@/stores/show";
import { useMaintenanceStore } from "@/stores/maintenanceStore";
import { ref, onMounted } from "vue";
import { parcStore } from "@/stores/parcStore";
import { useBatterie } from "@/stores/batterieStore";
import axios from "axios";


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
const addMaintenance = () => {
  // console.log('tiiiiiiiiii', item);
  const maintenanceData = {
    details: maintenanceStore.detailsM,
    batterie_id: maintenanceStore.batterie_idM,
    marque: "0",
  };
  console.log("rrrrr", maintenanceData);
  maintenanceStore.updateMaintenance(
    maintenanceStore.idMataitenanceM,
    maintenanceData
  );
};



const onFileChange = async (event, IdMaint) => {
  const file = event.target.files[0];
  if (!file) return;

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
    
    let data =[{
      file_url:response.data.url
    }]
    maintenanceStore.maintenanceDataModifier.files = data
    console.log('upload image', maintenanceStore.maintenanceDataModifier.files[0]);
    getFilesByMaintenanceId(IdMaint);
    
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image :", error);
  }
};

const getFilesByMaintenanceId = async (IdMaint) => {
  try {
    // Effectuer une requête GET vers votre endpoint
    const response = await axios.get(`http://localhost:8000/api/maintenanceFiles/${IdMaint}`);

    // Mettre à jour les données dans votre store ou directement dans une variable
    maintenanceStore.maintenanceDataModifier.files = response.data.files;

    console.log('Fichiers récupérés :', maintenanceStore.maintenanceDataModifier.files);
  } catch (error) {
    console.error('Erreur lors de la récupération des fichiers :', error);
  }
};

// Appeler cette fonction au moment approprié, par exemple au montage du composant
onMounted(() => {
  const IdMaint = maintenanceStore.maintenanceDataModifier.maintenance.id; // Id de la maintenance
  getFilesByMaintenanceId(IdMaint);
});



</script> -->

<script setup>
import { useShow } from "@/stores/show";
import { useMaintenanceStore } from "@/stores/maintenanceStore";
import { ref, onMounted } from "vue";
import { parcStore } from "@/stores/parcStore";
import { useBatterie } from "@/stores/batterieStore";
import axios from "axios";

const show = useShow();
const maintenanceStore = useMaintenanceStore();
const useParc = parcStore();
const batterie = useBatterie();

// Charger les parcs au montage du composant
onMounted(() => {
  try {
    const parcid = useParc.parcSuperviser?.id;
    if (parcid) {
      batterie.getBatteriesByParcId(parcid);
    } else {
      console.warn("Parc superviseur non défini.");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des parcs :", error);
  }
});

// Fonction pour ajouter une maintenance
const modifier = () => {
  const maintenanceData = {
    travaux_realiser: maintenanceStore.maintenanceDataModifier.maintenance.travaux_realiser
  };
  console.log("rrrrr", maintenanceData);
  maintenanceStore.updateMaintenance(
    maintenanceStore.maintenanceDataModifier.maintenance.id,
    maintenanceData
  );
};

// Fonction appelée lorsqu'un fichier est uploadé
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


<template>
  <Transition>
    <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px] z-50"
      @click="
        maintenanceStore.ismodifierMaintenance =
          !maintenanceStore.ismodifierMaintenance
      "
      v-if="maintenanceStore.ismodifierMaintenance"
    >
      <div class="formModal" @click.stop>

        <div class=" w-full h-[440px]">
          <div class="flex items-center justify-between">
            <div class="flex items-center mb-2">
              <div
                class="w-[40px] h-[40px] flex justify-center items-center"
                @click="  maintenanceStore.ismodifierMaintenance =
          !maintenanceStore.ismodifierMaintenance"
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

              <h2 class="text-xl font-bold text-gray-700">Modifier cette maintenance</h2>
            </div>
            <div class="block text-gray-700 font-bold mb-2 mr-2 text-sm">
              Frequence : {{ maintenanceStore.maintenanceDataModifier.maintenance.frequence}}
            </div>
            
          </div>
          <div class="flex justify-between w-full px-4 text-sm">
            <div class="w-[45%]">
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Date : {{ maintenanceStore.maintenanceDataModifier.maintenance.date_execution}}</div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">
                  Nom du Technicien :
                </div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                {{ maintenanceStore.maintenanceDataModifier.maintenance.date_execution}}
                </div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Batterie :</div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                {{ maintenanceStore.maintenanceDataModifier.batterie.nom}}
                </div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">
                  Type d'Intervention :
                </div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                {{ maintenanceStore.maintenanceDataModifier.maintenance.date_execution}}
                </div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Tâche :</div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                {{ maintenanceStore.maintenanceDataModifier.maintenance.tache}}
                </div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Description :</div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                {{ maintenanceStore.maintenanceDataModifier.maintenance.details}}
                </div>
              </div>
            </div>
            <div class="w-[45%] flex flex-col justify-center items-center">
              <div class="mb-4 w-full">
                <div class="block text-gray-700 font-bold mb-2">
                  Travaux Réalisés :
                </div>
                <textarea
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  placeholder="Décrivez la maintenance"
                  rows="4"
                  v-model=" maintenanceStore.maintenanceDataModifier.maintenance.travaux_realiser"
                ></textarea>
              </div>

            

              <div class="mb-4 w-full">
                <div class="block text-gray-700 font-bold mb-2">Images : </div>
                <div
                  class="shadow appearance-none border rounded w-full p-1 text-gray-700 leading-tight flex"
                >

                  <div
                    class="w-[100px] h-[100px] bg-blue-200 m-1 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  >
                    <div class="cardFile">
                      <img
                          v-if="maintenanceStore.maintenanceDataModifier?.files?.[0]?.file_url"
                          :src="maintenanceStore.maintenanceDataModifier?.files[0]?.file_url"
                          alt="Image de la maintenance"
                          class="card-image object-contain"
                      />
                      <div class="absolute">
                        <div class="file-input-container">
                          <input
                            type="file"
                            @change="
                              (event) => onFileChange(event, maintenanceStore.maintenanceDataModifier.maintenance.id)
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
                    class="w-[100px] h-[100px] bg-blue-200 m-1 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  >
                    <div class="cardFile">
                      <img
                          v-if="maintenanceStore.maintenanceDataModifier?.files?.[1]?.file_url"
                          :src="maintenanceStore.maintenanceDataModifier?.files[1]?.file_url"
                          alt="Image de la maintenance"
                          class="card-image object-contain"
                      />
                      <div class="absolute">
                        <div class="file-input-container">
                          <input
                            type="file"
                            @change="
                              (event) => onFileChange(event, maintenanceStore.maintenanceDataModifier.maintenance.id)
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
                    class="w-[100px] h-[100px] bg-blue-200 m-1 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  >
                    <div class="cardFile">
                      <img
                          v-if="maintenanceStore.maintenanceDataModifier?.files?.[2]?.file_url"
                          :src="maintenanceStore.maintenanceDataModifier?.files[2]?.file_url"
                          alt="Image de la maintenance"
                          class="card-image object-contain"
                      />
                      <div class="absolute">
                        <div class="file-input-container">
                          <input
                            type="file"
                            @change="
                              (event) => onFileChange(event, maintenanceStore.maintenanceDataModifier.maintenance.id)
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
                    class="w-[100px] h-[100px] bg-blue-200 m-1 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  >
                    <div class="cardFile">
                      <img
                          v-if="maintenanceStore.maintenanceDataModifier?.files?.[3]?.file_url"
                          :src="maintenanceStore.maintenanceDataModifier?.files[3]?.file_url"
                          alt="Image de la maintenance"
                          class="card-image object-contain"
                      />
                      <div class="absolute">
                        <div class="file-input-container">
                          <input
                            type="file"
                            @change="
                              (event) => onFileChange(event, maintenanceStore.maintenanceDataModifier.maintenance.id)
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

              <div @click="modifier"
                class="w-[50%] bg-indigo-500 flex justify-center items-center py-2 text-white font-bold rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
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
