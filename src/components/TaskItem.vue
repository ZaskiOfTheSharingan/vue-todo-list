<template>
  <div class="flex px-2 py-1 justify-between">
    <div>
      <span :class="{ 'line-through': item?.finished }">{{ item?.name }}</span>
      -
      <span class="font-semibold">{{ item?.priority }}</span>
    </div>
    <div class="flex gap-3">
      <button
        v-if="!item?.finished"
        class="underline text-green-400"
        @click="finishTask(index)"
      >
        Finish
      </button>
      <button class="underline text-blue-400" @click="handleEditModal()">
        Edit
      </button>
      <button class="underline text-red-400" @click="deleteTask(index)">
        Delete
      </button>
    </div>
    <TaskModal
      :open="isOpen"
      @closeModal="isOpen = !isOpen"
      :item-index="index"
    />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";

import TaskModal from "./TaskModal.vue";

export default {
  props: {
    item: {
      type: Object,
      default: null,
    },
    index: {
      type: Number,
      default: null,
    },
  },
  emits: ["editTask", "deleteTask", "finishedTask"],
  setup(props, { emit }) {
    const store = useStore();
    const isOpen = ref(false);

    const deleteTask = (index) => {
      store.commit("removeTask", index);
      emit("deleteTask");
    };

    const finishTask = (index) => {
      store.commit("finishTask", index);
      emit("finishTask");
    };

    const handleEditModal = () => {
      isOpen.value = !isOpen.value;
    };

    return { deleteTask, finishTask, isOpen, handleEditModal };
  },
  components: {
    TaskModal,
  },
};
</script>
