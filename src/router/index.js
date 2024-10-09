import { createRouter, createWebHistory } from "vue-router";
import WorkspaceContact from "../views/WorkspaceContact.vue";
import WorkspaceConversation from "../views/WorkspaceConversation.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "contact",
      component: WorkspaceContact,
    },
    {
      path: "/conversation",
      name: "conversation",
      component: WorkspaceConversation,
    },
  ],
});

export default router;
