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
  const personnelDataSelect = ref();

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
      personnelDataSelect.value = response.data[0]
      console.log('iiiiiiiii', personnelDataSelect.value);
      show.personelAddImage = false
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

  async function updateUser(data, id) {
    show.showSpinner = true;
    try {
      const response = await axios.put(
        `${URL}/api/user/update/${id}`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      // Vérifiez si la réponse est réussie avant d'appeler getUsersByParc
      if (response.status === 200) {
        await getUsersByParc(); // Assurez-vous que getUsersByParc est une fonction asynchrone si elle effectue des opérations asynchrones
      } else {
        throw new Error("Échec de la mise à jour de l'utilisateur.");
      }
    } catch (err) {
      show.showAlert = true;
      show.showAlertType = "warning";
      show.showAlertMessage = "Erreur lors de la mise à jour de l'utilisateur. ❌";
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
  
  async function registerUser(data) {
    show.showSpinner = true;
    try {
      const response = await axios.post(
        `${URL}/api/user/create/technicien`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
     
      if (response.status === 201) { 
        show.showAddPersonnel = false
        show.personelAddImage = true 
        show.newpersonnelId = response.data.user.id

        console.log("new user", response.data.user.id);





      } else {
        throw new Error("Échec de la création de l'utilisateur.");
      }
    } catch (err) {
      show.showAlert = true;
      show.showAlertType = "warning";
      show.showAlertMessage = "Erreur lors de la création de l'utilisateur. ❌";
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

  async function deleteUser(id) {
    show.showSpinner = true;
    try {
      const response = await axios.delete(
        `${URL}/api/user/delete/${id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      // Vérifiez si la réponse est réussie avant d'appeler getUsersByParc
      if (response.status === 200) {
        await getUsersByParc(); 
        show.showDelete = false
      } else {
        throw new Error("Échec de la suppression de l'utilisateur.");
      }
    } catch (err) {
      show.showAlert = true;
      show.showAlertType = "warning";
      show.showAlertMessage = "Erreur lors de la suppression de l'utilisateur. ❌";
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
    deleteUser,
    personnelData,
    personnelDataSelect,
    updateUser,
    getUsersByParc,
    registerUser
  };
});
