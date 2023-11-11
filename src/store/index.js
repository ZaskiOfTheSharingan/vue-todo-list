import { createStore } from "vuex";

export default createStore({
  state: {
    tasks: [],
  },
  getters: {
    getList(state) {
      return state.tasks;
    },
    getTask: (state) => (index) => {
      return state.tasks[index];
    },
    getFilteredList: (state) => (val) => {
      return state.tasks.filter((task) =>
        task.name.toLowerCase().includes(val.toLowerCase())
      );
    },
  },
  mutations: {
    setTask(state, val) {
      state.tasks.push(val);
    },
    removeTask(state, index) {
      state.tasks.splice(index, 1);
    },
    editTask(state, payload) {
      state.tasks[payload.index] = { ...payload.val };
    },
    finishTask(state, index) {
      state.tasks[index].finished = true;
    },
    initOrder(state, val) {
      state.tasks = val;
    },
  },
});
