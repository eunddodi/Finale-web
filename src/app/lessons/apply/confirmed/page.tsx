'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentConfirmationPage() {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);

  const paymentInfo = {
    bankName: '카카오뱅크',
    accountNumber: '3333153079017',
    accountHolder: '우송원',
    amount: '20만 원'
  };

  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(paymentInfo.accountNumber);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const goToMainPage = () => {
    router.push('/'); // Adjust this route as needed
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <header className="text-center my-8">
        <h2 className="text-2xl font-bold mt-8">신청하기</h2>
        <p className="text-xl font-bold text-teal-500 mt-4">
          👏 신청이 완료되었습니다! 👏
        </p>
      </header>

      <div className="text-center mb-8">
        <p>지금 바로 수강료를 입금해주세요!</p>
        <p className="text-sm text-gray-500 mt-2">
          5분 이내로 입금하시지 않으면 신청이 취소될 수 있어요.<br />
          입금이 확인 되면 수강 확정 문자를 보내드릴게요.<br />
          입금 확인은 최대 24시간 걸릴 수 있습니다.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="font-bold">은행명</div>
          <div>{paymentInfo.bankName}</div>
          <div className="font-bold">계좌 번호</div>
          <div>{paymentInfo.accountNumber}</div>
          <div className="font-bold">계좌주</div>
          <div>{paymentInfo.accountHolder}</div>
          <div className="font-bold">수강료</div>
          <div>{paymentInfo.amount}</div>
        </div>
      </div>

      <button
        onClick={copyAccountNumber}
        className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-full hover:bg-teal-600 transition duration-300 mb-4"
      >
        {isCopied ? '복사됨!' : '계좌번호 복사하기'}
      </button>

      <button
        onClick={goToMainPage}
        className="w-full bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300"
      >
        메인화면으로 가기
      </button>
    </div>
  );
}