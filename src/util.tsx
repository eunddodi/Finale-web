import { LOCAL_STORAGE_KEYS } from './hooks/useLocalStorage';

export function formatDayOfWeek(dayOfWeek: number): string {
  const daysOfWeek: string[] = ['일', '월', '화', '수', '목', '금', '토'];

  if (dayOfWeek < 0 || dayOfWeek > 6) {
    throw new Error('올바른 요일 값이 아닙니다. 0부터 6 사이의 값을 입력해주세요.');
  }

  return daysOfWeek[dayOfWeek];
}

export function redirectToLogin() {
  window.location.href = '/login';
  localStorage.setItem(LOCAL_STORAGE_KEYS.REDIRECT_TO, window.location.pathname);
}
