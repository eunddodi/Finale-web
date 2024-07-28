import { IMyLesson } from "@/app/api/types";
import { formatDayOfWeek } from "@/util";

interface LessonListProps {
  lessonData: IMyLesson[];
}

const LessonList: React.FC<LessonListProps> = ({ lessonData }) => (
  <div className="bg-white rounded-lg p-4 shadow">
    <h3 className="font-bold mb-4 text-neutral-500">📝 등록 내역</h3>
    <div className="space-y-4">
      {lessonData.map((lesson, index) => (
        <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200 last:border-b-0">
          <div className="mb-2 sm:mb-0">
            <p className="font-semibold">{lesson.month}</p>
            <p className="text-sm text-gray-500">
              {lesson.location} {formatDayOfWeek(lesson.days)} {lesson.startTime}-{lesson.endTime}
            </p>
          </div>
          <div className="flex space-x-2">
            {!lesson.deposit && (
              <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs">
                입금 확인 중
              </button>
            )}
            {!lesson.restLesson && lesson.deposit && (
              // TODO: 휴식 신청 버튼 보이기 로직 변경
              <button className="bg-red-400 text-white px-3 py-1 rounded-full text-xs">
                휴식 신청
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default LessonList;