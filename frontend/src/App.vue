<template>
  <v-app>
    <TheHeader></TheHeader>
    <v-main>
      <v-container class="container">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/app/layout/TheHeader.vue'
</script>

<style></style>
