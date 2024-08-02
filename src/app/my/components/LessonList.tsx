import React from 'react';
import { IMyLesson } from "@/app/api/types";
import useRestLessonMutation from "@/hooks/mutations/useRestLessonMutation";
import useToken from "@/hooks/useToken";
import { formatDayOfWeek } from "@/util";
import { ENROLLMENT_CLOSE_DATE } from '@/constants';

interface LessonItemProps {
  lesson: IMyLesson;
  isCurrentLesson: boolean;
  restLessonAvailable: boolean;
  onRestLesson: (lessonId: string) => void;
}

const LessonItem: React.FC<LessonItemProps> = ({ lesson, isCurrentLesson, restLessonAvailable, onRestLesson }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200 last:border-b-0">
    <div className="mb-2 sm:mb-0">
      <p className="font-semibold">{lesson.month}</p>
      <p className="text-sm text-gray-500">
        {lesson.location} {formatDayOfWeek(lesson.days)} {lesson.startTime}-{lesson.endTime}
      </p>
    </div>
    <div className="flex space-x-2">
      {isCurrentLesson && lesson.deposit && (
        <div className="bg-blue-400 text-white px-3 py-1 rounded-full text-xs">입금 완료</div>
      )}
      {isCurrentLesson && !lesson.deposit && (
        <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs">입금 확인 중</div>
      )}
      {isCurrentLesson && restLessonAvailable && (
        <button onClick={() => onRestLesson(lesson.lessonStudentId)} className="bg-red-400 text-white px-3 py-1 rounded-full text-xs">
          휴식 신청
        </button>
      )}
    </div>
  </div>
);

interface LessonListProps {
  lessonData: IMyLesson[];
  restLessonAvailable: boolean;
  currentMonth: string;
}

const LessonList: React.FC<LessonListProps> = ({ lessonData, restLessonAvailable, currentMonth }) => {
  const restLessonMutation = useRestLessonMutation();
  const token = useToken();

  const handleRestLesson = (lessonId: string) => {
    restLessonMutation.mutate({ lessonId, token });
  };

  const today = new Date()
  const isCurrentLesson = (month: string) => today.getDate() < ENROLLMENT_CLOSE_DATE ? month === currentMonth : month === new Date(today.getFullYear(), today.getMonth() + 1, 1).toISOString().slice(0, 7)

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h3 className="font-bold mb-4 text-neutral-500">📝 등록 내역</h3>
      <div className="space-y-4">
        {lessonData.map((lesson, index) => (
          <LessonItem
            key={index}
            lesson={lesson}
            isCurrentLesson={isCurrentLesson(lesson.month)}
            restLessonAvailable={restLessonAvailable}
            onRestLesson={handleRestLesson}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonList;