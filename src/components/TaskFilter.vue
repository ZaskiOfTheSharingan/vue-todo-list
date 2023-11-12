<template>
  <div><TextInput v-model="fulltext" label="Fulltex filter" /></div>
  <div
    v-for="(list, listIndex) in filteredLists"
    :key="listIndex"
    class="flex flex-col"
  >
    <TaskItem
      v-for="(element, index) in list"
      :item="element"
      :key="index"
      :index="index"
      :list-index="listIndex"
      class="bg-white shadow-md rounded border-2"
    />
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import TextInput from "./ui/TextInput.vue";
import TaskItem from "./TaskItem.vue";

export default {
  components: {
    TextInput,
    TaskItem,
  },
  setup() {
    const store = useStore();
    const fulltext = ref("");
    const filteredLists = computed(() =>
      store.getters.getFilteredList(fulltext.value)
    );

    return {
      filteredLists,
      fulltext,
    };
  },
};
</script>
