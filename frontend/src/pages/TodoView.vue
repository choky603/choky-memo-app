<template>
  <div>
    <AddTodo />
    <v-list-item v-for="todo in todos" :key="todo.id">
      <TodoItem :todo="todo" @toggle="toggleTodo" @delete="deleteTodo" />
    </v-list-item>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '@/features/todo/store/useTodoStore'
import AddTodo from '@/features/todo/components/AddTodo.vue'
import TodoItem from '@/features/todo/components/TodoItem.vue'

const todoStore = useTodoStore()
const todos = computed(() => todoStore.todos)
const { toggleTodo, deleteTodo } = todoStore
</script>

<style></style>
