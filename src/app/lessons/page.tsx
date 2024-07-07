'use client'
import React, { useState, Suspense, useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getLocationList, getLessonsOfLocation } from '../api';
import { ILesson, ILocation } from '../api/types';
import { ErrorBoundary } from 'react-error-boundary';
import { formatDayOfWeek } from '@/util';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EnrollmentPage: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<ILocation | null>(null);

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 max-w-3xl">
      <h1 className="text-2xl sm:text-3xl font-extrabold mt-8 mb-2 sm:mb-6">{new Date().getMonth() + 1}월 수강신청</h1>
      <p className="mb-4 text-sm sm:text-base">신청할 수업을 선택해주세요.</p>
      <MonthSelector />
      <ErrorBoundary fallback={<div className="text-red-500">위치 목록을 불러오는 중 오류가 발생했습니다.</div>}>
        <Suspense fallback={<div className="text-gray-500">위치 목록을 불러오는 중...</div>}>
          <LocationSelector
            currentLocation={currentLocation}
            onSelect={setCurrentLocation}
          />
        </Suspense>
      </ErrorBoundary>
      {currentLocation && (
        <div className="mb-4 text-sm sm:text-base">
          <h2 className="text-lg sm:text-xl font-bold">{currentLocation.name}</h2>
          <p>{currentLocation.city} {currentLocation.district} {currentLocation.address}</p>
        </div>
      )}
      <ErrorBoundary fallback={<div className="text-red-500">수업 정보를 불러오는 중 오류가 발생했습니다.</div>}>
        <Suspense fallback={<div className="text-gray-500">수업 정보를 불러오는 중...</div>}>
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
    <p className="text-xs sm:text-sm text-gray-600">
      7월 4일 시작입니다 7월 1,2,3일 휴무(시간표 필히 확인) * 스케이트 대여 : 하남 아이스박스, 제니스 하프, 스포텍, 역삼 가능, 이외는 개인적으로 준비 바랍니다 /수업 신청하신 날짜륻 중 대여하시어야는 분은 신청 후 연락 부탁드립니다 /외부 수강생 연습대관 찾습등록 가능합니다(DM)
    </p>
  </div>
);

const LessonTableContainer: React.FC<{ locationName: string }> = ({ locationName }) => {
  const { data: locationData } = useSuspenseQuery({
    queryKey: ['lessons', locationName],
    queryFn: () => getLessonsOfLocation(locationName),
  });

  const handleApply = (lessonId: number) => {
    console.log(`Applying for lesson ${lessonId}`);
    // Implement your apply logic here
  };

  return <LessonTable lessons={locationData.lessons} onApply={handleApply} />;
};

const LessonTable: React.FC<{
  lessons: ILesson[];
  onApply: (lessonId: number) => void;
}> = ({ lessons, onApply }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse text-sm sm:text-base">
      <thead>
        <tr className="bg-gray-200">
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
              <div className="text-xs sm:text-sm">
                {formatDayOfWeek(lesson.day)} {lesson.lessonDates[0].startTime} - {lesson.lessonDates[0].endTime}
              </div>
            </td>
            <td className="border p-2">{lesson.cost}</td>
            <td className="border p-2">{lesson.currentEnrollment} / {lesson.maxStudents}</td>
            <td className="border p-2">
              <button
                onClick={() => onApply(lesson.id)}
                className="bg-blue-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
              >
                신청
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EnrollmentPage;