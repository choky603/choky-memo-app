<template>
  <div>
    <v-btn color="primary" @click="addRow">추가</v-btn>
    <v-btn color="primary" @click="delRow">삭제</v-btn>
    <!-- The AG Grid component -->
    <ag-grid-vue
      :rowData="rowData"
      :columnDefs="colDefs"
      style="height: 500px"
      class="ag-theme-alpine-dark"
      rowSelection="multiple"
      :gridOptions="gridOptions"
      @grid-ready="onGridReady"
    >
    </ag-grid-vue>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { AgGridVue } from 'ag-grid-vue3' // Vue Data Grid Component
import {
  AllCommunityModule,
  ModuleRegistry,
  type GridApi,
  type GridReadyEvent,
} from 'ag-grid-community'
import 'ag-grid-community/styles/ag-theme-alpine.css' // 그리드 테마

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule])

// AG Grid의 API를 저장할 변수
const gridApi = ref<GridApi | null>(null)

// Row Data: The data to be displayed.
const rowData = ref([
  { id: 1, make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  { id: 2, make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  { id: 3, make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
])

// const sumPrice = rowData.value.reduce((sum, row) => sum + row.price, 0)

const gridOptions = ref({
  pinnedBottomRowData: [{ make: '합계', price: 0 }],
})

// Column Definitions: Defines the columns to be displayed.
const colDefs = ref([
  { field: 'id' },
  { field: 'make' },
  { field: 'model' },
  { field: 'price' },
  { field: 'electric' },
])

const onGridReady = (params: GridReadyEvent) => {
  gridApi.value = params.api
}

const addRow = () => {
  const emptyRow = { id: rowData.value.length + 1, make: '', model: '', price: 0, electric: false }
  rowData.value.push(emptyRow)
}

const delRow = () => {
  console.log(`delRow....`)
  if (!gridApi.value) return

  const selectedNodes = gridApi.value.getSelectedNodes()
  // console.log(`selectedNodes:${JSON.stringify(selectedNodes)}`)
  const selectedIds = selectedNodes.map((node) => node.data.id)
  console.log(`selectedIds:${selectedIds}`)

  rowData.value = rowData.value.filter((row) => !selectedIds.includes(row.id))
}

onMounted(() => {
  // const sum = [
  //   {
  //     make: 'Total',
  //     price: rowData.value.reduce((sum, row) => sum + row.price, 0),
  //   },
  // ]
  // console.log(`sumPrice:${sum[0].price}`)
})
</script>

<style></style>
