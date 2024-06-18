'use client'
import useLocalStorage from "@/hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ILesson, ILocation } from "../api/types";
import { getLocationList } from "../api";

export default function Lesson() {
  const [token] = useLocalStorage('token')
  const setRedirectTo = useLocalStorage('redirectTo')[1]

  const router = useRouter()

  const query = useQuery({ queryKey: ['locations'], queryFn: () => getLocationList() })

  useEffect(() => {
    if (!query.data) return
    setSelectedLocationId(query.data[0].id)
  }, [query.data])

  const [selectedLocationId, setSelectedLocationId] = useState<number>()
  const selectedLocation = useMemo(() => query.data?.find(({ id }) => id === selectedLocationId), [selectedLocationId, query.data])

  const handleApply = (id: number) => {
    if (!token) {
      router.push('/login')
      setRedirectTo(`/lessons/apply?lessonId=${id}`)
      return
    }
    router.push(`/lessons/apply?lessonId=${id}`)
    // 여기로 이동해서 신청 버튼 눌렀는데 401 이면 이 url 그대로 redirectTo에 저장하고 로그인 페이지로 이동
    // 로그인 성공 후 redirectTo에 저장된 url로 이동하는 것. 동일.
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Title />
      <Notice />
      {query.data && selectedLocationId && selectedLocation
        && <>
          <LocationList data={query.data} onClickItem={(id) => setSelectedLocationId(id)} selectedItemId={selectedLocationId} />
          <LessonList data={selectedLocation.lessons} onApplyLesson={handleApply} />
        </>}
    </div >
  );
}

const Title = () => (
  <div className="text-center my-8">
    <h2 className="text-3xl font-bold">수강신청</h2>
    <p className="text-gray-500">신청할 수업을 선택해주세요.</p>
  </div>
)

const Notice = () => (
  <>
    <div className="text-center my-8">
      <h3 className="text-2xl font-bold">6월</h3>
    </div>
    <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 mb-8">
      <p>📍 6월 1일 시작입니다 📍 6/29,30 휴무(시간표 필히 확인) * 스케이트 대여 : 하남 아이스박스, 제니스 하프, 스포텍, 역삼 가능, 이외는 개인적으로 문의 바랍니다 / 수업 신청하신 남자분 중 대여하셔야하는 분은 신청 후 연락 부탁드립니다 / 외부 수강생 연습대관 횟수등록도 가능합니다(DM)</p>
    </div>
  </>
)

const LocationList = ({ data, onClickItem, selectedItemId }: { data: ILocation[], onClickItem: (id: number) => void, selectedItemId: number }) => (
  <div className="flex flex-wrap justify-center mb-8">
    {data.map((location) => (
      <button
        key={location.id}
        className={`py-2 px-4 m-2 rounded ${selectedItemId === location.id ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => onClickItem(location.id)}
      >
        {location.name}
      </button>
    ))}
  </div>
)

const LessonList = ({ data, onApplyLesson }: { data: ILesson[], onApplyLesson: (id: number) => void }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr className="border-b">
          <th className="py-2 px-4 text-gray-500">시간</th>
          <th className="py-2 px-4 text-gray-500">비용</th>
          <th className="py-2 px-4 text-gray-500">신청</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, lessonDates, cost, maxStudents, currentEnrollment }) => (
          <tr key={id} className="border-b">
            <td className="py-2 px-4 text-gray-500">{lessonDates[0].startTime}-{lessonDates[0].endTime}</td>
            <td className="py-2 px-4 text-gray-500">{cost}</td>
            <td className="py-2 px-4 text-right">
              {currentEnrollment < maxStudents ? (
                <button onClick={() => onApplyLesson(id)} className="bg-blue-500 text-white px-4 py-2 rounded">
                  신청
                </button>
              ) : (
                <button className="bg-gray-300 text-gray-500 px-4 py-2 rounded" disabled>
                  마감
                </button>
              )}
              {currentEnrollment < maxStudents && (
                <span className="text-gray-500 ml-2">남은 자리 {maxStudents - currentEnrollment}</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)


