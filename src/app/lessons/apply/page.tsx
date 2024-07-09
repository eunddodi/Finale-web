'use client'

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';
import Loader from "@/app/components/Loader";
import ErrorFallback from '@/app/components/ErrorFallback';

const DynamicLessonInformation = dynamic(() => import('../components/LessonInformation'), {
  ssr: false,
  loading: () => <Loader />
});

export default function ApplyPage() {
  return (
    <div className="max-w-md mx-auto p-4">
      <header className="text-center my-8">
        <h2 className="text-2xl font-bold mt-8">신청하기</h2>
        <p className="text-gray-500">신청 내역을 확인해주세요.</p>
      </header>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<Loader />}>
          <DynamicLessonInformation />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

