import { createRouter, createWebHistory } from "vue-router";
import { users } from "../assets/users";
import store from "../store";
import Admin from "../views/Admin.vue";
import home from "../views/home.vue";
import UserProfile from "../views/UserProfile.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/user/:userId",
    name: "UserProfile",
    component: UserProfile,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requiresAdmin: true
    }
  },
];
const router = createRouter({
  history: createWebHistory(),
  // @ts-ignore
  routes,
});

router.beforeEach(async (to, from, next) => {
  // @ts-ignore
  const user = store.state.User.user;

  if (!user) {
    await store.dispatch('User/setUser', users[0]);
  }

  const isAdmin = false;
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);

  if (requiresAdmin && !isAdmin) next({ name: "home" });
  else next();
});

export default router;
