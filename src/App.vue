<template>
  <main class="px-6 py-4 justify-cente bg-slate-50 h-screen overscroll-y-auto">
    <h1 class="font-semibold text-2xl text-center">TO-DO List</h1>
    <TaskFilter />
    <button class="underline text-blue-500 mb-4" @click="addListHandler()">
      + add TO-DO list
    </button>
    <div
      v-for="(lists, index) in lists"
      :key="index"
      class="gap-2 mb-3 border-2 border-gray-300 px-2 py-1"
    >
      <h2 class="text-xl font-medium text-gray-800 text-center">
        TO-DO list {{ index + 1 }}
      </h2>
      <div class="w-full bg-purple-100 px-4 py-3 mb-3">
        <TaskList :listIndex="index" />
      </div>
      <TaskForm :listIndex="index" />
    </div>
  </main>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";
import TaskFilter from "./components/TaskFilter.vue";

export default {
  components: { TaskList, TaskForm, TaskFilter },
  setup() {
    const store = useStore();

    const lists = computed(() => store.state.todoLists);

    const addListHandler = () => {
      store.commit("setNewList", []);
    };

    return {
      lists,
      addListHandler,
    };
  },
};
</script>
