<template>
  <v-app-bar color="primary" density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>MySite</v-app-bar-title>
  </v-app-bar>

  <!-- 네비게이션 -->
  <v-navigation-drawer app v-model="isDrawer" color="blue-grey lighten-5">
    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" @click="goPage(item.path)">
        <div class="navigation--drawer">
          <v-icon :icon="item.icon" size="large"></v-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 메뉴
const isDrawer = ref(false)
const items = [
  { title: 'Home', path: '/', icon: 'mdi-home' },
  { title: 'Todo', path: '/todo', icon: 'mdi-calendar' },
]
function toggleDrawer(): boolean {
  return (isDrawer.value = !isDrawer.value)
}

// 페이지 이동
const router = useRouter()
function goPage(path: string): void {
  router.push(path)
}
</script>

<style scoped>
.navigation--drawer {
  display: flex;
  gap: 0.2rem;
}
</style>
