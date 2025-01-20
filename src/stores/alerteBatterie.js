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
  const voirAlerteData = ref()

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

          show.showAlert = true;
          show.showAlertType = "success";
          show.showAlertMessage = "Alertes chargées avec succès";
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

  const getAlerteByParcId = (idParc) => {
    loading.value = true;
    axios
      .get(`${URL}/api/alerte-batteries/parc/${idParc}`)
      .then((response) => {
        if (response.status === 200) {
          console.log('getAlerteByParcId' , response.data);
          allAllerteDataByParc.value = response.data;
          show.showAlert = true;
          show.showAlertType = "success";
          show.showAlertMessage = "Alertes chargées avec succès";
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

  // Route::get('alerte-batteries/batterie/{id}', [AlerteBatterieController::class, 'getAlerteByBatterieId']);
  // Route::get('alerte-batteries/parc/{id}', [AlerteBatterieController::class, 'getAlerteByParcId']);

  const fetchAlerteById = (id) => {
    loading.value = true;
    axios
      .get(`${URL}/api/alerte-batteries/${id}`)
      .then((response) => {
        alerte.value = response.data;
        show.showAlert = true;
        show.showAlertType = "success";
        show.showAlertMessage = "Alerte chargée avec succès";
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

  const createAlerte = (newAlerte) => {
    loading.value = true;
    axios
      .post(`${URL}/alerte-batteries`, newAlerte)
      .then((response) => {
        alertes.value.push(response.data);
        show.showAlert = true;
        show.showAlertType = "success";
        show.showAlertMessage = "Alerte ajoutée avec succès";
      })
      .catch((err) => {
        error.value = err;
        show.showAlert = true;
        show.showAlertType = "danger";
        show.showAlertMessage = "Erreur lors de l'ajout de l'alerte";
        console.error("Error creating alerte:", err);
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
        show.showAlertType = "success";
        show.showAlertMessage = "Alerte mise à jour avec succès";
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
      console.log('id' , parcid);
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
