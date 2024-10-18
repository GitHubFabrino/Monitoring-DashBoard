import { defineStore } from "pinia";
import { ref } from "vue";

export const useShow = defineStore("Show", () => {
  const showLogin = ref(true);
  const showSingUp = ref(false);
  const showDashBoard = ref(false);
  const showDesc = ref(false);

  function showLoginFunc() {
    showLogin.value = true;
    showSingUp.value = false;
  }
  function showSingUpFunc() {
    showLogin.value = false;
    showSingUp.value = true;
  }
  function showDashBoardFunc() {
    showLogin.value = false;
    showDashBoard.value = true;
  }

  function showDescFunc() {
    showDesc.value = !showDesc.value;
  }

  const activeMenu = ref("");
  const showParc = ref(false);
  const showBatterie = ref(false);
  const showIncident = ref(false);
  const showHistorique = ref(false);
  const showStatistique = ref(false);

  function setActiveMenu(menuName) {
    activeMenu.value = menuName;
    // setActiveItem("");
    menuName === "Gestion du parc"
      ? (showParc.value = true)
      : (showParc.value = false);

    menuName === "Paramètres de la batterie"
      ? (showBatterie.value = true)
      : (showBatterie.value = false);

    menuName === "Gestion des incidents"
      ? (showIncident.value = true)
      : (showIncident.value = false);

    menuName === "Historique des données"
      ? (showHistorique.value = true)
      : (showHistorique.value = false);

    menuName === "Statistiques et rapports"
      ? (showStatistique.value = true)
      : (showStatistique.value = false);
  }

  const activeMenuItem = ref("");
  const showAcceuil = ref(true);
  const showCreationParc = ref(false);
  const showCalendrierM = ref(false);
  const showRapportP = ref(false);
  const showPlageFonc = ref(false);
  const showSeuilA = ref(false);
  const showListeIncidents = ref(false);
  const showHistoIncidents = ref(false);
  const showVisualisationD = ref(false);
  const showConpressionD = ref(false);
  const showRapportMensuel = ref(false);
  const showRecommendation = ref(false);
  function setActiveItem(itemName) {
    activeMenuItem.value = itemName;
    itemName === "Acceuil"
      ? (showAcceuil.value = true)
      : (showAcceuil.value = false);

    itemName === "Création de parc"
      ? (showCreationParc.value = true)
      : (showCreationParc.value = false);

    itemName === "Calendrier de maintenance"
      ? (showCalendrierM.value = true)
      : (showCalendrierM.value = false);

    itemName === "Rapports de performance"
      ? (showRapportP.value = true)
      : (showRapportP.value = false);

    itemName === "Plages de fonctionnement"
      ? (showPlageFonc.value = true)
      : (showPlageFonc.value = false);

    itemName === "Seuils d'alerte"
      ? (showSeuilA.value = true)
      : (showSeuilA.value = false);

    itemName === "Liste des incidents récents"
      ? (showListeIncidents.value = true)
      : (showListeIncidents.value = false);

    itemName === "Historique des incidents"
      ? (showHistoIncidents.value = true)
      : (showHistoIncidents.value = false);

    itemName === "Visualisation des données"
      ? (showVisualisationD.value = true)
      : (showVisualisationD.value = false);

    itemName === "Compression des données"
      ? (showConpressionD.value = true)
      : (showConpressionD.value = false);
    itemName === "Rapport mensuel de performance"
      ? (showRapportMensuel.value = true)
      : (showRapportMensuel.value = false);

    itemName === "Recommandations d'optimisation"
      ? (showRecommendation.value = true)
      : (showRecommendation.value = false);
  }

  return {
    showLogin,
    showSingUp,
    showDashBoard,
    showDesc,
    activeMenu,
    showParc,
    showBatterie,
    showIncident,
    showHistorique,
    showStatistique,
    activeMenuItem,
    showCreationParc,
    showCalendrierM,
    showRapportP,
    showPlageFonc,
    showSeuilA,
    showListeIncidents,
    showHistoIncidents,
    showVisualisationD,
    showConpressionD,
    showRapportMensuel,
    showRecommendation,
    showAcceuil,
    showLoginFunc,
    showSingUpFunc,
    showDashBoardFunc,
    showDescFunc,
    setActiveMenu,
    setActiveItem,
  };
});
