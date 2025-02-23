<template>
  <div>
    <!-- The AG Grid component -->
    <ag-grid-vue :rowData="rowData" :columnDefs="colDefs" style="height: 500px"> </ag-grid-vue>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AgGridVue } from 'ag-grid-vue3' // Vue Data Grid Component
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule])

// Row Data: The data to be displayed.
const rowData = ref([
  { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
])

// Column Definitions: Defines the columns to be displayed.
const colDefs = ref([
  { field: 'make' },
  { field: 'model' },
  { field: 'price' },
  { field: 'electric' },
])
</script>

<style></style>
