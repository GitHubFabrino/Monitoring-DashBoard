import { Cookies } from "@/plugins/cookies";
import { RestApi } from "@/plugins/restApi";
import { defineStore } from "pinia";
import { useShow } from "../stores/show";
import { useAlertStore } from "./alert";

export const useAuthentificationStore = defineStore("authentification", () => {
  const cookies = new Cookies();
  const restApi = new RestApi();
  const show = useShow();
  const alert = useAlertStore();

  function check(pseudo, motDePasse) {
    setTimeout(() => {
      restApi
        .post("api/type-montages", {
          nom_type: `${pseudo}`,
          // password: `${motDePasse}`,
        })
        .then((response) => {
          // if (response.status === 200) {
          //   cookies.set("accessToken", response.data.jwt);
          //   cookies.set("idPersonne", response.data.user.userId);
          //   cookies.set("status", response.data.user.authorities[0].authority);
          //   alert.add("success", "Bienvenue");
          //   show.showUserFunc();
          // }
          // console.log(cookies.get("accessToken"));
        })
        .catch((error) => {
          console.log(error);
          // alert.error();
          if (error.response.status === 401)
            alert.add("warning", "Votre authentification est invalide !");
          else alert.error();
          window.location.reload();
          cookies.delete("accessToken");
          cookies.delete("idPersonne");
          cookies.delete("status");
        });
    }, 500);
  }

  function enregistrer(requestData) {
    console.log(requestData);
    setTimeout(() => {
      restApi
        .post("/auth/register", requestData)
        .then((response) => {
          if (response.status === 200) {
            alert.add("success", "Enregistreùent avec succée");
            show.hiddenSingUpFunc();
            console.log(response.data);
          }
        })
        .catch((error) => {
          if (error.response.status === 401)
            alert.add("warning", "Votre enregistrement  est invalide !");
          else alert.error();
        });
    }, 500);
  }

  return {
    check,
    enregistrer,
  };
});
