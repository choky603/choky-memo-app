<template>
  <Datepicker
    :model-value="modelValue"
    :format="format"
    :placeholder="placeholder"
    :clearable="clearable"
    :auto-apply="autoApply"
    :locale="locale"
    @update:model-value="updateValue"
  />
</template>

<script setup lang="ts">
import { onMounted, defineProps, defineEmits } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  modelValue: [Date, String, Number],
  format: {
    type: String,
    default: 'yyyy.MM.dd',
  },
  placeholder: {
    type: String,
    default: '날짜 선택',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  autoApply: {
    type: Boolean,
    default: true,
  },
  locale: {
    type: String,
    default: 'ko',
  },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (value: Date | string) => {
  console.log(`value:${typeof value}`)
  emit('update:modelValue', value)
}

onMounted(() => {
  console.log(`val:${props.modelValue}`)
})
</script>

<style></style>
