export interface ILesson {
  id: number;
  locationName: string;
  cost: string;
  day: number;
  maxStudents: number;
  currentEnrollment: number;
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


export interface IMyLesson {
  location: string;
  month: string;
  startTime: string;
  endTime: string;
  deposit: boolean;
  restLesson: boolean;
  days: number;
  lessonStudentId: string;
}
