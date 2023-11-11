<template>
  <div class="flex flex-col gap-1">
    <div class="w-48 mb-3">
      <TextInput v-model="fulltext" label="Fulltext filter" />
    </div>
    <template v-if="filteredTasks.length !== 0">
      <TaskItem
        v-for="(element, index) in filteredTasks"
        :item="element"
        :key="index"
        :index="index"
        class="bg-white shadow-md rounded border-2"
      />
    </template>
    <div v-else>nothing</div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import TaskItem from "./TaskItem.vue";
import TextInput from "./ui/TextInput.vue";

export default {
  setup() {
    const store = useStore();
    const fulltext = ref("");
    const filteredTasks = computed(() =>
      store.getters.getFilteredList(fulltext.value)
    );

    return {
      fulltext,
      filteredTasks,
    };
  },
  components: {
    TaskItem,
    TextInput,
  },
};
</script>
