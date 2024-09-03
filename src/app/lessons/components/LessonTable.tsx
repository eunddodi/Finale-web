import { getLessonsOfLocation } from "@/app/api"
import { ILesson } from "@/app/api/types"
import useToken from "@/hooks/useToken"
import { formatDayOfWeek, redirectToLogin } from "@/util"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

const LessonTableContainer: React.FC<{ locationName: string }> = ({ locationName }) => {
  const { data: locationData } = useSuspenseQuery({
    queryKey: ['lessons', locationName],
    queryFn: () => getLessonsOfLocation(locationName),
  })
  const router = useRouter()

  const token = useToken()
  const handleApply = (lessonId: number) => {
    if (!token) {
      redirectToLogin()
      return
    }
    router.push(`/lessons/apply?lessonId=${lessonId}`)
  }

  return <LessonTable lessons={locationData.lessons} onApply={handleApply} />
}

const LessonTable: React.FC<{
  lessons: ILesson[]
  onApply: (lessonId: number) => void
}> = ({ lessons, onApply }) => {

  if (lessons.length === 0) {
    return <div className="text-left text-sm">신청 가능한 수업이 존재하지 않습니다.</div>
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-light text-gray-700">
            <th className="border p-2">요일 및 시간</th>
            <th className="border p-2">비용</th>
            <th className="border p-2">정원</th>
            <th className="border p-2">신청</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson.id}>
              <td className="border p-2">
                <div>
                  {formatDayOfWeek(lesson.day)} {lesson.lessonDates[0].startTime} - {lesson.lessonDates[0].endTime}
                </div>
              </td>
              <td className="border p-2">{lesson.cost}</td>
              <td className="border p-2">{lesson.currentEnrollment} / {lesson.maxStudents}</td>
              <td className="border p-2">
                {lesson.currentEnrollment >= lesson.maxStudents
                  ? <button className="bg-gray-200 text-gray-500 font-semibold px-2 py-1 rounded cursor-not-allowed" disabled>마감</button>
                  : <button onClick={() => onApply(lesson.id)} className="bg-blue-50 text-blue-500 font-semibold px-2 py-1 rounded">신청</button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LessonTableContainer