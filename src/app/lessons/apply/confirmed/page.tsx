'use client'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const DynamicPaymentInfo = dynamic(() => import('./components/PaymentInfo'))

export default function PaymentConfirmationPage() {
  const router = useRouter()
  const goToMainPage = () => {
    router.push('/')
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <header className="text-center my-8">
        <p className="text-xl font-bold text-main mt-4">
          👏 신청이 완료되었습니다! 👏
        </p>
      </header>

      <div className="text-center mb-8">
        <p className="text-lg font-semibold text-gray-700 mb-2">지금 바로 수강료를 입금해주세요!</p>
        <p className="text-sm text-gray-500">
          5분 이내로 입금하시지 않으면 신청이 취소될 수 있어요.<br />
          입금이 확인 되면 수강 확정 문자를 보내드릴게요.<br />
          입금 확인은 최대 24시간 걸릴 수 있습니다.
        </p>
      </div>
      <DynamicPaymentInfo />
      <button
        onClick={goToMainPage}
        className="w-full bg-gray-light text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-300 transition duration-300"
      >
        메인화면으로 가기
      </button>
    </div>
  )
}
