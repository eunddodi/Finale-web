'use client'
import React, { useState, Suspense, useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getLocationList, getLessonsOfLocation } from '../api';
import { ILesson, ILocation } from '../api/types';
import { ErrorBoundary } from 'react-error-boundary';
import { formatDayOfWeek, redirectToLogin } from '@/util';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useLocalStorage, { LOCAL_STORAGE_KEYS } from '@/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import ErrorFallback from '../components/ErrorFallback';
import Loader from '../components/Loader';
import useApplyAvailablityQuery from '@/hooks/queries/useApplyAvailablityQuery';

const EnrollmentPage: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<ILocation | null>(null);
  const { data: { enrollment } } = useApplyAvailablityQuery()

  if (!enrollment) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-32 sm:py-8 max-w-3xl text-center">
        <h1 className="text-xl text-gray-700 sm:text-3xl font-bold mt-8 mb-2 sm:mb-6">현재는 수강신청 기간이 아닙니다.</h1>
        <p className="mb-4 text-sm sm:text-base text-gray-500">수강신청은 매월 25일 오픈됩니다.</p>
      </div>
    )
  }

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
};

const LocationSelector: React.FC<{
  currentLocation: ILocation | null;
  onSelect: (location: ILocation) => void;
}> = ({ currentLocation, onSelect }) => {
  const { data: locations } = useSuspenseQuery<ILocation[]>({
    queryKey: ['locations'],
    queryFn: getLocationList,
  });

  useEffect(() => {
    if (locations && locations.length > 0 && !currentLocation) {
      onSelect(locations[0]);
    }
  }, [locations, currentLocation, onSelect]);

  return (
    <div className="mb-4">
      {/* Mobile dropdown */}
      <div className="sm:hidden">
        <Select
          value={currentLocation?.id.toString()}
          onValueChange={(value) => {
            const selected = locations.find(loc => loc.id.toString() === value);
            if (selected) onSelect(selected);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="위치를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location.id} value={location.id.toString()}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop buttons */}
      <div className="hidden sm:flex flex-wrap gap-2">
        {locations.map((location) => (
          <button
            key={location.id}
            onClick={() => onSelect(location)}
            className={`px-4 py-2 text-base border rounded ${currentLocation?.id === location.id
              ? 'text-blue-500 border-blue-500'
              : 'text-gray-700 border-gray-300'
              }`}
          >
            {location.name}
          </button>
        ))}
      </div>
    </div >
  );
};


const MonthSelector: React.FC = () => (
  <div className="mb-4">
    <div className="text-xs sm:text-sm text-gray-600 bg-gray-light p-4">
      <p>📍7월 4일 시작입니다📍 7월 1,2,3일 휴무(시간표 필히 확인)</p>
      <p className="text-left mt-2">
        - 스케이트 대여 : 하남 아이스박스, 제니스 하프, 스포텍, 역삼 가능, 이외는 개인적으로 준비 바랍니다. 남성분 중 대여 필요하신 분은 신청 후 연락 부탁드립니다.<br />
        - 외부 수강생 연습대관 횟수 등록 가능합니다. (DM)
      </p>
    </div>
  </div>
);

const LessonTableContainer: React.FC<{ locationName: string }> = ({ locationName }) => {
  const { data: locationData } = useSuspenseQuery({
    queryKey: ['lessons', locationName],
    queryFn: () => getLessonsOfLocation(locationName),
  });
  const router = useRouter()

  const handleApply = (lessonId: number) => {
    router.push(`/lessons/apply?lessonId=${lessonId}`)
  };

  return <LessonTable lessons={locationData.lessons} onApply={handleApply} />;
};

const LessonTable: React.FC<{
  lessons: ILesson[];
  onApply: (lessonId: number) => void;
}> = ({ lessons, onApply }) => {

  if (lessons.length === 0) {
    return <div className="text-left text-sm">신청 가능한 수업이 존재하지 않습니다.</div>
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-light text-gray-700">
            <th className="border p-2">요일 및 시간</th>
            <th className="border p-2">비용</th>
            <th className="border p-2">정원</th>
            <th className="border p-2">신청</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson.id}>
              <td className="border p-2">
                <div>
                  {formatDayOfWeek(lesson.day)} {lesson.lessonDates[0].startTime} - {lesson.lessonDates[0].endTime}
                </div>
              </td>
              <td className="border p-2">{lesson.cost}</td>
              <td className="border p-2">{lesson.currentEnrollment} / {lesson.maxStudents}</td>
              <td className="border p-2">
                {lesson.currentEnrollment >= lesson.maxStudents
                  ? <button className="bg-gray-200 text-gray-500 font-semibold px-2 py-1 rounded cursor-not-allowed" disabled>마감</button>
                  : <button onClick={() => onApply(lesson.id)} className="bg-blue-50 text-blue-500 font-semibold px-2 py-1 rounded">신청</button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default EnrollmentPage;