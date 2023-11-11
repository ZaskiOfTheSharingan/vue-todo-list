<template>
  <Dialog as="div" :open="open" @close="closeHandler()" class="relative z-10">
    <div class="fixed inset-0 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 text-center">
        <DialogPanel
          class="w-full max-w-md transform overflow-hidden rounded-2xl p-6 bg-purple-100 text-left align-middle shadow-xl transition-all"
        >
          <DialogTitle
            as="h3"
            class="text-lg font-medium leading-6 text-gray-900 mb-3"
          >
            Task edit
          </DialogTitle>

          <div class="flex flex-wrap w-full gap-4 px-2">
            <div class="w-full">
              <TextInput
                v-model="editingTask.name"
                label="Task name"
                class="w-full"
              />
            </div>
            <div class="flex flex-col w-full">
              <label>Priotity</label>
              <select
                v-model="editingTask.priority"
                type="text"
                class="border-2 rounded hover:opacity-75"
              >
                <option value="low">low</option>
                <option value="mid">mid</option>
                <option value="high">high</option>
              </select>
            </div>
            <div class="flex flex-row w-full gap-4">
              <div class="flex flex-col w-full">
                <label>&nbsp;</label>
                <button
                  class="border-2 rounded bg-white hover:opacity-75"
                  @click="submitEdit()"
                >
                  Submit task
                </button>
              </div>
              <div class="flex flex-col w-full">
                <label>&nbsp;</label>
                <button
                  class="border-2 rounded bg-white hover:opacity-75"
                  @click="closeHandler()"
                >
                  Close tab
                </button>
              </div>
            </div>
            <span v-if="isError" class="text-center text-red-500"
              >Please fill name of task</span
            >
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { ref, computed, reactive, watch } from "vue";
import { useStore } from "vuex";

import TextInput from "./ui/TextInput.vue";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";

export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    itemIndex: {
      type: Number,
      default: null,
    },
  },
  emits: ["closeModal"],
  setup(props, { emit }) {
    const store = useStore();

    const isOpen = ref(false);
    const loadedTask = computed(() => store.getters.getTask(props.itemIndex));

    const isError = ref(false);

    const editingTask = reactive({
      name: loadedTask.value?.name,
      priority: loadedTask.value?.priority,
      finished: loadedTask.value?.finished,
    });

    watch(
      () => editingTask?.name,
      () => {
        if (editingTask?.name.length !== 0) isError.value = false;
      }
    );

    const resetData = () => {
      editingTask.name = loadedTask.value.name ?? "";
      editingTask.priority = loadedTask.value.priority ?? "low";
      editingTask.finished = loadedTask.value.finished ?? false;
    };

    const closeHandler = () => {
      resetData();
      emit("closeModal");
    };

    const submitEdit = () => {
      if (editingTask.name !== null && editingTask.name !== "") {
        store.commit("editTask", {
          index: props.itemIndex,
          val: { ...editingTask },
        });
        isError.value = false;
        closeHandler();
      } else {
        isError.value = true;
      }
    };

    return {
      isOpen,
      editingTask,
      loadedTask,
      submitEdit,
      closeHandler,
      isError,
    };
  },
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    TextInput,
  },
};
</script>
