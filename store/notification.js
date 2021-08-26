export const state = () => ({
  all: [],
  unreads: [],
  reads: [],
  mode: "all" // all , unreads, reads
});

export const mutations = {
  UNSHIFT_NOTIFICATION: (state, payload) => {
    state.unreads.unshift(payload);
    state.all.unshift(payload);
  },
  SET_ALL: (state, payload) => (state.all = payload),
  SET_UNREADS: (state, payload) => (state.unreads = payload),
  SET_READS: (state, payload) => (state.reads = payload),
  SET_MODE: (state, payload) => (state.mode = payload),
  UNSHIFT_NEW_NOTIFICATION: (state, payload) => {
    state.unreads.unshift(payload);
    state.all.unshift(payload);
  }
};

export const getters = {
  notifications: state => {
    return state[state.mode];
  },

  allCount: state => state.all.length,
  readsCount: state => state.reads.length,
  ureadsCount: state => state.unreads.length
};

export const actions = {
  async load({ commit }) {
    const all = await this.$axios.$get("/api/notifications");
    const reads = await this.$axios.$get("/api/notifications/reads");
    const unreads = await this.$axios.$get("/api/notifications/unreads");

    commit("SET_ALL", all.data);
    commit("SET_READS", reads.data);
    commit("SET_UNREADS", unreads.data);
  },
  notificationMode({ commit }, mode) {
    commit("SET_MODE", mode);
  },
  async markAsRead({ dispatch }, id) {
    await this.$axios.$post(`/api/notifications/mark-as-read/${id}`);
    await dispatch("load");
  },
  async markAsUnread({ dispatch }, id) {
    await this.$axios.$post(`/api/notifications/mark-as-unread/${id}`);
    await dispatch("load");
  },
  async destroy({ dispatch }, id) {
    await this.$axios.$delete(`/api/notifications/delete/${id}`);
    await dispatch("load");
  },
  async clearAll({ dispatch }, id) {
    await this.$axios.$delete(`/api/notifications/destroy-all`);
    await dispatch("load");
  }
};
