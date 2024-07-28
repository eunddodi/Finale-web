'use client'
import { useAuthRedirect } from "@/hooks/useAuthRedirect"
import MyLessons from "./components/MyLessons"

export default function MyPage() {
  const isAuthenticated = useAuthRedirect()
  if (!isAuthenticated) return null

  return (
    <MyLessons />
  )
}

