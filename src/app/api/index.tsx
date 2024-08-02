import { redirect } from "next/navigation"
import { ILesson, ILocation, IMyLesson } from "./types"
import { apiRequest } from "@/lib/api"

export const login = async (type: 'student' | 'coach') => {
  const { data } = await apiRequest(`login/${type}`)
  redirect(data)

  // const KAKAO_LOGIN_URL = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=3e7fdba27d8fb61d9c259d3a90ffc5a8&redirect_uri=https%3A%2F%2Ffinale-web.vercel.app%2Flogin%2Fcallback&state=student"
  // TODO: url 변경으로 인해 로그인 안되는 경우 대비해 에러 처리 필요
  // redirect(KAKAO_LOGIN_URL)
}

export const getLocationList = async (): Promise<ILocation[]> => {
  const { data } = await apiRequest(`api/location/list`)
  return data
}

export const getLessonsOfLocation = async (locationName: string): Promise<ILocation & { lessons: ILesson[] }> => {
  const { data } = await apiRequest(`api/lesson/withLocation/${locationName}`)
  return data
}

export const getLessonDetail = async (lessonId: string): Promise<ILesson> => {
  const { data } = await apiRequest(`api/lesson/${lessonId}`)
  return data
}


export const enrollLesson = async ({ lessonId, token }: { lessonId: string, token: string }) => {
  await apiRequest('api/student/enrolment',
    token,
    {
      method: 'POST',
      body: JSON.stringify({ lessonId }),
    })
}

export const getMyLessons = async (token: string): Promise<IMyLesson[]> => {
  const { data } = await apiRequest('api/student/myPage', token)
  return data.reverse()
}

export const restLesson = async ({ lessonId, token }: { lessonId: string, token: string }) => {
  await apiRequest(`api/student/restLesson/${lessonId}`, token, { method: 'POST' })
}

export const checkApplyAvailability = async (): Promise<{ enrollment: boolean, restLesson: boolean }> => {
  const { data } = await apiRequest('api/schedule/status')
  return data
}
