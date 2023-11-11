<template>
  <div><TextInput v-model="fulltext" label="Fulltex filter" /></div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import TextInput from "./ui/TextInput.vue";

export default {
  components: {
    TextInput,
  },
  setup() {
    const store = useStore();
    const fulltext = ref("");
    const filteredList = computed(() => store.getters.getFilteredList());

    return {
      filteredList,
      fulltext,
    };
  },
};
</script>
