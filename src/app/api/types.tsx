export interface ILesson {
  id: number
  location: string
  cost: string
  day: number // 0:Sun-6:Sat
  maxStudents: number
  currentEnrollment: number
  studentsPerCoach: number
  lessonDates: {
    date: string
    startTime: string
    endTime: string
  }[]
}

export interface ILocation {
  id: number
  name: string
  city: string
  district: string
  address: string
  lessons: ILesson[]
}


export const MOCK_LESSON: ILesson = {
  id: 1,
  cost: '4회 18만원',
  location: '역삼 아이스웍스',
  day: 3,
  maxStudents: 16,
  currentEnrollment: 1,
  studentsPerCoach: 4,
  lessonDates: [
    {
      date: '2022-01-06',
      startTime: '20:40',
      endTime: '22:00'
    },
    {
      date: '2022-01-13',
      startTime: '20:40',
      endTime: '22:00'
    },
    {
      date: '2022-01-20',
      startTime: '20:40',
      endTime: '22:00',
    },
    {
      date: '2022-01-27',
      startTime: '20:40',
      endTime: '22:00',
    },
  ]
}

export const MOCK_LOCATIONS: ILocation[] = [
  {
    id: 11,
    name: "역삼 아이스웍스",
    city: "서울특별시",
    district: "강남구",
    address: "역삼로 310 4층",
    lessons: [MOCK_LESSON, MOCK_LESSON],
  },
  {
    id: 10,
    name: "신사 와이키키",
    city: "서울특별시",
    district: "강남구",
    address: "압구정로 104 보암빌등",
    lessons: [MOCK_LESSON, MOCK_LESSON, MOCK_LESSON],
  }
]
