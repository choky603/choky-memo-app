import axiosInstance from './axiosInstance'

export const getUserProfile = async (userId: string) => {
  const response = await axiosInstance.get('/user/profile', { params: { userId } })
  return response.data
}
