'use client'
import { apiRequest } from "@/util";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

function getLessons() {
  return apiRequest('lessons')
}

export default function Lesson() {
  const [selectedLocationId, setSelectedLocationId] = useState(data[0].id);
  const selectedLocation = data.find((location) => location.id === selectedLocationId);

  const lessonsQuery = useQuery({
    queryKey: ['lessons'],
    queryFn: () => apiRequest('api/lesson/list'),
  })

  console.log(lessonsQuery.data)

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center my-8">
        <h2 className="text-3xl font-bold">수강신청</h2>
        <p className="text-gray-500">신청할 수업을 선택해주세요.</p>
      </div>
      <div className="text-center my-8">
        <h3 className="text-2xl font-bold">6월</h3>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 mb-8">
        <p>📍 6월 1일 시작입니다 📍 6/29,30 휴무(시간표 필히 확인) * 스케이트 대여 : 하남 아이스박스, 제니스 하프, 스포텍, 역삼 가능, 이외는 개인적으로 문의 바랍니다 / 수업 신청하신 남자분 중 대여하셔야하는 분은 신청 후 연락 부탁드립니다 / 외부 수강생 연습대관 횟수등록도 가능합니다(DM)</p>
      </div>
      <div className="flex flex-wrap justify-center mb-8">
        {data.map((location) => (
          <button
            key={location.id}
            className={`py-2 px-4 m-2 rounded ${selectedLocationId === location.id ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
              }`}
            onClick={() => setSelectedLocationId(location.id)}
          >
            {location.name}
          </button>
        ))}
      </div>
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
            {selectedLocation?.lessons.map((lesson) => (
              <tr key={lesson.id} className="border-b">
                <td className="py-2 px-4 text-gray-500">{lesson.time}</td>
                <td className="py-2 px-4 text-gray-500">{lesson.cost}</td>
                <td className="py-2 px-4 text-right">
                  {lesson.remaining > 0 ? (
                    <Link href={`/apply?lessonId=${lesson.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
                      신청
                    </Link>
                  ) : (
                    <button className="bg-gray-300 text-gray-500 px-4 py-2 rounded" disabled>
                      마감
                    </button>
                  )}
                  {lesson.remaining > 0 && (
                    <span className="text-gray-500 ml-2">남은 자리 {lesson.remaining}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
}



const data: ILocation[] = [
  {
    id: '1',
    name: '장한평 디엣지',
    address: '서울특별시 성동구 용답동 227-1 지하1층',
    lessons: [
      {
        id: '1',
        time: '수 07:30-08:50',
        cost: '18만원 / 4회',
        remaining: 1
      },
      {
        id: '2',
        time: '금 08:00-09:20',
        cost: '18만원 / 4회',
        remaining: 13
      },
      {
        id: '3',
        time: '토 19:30-20:50',
        cost: '20만원 / 4회',
        remaining: 5
      },
    ]
  },
  {
    id: '2',
    name: '신사 와이키키(단체_초급)',
    address: '부산시 해운대구',
    lessons: [
      {
        id: '1',
        time: '금 08:00-09:20',
        cost: '10만원 / 4회',
        remaining: 0
      },
    ]
  }
]

interface ILocation {
  id: string
  name: string
  address: string
  lessons: ILesson[]
}

interface ILesson {
  id: string
  time: string
  cost: string
  remaining: number
}

