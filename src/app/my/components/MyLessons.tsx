'use client'
import { getMyLessons } from "@/app/api"
import useToken from "@/hooks/useToken"
import { useSuspenseQuery } from "@tanstack/react-query"
import Header from "./Header"
import Notice from "./Notice"
import CurrentMonthLessons from "./CurrentMonthLessons"
import LessonList from "./LessonList"
import useApplyAvailablityQuery from "@/hooks/queries/useApplyAvailablityQuery"

export default function MyLessons() {
  const token = useToken()

  const { data } = useSuspenseQuery({
    queryKey: ['lessons', 'my'],
    queryFn: () => getMyLessons(token)
  })

  const { data: { restLesson, enrollment } } = useApplyAvailablityQuery()

  const currentMonth = new Date().toISOString().slice(0, 7) // NOTE: YYYY-MM
  const filteredLessons = data.filter(lesson => lesson.month === currentMonth)

  return (
    <div className="bg-gray-100 p-4 md:p-8 max-w-7xl mx-auto">
      <Header currentMonth={currentMonth} />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Notice currentMonth={currentMonth} restLessonAvailable={restLesson} enrollmentAvailable={enrollment} />
          <CurrentMonthLessons lessons={filteredLessons} />
        </div>
        <LessonList lessonData={data} restLessonAvailable={restLesson} currentMonth={currentMonth} />
      </div>
    </div>
  )

}
