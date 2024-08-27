import { toast } from 'react-toastify';
import { LOCAL_STORAGE_KEYS } from './hooks/useLocalStorage';

export function formatDayOfWeek(dayOfWeek: number): string {
  const daysOfWeek: string[] = ['월', '화', '수', '목', '금', '토', '일'];

  if (dayOfWeek < 1 || dayOfWeek > 7) {
    throw new Error('올바른 요일 값이 아닙니다. 1부터 7 사이의 값을 입력해주세요.');
  }

  return daysOfWeek[dayOfWeek];
}

export function redirectToLogin() {
  window.location.href = '/login';
  localStorage.setItem(LOCAL_STORAGE_KEYS.REDIRECT_TO, JSON.stringify(window.location.pathname));
}

export function showSuccessToast(message: string) {
  toast(message, { type: 'success', style: { background: '#e9f3e8', padding: '12px' } })
}

export function showErrorToast(message: string) {
  toast(message, { type: 'error', style: { background: '#f8e9e9', padding: '12px' } })
}