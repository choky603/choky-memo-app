import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Todo {
  id: number
  title: string
  completed: boolean
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    }
    todos.value.push(newTodo)
  }

  const toggleTodo = (id: number) => {
    const todo = todos.value.find((todo) => todo.id === id)
    if (todo) todo.completed = !todo.completed
  }

  const deleteTodo = (id: number) => {
    // 배열을 재할당하여 반응성 유지
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  }
})
