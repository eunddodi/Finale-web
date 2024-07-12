'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import useLocalStorage, { LOCAL_STORAGE_KEYS } from "@/hooks/useLocalStorage";
import { getLessonDetail } from "@/app/api";
import useEnrollLessonMutation from "@/hooks/mutations/useEnrollLessonMutation";
import useToken from "@/hooks/useToken";
import { BadRequestError } from "@/types/errors";

export default function LessonInformation() {
  const router = useRouter()
  const params = useSearchParams();
  const lessonId = params.get('lessonId');

  const [username] = useLocalStorage(LOCAL_STORAGE_KEYS.USER_NAME);
  const [phoneNumber] = useLocalStorage(LOCAL_STORAGE_KEYS.USER_PHONE_NUMBER);
  const token = useToken()

  const { data } = useSuspenseQuery({
    queryKey: ['lessons', lessonId],
    queryFn: () => getLessonDetail(lessonId as string),
  });

  const mutation = useEnrollLessonMutation()


  const apply = () => {
    if (!lessonId || !token) return
    mutation.mutate({ lessonId, token }, {
      onSuccess: () => {
        router.replace('/lessons/apply/confirmed')
      },
      onError: (error) => {
        if (error instanceof BadRequestError) {
          alert(error.message)
          router.back()
        }
      }
    })
  };

  return (
    <>
      <div className="bg-white border-gray-light border-2 p-6 rounded-lg mb-8 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div className="font-bold">이름</div>
          <div>{username}</div>
          <div className="font-bold">전화번호</div>
          <div>{phoneNumber}</div>
          <div className="font-bold">신청한 수업</div>
          <div>{data.locationName} {data.lessonDates[0].startTime}-{data.lessonDates[0].endTime}</div>
          <div className="font-bold">수강료</div>
          <div>{data.cost}</div>
        </div>
      </div>
      <p className="text-red-500 text-center text-sm font-semibold mb-2">❗ 신청 후에는 취소가 불가능하니 신중하게 신청해주세요 ❗</p>
      <button
        onClick={apply}
        className="w-full bg-main text-white font-semibold py-3 px-4 rounded-lg hover:bg-main-dark transition duration-300 mb-4"
      >
        신청하기
      </button>
    </>
  );
}
