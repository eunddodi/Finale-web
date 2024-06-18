import { API_ENDPOINT } from './constants'

export async function apiRequest(url: string, token?: string, options?: any) {
  try {
    const response = await fetch(`${API_ENDPOINT}/${url}`, {
      credentials: 'include',
      secure: false,
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      ...options
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return await response.json()
  }
  catch (e: any) {
    console.error(e)
    // TODO: 401, 403의 경우 rethrow하지 않고 redirect 처리
    throw new Error(e)
  }
}

export function formatDayOfWeek(dayOfWeek: number): string {
  const daysOfWeek: string[] = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

  if (dayOfWeek < 0 || dayOfWeek > 6) {
    throw new Error('올바른 요일 값이 아닙니다. 0부터 6 사이의 값을 입력해주세요.');
  }

  return daysOfWeek[dayOfWeek];
}
