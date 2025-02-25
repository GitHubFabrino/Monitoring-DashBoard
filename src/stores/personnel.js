import { defineStore } from "pinia";
import { useShow } from "@/stores/show";
import { useUrl } from "@/stores/url";
import { ref, onMounted } from "vue";
import axios from "axios";
import { parcStore } from "@/stores/parcStore";
export const personnelStore = defineStore("Personnel", () => {
  const show = useShow();
  const URL = useUrl().url;
  const personnelData = ref([]);

  const useParc = parcStore();

  async function getUsersByParc() {
    show.showSpinner = true;
    try {
      const parcId = useParc?.parcSuperviser?.id;
      if (!parcId) {
        throw new Error("ID du parc non trouvé");
      }

      const response = await axios.get(`${URL}/api/parcs/${parcId}/users`, {
        headers: { "Content-Type": "application/json" },
      });

      personnelData.value = response.data;
      console.log('responsePersonnel ' , personnelData.value);
    } catch (err) {
      show.showAlert = true;
      show.showAlertType = "warning";
      show.showAlertMessage =
        "Erreur lors de la récupération des utilisateurs. ❌";
      console.error(err);

      setTimeout(() => {
        show.showAlert = false;
        show.showAlertType = "";
        show.showAlertMessage = "";
      }, 3000);
    } finally {
      show.showSpinner = false;
    }
  }

  // Charger les utilisateurs au montage du composant
  onMounted(() => {
    if (useParc?.parcSuperviser?.id) {
      getUsersByParc();
    }
  });

  return {
    personnelData,
    getUsersByParc,
  };
});
