import { createStore } from "vuex";

export default createStore({
  state: {
    todoLists: [],
    tasks: [],
  },
  getters: {
    getList: (state) => (index) => {
      return state.todoLists[index];
    },
    getTask: (state) => (payload) => {
      return state.todoLists[payload.listIndex][payload.itemIndex];
    },
    getFilteredList: (state) => (val) => {
      return state.tasks.filter((task) =>
        task.name.toLowerCase().includes(val.toLowerCase())
      );
    },
  },
  mutations: {
    setNewList(state, val) {
      state.todoLists.push(val);
    },
    setTask(state, payload) {
      state.todoLists[payload.index].push(payload.task);
    },
    removeTask(state, payload) {
      state.todoLists[payload.listIndex].splice(payload.itemIndex, 1);
    },
    editTask(state, payload) {
      state.todoLists[payload.listIndex][payload.itemIndex] = {
        ...payload.val,
      };
    },
    finishTask(state, payload) {
      state.todoLists[payload.listIndex][payload.itemIndex].finished = true;
    },
  },
});
