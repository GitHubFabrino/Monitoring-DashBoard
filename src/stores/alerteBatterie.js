import { defineStore } from "pinia";
import { useShow } from "@/stores/show";
import { useUrl } from "@/stores/url";
import { ref, onMounted } from "vue";
import axios from "axios";
import { parcStore } from "@/stores/parcStore";
import { format, parseISO } from "date-fns";
import { useBatterie } from "@/stores/batterieStore";

export const useAlerteBatterieStore = defineStore("alerteBatterie", () => {
  const alertes = ref([]);
  const alerte = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const show = useShow();
  const URL = useUrl().url;
  const useParc = parcStore();
  const batterie = useBatterie();
  const ismodifierMaintenance = ref(false);
  const allAllerteDataByParc = ref([]);
  const allAllerteDataByBatterie = ref([]);
  const voirAlerteData = ref();

  const fetchAlertes = () => {
    loading.value = true;
    axios
      .get(`${URL}/api/alerte-batteries`)
      .then((response) => {
        alertes.value = response.data;
        show.showAlert = true;
        show.showAlertType = "success";
        show.showAlertMessage = "Alertes chargées avec succès";
      })
      .catch((err) => {
        error.value = err;
        show.showAlert = true;
        show.showAlertType = "danger";
        show.showAlertMessage = "Erreur lors du chargement des alertes";
        console.error("Error fetching alertes:", err);
      })
      .finally(() => {
        loading.value = false;
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      });
  };

  const getAlerteByBatterieId = (idBat) => {
    loading.value = true;
    axios
      .get(`${URL}/api/alerte-batteries/batterie/${idBat}`)
      .then((response) => {
       
        if (response.status === 200) {
          allAllerteDataByBatterie.value = response.data;
        } else {
          show.showAlert = true;
          show.showAlertType = "warning";
          show.showAlertMessage = "Erreur lors du chargement des alertes";
        }
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      })
      .catch((err) => {
        error.value = err;
        show.showAlert = true;
        show.showAlertType = "danger";
        show.showAlertMessage = "Erreur lors du chargement des alertes";
        console.error("Error fetching alertes:", err);
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      })
      .finally(() => {
        loading.value = false;
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      });
  };

  const getAlerteByParcId = (idParc, parc) => {
    loading.value = true;
    axios
      .get(`${URL}/api/alerte-batteries/parc/${idParc}`)
      .then((response) => {
        if (response.status === 200) {
         
          allAllerteDataByParc.value = response.data;
          const parcSuperviserLocal = ref(
            JSON.parse(localStorage.getItem("parcSuperviser"))
          );

        

          if (parc) {
            alertes.value = [];
            response.data.map((data) => {
              if (data.read !== 1) {
                let formaAlerte = {
                  Valert: data.valeur_alerte,
                  Vseuil: data.valeur_seuil,
                  gravite: data.graviter,
                  idbat: data.batterie_id,
                  read: data.read,
                  sms: data.message,
                  type: data.type,
                  parc: parc.nom_parc,
                  nomBat: data.batterie.nom,
                  time: data.created_at,
                  id: data.id,
                };

                alertes.value.push(formaAlerte);
              }
            });
          } else if (parcSuperviserLocal) {
            alertes.value = [];
            response.data.map((data) => {
              if (data.read !== 1) {
                let formaAlerte = {
                  Valert: data.valeur_alerte,
                  Vseuil: data.valeur_seuil,
                  gravite: data.graviter,
                  idbat: data.batterie_id,
                  read: data.read,
                  sms: data.message,
                  type: data.type,
                  parc: parcSuperviserLocal.nom_parc,
                  nomBat: data.batterie.nom,
                  time: data.created_at,
                  id: data.id,
                };

                alertes.value.push(formaAlerte);
              }
            });
          }
          show.competerAlerteBatterieUnRead = alertes.value.length;
          show.showAlert = true;
        
        } else {
          show.showAlert = true;
          show.showAlertType = "warning";
          show.showAlertMessage = "Erreur lors du chargement des alertes";
        }
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      })
      .catch((err) => {
        error.value = err;
        show.showAlert = true;
        show.showAlertType = "danger";
        show.showAlertMessage = "Erreur lors du chargement des alertes";
        console.error("Error fetching alertes:", err);
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      })
      .finally(() => {
        loading.value = false;
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      });
  };


  const fetchAlerteById = (id) => {
    loading.value = true;
    axios
      .get(`${URL}/api/alerte-batteries/${id}`)
      .then((response) => {
        alerte.value = response.data;
        show.showAlert = true;
      
      })
      .catch((err) => {
        error.value = err;
        show.showAlert = true;
        show.showAlertType = "danger";
        show.showAlertMessage = "Erreur lors du chargement de l'alerte";
        console.error("Error fetching alerte:", err);
      })
      .finally(() => {
        loading.value = false;
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      });
  };


  const createAlerte = async (newAlerte) => {
    loading.value = true;
    try {
      const response = await axios.post(
        `${URL}/api/alerte-batteries`,
        newAlerte
      );
     

      let batdata = await batterie.getBatteriesById(response.data.batterie_id);
     

      let formaAlerte = {
        Valert: response.data.valeur_alerte,
        Vseuil: response.data.valeur_seuil,
        gravite: response.data.graviter,
        idbat: response.data.batterie_id,
        read: response.data.read,
        sms: response.data.message,
        type: response.data.type,
        parc: batdata.parc.nom_parc,
        nomBat: batdata.nom,
        time: response.data.created_at,
        id: response.data.id,
      };

  
      alertes.value.push(formaAlerte);
     
      show.showAlert = true;
      show.showAlertType = "success";
      show.showAlertMessage = "une nouvelle alerte";

      return response.data; // Retourne les données de la réponse
    } catch (err) {
      error.value = err;
      show.showAlert = true;
      show.showAlertType = "danger";
      show.showAlertMessage = "Erreur lors de la création de l'alerte";
      console.error("Error creating alerte:", err);
      return null; // Retourne null en cas d'erreur
    } finally {
      loading.value = false;
      setTimeout(() => {
        show.showAlert = false;
        show.showAlertType = "";
        show.showAlertMessage = "";
      }, 3000);
    }
  };

  const updateAlerte = (id, updatedAlerte) => {
    loading.value = true;
    axios
      .put(`${URL}/api/alerte-batteries/${id}`, updatedAlerte)
      .then((response) => {
        const index = alertes.value.findIndex((a) => a.id === id);
        if (index !== -1) {
          alertes.value[index] = response.data;
        }
        show.showAlert = true;
        let parcid = useParc.parcSuperviser.id;
        const parcSuperviserLocal = ref(
          JSON.parse(localStorage.getItem("parcSuperviser"))
        );

        

        getAlerteByParcId(parcid, parcSuperviserLocal.value);
        show.competerAlerteBatterieUnRead =
          show.competerAlerteBatterieUnRead - 1;
      })
      .catch((err) => {
        error.value = err;
        show.showAlert = true;
        show.showAlertType = "danger";
        show.showAlertMessage = "Erreur lors de la mise à jour de l'alerte";
        console.error("Error updating alerte:", err);
      })
      .finally(() => {
        loading.value = false;
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      });
  };

  const deleteAlerte = (id) => {
    loading.value = true;
    axios
      .delete(`${URL}/api/alerte-batteries/${id}`)
      .then(() => {
        alertes.value = alertes.value.filter((a) => a.id !== id);
        show.showAlert = true;
        show.showAlertType = "success";
        show.showAlertMessage = "Alerte supprimée avec succès";
      })
      .catch((err) => {
        error.value = err;
        show.showAlert = true;
        show.showAlertType = "danger";
        show.showAlertMessage = "Erreur lors de la suppression de l'alerte";
        console.error("Error deleting alerte:", err);
      })
      .finally(() => {
        loading.value = false;
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      });
  };

  onMounted(() => {
    try {
      let parcid = useParc.parcSuperviser.id;
      getAlerteByParcId(parcid);
    } catch (error) {}
  });

  return {
    alertes,
    alerte,
    loading,
    error,
    allAllerteDataByParc,
    fetchAlertes,
    voirAlerteData,
    fetchAlerteById,
    getAlerteByParcId,
    getAlerteByBatterieId,
    createAlerte,
    updateAlerte,
    deleteAlerte,
  };
});
