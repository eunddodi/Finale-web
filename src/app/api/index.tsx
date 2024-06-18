import { apiRequest } from "@/util"
import { redirect } from "next/navigation"
import { ILesson, ILocation, MOCK_LESSON, MOCK_LOCATIONS } from "./types"

export const login = async (type: 'student' | 'coach') => {
  const { data } = await apiRequest(`login/${type}`)
  redirect(data)
}

export const getLessonDetail = async (lessonId: string): Promise<ILesson> => {
  return MOCK_LESSON
  const { data } = await apiRequest(`api/lesson/${lessonId}`)
  return data
}

export const getLocationList = async (): Promise<ILocation[]> => {
  return MOCK_LOCATIONS
  const { data } = await apiRequest(`api/location/list`)
  return data
}