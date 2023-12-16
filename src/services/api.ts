import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://www.googleapis.com/gmail/v1/',
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response) {
      console.error('API Response Error:', error.response.data)
      return Promise.reject(error.response.data)
    } else if (error.request) {
      console.error('API Request Error:', error.request)
      return Promise.reject('No response received from the server.')
    } else {
      console.error('API Request Setup Error:', error.message)
      return Promise.reject('Error setting up the request.')
    }
  },
)

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.get<T>(url, config)
    return response.data
  } catch (error) {
    throw error
  }
}

export const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.post<T>(
      url,
      data,
      config,
    )
    return response.data
  } catch (error) {
    throw error
  }
}
