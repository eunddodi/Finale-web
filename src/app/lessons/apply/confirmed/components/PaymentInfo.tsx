import { useSearchParams } from "next/navigation"
import { useState } from "react"

const PaymentInfo = () => {
  const [isCopied, setIsCopied] = useState(false)

  const paymentInfo = {
    bankName: '카카오뱅크',
    accountNumber: '3333153079017',
    accountHolder: '우송원',
  }
  const params = useSearchParams()

  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(paymentInfo.accountNumber)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }
  return (
    <>
      <div className="bg-white border-gray-light border-2 p-6 rounded-lg mb-8 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div className="font-bold">은행명</div>
          <div>{paymentInfo.bankName}</div>
          <div className="font-bold">계좌 번호</div>
          <div>{paymentInfo.accountNumber}</div>
          <div className="font-bold">계좌주</div>
          <div>{paymentInfo.accountHolder}</div>
          {params.get('cost') && <>
            <div className="font-bold">수강료</div>
            <div>{params.get('cost')}</div>
          </>
          }
        </div>
      </div>
      <button
        onClick={copyAccountNumber}
        className="w-full bg-main text-white font-semibold py-3 px-4 rounded-lg hover:bg-main-dark transition duration-300 mb-2"
      >
        {isCopied ? '복사됨!' : '계좌번호 복사하기'}
      </button>
    </>
  )
}

export default PaymentInfo
