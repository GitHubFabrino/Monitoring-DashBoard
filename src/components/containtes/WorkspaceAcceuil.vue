<template>
  <div  class=" w-full h-full shadow-sm rounded-sm p-10">
    <div v-if="showparc" class="container3">
      <div
        v-if="isGetParc"
        v-for="parcItem in useParc.parcsData"
        :key="parcItem.id"
        class="cardItem1  border border-gray-200 shadow "
      >
        <div class="cardFile">
          <img
            v-if="parcItem.file_id"
            :src="parcItem.file_url"
            alt=""
            class="card-image object-containe"
          />
          
         <div class="absolute">
          <div class="file-input-container " >
            <input
              type="file"
              @change="(event) => onFileChange(event, parcItem.id)"
              id="file-upload"
            />
            <label for="file-upload" class="file-input-label">
              <i class="pi pi-camera"></i>
            </label>
          </div>
         </div>
         
        </div>
        <div class="p-5">
          <h5
                class="text-xl font-bold tracking-tight text-gray-900 mycolortext"
              >
                {{ parcItem.nom_parc }}
              </h5>
            <div class="h-[80px]">
              <p class="mb-2 font-normal text-gray-700 dark:text-gray-400 h-">
              {{ parcItem.description }}
            </p>
            </div>
            <a
              @click="handleParcItemClick(parcItem)"
              class="group relative inline-flex items-center overflow-hidden rounded-sm bg-indigo-600 px-8 py-3 text-white focus:ring-3 colorBg focus:outline-hidden"
              href="#"
            >
              <span class="absolute -end-full transition-all group-hover:end-4">
                <svg
                  class="size-5 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>

              <span class="text-sm font-medium transition-all group-hover:me-4">
                Suppervisé
              </span>
            </a>
          </div>
      </div>

      <div class="containerEmptyParc" v-if="!isGetParc">
        <div class="w-full flex items-center flex-wrap justify-center gap-10">
          <div class="grid gap-4 w-60">
            <svg
              class="mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="125"
              height="131"
              viewBox="0 0 125 131"
              fill="none"
            >
              <path
                d="M0.420654 68.7842C0.420654 34.3298 28.349 6.55554 62.6493 6.55554C96.8982 6.55554 124.865 34.3169 124.865 68.7842C124.865 83.4036 119.829 96.8539 111.376 107.465C99.7244 122.174 81.9191 131 62.6493 131C43.251 131 25.5485 122.11 13.9095 107.465C5.4565 96.8539 0.420654 83.4036 0.420654 68.7842Z"
                fill="#f6b4a274"
              />
              <path
                d="M79.0504 0.608781L79.0504 0.608667L79.0398 0.607237C78.5451 0.540687 78.045 0.5 77.5408 0.5H24.2077C18.772 0.5 14.3651 4.88403 14.3651 10.3009V116.144C14.3651 121.56 18.772 125.944 24.2077 125.944H101.078C106.527 125.944 110.921 121.56 110.921 116.144V31.8189C110.921 31.0754 110.839 30.3445 110.676 29.6268L110.676 29.6266C110.241 27.7171 109.221 25.9432 107.737 24.6014C107.737 24.6012 107.737 24.601 107.736 24.6008L84.1766 3.0858C84.1765 3.08565 84.1763 3.08551 84.1762 3.08537C82.7355 1.75954 80.9542 0.906612 79.0504 0.608781Z"
                fill="white"
                stroke="#f49d85"
              />
              <ellipse
                cx="65.4207"
                cy="65.9999"
                rx="22.7778"
                ry="22.7778"
                fill="#fcd7cd"
              />
              <path
                d="M81.0688 49.9324L81.0686 49.9321C72.3048 41.1815 58.1172 41.1811 49.3659 49.9324C40.602 58.6834 40.6019 72.8839 49.3656 81.6351C58.117 90.3995 72.305 90.3991 81.0688 81.6353C89.82 72.8842 89.82 58.6835 81.0688 49.9324ZM86.3177 44.6839C97.9698 56.3362 97.9698 75.2316 86.3177 86.8839C74.6526 98.5364 55.7695 98.5364 44.1044 86.884C32.452 75.2317 32.452 56.336 44.1044 44.6837C55.7695 33.0313 74.6526 33.0314 86.3177 44.6839Z"
                stroke="#f0b9aa"
              />
              <path
                d="M90.3809 96.9595L83.3998 89.9712C85.6764 88.1961 87.7307 86.1207 89.3998 83.9797L96.3803 90.9673L90.3809 96.9595Z"
                stroke="#fcd7cd"
              />
              <path
                d="M113.474 102.318L113.473 102.318L100.63 89.4866C100.629 89.4861 100.629 89.4856 100.628 89.4852C99.5215 88.3644 97.7182 88.3685 96.6026 89.4841L88.9049 97.1818C87.7989 98.2878 87.8024 100.088 88.9024 101.204L88.9049 101.206L101.752 114.053C104.982 117.284 110.243 117.284 113.474 114.053C116.717 110.809 116.717 105.562 113.474 102.318Z"
                fill="#f4ab97"
                stroke="#f67a57"
              />
              <path
                d="M67.9584 71.0607C67.4332 71.0607 66.9977 70.6252 66.9977 70.0873C66.9977 67.9355 63.7445 67.9355 63.7445 70.0873C63.7445 70.6252 63.309 71.0607 62.771 71.0607C62.2459 71.0607 61.8104 70.6252 61.8104 70.0873C61.8104 65.3739 68.9318 65.3867 68.9318 70.0873C68.9318 70.6252 68.4963 71.0607 67.9584 71.0607Z"
                fill="#f67d5c"
              />
              <path
                d="M76.2197 62.8253H72.1979C71.66 62.8253 71.2245 62.3898 71.2245 61.8519C71.2245 61.3267 71.66 60.8912 72.1979 60.8912H76.2197C76.7576 60.8912 77.1931 61.3267 77.1931 61.8519C77.1931 62.3898 76.7576 62.8253 76.2197 62.8253Z"
                fill="#f67d5c"
              />
              <path
                d="M58.5445 62.8252H54.5227C53.9848 62.8252 53.5493 62.3897 53.5493 61.8517C53.5493 61.3266 53.9848 60.8911 54.5227 60.8911H58.5445C59.0696 60.8911 59.5051 61.3266 59.5051 61.8517C59.5051 62.3897 59.0696 62.8252 58.5445 62.8252Z"
                fill="#f67d5c"
              />
              <rect
                x="31.5317"
                y="17.6666"
                width="33.3333"
                height="2.22222"
                rx="1.11111"
                fill="#f67d5c"
              />
              <rect
                x="31.5317"
                y="108.778"
                width="44.4444"
                height="4.44444"
                rx="2.22222"
                fill="#f67d5c"
              />
              <rect
                x="31.5317"
                y="24.3334"
                width="11.1111"
                height="2.22222"
                rx="1.11111"
                fill="#f67d5c"
              />
              <ellipse
                cx="45.9762"
                cy="25.4445"
                rx="1.11111"
                ry="1.11111"
                fill="#f67d5c"
              />
              <ellipse
                cx="50.4207"
                cy="25.4445"
                rx="1.11111"
                ry="1.11111"
                fill="#f67d5c"
              />
              <ellipse
                cx="54.8651"
                cy="25.4445"
                rx="1.11111"
                ry="1.11111"
                fill="#f67d5c"
              />
            </svg>
            <div>
              <h2
                class="text-center text-black text-lg font-semibold leading-7 pb-1"
              >
                Aucun parc à surveiller
              </h2>
              <p
                class="text-center text-black text-base font-normal leading-relaxed pb-4"
              >
                Créez un parc pour commencer
              </p>

              <div class="flex gap-3">
                <button
                  class="w-full px-3 py-2 rounded-full border border-gray-300 text-gray-900 text-xs font-semibold leading-4"
                >
                  Plus tard
                </button>
                <button
                  @click="show.showNewParc = !show.showNewParc"
                  class="w-full px-3 btnCreer py-2 transition-all duration-500 rounded-full text-white text-xs font-semibold leading-4"
                >
                  Créer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showAssocier" class="container2">
      <div class="con" v-if="isBatExist">
        <svg
          width="256px"
          height="256px"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="#ffa38a"
          stroke="#ffa38a"
          stroke-width="0.00016"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="m 3 1 c -1.644531 0 -3 1.355469 -3 3 v 4 c 0 1.644531 1.355469 3 3 3 h 1 v 1 c 0 1.644531 1.355469 3 3 3 h 6 c 1.644531 0 3 -1.355469 3 -3 v -4 c 0 -1.644531 -1.355469 -3 -3 -3 h -1 v -1 c 0 -1.644531 -1.355469 -3 -3 -3 z m 0 2 h 6 c 0.570312 0 1 0.429688 1 1 v 4 c 0 0.570312 -0.429688 1 -1 1 h -1 c -0.550781 0 -1 0.449219 -1 1 s 0.449219 1 1 1 h 1 c 1.644531 0 3 -1.355469 3 -3 v -1 h 1 c 0.570312 0 1 0.429688 1 1 v 4 c 0 0.570312 -0.429688 1 -1 1 h -6 c -0.570312 0 -1 -0.429688 -1 -1 v -4 c 0 -0.570312 0.429688 -1 1 -1 h 1 c 0.550781 0 1 -0.449219 1 -1 s -0.449219 -1 -1 -1 h -1 c -1.644531 0 -3 1.355469 -3 3 v 1 h -1 c -0.570312 0 -1 -0.429688 -1 -1 v -4 c 0 -0.570312 0.429688 -1 1 -1 z m 0 0"
              fill="#fd987c"
            ></path>
          </g>
        </svg>
        <h1>Associer le dispositif à la plateforme</h1>
        <!-- <input type="text" name="" id="" class="serie" placeholder="Entrer le code"> -->

        <div class="btn" @click="associer()">
          <h4>Associer</h4>
        </div>
      </div>

      <div class="containerEmpty" v-if="!isBatExist">
        <div class="center">
          <!-- <i class="pi pi-globe" style="font-size: 100px; color: #555c6286"></i> -->
          <svg
            width="101px"
            height="101px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="m 8.152344 4.007812 c -0.4375 -0.023437 -0.882813 0.046876 -1.300782 0.222657 c -1.117187 0.460937 -1.851562 1.558593 -1.851562 2.769531 h 2 c 0 -0.40625 0.242188 -0.765625 0.617188 -0.921875 s 0.800781 -0.074219 1.089843 0.214844 c 0.289063 0.289062 0.371094 0.714843 0.21875 1.089843 c -0.15625 0.378907 -0.519531 0.617188 -0.925781 0.617188 c -0.550781 0 -1 0.449219 -1 1 v 2 h 2 v -1.179688 c 0.785156 -0.277343 1.441406 -0.875 1.769531 -1.671874 c 0.464844 -1.117188 0.207031 -2.414063 -0.648437 -3.269532 c -0.535156 -0.535156 -1.242188 -0.835937 -1.96875 -0.871094 z m -0.152344 7.992188 c -0.550781 0 -1 0.449219 -1 1 c 0 0.554688 0.449219 1 1 1 s 1 -0.445312 1 -1 c 0 -0.550781 -0.449219 -1 -1 -1 z m 0 0"
                fill="#2e3434"
              ></path>
              <path
                d="m 7 0 c -1 0 -1 1 -1 1 v 1 h -1 s -0.707031 -0.015625 -1.449219 0.355469 c -0.738281 0.371093 -1.550781 1.3125 -1.550781 2.644531 v 8 s -0.015625 0.707031 0.355469 1.449219 c 0.371093 0.738281 1.3125 1.550781 2.644531 1.550781 h 6 s 0.707031 0.015625 1.449219 -0.355469 c 0.738281 -0.371093 1.550781 -1.3125 1.550781 -2.644531 v -8 c 0 -1.332031 -0.8125 -2.273438 -1.550781 -2.644531 c -0.742188 -0.371094 -1.449219 -0.355469 -1.449219 -0.355469 h -1 v -1 c 0 -1 -1 -1 -1 -1 z m 0 3 h 2 v 0.125 c 0.609375 0.160156 1.171875 0.457031 1.644531 0.875 h 0.355469 c 0.554688 0 1 0.445312 1 1 v 8 c 0 0.554688 -0.445312 1 -1 1 h -1.273438 c -0.355468 0.617188 -1.015624 0.996094 -1.726562 1 c -0.710938 -0.003906 -1.371094 -0.382812 -1.726562 -1 h -1.273438 c -0.554688 0 -1 -0.445312 -1 -1 v -8 c 0 -0.554688 0.445312 -1 1 -1 h 0.355469 c 0.472656 -0.414062 1.035156 -0.710938 1.644531 -0.863281 z m 0 0"
                fill="#2e3436"
                fill-opacity="0.34902"
              ></path>
            </g>
          </svg>
          <h1>Paramétrez vos batteries ou ajoutez-en</h1>
          <div class="btn" @click="retour()">
            <h4>Retourner</h4>
          </div>
        </div>
      </div>
    </div>
    <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px] z-50"
      v-if="showSpinner"
    >
      <div class="spinner-6"></div>
    </div>
    <div v-if="isbat" class="container1">
      <template v-if="dataReceived.length > 0 && dataReceived.length <= 3">
        <BatteryItem
          v-for="(item, index) in dataReceived"
          :key="index"
          :title="titles[index]"
          :progress="store.progress1"
          :color1="colors.progressionTextColor"
          :temperature="parseFloat(temperatures[index])"
          :color2="colors.temperatureColor"
          :parc="
            useParc?.parcSuperviser?.nom_parc || parcSuperviserLocal?.nom_parc
          "
          :batteryIdBat="item.batterie_id"
        />
      </template>
      <template v-else>
        <div class="containerEmpty">
          <div class="center">
            <i
              class="pi pi-globe"
              style="font-size: 100px; color: #555c6286"
            ></i>
            <h1>Aucune donnée reçue</h1>
            <h3 style="color: #7b7d7e">
              Le dispositif n'a pas renvoyé de données
            </h3>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, onBeforeMount } from "vue";
import "primeicons/primeicons.css";
import { Button } from "@/components/ui/button";
import { useProgressStore } from "@/stores/progress";
// import { useMqttStore } from "@/stores/mqttStore";
import BatteryItem from "@/components/containtes/subContaines/BatteryItem.vue";
import mqtt from "mqtt";
import { colors } from "@/service/color";
import { useBatterie } from "@/stores/batterieStore";
import { useShow } from "@/stores/show";
import { useUser } from "@/stores/user";
import { parcStore } from "@/stores/parcStore";
import axios from "axios";
import { useMqttParametreBatterieStore } from "@/stores/mqttParametreStore";
import "@fortawesome/fontawesome-free/css/all.css";
import { useLectureStore } from "@/stores/lectureStore";

const show = useShow();
const user = useUser();
const useParc = parcStore();
const showSpinner = ref(false);
const batterie = useBatterie();

const mqttParametreBatterieStore = useMqttParametreBatterieStore();

const isSelectParc = ref(false);
const isAssocier = ref(false);
const isGetParc = ref(false);

const voirCreatParc = ref(false);
const voirCreatBatterie = ref(false);
const voirCourbe = ref(false);

const showparc = ref(true);
const allIdBat = ref([]);
const showAssocier = ref(false);

const isBatExist = ref(false);

// Store pour le progrès (si utilisé)
const store = useProgressStore();
// const mqttStore = useMqttStore()

// Références pour les températures des batteries
const temperatures = ref([0, 0, 0]);
const titles = ["01", "02", "03"];
const parc = "Parc 01";
const dataReceived = ref([]); // Liste de données reçues par MQTT

const isbat = ref(false);

function recupererValeurs(chaine) {
  return chaine.split("-").map(Number);
}

function associer() {
  showSpinner.value = true;
  showAssocier.value = false;

  let i = [];
  let c = [];
  let cma = [];
  let cmi = [];
  let tema = [];
  let temi = [];
  let tma = [];
  let tmi = [];
  let d = [];
  let s = [];

  console.log("batterie all", batterie.allBatteryData);

  batterie.allBatteryData.forEach((element, index) => {
    if (index >= 3) return;

    let contacta = "";

    element.parc.contacts.forEach((contact) => {
      if (contact.type === "phone") {
        contacta = contact.id;
      }
    });

    let tension = recupererValeurs(element.utilisation_cyclique).map(
      parseFloat
    ); // Convertir en float
    console.log(tension);

    const courant = parseFloat(element.courant) || 0; // Gestion des valeurs non numériques
    const temperature = parseFloat(element.temperature) || 0; // Gestion des valeurs non numériques
    const dodMax = parseFloat(element.dod_max) || 0;

    i.push(element.id); // ID reste en chaîne
    c.push(contacta); // Contact reste en chaîne
    cma.push(courant);
    cmi.push(courant);
    tema.push(temperature + 10); // Ajouter 10 à la température
    temi.push(temperature);
    tma.push(tension[1] || 0); // Tension max (par défaut 0 si invalide)
    tmi.push(tension[0] || 0); // Tension min (par défaut 0 si invalide)
    d.push(dodMax); // DoD max
    s.push(90); // Ajout d'une valeur fixe de 90
  });

  // console.log('i', i);
  // console.log('c', c);
  // console.log('cma', cma);
  // console.log('cmi', cmi);
  // console.log('tema', tema);
  // console.log('temi', temi);
  // console.log('tma', tma);
  // console.log('tmi', tmi);
  // console.log('d', d);
  // console.log('s', s);

  allIdBat.value = i;

  localStorage.setItem("idAssocier", JSON.stringify(i));
  localStorage.setItem("datassocier", JSON.stringify(batterie.allBatteryData));
  mqttParametreBatterieStore.publierDonneesBatteries(
    i,
    c,
    cma,
    cmi,
    tema,
    temi,
    tma,
    tmi,
    d,
    s
  );
  connect();
}

function retour() {
  showAssocier.value = false;
  showparc.value = true;
}

async function handleParcItemClick(parcItem) {
  showAssocier.value = true;
  showparc.value = false;
  isSelectParc.value = true;
  useParc.test = true;
  useParc.parcSuperviserFunc(parcItem);
  parcSuperviserLocal.value = parcItem; // Assurez-vous de stocker l'objet, pas une chaîne JSON
  localStorage.setItem("parcSuperviser", JSON.stringify(parcItem));

  try {
    await batterie.getBatteriesByParcId(parcItem.id);
    isBatExist.value = batterie.allBatteryData?.length != 0;
  } catch (error) {
    isGetParc.value = false;
  }
}

const onFileChange = async (event, parcId) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      `http://localhost:8000/api/parcs/${parcId}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const userId = JSON.parse(localStorage.getItem("user")).user.id;
    await useParc.getParcs(userId, "all");

    const updatedParc = useParc.parcsData.find((parc) => parc.id === parcId);
    if (updatedParc) {
      updatedParc.file = response.data.url; // Assurez-vous que votre API renvoie l'URL de l'image
    }
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image :", error);
  }
};

const parcSuperviserLocal = ref(
  JSON.parse(localStorage.getItem("parcSuperviser"))
);
const isEmpty = (obj) => {
  if (obj == null) {
    return false;
  } else if (obj == undefined) {
    return false;
  } else if (Object.keys(obj).length === 0) {
    return false;
  }
  return true;
};

onBeforeMount(() => {
  useParc.test = false;
});

onMounted(async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("user")).user.id;
    await useParc.getParcs(userId, "all");
    isGetParc.value = useParc.parcsData?.length != 0;
  } catch (error) {
    isGetParc.value = false;
  }
});

const lecture = useLectureStore();
let all = [];
let lastTen = [];

let complet = ref([]);

async function getLEctureBat(idBat) {
  console.log("ici");
  try {
    let data = await lecture.fetchAllLecture(idBat);
    console.log("batterie data", data);
    let reformule;
    data.map((lecture) => {
      const reformule = {
        batterie_id: lecture.batterie_id,
        tension: lecture.tension,
        courant: lecture.courant,
        temperature: lecture.temperature,
        soc: lecture.soc,
        dod: lecture.dod,
        horodatage: lecture.created_at,
      };
      all.push(reformule);
    });
    lastTen = all.slice(-10);
    complet.value.push(lastTen);
  } catch (error) {}
}
async function connect() {
  allIdBat.value.map((id) => {
    getLEctureBat(id);
  });

  console.log("complete", complet.value);

  const client = mqtt.connect("ws://192.168.1.116:9001");

  let isConnected = false;

  const connectionTimeout = setTimeout(() => {
    if (!isConnected) {
      console.error("Connexion au broker MQTT échouée après 5 secondes.");
      isbat.value = false; // Signalement d'un problème de connexion
      showSpinner.value = false; // Arrêt du spinner
    }
  }, 5000);

  // Gestion de l'événement "connect"
  client.on("connect", () => {
    isConnected = true; // La connexion est établie
    clearTimeout(connectionTimeout); // Annule le timeout
    console.log("Connecté au broker MQTT");

    client.subscribe("batteries", (err) => {
      if (err) {
        console.error("Erreur d'abonnement :", err);
      } else {
        console.log('Abonné au topic "batteries"');
      }
    });
  });

  // Gestion des messages reçus
  client.on("message", (topic, message) => {
    try {
      const parsedMessage = JSON.parse(message.toString());

      // Mise à jour des données reçues
      dataReceived.value = parsedMessage;
      console.log("Données reçues :", dataReceived.value[0].batterie_id);

      if (dataReceived.value.length > 0) {
        isbat.value = true; // Les données sont disponibles
        showSpinner.value = false; // Arrêter le spinner

        dataReceived.value.map((e) => {
          console.log("yes", e);
          const lectureData = {
            tension: e.tension,
            courant: e.courant,
            temperature: e.temperature,
            soc: e.soc,
            dod: e.dod,
            batterie_id: e.batterie_id,
          };
          lecture.createLectureNew(lectureData);
        });
      }

      // Mise à jour des températures (converties en nombres)
      temperatures.value = parsedMessage.map((battery) =>
        parseFloat(battery.temperature).toFixed(0)
      );
    } catch (error) {
      console.error("Erreur lors du traitement du message MQTT :", error);
    }
  });

  // Gestion des erreurs
  client.on("error", (err) => {
    console.error("Erreur MQTT :", err);
  });

  // Arrêter le client MQTT lorsque le composant est démonté
  onUnmounted(() => {
    client.end();
  });
}

onMounted(() => {
  try {
    const storedParcSuperviser = JSON.parse(
      localStorage.getItem("parcSuperviser")
    );
    parcSuperviserLocal.value = storedParcSuperviser;
    useParc.parcSuperviser = storedParcSuperviser;

    useParc.test = isEmpty(parcSuperviserLocal.value);
  } catch (error) {
    console.error("Erreur lors de la récupération du localStorage:", error);
  }
  // connect()
});
</script>

<style scoped>
.mycolortext {
  color: #2d4051;
}

/* .cardItem {
  height: 60vh;
  width: 30%;
} */
.showModal {
  /* position: fixed; */
  top: 0;
  width: 100%;
  /* background-color: rgba(216, 213, 213, 0.326); */
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  /* background: rgba(43, 38, 38, 0.801); */
  justify-content: center;
  align-items: center;
}

.spinner-6 {
  width: 80px;
  aspect-ratio: 1;
  display: grid;
  -webkit-mask: conic-gradient(from 15deg, #0000, #000);
  -moz-mask: conic-gradient(from 15deg, #0000, #000);
  mask: conic-gradient(from 15deg, #0000, #000); /* Standard property */
  animation: s6 1s infinite steps(12);
}

.spinner-6,
.spinner-6:before,
.spinner-6:after {
  background: radial-gradient(closest-side at 50% 12.5%, #fb7a58 96%, #0000) 50%
      0/20% 80% repeat-y,
    radial-gradient(closest-side at 12.5% 50%, #fb7a58 96%, #0000) 0 50%/80% 20%
      repeat-x;
}
.spinner-6:before,
.spinner-6:after {
  content: "";
  grid-area: 1/1;
  transform: rotate(30deg);
}
.spinner-6:after {
  transform: rotate(60deg);
}

@keyframes s6 {
  100% {
    transform: rotate(1turn);
  }
}

.colorBg {
  background-color: #fb7a58 !important;
}
.cardParc {
  width: 25%;
  height: 76vh;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  align-content: center;
  background-color: rgb(13, 0, 255);
}
.con {
  width: 100%;
  height: 20vh;
  /* background-color: #f5572c; */
  margin: auto 0px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.con h1 {
  font-size: 20px;
  font-weight: 700;
  color: #2d4051;
}


.containerAcceuil {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  overflow-y: scroll;
  width: 100%;
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
  width: 50px;
  height: 50px;
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
  font-size: 24px;
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

.cardItem1 {

  margin: 10px;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 5px;
  width: 300px;
  height: 450px; 



}
.cardFile {
  width: 100%;
  height: 250px;
  background-color: #b2b0b030;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn {
  background-color: #fb7a58;
  padding: 10px;
  margin-top: 20px;
  width: 20%;
  /* margin: auto 10px; */
  text-align: center;
  border-radius: 5px;
  color: #2d4051;
  font-weight: 600;
  font-size: 12px;
}

.container1 {
  width: 100%;
  height: 76vh;
  /* background-color: red; */
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  align-content: center;
  padding: 10px;
}

.container3 {
  width: 100%;
  height: 76vh;
  /* background-color: red; */
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  align-content: center;
  padding: 10px;
}

.container2 {
  width: 100%;
  height: 76vh;
  /* background-color: red; */
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  align-content: center;
}
.containerEmpty {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  /* background-color: #f5572c; */
}
.containerEmptyParc {
  display: flex;
  align-items: center;
  width: 100%;
  /* background-color: #fb7a58; */
}
.center {
  text-align: center;
  color: #2d4051;
  font-weight: 600;
  font-size: 12px;
  display: flex;
  flex-direction: column;

  align-items: center;
}
.serie {
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
}

.center h1 {
  text-align: center;
  color: #2d4051;
  font-weight: 600;
  font-size: 20px;
  margin-top: 10px;
}
.btnCreer {
  background-color: #fb7a58;
}
.btnCreer:hover {
  background-color: #f5572c;
}
</style>
