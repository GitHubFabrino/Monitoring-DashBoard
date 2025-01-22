<template>
  <div class="container1">
    <div v-if="showparc" class="container3">
      <div
        v-if="isGetParc"
        v-for="parcItem in useParc.parcsData"
        :key="parcItem.id"
        class="cardItem1 bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700"
        @click="handleParcItemClick(parcItem)"
      >
        <img class="rounded-t-lg" src="/bg1.png" alt="" height="40vh" />
        <div class="p-5">
          <a href="#">
            <h5
              class="text-xl font-bold tracking-tight text-gray-900 mycolortext"
            >
              {{ parcItem.nom_parc }}
            </h5>
          </a>
          <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">
            {{ parcItem.description }}
          </p>
          <a
            @click="handleParcItemClick(parcItem)"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none colorBg"
          >
            Suppervisé
            <svg
              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
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
        <h1>Associer le dispositif à la plateforme</h1>

        <div class="btn" @click="associer()">
          <h4>Associer</h4>
        </div>
      </div>

      <div class="containerEmpty" v-if="!isBatExist">
        <div class="center">
          <i class="pi pi-globe" style="font-size: 100px; color: #555c6286"></i>
          <h1>Paramétrez vos batteries ou ajoutez-en</h1>
          <div class="btn" @click="retour()">
            <h4>Retourner</h4>
          </div>
        </div>
      </div>
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
          :batteryIdBat="index + 1"
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
import { useMqttParametreBatterieStore } from "@/stores/mqttParametreStore";

const show = useShow();
const user = useUser();
const useParc = parcStore();

const batterie = useBatterie();

const mqttParametreBatterieStore = useMqttParametreBatterieStore();

const isSelectParc = ref(false);
const isAssocier = ref(false);
const isGetParc = ref(false);

const voirCreatParc = ref(false);
const voirCreatBatterie = ref(false);
const voirCourbe = ref(false);

const showparc = ref(true);
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

function associer() {
  isbat.value = true;
  showAssocier.value = false;
  console.log("asso", batterie.allBatteryData);

  // Initialize dataSendToDispositif as an empty array
  let dataSendToDispositif = [];

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

  // Iterate through allBatteryData and build the dataSendToDispositif array
  batterie.allBatteryData.forEach((element, index) => {
    if (index >= 3) return;

    let contacta;

    element.parc.contacts.forEach((contact) => {
      contacta = contact.type === "phone" ? contact.valeur : "";
    });

    i.push(element.id);
    c.push(contacta);
    cma.push(element.parametre_batteries.plage_courant_max);
    cmi.push(element.parametre_batteries.plage_courant_min);
    tema.push(element.parametre_batteries.plage_temperature_max);
    temi.push(element.parametre_batteries.plage_temperature_min);
    tma.push(element.parametre_batteries.plage_tension_max);
    tmi.push(element.parametre_batteries.plage_tension_min);
    d.push(element.parametre_batteries.seuil_alerte_dod);
    s.push(element.parametre_batteries.seuil_alerte_soc);
  });

  console.log("les id", i);
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

  console.log("Parc Supervise : ", useParc.parcSuperviser);

  try {
    await batterie.getBatteriesByParcId(parcItem.id);
    console.log("battery data de parc supervise : ", batterie.allBatteryData);
    isBatExist.value = batterie.allBatteryData?.length != 0;

    console.log("isBatexist", isBatExist.value);
  } catch (error) {
    isGetParc.value = false;
  }
}

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
    console.log("azertyuioqsdfgfffff", useParc.parcsData?.length);
    isGetParc.value = useParc.parcsData?.length != 0;
  } catch (error) {
    isGetParc.value = false;
  }
});

onMounted(() => {
  console.log("Initialisation");

  // JSON.parse(localStorage.getItem("idAssocier")).length === 0
  //   ? (isbat = true)
  //   : (isbat = false);

  try {
    const storedParcSuperviser = JSON.parse(
      localStorage.getItem("parcSuperviser")
    );
    parcSuperviserLocal.value = storedParcSuperviser;
    useParc.parcSuperviser = storedParcSuperviser;
    console.log(
      "Valeur récupérée depuis le localStorage:",
      parcSuperviserLocal.value
    );
    console.log("rrrrr", isEmpty(parcSuperviserLocal.value));
    useParc.test = isEmpty(parcSuperviserLocal.value);
    console.log(useParc.test);
  } catch (error) {
    console.error("Erreur lors de la récupération du localStorage:", error);
  }
  const client = mqtt.connect("ws://192.168.1.116:9001");

  client.on("connect", () => {
    console.log("Connecté au broker MQTT");
    client.subscribe("batteries", (err) => {
      if (err) {
        console.error("Erreur d'abonnement :", err);
      } else {
        console.log('Abonné au topic "batteries"');
      }
    });
  });

  client.on("message", (topic, message) => {
    try {
      const parsedMessage = JSON.parse(message.toString());

      // Mise à jour des données reçues
      dataReceived.value = parsedMessage;

      // Mise à jour des températures (converties en nombres)
      temperatures.value = parsedMessage.map((battery) =>
        parseFloat(battery.temperature).toFixed(0)
      );

      console.log(`Données reçues :`, parsedMessage);
    } catch (error) {
      console.error("Erreur lors du traitement du message MQTT :", error);
    }
  });

  client.on("error", (err) => {
    console.error("Erreur MQTT :", err);
  });

  onUnmounted(() => {
    client.end();
  });
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

.cardItem1 {
  flex: 1 1 250px;
  margin: 10px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  /* text-align: center; */
  /* padding: 20px; */
  box-sizing: border-box;
  border-radius: 5px;
  max-width: 270px; /* Largeur maximale */
  min-width: 250px; /* Largeur minimale */
  min-height: 300px;
  /* max-height: 49vh; */
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
