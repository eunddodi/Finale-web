'use client'
import { apiRequest } from "@/util";

export default function Lesson() {

  const login = async (type: 'student' | 'coach') => {
    const { data } = await apiRequest(`login/${type}`)
    localStorage.setItem('redirectTo', 'lesson')
    window.location.href = data
  }

  return (
    <div>
      <h1>수강 신청 가능한 강의 리스트</h1>
      <button onClick={() => login('student')}>수강생 로그인</button>
      <button onClick={() => login('coach')}>코치 로그인</button>
    </div>
  )
}
