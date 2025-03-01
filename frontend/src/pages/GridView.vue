<template>
  <div>
    <!-- The AG Grid component -->
    <ag-grid-vue
      :rowData="rowData"
      :columnDefs="colDefs"
      style="height: 500px"
      class="ag-theme-alpine-dark"
      :gridOptions="gridOptions"
    >
    </ag-grid-vue>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { AgGridVue } from 'ag-grid-vue3' // Vue Data Grid Component
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-theme-alpine.css' // 그리드 테마

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule])

// AG Grid의 API를 저장할 변수
// const gridApi = ref<GridApi | null>(null);

// Row Data: The data to be displayed.
const rowData = ref([
  { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
])

// const sumPrice = rowData.value.reduce((sum, row) => sum + row.price, 0)

const gridOptions = ref({
  pinnedBottomRowData: [{ make: '합계', price: 0 }],
})

// Column Definitions: Defines the columns to be displayed.
const colDefs = ref([
  { field: 'make' },
  { field: 'model' },
  { field: 'price' },
  { field: 'electric' },
])

onMounted(() => {
  const sum = [
    {
      make: 'Total',
      price: rowData.value.reduce((sum, row) => sum + row.price, 0),
    },
  ]
  console.log(`sumPrice:${sum[0].price}`)
})
</script>

<style></style>
