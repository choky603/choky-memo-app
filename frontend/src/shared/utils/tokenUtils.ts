import axios from 'axios'

export const getToken = (): string | null => {
  return localStorage.getItem('accessToken') // 로컬 스토리지에서 토큰 가져오기
}

export const refreshToken = async (): Promise<string | null> => {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL
    const response = await axios.post(`${baseURL}/auth/refresh`, {
      refreshToken: localStorage.getItem('refreshToken'),
    })
    const newToken = response.data.accessToken
    localStorage.setItem('accessToken', newToken) // 새로운 토큰 저장
    return newToken
  } catch (error) {
    console.error('토큰 갱신 실패:', error)
    return null
  }
}
