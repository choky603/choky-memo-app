import axiosInstance from './axiosInstance'
import router from '@/app/router'

export const login = async (username: string, password: string) => {
  const response = await axiosInstance.post('/auth/login', { username, password })

  // console.log(`response:${JSON.stringify(response)}`)
  if (response.data) {
    console.log(`accessToken:${response.data.accessToken}`)
    console.log(`refreshToken:${response.data.refreshToken}`)
    localStorage.setItem('accessToken', response.data.accessToken)
    localStorage.setItem('refreshToken', response.data.refreshToken)
  }

  return response.data
}

export const logout = async () => {
  // const response = await axiosInstance.post('/auth/logout')
  // return response.data

  // TODO 임시
  // 토큰 지워주고 초기화면
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')

  router.push({ name: 'home' })
  //location.href = '/'
}
