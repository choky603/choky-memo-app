<template>
  <li>
    <span :class="{ completed: todo.completed }" @click="sendToggle">
      {{ todo.title }}
    </span>
    <v-btn color="primary" @click="sendDelete">삭제</v-btn>
  </li>
</template>

<script setup lang="ts">
import type { Todo } from '@/features/todo/store/useTodoStore'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{ todo: Todo }>()
const emit = defineEmits(['toggle', 'delete'])

const sendToggle = () => {
  emit('toggle', props.todo.id)
}
const sendDelete = () => {
  emit('delete', props.todo.id)
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
