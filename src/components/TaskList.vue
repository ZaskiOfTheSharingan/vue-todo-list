<template>
  <div class="flex flex-col gap-1">
    <template v-if="tasks.length !== 0">
      <TaskItem
        v-for="(element, index) in tasks"
        :item="element"
        :key="index"
        :index="index"
        :list-index="listIndex"
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

export default {
  props: {
    listIndex: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const store = useStore();
    const fulltext = ref("");
    const tasks = computed(() => store.getters.getList(props.listIndex));

    return {
      fulltext,
      tasks,
    };
  },
  components: {
    TaskItem,
  },
};
</script>
