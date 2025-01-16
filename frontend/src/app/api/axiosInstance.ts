import axios from 'axios'
import { getToken, refreshToken } from '@/shared/utils/tokenUtils'

const axiosInstance = axios.create({
  // #TODO env 값으로 변경
  baseURL: import.meta.env.VITE_BASE_URL, //'/api',
  timeout: 10000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken() // 저장된 토큰 가져오기
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originRequest = error.config

    // 토큰 만료 시 처리
    if (error.response?.status === 401 && !originRequest._retry) {
      originRequest._retry = true // 무한 재시도를 방지하기 위한 플래그
      const newToken = await refreshToken() // 토큰 갱신
      if (newToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
        originRequest.headers['Authorization'] = `Bearer ${newToken}`
        return axiosInstance(originRequest) // 갱신된 토큰으로 재요청
      }
    }

    return Promise.reject(error) // 기타 에러는 그대로 반환
  },
)

export default axiosInstance
