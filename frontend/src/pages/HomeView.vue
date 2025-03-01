<template>
  <div>
    <v-btn color="primary" @click="procLogin">로그인</v-btn>
    <v-btn color="secondary" @click="procLogout">로그아웃</v-btn>
    <v-btn color="accent" @click="getProfile">조회</v-btn>
    <v-card :text="arrData"></v-card>
    <br />
    <hr />
    <h3>기본</h3>
    <DatePicker locale="ko" v-model="date" />
    <h3>YYYYMMDD HHMM</h3>
    <DatePicker locale="ko" v-model="date" time-picker-inline format="yyyy.MM.dd HH:mm:ss" />
    <h3>MONTH</h3>
    <DatePicker locale="ko" v-model="dateYYYYMM" month-picker format="yyyy.MM" :auto-apply="true" />
    <hr />
    <h3>Custom</h3>
    <CustomDatePicker v-model="selectedDate"></CustomDatePicker>
    <hr />
    <v-btn color="primary" @click="print">확인</v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DatePicker from '@vuepic/vue-datepicker'
import CustomDatePicker from '@/shared/components/DatePicker.vue'
// import bcrypt from 'bcryptjs'
import dayjs from 'dayjs'

import { login, logout } from '@/app/api/authApi'
import { getUserProfile } from '@/app/api/userApi'

const arrData = ref()

const date = ref()
const dateYYYYMM = ref({ year: new Date().getFullYear(), month: new Date().getMonth() - 1 })
const selectedDate = ref(new Date())

const print = () => {
  console.log(`@date:${JSON.stringify(date.value)}`)
  console.log(`@YYYY.MM.DD HH:mm:ss:${dayjs(date.value).format('YYYY.MM.DD HH:mm:ss')}`)

  console.log(
    `#YYYYMM:${dateYYYYMM.value.year}${String(dateYYYYMM.value.month + 1).padStart(2, '0')}`,
  )
}

async function procLogin() {
  try {
    // TODO 임시로 고정된 암호화결과를 적용합니다
    //const fixedSalt = '$2a$10$1234567890123456789012' // 고정된 솔트 문자열 (22자 이상)
    //const hashedPassword = await bcrypt.hashSync('1234', fixedSalt)
    // console.log(`hashedPassword:${hashedPassword}`)
    const hashedPassword = '1234'
    const loginResponse = await login('choky@gmail.com', hashedPassword)
    console.log('로그인 성공:', loginResponse)

    getProfile() // 정보조회
  } catch (error) {
    console.log(`API 호출 중 에러 발생:${error}`)
  }
}

async function procLogout() {
  try {
    await logout()
    console.log('로그아웃 성공:')
  } catch (error) {
    console.log(`API 호출 중 에러 발생:${error}`)
  }
}

async function getProfile() {
  try {
    // #TODO 스토어 사용으로 변경
    const userProfile = await getUserProfile('choky@gmail.com')
    console.log('사용자 프로필:', JSON.stringify(userProfile))
    arrData.value = JSON.stringify(userProfile)
  } catch (error) {
    console.log(`API 호출 중 에러 발생:${error}`)
    alert(`오류!!`)
  }
}

onMounted(() => {
  // console.log(`the component is now mounted.`)
})
</script>

<style></style>
