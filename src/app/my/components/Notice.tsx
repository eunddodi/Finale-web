import { ENROLLMENT_CLOSE_DATE } from "@/constants"
import Link from "next/link"

interface NotificationCardProps {
  currentMonth: string
  restLessonAvailable: boolean
  enrollmentAvailable: boolean
}

const Notice: React.FC<NotificationCardProps> = ({ currentMonth, restLessonAvailable, enrollmentAvailable }) => {
  if (!enrollmentAvailable && !restLessonAvailable) return null

  return (
    <div className="bg-white rounded-lg p-4 flex items-center shadow">
      <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
        <div className="text2xl text-center" style={{ width: '24px', height: '24px' }}>⛸️</div>
      </div>
      {enrollmentAvailable
        ? <EnrollmentPeriodContent currentMonth={currentMonth} />
        : restLessonAvailable
          ? <RestPeriodContent currentMonth={currentMonth} />
          : <DefaultContent currentMonth={currentMonth} />
      }
    </div>
  )
}

export default Notice

function RestPeriodContent({ currentMonth }: { currentMonth: string }) {
  return (
    <div>
      <p className="text-gray-500">{parseInt(currentMonth.split('-')[1]) + 1}월 수강신청</p>
      <p className="font-bold">휴식신청 기간입니다</p>
    </div>
  )
}

function EnrollmentPeriodContent({ currentMonth }: { currentMonth: string }) {
  function getMonthString(currentMonth: string) {
    const today = new Date();
    const [currentYear, currentMonthNum] = currentMonth.split('-').map(Number);

    if (today.getDate() < ENROLLMENT_CLOSE_DATE) {
      return currentMonth;
    } else {
      const nextMonth = new Date(currentYear, currentMonthNum, 1);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth.toISOString().slice(0, 7);
    }
  }

  return (
    <div>
      <p className="text-gray-500">{parseInt(getMonthString(currentMonth).split('-')[1])}월 수강신청 기간입니다</p>
      <Link href='/lessons'><p className="font-bold">레슨 신청하기</p></Link>
    </div>
  )
}

function DefaultContent({ currentMonth }: { currentMonth: string }) {
  return (
    <div>
      <p className="text-gray-500">{parseInt(currentMonth.split('-')[1]) + 1}월 수강신청</p>
      <p className="font-bold">25일에 열려요</p>
    </div>
  )
}

