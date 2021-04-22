export const UserModule = {
  namespaced: true,
  state: { user: null },
  //Mutations are funtion that effect the STATE.
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  // Actions are funtions that you call throughout your application that call mutations.
  actions: {
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
  },
};
