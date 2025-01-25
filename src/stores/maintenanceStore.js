import { defineStore } from "pinia";
import { useShow } from "@/stores/show";
import { useUrl } from "@/stores/url";
import { ref, onMounted } from "vue";
import axios from "axios";
import { parcStore } from "@/stores/parcStore";
import { format, parseISO } from "date-fns";
import { useBatterie } from "@/stores/batterieStore";

export const useMaintenanceStore = defineStore("maintenance", () => {
  const show = useShow();
  const URL = useUrl().url;
  const useParc = parcStore();
  const batterie = useBatterie();
  const ismodifierMaintenance = ref(false);

  const details = ref("");
  const batterie_id = ref("");
  const marque = ref("");
  const idMataitenanceM = ref('')

  const detailsM = ref("");
  const batterie_idM = ref("");
  const maintenances = ref([]);
  const maintenanceDataAll = ref();
  const maintenance = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const batteries = ref([]);



  const fetchMaintenances = () => {
    show.showSpinner = true;
    axios
      .get(`${URL}/api/maintenances`)
      .then((response) => {
        maintenances.value = response.data;
      })
      .catch((err) => {
        error.value = err;
        console.error(err);
      })
      .finally(() => {
        show.showSpinner = false;
      });
  };

  const fetchMaintenanceById = (id) => {
    show.showSpinner = true;
    axios
      .get(`${URL}/api/maintenances/${id}`)
      .then((response) => {
        maintenance.value = response.data;
      })
      .catch((err) => {
        error.value = err;
        console.error(err);
      })
      .finally(() => {
        show.showSpinner = false;
      });
  };

  const fetchMaintenancesByBatterie = (batterieId) => {
    show.showSpinner = true;
    axios
      .get(`${URL}/api/maintenances/batterie/${batterieId}`)
      .then((response) => {
        maintenances.value = response.data;
      })
      .catch((err) => {
        error.value = err;
        console.error(err);
      })
      .finally(() => {
        show.showSpinner = false;
      });
  };

  const createMaintenance = async (maintenanceData) => {
    show.showSpinner = true;
    let formData = new FormData();
    formData.append("details", maintenanceData.details);
    formData.append("batterie_id", maintenanceData.batterie_id);
    formData.append("marque", maintenanceData.marque);
    let baatteryArray = [];
    try {
      const response = await axios.post(`${URL}/api/maintenances`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        show.showAddMaintenance = false;
        maintenances.value.push(response.data);
        show.showAlert = true;
        show.showAlertType = "success";
        show.showAlertMessage = "Maintenance ajoutée avec succès";
        show.showAddMaintenance = false

        const parcid = useParc.parcSuperviser.id;
        batterie.getBatteriesByParcId(parcid);
        batteries.value = batterie.allBatteryData;

        const maintenancePromises = batteries.value.map((batterie) =>
          axios.get(`${URL}/api/maintenances/batterie/${batterie.id}`)
        );

        const responses = await Promise.all(maintenancePromises);
        responses.forEach((response) => {
          baatteryArray.push(...response.data);
        });

        maintenances.value = baatteryArray;
     
      } else {
        show.showAlert = true;
        show.showAlertType = "danger";
        show.showAlertMessage = response.data.error;
        show.showSpinner = false;
      }
    } catch (err) {
      show.showAlert = true;
      show.showAlertType = "warning";
      show.showAlertMessage = "Erreur lors de l'ajout de la maintenance";
      console.error(err);
      show.showSpinner = false;
    } finally {
      setTimeout(() => {
        show.showAlert = false;
        show.showAlertType = "";
        show.showAlertMessage = "";
      }, 3000);
      show.showSpinner = false;
    }
  };

  const updateMaintenance = (id, maintenanceData) => {

    show.showSpinner = true;
    axios
      .put(`${URL}/api/maintenances/${id}`, maintenanceData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {

        console.log('response' , response.data);
        if (response.status === 200) {
          const index = maintenances.value.findIndex((m) => m.id === id);
          if (index !== -1) {
            maintenances.value[index] = response.data;
          }
          show.showAlert = true;
          show.showAlertType = "success";
          show.showAlertMessage = "Maintenance mise à jour avec succès";

          const parcid = useParc.parcSuperviser.id;
          batterie.getBatteriesByParcId(parcid);
          batteries.value = batterie.allBatteryData;
          ismodifierMaintenance.value=false

          getAll();
        } else {
          show.showAlert = true;
          show.showAlertType = "danger";
          show.showAlertMessage = response.data.error;
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
        show.showAlertType = "warning";
        show.showAlertMessage =
          "Erreur lors de la mise à jour de la maintenance";
        console.error(err);
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      })
      .finally(() => {
        show.showSpinner = false;
      });
  };

  const getAll = async () => {
    let baatteryArray = [];
    const parcid = useParc.parcSuperviser.id;
    await batterie.getBatteriesByParcId(parcid);
    batteries.value = batterie.allBatteryData;

    const maintenancePromises = batteries.value.map((batterie) =>
      axios.get(`${URL}/api/maintenances/batterie/${batterie.id}`)
    );

    const responses = await Promise.all(maintenancePromises);
    responses.forEach((response) => {
      baatteryArray.push(...response.data);
    });

    maintenances.value = baatteryArray;
 
  };

  const deleteMaintenance = (id) => {
    show.showSpinner = true;
    axios
      .delete(`${URL}/api/maintenances/${id}`)
      .then((response) => {
        if (response.status === 204) {
          maintenances.value = maintenances.value.filter((m) => m.id !== id);
          show.showAlert = true;
          show.showAlertType = "success";
          show.showAlertMessage = "Maintenance supprimée avec succès";

          getAll();
          show.showDeleteMaintenance = false;
        } else {
          show.showAlert = true;
          show.showAlertType = "danger";
          show.showAlertMessage = response.data.error;
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
        show.showAlertType = "warning";
        show.showAlertMessage =
          "Erreur lors de la suppression de la maintenance";
        console.error(err);
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      })
      .finally(() => {
        show.showSpinner = false;
      });
  };

  return {
    maintenances,
    maintenance,
    loading,
    error,
    detailsM,
    batterie_idM,
    details,
    idMataitenanceM,
    batterie_id,
    marque,
    ismodifierMaintenance,
    fetchMaintenances,
    fetchMaintenanceById,
    fetchMaintenancesByBatterie,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance,
  };
});
