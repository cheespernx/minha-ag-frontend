import axios, { AxiosInstance } from 'axios'
import { parseCookies } from 'nookies'

export function getApiClient(context?: undefined): AxiosInstance {
  const { ['@ag:accessToken']: accessToken } = parseCookies(context ?? null)
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NODE_API_URL_DEV,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (accessToken) {
    api.defaults.headers['Authorization'] = `Bearer ${accessToken}`
  } else {
    const { ['@ag:sessionId']: sessionId } = parseCookies(context ?? null)

    if (sessionId) {
      api.defaults.headers['session_id'] = sessionId
    }
  }

  return api
}

export const api = getApiClient()

export function getApiNode() {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NODE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  api.defaults.headers[
    'Authorization'
  ] = `Bearer ${process.env.NEXT_PUBLIC_NODE_API_TOKEN}`

  return api
}

export const apiNode = getApiNode()
