import { defineStore } from "pinia";
import { ref } from "vue";
import { Cookies } from "@/plugins/cookies";
import { RestApi } from "@/plugins/restApi";
import { useShow } from "../stores/show";
import { useAlertStore } from "./alert";
export const useUtilisateur = defineStore("utilisateur", () => {
  const cookies = new Cookies();
  const restApi = new RestApi();
  const alert = useAlertStore();
  const show = useShow();

  const nomUtilisateur = ref("");
  const prenomUtilisateur = ref("");
  const emailUtilisateur = ref("");
  const telephoneUtilisateur = ref("");
  const idUtilisateur = ref("");
  const posteUtilisateur = ref("");
  const file = ref("");

  function getOneUtilisateur(idUser) {
    setTimeout(() => {
      restApi
        .get(`/api/utilisateurs/${idUser}`)
        .then((response) => {
          nomUtilisateur.value = response.data.nom;
          prenomUtilisateur.value = response.data.prenom;
          emailUtilisateur.value = response.data.user.username;
          telephoneUtilisateur.value = response.data.telephone;
          posteUtilisateur.value = response.data.poste;
          file.value = response.data.file.name;
          idUtilisateur.value = response.data.id;

          console.log("response ", response.data);
          console.log("file : ", file.value);
        })
        .catch((error) => {
          alert.add("error", "Une erreur est produit lors de");
        });
    }, 500);
  }

  function getImageUtilisateur(file) {
    setTimeout(() => {
      restApi
        .get(`/api/utilisateurs/image/fileSystem/${file}`)
        .then((response) => {
          console.log(" response image : ", response.data);
        });
    });
  }

  function modifierUtilisateur(data) {
    setTimeout(() => {
      restApi
        .put(`/api/utilisateurs/${idUtilisateur}`, data)
        .then((response) => {
          console.log(" response  : ", response.data);
        });
    }, 500);
  }

  // rester sur la modification d'utilisateur ou admin qui n'a pas fonctionner erreur sur cette put fonction modificationUtilisateur

  return {
    nomUtilisateur,
    prenomUtilisateur,
    emailUtilisateur,
    telephoneUtilisateur,
    idUtilisateur,
    posteUtilisateur,
    file,
    getOneUtilisateur,
    getImageUtilisateur,
    modifierUtilisateur,
  };
});
