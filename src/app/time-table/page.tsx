'use client'
import Link from "next/link"
import Loader from "../components/Loader"
import ErrorFallback from "../components/ErrorFallback"
import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "@/lib/api"

const getTimetableImage = async (): Promise<string> => {
  const res = await apiRequest('api/lesson/timetable')
  return res.data
}

export default function SchedulePage() {
  const { data: imageUrl, isLoading, error } = useQuery({
    queryKey: ["timetableImage"],
    queryFn: getTimetableImage
  })

  if (isLoading) return <Loader />
  if (error) return <ErrorFallback />

  return (
    <div className="px-4 text-center mt-16 mb-32">
      {imageUrl && (
        <div className="w-full max-w-xl mb-8 m-auto">
          <img src={imageUrl} alt="Timetable" />
        </div>
      )}
      <Link href='/lessons' className="bg-sub-orange text-white px-6 py-2 rounded-full text-lg font-semibold">
        수강신청 하러 가기
      </Link>
    </div>
  )
}