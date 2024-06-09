import { API_ENDPOINT } from "@/constants";
import { apiRequest } from "@/util";

async function getLessonDetail(id: string) {
  try {
    return apiRequest(`${API_ENDPOINT}/api/lesson/${id}`)
  } catch (e) {
    alert(e)
  }
}

export default async function ConfirmPage() {
  getLessonDetail('6') // 쿠키 통한 인증의 작동 여부를 확인하기 위한 API 호출

  return (
    <div>
      <h1>수강 신청 확인</h1>
    </div>
  );
}
