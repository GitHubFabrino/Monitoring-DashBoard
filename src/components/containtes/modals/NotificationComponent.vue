<template>
  <Transition>
    <div class="cardItem" v-if="show.showNotificationDetail">
      <div class="header">
        <template v-if="!show.showNotificationDetailOne">
          <h2>Notifications</h2>
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
                show.showNotificationDetailOne = !show.showNotificationDetailOne
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
          <div
            v-for="notif in dataNotif"
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
              <div class="numberNotif">
                <h6>2</h6>
              </div>
            </div>
            <div class="textNotif">
              <div>
                <h4>{{ notif.battery }}</h4>
                <h6>{{ notif.parc }}</h6>
              </div>
              <h5>{{ notif.time }}</h5>
            </div>
            <div
              class="icon1"
              @click="show.showNotificationDetailOneFunc(notif)"
            >
              <i
                class="pi pi-ellipsis-v"
                style="font-size: 14px; color: #2d4051"
              ></i>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="cardNotifDetail">
            <h3>{{ show.notifData.message }}</h3>
            <h6>{{ show.notifData.time }}</h6>
          </div>
        </template>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import "primeicons/primeicons.css";
import { useShow } from "@/stores/show";
import { colors } from "@/service/color";
const show = useShow();

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
</script>

<style scoped>
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
  bottom: 5vh;
  right: 5vh;
  z-index: 100;
  background-color: rgb(255, 255, 255);
  width: 30%;
  height: 50vh;
  border-radius: 5px;
  /* padding: 10px; */
  box-shadow: 0px 2px 10px rgb(222, 222, 222);
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
.CardIcon{
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

.numberNotif h6{
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
</style>
