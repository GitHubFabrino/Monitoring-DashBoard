import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import mqtt from "mqtt";
import { useShow } from "@/stores/show";
import { useAlerteBatterieStore } from "@/stores/alerteBatterie";
import { useBatterie } from "@/stores/batterieStore";
export const useMqttAlerteStore = defineStore("mqttAlerte", () => {
  // Données reçues par MQTT
  const dataReceived = ref([]);
  const alertes = ref([]);
  const show = useShow();
  const alerteBatterieStore = useAlerteBatterieStore();
  
  const batterie = useBatterie();
  // Connexion MQTT
  const client = mqtt.connect("ws://192.168.1.116:9001");

  const initializeMqtt = () => {
    client.on("connect", () => {
      console.log("Connecté au broker MQTT");
      client.subscribe("alerts", (err) => {
        if (err) {
          console.error("Erreur d'abonnement :", err);
        } else {
          console.log('Abonné au topic "alerte_batteries"');
        }
      });
    });

    client.on("message", async (topic, message) => {
      try {
        const parsedMessage = JSON.parse(message.toString());

        
        if (topic === "alerts") {
          // Ajout de l'alerte à la liste des alertes reçues

         console.log("Parseeee", parsedMessage);

         //get batt par id 
         let batdata = await batterie.getBatteriesById(parsedMessage.idbat);
         console.log('batdata', batdata);

        //  let formaAlerte ={
        //   Valert : parsedMessage.Valert, 
        //   Vseuil : parsedMessage.Vseuil, 
        //   contact : parsedMessage.contact, 
        //   gravite : parsedMessage.gravite, 
        //   idbat : parsedMessage.idbat, 
        //   read : parsedMessage.read, 
        //   sms : parsedMessage.sms, 
        //   type : parsedMessage.type, 
        //   parc: batdata.parc.nom_parc,
        //   nomBat: batdata.nom
        //  }

        //   alertes.value.push(formaAlerte);
          show.showAlertBatterie=true
          show.showAlertBatType = parsedMessage.graviter
          show.showAlertBatterieMessage = parsedMessage.message
          show.competerAlerteBatterieUnRead = show.competerAlerteBatterieUnRead + 1

            let newAlerte = {
            valeur_alerte : parsedMessage.Valert,
              valeur_seuil: parsedMessage.Vseuil,
              message :parsedMessage.sms,
              read  :parsedMessage.read,
              type  :parsedMessage.type,
              graviter  : parsedMessage.gravite,
              contact_id :parsedMessage.contact,
              batterie_id :parsedMessage.idbat,
            }

           
            console.log('newAlertre' , newAlerte);
            
            alerteBatterieStore.createAlerte(newAlerte)

          setTimeout(() => {
            show.showAlertBatterie=true
          }, 3000);

          // Affichage des alertes dans la console
          // console.log("Alerte reçue :", parsedMessage);
          // console.log("Alerte reçue nombre :", show.competerAlerteBatterieUnRead);
        }
      } catch (error) {
        console.error("Erreur lors du traitement du message MQTT :", error);
      }
    });

    client.on("error", (err) => {
      console.error("Erreur MQTT :", err);
    });
  };

  // Appel de la méthode `initializeMqtt` lors de la montée
  onMounted(() => {
    console.log("Store monté, initialisation MQTT...");
    initializeMqtt();
  });

  return {
    dataReceived,
    alertes,
    initializeMqtt,
  };
});
