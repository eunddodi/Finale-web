'use client'
import React, { useState, Suspense } from 'react';
import { ILocation } from '../api/types';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorFallback';
import Loader from '../components/Loader';
import useApplyAvailablityQuery from '@/hooks/queries/useApplyAvailablityQuery';
import MonthSelector from './components/MonthSelector';
import LocationSelector from './components/LocationSelector';
import LessonTableContainer from './components/LessonTable';

const EnrollmentPage: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Main />
    </Suspense>
  )
}

const Main = () => {
  const { data: { enrollment } } = useApplyAvailablityQuery()
  if (!enrollment) {
    return <Notice />
  }
  return <Lessons />
}

const Notice = () => {
  return (
    <div className="container mx-auto px-4 pt-32 pb-32 sm:py-8 max-w-3xl text-center">
      <h1 className="text-xl text-gray-700 sm:text-3xl font-bold mt-8 mb-2 sm:mb-6">현재는 수강신청 기간이 아닙니다.</h1>
      <p className="mb-4 text-sm sm:text-base text-gray-500">수강신청은 매월 25일 오픈됩니다.</p>
    </div>
  )
}

const Lessons = () => {
  const [currentLocation, setCurrentLocation] = useState<ILocation | null>(null);

  return (
    <div className="container mx-auto px-4 pt-4 pb-32 sm:py-8 max-w-3xl text-center">
      <h1 className="text-xl text-gray-800 sm:text-3xl font-bold mt-8 mb-2 sm:mb-6">{new Date().getMonth() + 1}월 수강신청</h1>
      <p className="mb-4 text-sm sm:text-base text-gray-500">신청할 수업을 선택해주세요.</p>
      <MonthSelector />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<Loader />}>
          <LocationSelector
            currentLocation={currentLocation}
            onSelect={setCurrentLocation}
          />
        </Suspense>
      </ErrorBoundary>
      {currentLocation && (
        <div className="mb-4 text-sm sm:text-base text-left">
          <h2 className="text-lg text-gray-700 sm:text-xl font-bold">{currentLocation.name}</h2>
          <p>{currentLocation.city} {currentLocation.district} {currentLocation.address}</p>
        </div>
      )}
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<Loader />}>
          {currentLocation && <LessonTableContainer locationName={currentLocation.name} />}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default EnrollmentPage
