import { IMyLesson } from "@/app/api/types"
import { formatDayOfWeek } from "@/util"

interface CurrentMonthLessonsProps {
  lessons: IMyLesson[]
}

const CurrentMonthLessons: React.FC<CurrentMonthLessonsProps> = ({ lessons }) => (
  <div className="bg-white rounded-lg p-4 shadow">
    <h3 className="font-bold mb-2 text-neutral-500">⛸️ 이번달 수강 중인 레슨</h3>
    {lessons.map((lesson, index) => (
      <p key={index} className="text-sm mb-1">
        {lesson.location} {formatDayOfWeek(lesson.days)} {lesson.startTime}-{lesson.endTime}
      </p>
    ))}
  </div>
)

export default CurrentMonthLessons
