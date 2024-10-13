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

  return {
    showLogin,
    showSingUp,
    showDashBoard,
    showDesc,
    showLoginFunc,
    showSingUpFunc,
    showDashBoardFunc,
    showDescFunc,
  };
});
