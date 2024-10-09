import { defineStore } from "pinia";
import { ref } from "vue";

export const useShow = defineStore("Show", () => {
  const showLogin = ref(true);
  const showUsers = ref(false);
  const showSingUp = ref(false);

  const showProfil = ref(false);
  const hidenProfil = ref(true);

  const showIconUp = ref(false);
  const showIconDown = ref(true);

  const showDeconnexion = ref(false);

  const showAddContact = ref(false);
  const showAddContactEntreprise = ref(false);

  const showCompte = ref(false);
  const showCompteModifier = ref(false);

  const showSupprimer = ref(false);

  const showModifierContact = ref(false);
  const showModifierContactEntreprise = ref(false);

  const clientActive = ref(true);
  const clientInactive = ref(false);

  const entrepriseActive = ref(false);
  const entrepriseInactive = ref(true);

  const vueEnsembleActive = ref(true);
  const vueEnsembleInactive = ref(false);

  const activiteActive = ref(false);
  const activiteInactive = ref(true);

  const showModifierMdp = ref(false);

  const actInactive = ref(false);
  const actActive = ref(true);
  const noteActive = ref(false);
  const noteInactive = ref(true);
  const emailInactive = ref(true);
  const emailActive = ref(false);
  const appelActive = ref(false);
  const appelInactive = ref(true);
  const tacheInactive = ref(true);
  const tacheActive = ref(false);

  const showAddActivite = ref(false);
  const showAddNote = ref(false);
  const showAddEmail = ref(false);
  const showAddAppel = ref(false);
  const showAddTache = ref(false);

  const showCall = ref(true);
  const hiddenCall = ref(false);

  function showCallFunc() {
    showCall.value = hiddenCall.value;
    hiddenCall.value = !showCall.value;
  }

  function showAddActiviteFunc() {
    showAddActivite.value = true;
    showAddNote.value = false;
    showAddEmail.value = false;
    showAddAppel.value = false;
    showAddTache.value = false;
  }

  function showAddNoteFunc() {
    showAddActivite.value = false;
    showAddNote.value = true;
    showAddEmail.value = false;
    showAddAppel.value = false;
    showAddTache.value = false;
  }

  function showAddAEmailFunc() {
    showAddActivite.value = false;
    showAddNote.value = false;
    showAddEmail.value = true;
    showAddAppel.value = false;
    showAddTache.value = false;
  }

  function showAddAppelFunc() {
    showAddActivite.value = false;
    showAddNote.value = false;
    showAddEmail.value = false;
    showAddAppel.value = true;
    showAddTache.value = false;
  }

  function showAddTacheFunc() {
    showAddActivite.value = false;
    showAddNote.value = false;
    showAddEmail.value = false;
    showAddAppel.value = false;
    showAddTache.value = true;
  }

  function hiddenAddFunc() {
    showAddActivite.value = false;
    showAddNote.value = false;
    showAddEmail.value = false;
    showAddAppel.value = false;
    showAddTache.value = false;
  }

  /* */

  function activeNoteFunc() {
    actActive.value = false;
    noteActive.value = true;
    emailActive.value = false;
    appelActive.value = false;
    tacheActive.value = false;

    actInactive.value = true;
    noteInactive.value = false;
    emailInactive.value = true;
    appelInactive.value = true;
    tacheInactive.value = true;
  }
  function activeEmailFunc() {
    actActive.value = false;
    noteActive.value = false;
    emailActive.value = true;
    appelActive.value = false;
    tacheActive.value = false;

    actInactive.value = true;
    noteInactive.value = true;
    emailInactive.value = false;
    appelInactive.value = true;
    tacheInactive.value = true;
  }

  function activeAppelFunc() {
    actActive.value = false;
    noteActive.value = false;
    emailActive.value = false;
    appelActive.value = true;
    tacheActive.value = false;

    actInactive.value = true;
    noteInactive.value = true;
    emailInactive.value = true;
    appelInactive.value = false;
    tacheInactive.value = true;
  }

  function activeTacheFunc() {
    actActive.value = false;
    noteActive.value = false;
    emailActive.value = false;
    appelActive.value = false;
    tacheActive.value = true;

    actInactive.value = true;
    noteInactive.value = true;
    emailInactive.value = true;
    appelInactive.value = true;
    tacheInactive.value = false;
  }

  function activeActiviteFunc() {
    actActive.value = true;
    noteActive.value = false;
    emailActive.value = false;
    appelActive.value = false;
    tacheActive.value = false;

    actInactive.value = false;
    noteInactive.value = true;
    emailInactive.value = true;
    appelInactive.value = true;
    tacheInactive.value = true;
  }

  function showLoginFunc() {
    showLogin.value = true;
  }
  function hiddenLoginFunc() {
    showLogin.value = false;
  }

  function showUserFunc() {
    showUsers.value = true;
    // showLogin.value = false;
    hiddenLoginFunc();
  }
  function hiddenUserFunc() {
    showUsers.value = false;
    // showLogin.value = true;
    showLoginFunc();
    // showDeconnexion.value = false;
    hiddenDeconnexionFunc();
  }

  function showProfilFunc() {
    showProfil.value = !showProfil.value;
    hidenProfil.value = !hidenProfil.value;
  }

  function showCompteFunc() {
    showCompte.value = true;
  }

  function hiddenCompteFunc() {
    showCompte.value = false;
    showProfilFunc();
  }
  function showCompteModifierFunc() {
    showCompteModifier.value = true;
    showCompte.value = false;
  }

  function hiddenCompteModifierFunc() {
    showCompteModifier.value = false;
    showProfilFunc();
  }
  function showDeconnexionFunc() {
    showDeconnexion.value = true;
  }

  function hiddenDeconnexionFunc() {
    showDeconnexion.value = false;
    showProfilFunc();
  }

  function showAddContactFunc() {
    showAddContact.value = true;
  }

  function hiddenAddContactFunc() {
    showAddContact.value = false;
  }

  function showSupprimerContactFunc() {
    showSupprimer.value = true;
  }

  function hiddenSupprimerContactFunc() {
    showSupprimer.value = false;
  }

  function showModificationContactFunc() {
    showModifierContact.value = true;
  }

  function hiddenModificationContactFunc() {
    showModifierContact.value = false;
  }

  function showModificationContactEntrepriseFunc() {
    showModifierContactEntreprise.value = true;
  }

  function hiddenModificationContactEntrepriseFunc() {
    showModifierContactEntreprise.value = false;
  }

  function active() {
    clientActive.value = entrepriseActive.value;
    clientInactive.value = entrepriseInactive.value;
    entrepriseActive.value = clientInactive.value;
    entrepriseInactive.value = clientActive.value;
  }

  function activeVue() {
    vueEnsembleActive.value = activiteActive.value;
    vueEnsembleInactive.value = activiteInactive.value;
    activiteActive.value = vueEnsembleInactive.value;
    activiteInactive.value = vueEnsembleActive.value;
  }

  function showAddContactEntrepriseFunc() {
    showAddContactEntreprise.value = true;
  }
  function hiddenAddContactEntrepriseFunc() {
    showAddContactEntreprise.value = false;
  }

  function showModifierMdpFunc() {
    showModifierMdp.value = !showModifierMdp.value;
    showIconFunc();
  }

  function showIconFunc() {
    showIconUp.value = !showIconUp.value;
    showIconDown.value = !showIconDown.value;
  }

  function showSingUpFunc() {
    showSingUp.value = true;
    // showLogin.value = false;
    hiddenLoginFunc();
  }

  function hiddenSingUpFunc() {
    showSingUp.value = false;
    // showLogin.value = true;
    showLoginFunc();
  }
  return {
    showUsers,
    showLogin,
    showProfil,
    hidenProfil,
    showCompte,
    showDeconnexion,
    showAddContact,
    showSupprimer,
    showModifierContact,
    clientActive,
    clientInactive,
    entrepriseActive,
    entrepriseInactive,
    showAddContactEntreprise,
    showModifierContactEntreprise,
    showCompteModifier,
    showModifierMdp,
    showIconUp,
    showIconDown,
    showSingUp,
    vueEnsembleActive,
    vueEnsembleInactive,
    activiteActive,
    activiteInactive,
    actActive,
    actInactive,
    noteActive,
    noteInactive,
    emailActive,
    emailInactive,
    appelActive,
    appelInactive,
    tacheActive,
    tacheInactive,
    showAddActivite,
    showAddNote,
    showAddEmail,
    showAddAppel,
    showAddTache,
    showCall,
    hiddenCall,
    showProfilFunc,
    showCompteFunc,
    hiddenCompteFunc,
    showDeconnexionFunc,
    hiddenDeconnexionFunc,
    showAddContactFunc,
    hiddenAddContactFunc,
    showSupprimerContactFunc,
    hiddenSupprimerContactFunc,
    showModificationContactFunc,
    hiddenModificationContactFunc,
    active,
    showAddContactEntrepriseFunc,
    hiddenAddContactEntrepriseFunc,
    hiddenModificationContactEntrepriseFunc,
    showModificationContactEntrepriseFunc,
    showCompteModifierFunc,
    hiddenCompteModifierFunc,
    showModifierMdpFunc,
    showIconFunc,
    showLoginFunc,
    hiddenLoginFunc,
    showUserFunc,
    hiddenUserFunc,
    showSingUpFunc,
    hiddenSingUpFunc,
    activeVue,
    activeNoteFunc,
    activeEmailFunc,
    activeAppelFunc,
    activeTacheFunc,
    activeActiviteFunc,
    showAddActiviteFunc,
    showAddAEmailFunc,
    showAddNoteFunc,
    showAddAppelFunc,
    showAddTacheFunc,
    hiddenAddFunc,
    showCallFunc,
  };
});
