<template>
  <div class="flex flex-col bg-purple-100 shadow-lg rounded-lg p-4">
    <div class="flex flex-wrap w-full gap-4">
      <div>
        <TextInput v-model="task.name" label="Task name" class="w-48" />
      </div>
      <div class="flex flex-col w-48">
        <label>Priotity</label>
        <select
          v-model="task.priority"
          type="text"
          class="border-2 rounded hover:opacity-75"
        >
          <option value="low">low</option>
          <option value="mid">mid</option>
          <option value="high">high</option>
        </select>
      </div>
      <div class="flex flex-col w-48">
        <label>&nbsp;</label>
        <button
          class="border-2 rounded bg-white hover:opacity-75"
          @click="handleTask"
        >
          Submit task
        </button>
      </div>
    </div>
    <span v-if="isError" class="text-center text-red-500"
      >Please fill name of task</span
    >
  </div>
</template>

<script>
import { reactive, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import TextInput from "./ui/TextInput.vue";

export default {
  components: {
    TextInput,
  },
  props: {
    listIndex: {
      type: Number,
      default: null,
    },
  },
  emits: ["created"],
  setup(props, { emit }) {
    const store = useStore();
    const task = reactive({ name: "", priority: "low", finished: false });

    const isError = ref(false);

    watch(
      () => task.name,
      () => {
        if (task.name !== null && task.name !== "") isError.value = false;
      }
    );

    const handleTask = () => {
      if (task.name !== null && task.name !== "") {
        store.commit("setTask", { index: props.listIndex, task: { ...task } });
        console.log(computed(() => store.state.todoLists));
        emit("created");
        isError.value = false;

        task.name = "";
        task.priority = "low";
        task.finished = false;
      } else {
        isError.value = true;
      }
    };

    return {
      task,
      handleTask,
      isError,
    };
  },
};
</script>
