import { API_ENDPOINT } from './constants'

export async function apiRequest(url: string, options?: any) {
  try {
    const response = await fetch(`${API_ENDPOINT}/${url}`, {
      credentials: 'include',
      secure: false,
      ...options
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return await response.json()
  }
  catch (e) {
    console.error(e)
  }
}
