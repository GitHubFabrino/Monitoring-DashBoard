<template>
  <Transition name="sheet" mode="out-in">
    <div class="showModal" v-if="show.showNotificationDetail">
      <div class="cardItem">
        <div class="header">
          <template v-if="!show.showNotificationDetailOne">
            <h2>Notifications</h2>
            <h4>{{ show.competerAlerteBatterieUnRead  }}</h4>
            <div class="icon" @click="show.showNotificationDetailFunc()">
              <i
                class="pi pi-times"
                style="font-size: 16px; font-weight: 900; color: #fb7a58"
              ></i>
            </div>
          </template>
          <template v-else>
            <div class="cardheader">
              <i
                @click="
                  show.showNotificationDetailOne =
                    !show.showNotificationDetailOne
                "
                class="pi pi-arrow-left"
                style="
                  font-size: 16px;
                  font-weight: 900;
                  color: #f7f7f7;
                  margin-right: 20px;
                "
              ></i>
              <div>
                <h4>{{ show.notifData.battery }}</h4>
                <h6>{{ show.notifData.parc }}</h6>
           
              </div>
            </div>

            <div class="icon" @click="show.showNotificationDetailFunc()">
              <i
                class="pi pi-times"
                style="font-size: 16px; font-weight: 900; color: #fb7a58"
              ></i>
            </div>
          </template>
        </div>

        <div class="bodyNotif">
          <template v-if="!show.showNotificationDetailOne">
            <div v-if="alerteBatterieStore.alertes.length === 0" class="notification">
              <div class="notifItem">
                <svg
                width="84px"
                height="84px"
                viewBox="-2.4 -2.4 28.80 28.80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  id="SVGRepo_bgCarrier"
                  stroke-width="0"
                  transform="translate(0,0), scale(1)"
                ></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="#ffffff"
                  stroke-width="0.048"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.6858 5.25049C14.9661 5.36504 15.2375 5.5069 15.4989 5.67268L14.0768 7.09474C13.4417 6.74642 12.7451 6.54545 12.014 6.54545C8.98598 6.54545 6.55028 9.99301 6.61731 13.0789L6.64867 14.5229L4.00243 17.1691C3.96883 16.4103 4.28593 15.5678 4.83409 14.8631L4.83412 13.1192C4.76592 9.97935 6.64516 6.35644 9.33497 5.25342V4.72727C9.33497 4.00395 9.61684 3.31026 10.1186 2.7988C10.6203 2.28734 11.3008 2 12.0104 2C12.72 2 13.4005 2.28734 13.9022 2.7988C14.404 3.31026 14.6858 4.00396 14.6858 4.72727V5.25049ZM12.9022 4.72727C12.9022 4.74573 12.9017 4.76414 12.9006 4.78246C12.6101 4.74603 12.3142 4.72727 12.014 4.72727C11.7113 4.72727 11.413 4.74634 11.1203 4.78335C11.1192 4.76474 11.1186 4.74603 11.1186 4.72727C11.1186 4.48617 11.2126 4.25494 11.3798 4.08445C11.547 3.91396 11.7739 3.81818 12.0104 3.81818C12.2469 3.81818 12.4738 3.91396 12.641 4.08445C12.8083 4.25494 12.9022 4.48617 12.9022 4.72727Z"
                    fill="#ff977a"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.7466 10.0819L18.1266 8.7018C18.8316 10.0755 19.2262 11.6514 19.1938 13.1216L19.1555 14.8576C20.5323 16.6278 20.4826 19.2727 17.0538 19.2727H14.6858C14.6858 19.996 14.404 20.6897 13.9022 21.2012C13.4005 21.7127 12.72 22 12.0104 22C11.3008 22 10.6203 21.7127 10.1186 21.2012C9.61684 20.6897 9.33497 19.996 9.33497 19.2727H7.5557L9.37388 17.4545H17.0538C17.8157 17.4545 18.2267 16.5435 17.7309 15.9538C17.49 15.6673 17.3616 15.3028 17.3699 14.9286L17.4106 13.0808C17.4328 12.0757 17.1894 11.0322 16.7466 10.0819ZM11.1186 19.2727C11.1186 19.5138 11.2126 19.7451 11.3798 19.9156C11.547 20.086 11.7739 20.1818 12.0104 20.1818C12.2469 20.1818 12.4738 20.086 12.641 19.9156C12.8083 19.7451 12.9022 19.5138 12.9022 19.2727H11.1186Z"
                    fill="#ff977a"
                  ></path>
                  <path
                    d="M19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071L19.7071 5.70711Z"
                    fill="#ff977a"
                  ></path>
                </g>
              </svg>
              <h1>Aucun notification</h1>
              </div>
            </div>
            <div
              v-for="notif in alerteBatterieStore.alertes"
              :key="notif.id"
              class="cardNotif"
              :class="notif.read ? 'read' : 'notread'"
            >
              <div class="CardIcon">
                <div class="icon">
                  <i
                    class="pi pi-bolt"
                    style="font-size: 12px; color: #2d4051"
                  ></i>
                </div>
              </div>
              <div class="textNotif">
                <div>
                  <h4>{{ notif.nomBat }}</h4>
                  <h6>{{ notif.parc }}</h6>
                </div>
              </div>
              <div class="icon1" @click="voir(notif)">
                <i
                  class="pi pi-ellipsis-v"
                  style="font-size: 14px; color: #2d4051"
                ></i>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="cardNotifDetail">
              <h1>{{ show.notifData.parc }}</h1>
              <h1>{{ show.notifData.nomBat }}</h1>

              <h1>Type : {{ show.notifData.type.toUpperCase() }}</h1>
              <h3>{{ show.notifData.sms }}</h3>
              <h4>{{ formatDateTime(show.notifData.time) }}</h4>
            </div>
          </template>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import "primeicons/primeicons.css";
import { useShow } from "@/stores/show";
import { useAlerteBatterieStore } from "@/stores/alerteBatterie";
import { colors } from "@/service/color";
import { useBatterie } from "@/stores/batterieStore";
import { onMounted } from "vue";

const show = useShow();
const alerteBatterieStore = useAlerteBatterieStore();
const batterie = useBatterie();
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

const removeAlert = (id) => {
  alerteBatterieStore.alertes = alerteBatterieStore.alertes.filter(
    (alert) => alert.id !== id
  );
};

async function voir(notif) {
  show.showNotificationDetailOneFunc(notif);

  console.log("notif ", notif);

  let batdata = await batterie.getBatteriesById(notif.idbat);
  console.log("batdata", batdata);
  let data = {
    valeur_alerte: notif.Valert,
    valeur_seuil: notif.Vseuil,
    message: notif.sms,
    read: 1,
    type: notif.type,
    graviter: notif.gravite,
    // contact_id: n
    batterie_id: notif.idbat,
  };
  console.log("data", data);
  alerteBatterieStore.updateAlerte(notif.id, data);
  removeAlert(notif.id);
}

const dataNotif = [
  {
    id: "1",
    battery: "Batterie 01",
    parc: "Parc 01",
    time: "6h",
    message: "Température élevée",
    read: false,
  },
  {
    id: "2",
    battery: "Batterie 02",
    parc: "Parc 02",
    time: "4h",
    message: "Niveau de charge bas",
    read: true,
  },
  {
    id: "3",
    battery: "Batterie 03",
    parc: "Parc 03",
    time: "3h",
    message: "Maintenance requise",
    read: false,
  },
];


onMounted(()=>{
  console.log('yu are here');
})
</script>

<style scoped>
.showModal {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(92, 90, 90, 0.927);
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(43, 38, 38, 0.801);
  justify-content: center;
  align-items: center;
}
.cardNotifDetail {
  width: 100%;
  /* height: 50%; */
  background-color: rgb(228, 228, 228);
  border-radius: 5px;
  padding: 10px;
}
.cardNotifDetail h6 {
  font-size: 12px;
  font-weight: 500;
}
.cardNotifDetail h3 {
  padding-bottom: 20px;
  font-weight: 700;
}
.icon1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
}
.textNotif {
  display: flex;
  width: 70%;
  justify-content: space-between;
  align-items: center;
  /* background-color: yellow; */
}

.textNotif h4,
.textNotif h5 {
  font-weight: 600;
}
.textNotif h6 {
  font-size: 12px;
  font-weight: 600;
  color: rgb(140, 141, 141);
}
.cardNotif {
  width: 100%;
  height: 50px;
  /* background-color: aqua; */
  display: flex;
  background-color: #dad8d890;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin-top: 5px;
  border-radius: 2px;
}
.read {
  background-color: #dad8d890;
}
.notread {
  background-color: #cbc9c9c3;
}
.cardItem {
  position: absolute;
  /* display: flex;
  justify-content: space-between; */
  /* align-items: center; */
  top: 0vh;
  right: 0vh;
  z-index: 100;
  background-color: rgb(255, 255, 255);
  width: 30%;
  height: 100vh;
  border-radius: 5px;
  /* padding: 10px; */
  /* box-shadow: 0px 2px 10px rgb(222, 222, 222); */
}
.header {
  border-radius: 5px 5px 0 0px;
  background-color: #2d4051;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 80px;
}
.header h2 {
  color: aliceblue;
  font-weight: 600;
}

.header h4 {
  color: rgb(255, 255, 255);
  font-weight: 600;
}
.header h6 {
  color: rgb(204, 205, 205);
  font-weight: 600;
  font-size: 12px;
}
.cardheader {
  display: flex;
  align-items: center;
  /* background-color: aqua; */
  width: 80%;
}
.icon {
  border-radius: 100%;
  background-color: aliceblue;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.CardIcon {
  display: flex;
}

.numberNotif {
  background-color: #fb7a58;
  position: relative;
  bottom: 0;
  left: -5px;
  border-radius: 100%;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
}

.numberNotif h6 {
  font-size: 10px;
  font-weight: 600;
}
.bodyNotif {
  width: 100%;
  /* background-color: #3d2d51; */
  height: 80%;
  margin-top: 10px;
  padding: 10px;
  overflow-y: scroll;
}
.notification{
  text-align: center;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* Transition classes */
.sheet-enter-active,
.sheet-leave-active {
  transition: transform 0.5s ease-in-out;
}
.sheet-enter,
.sheet-leave-to {
  transform: translateX(100%);
}
.notifItem{
  width: 50%;
  height: 10vh;
  margin:  auto;
  /* background-color: red; */
  align-items: center;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 600;
  color: #5d656c7a ;
  
}
</style>
