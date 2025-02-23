<template>
  <div class="todo--container">
    <v-text-field
      v-model="title"
      hide-details="auto"
      label="할일입력"
      @keyup.enter="add"
      class="left"
    ></v-text-field>
    <v-btn color="primary" class="right" @click="add">추가</v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import { useTodoStore } from '@/features/todo/store/useTodoStore'

const title = ref('')
const todoStore = useTodoStore()

const titleScheme = z
  .string()
  .min(2, { message: '조금더 입력하세요' })
  .max(50, { message: '너무 길어요' })

const add = () => {
  try {
    titleScheme.parse(title.value.trim())
    todoStore.addTodo(title.value.trim())
    title.value = ''
  } catch (error) {
    if (error instanceof z.ZodError) {
      alert(error.errors.map((err) => err.message).join('\n'))
    } else {
      console.log(error)
    }
  }
}
</script>

<style scoped>
.todo--container {
  display: flex; /* 플렉스 컨테이너 설정 */
  justify-content: space-between; /* 아이템 간의 공간을 분리 */
  align-items: center; /* 세로 정렬 (필요에 따라 사용) */
}
.left {
  padding: 10px;
}
.right {
  padding: 10px;
}
</style>
