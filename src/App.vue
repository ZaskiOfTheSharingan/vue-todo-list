<template>
  <main class="px-6 py-4 justify-cente bg-slate-50">
    <h1 class="font-semibold text-2xl text-center">TO-DO List</h1>
    <div class="w-full bg-purple-100 px-4 py-3 mb-3">
      <TaskList />
    </div>
    <TaskForm />
  </main>
</template>

<script>
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";

export default {
  components: { TaskList, TaskForm },
};
</script>
