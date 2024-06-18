'use client'

import { getLessonDetail } from "@/app/api";
import useLocalStorage, { LOCAL_STORAGE_KEYS } from "@/hooks/useLocalStorage";
import { formatDayOfWeek } from "@/util";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import Loader from "@/app/components/Loader";

export default function ApplyPage() {
  const [username] = useLocalStorage(LOCAL_STORAGE_KEYS.USER_NAME)
  const [phoneNumber] = useLocalStorage(LOCAL_STORAGE_KEYS.USER_PHONE_NUMBER)
  const params = useSearchParams()
  const lessonId = params.get('lessonId')

  const query = useQuery({
    queryKey: ['lessons', lessonId],
    queryFn: () => getLessonDetail(lessonId as string),
    enabled: !!lessonId
  })

  const apply = () => {
    // 성공하면 apply/confirm으로 이동
    // 실패 - 401이면 redirectTo 저장, 로그인 페이지로 이동
    // 그 외 - alert('신청에 실패했습니다.')
  }

  const data = query.data

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">신청하기</h2>
      <p className="text-gray-500 mb-8">신청 내역을 확인해주세요.</p>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md inline-block text-left mb-8">
        {username && <div className="flex justify-between mb-2">
          <span className="font-bold">이름</span>
          <span>{username}</span>
        </div>}
        {phoneNumber && <div className="flex justify-between mb-2">
          <span className="font-bold">전화번호</span>
          <span>{phoneNumber}</span>
        </div>}
        {data
          ? <>
            <div className="flex justify-between mb-2">
              <span className="font-bold">신청한 수업</span>
              <div>{formatDayOfWeek(data.day)} {data.location}</div>
              <ul>
                {data.lessonDates.map((date, i) => (
                  <li key={i}>
                    <div>{date.date}</div>
                    <div>{date.startTime}-{date.endTime}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">수강료</span>
              <span>{data.cost}</span>
            </div>
          </>
          : <Loader />}
      </div>
      <p className="text-red-500 mb-4">❗ 신청 후에는 취소가 불가능하니 신중하게 신청해주세요 ❗</p>
      <button className="bg-green-200 text-white font-bold py-2 px-8 rounded-full">신청하기</button>
    </div >
  );
}
