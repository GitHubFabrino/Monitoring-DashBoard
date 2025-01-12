<template>
  <div class="container">
    <WorkspaceSideBar />
    <div class="cont">
      <WorkspaceNavigation />
      <div class="containte">
        <WorkspaceContainte />
      </div>
    </div>
  </div>
</template>

<script setup>
import WorkspaceNavigation from "@/components/WorkspaceNavigation.vue";
import WorkspaceSideBar from "@/components/WorkspaceSideBar.vue";
import WorkspaceContainte from "@/components/WorkspaceContainte.vue";

// import { ref, onMounted, onUnmounted } from "vue";
// import mqtt from "mqtt";

// import { UseBatterieStore } from "@/stores/batteries";

// const batterieStore = UseBatterieStore();

// onMounted(() => {
//   const client = mqtt.connect("ws://192.168.1.116:9001");

//   client.on("connect", () => {
//     console.log("Connecté au broker MQTT");
//     client.subscribe("batteries", (err) => {
//       if (err) {
//         console.error("Erreur d'abonnement :", err);
//       } else {
//         console.log('Abonné au topic "batteries"');
//       }
//     });
//   });

//   client.on("message", (topic, message) => {
//     try {
//       const parsedMessage = JSON.parse(message.toString());
//       const { batterie, ...data } = parsedMessage;

//       // Mise à jour des données dans le store
//       batterieStore.updateBatteryData(batterie, data);
//       console.log(parsedMessage);
//       console.log(batterie);
//     } catch (error) {
//       console.error("Erreur lors du traitement du message MQTT :", error);
//     }
//   });

//   client.on("error", (err) => {
//     console.error("Erreur MQTT :", err);
//   });

//   onUnmounted(() => {
//     client.end();
//   });
// })


</script>

<style scoped>
/* aa */

.container {
  height: 100vh;
  display: flex;
}

.cont {
  width: 80%;
  background-color: #2f333e;
}

.containte {
  background-color: #e9f0f6;
  height: 90vh;
  padding: 20px;
  /* box-shadow: 0px 0px 2px rgb(110, 110, 110); */
  /* border-radius: 4px; */
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
</style>
