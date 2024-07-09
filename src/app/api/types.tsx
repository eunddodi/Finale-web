export interface ILesson {
  id: number;
  locationName: string;
  cost: string;
  day: number;
  maxStudents: number;
  currentEnrollent: number;
  studentsPerCoach: number;
  lessonDates: LessonDate[];
}
interface LessonDate {
  date: string;
  startTime: null | string;
  endTime: null | string;
}

export interface ILocation {
  id: number
  name: string
  city: string
  district: string
  address: string
}

