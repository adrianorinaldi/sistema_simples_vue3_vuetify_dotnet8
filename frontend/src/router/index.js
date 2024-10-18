import { createRouter, createWebHistory } from "vue-router";
import login from "@/pages/login.vue";
import user from "@/pages/user.vue";
import register_user from "@/pages/register_user.vue";
import MainLayout from "@/pages/MainLayout.vue";

// Simulação da função para verificar se o usuário está autenticado
const isAuthenticated = () => {
  // Aqui você pode fazer a verificação do token JWT no localStorage ou qualquer outro método
  return !!localStorage.getItem("auth_token"); // Supondo que o token JWT esteja no localStorage
};

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: "/user",
        component: user,
      },
      {
        path: "/register_user",
        component: register_user,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Roteamento global para verificar autenticação antes de cada rota
router.beforeEach((to, from, next) => {
  if (to.path !== "/login" && !isAuthenticated()) {
    // Se o usuário não está autenticado e está tentando acessar qualquer página que não seja login
    next("/login");
  } else {
    // Se o usuário está autenticado ou está indo para a página de login, permite a navegação
    next();
  }
});

// Workaround para o erro de importação dinâmica
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
