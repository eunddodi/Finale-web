import { getLessonNotice } from "@/app/api"
import { useSuspenseQuery } from "@tanstack/react-query"

const MonthSelector: React.FC = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['lessonNotice'],
    queryFn: () => getLessonNotice(),
  })

  return (
    <div className="mb-4">
      <div className="text-xs sm:text-sm text-gray-600 bg-gray-light p-4">
        {data}
      </div>
    </div>
  )
}

export default MonthSelector
