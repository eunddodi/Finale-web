import Image from "next/image";

export interface ICoach {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
  history: string[];
}

export const coachData: ICoach[] = [
  {
    id: '1',
    name: '우송원',
    position: '헤드 코치',
    imageUrl: '/coaches/default.svg',
    history: [
      '연세대학교 스포츠 응용산업학과 졸업',
      '서울대학교 대학원 체육교육과 졸업',
      '생활 스포츠 지도사 자격증 발생 2급',
      '전문 스포츠 지도사 자격증 발생 2급',
      '前 교대 아이콕스 피겨 코치',
      '現 발산 아이스온 피겨 코치',
    ],
  },
  {
    id: '2', name: '김채영', position: '서브 코치', imageUrl: '/coaches/default.svg',
    history: [
      '고려대학교 국제스포츠학부 스포츠과학과 졸업',
      '전문 스포츠 지도사 자격증 발생 2급',
      '제 98회 전국 동계체육대회 B조 여고부 3위',
      '국내 대회 다수 출전 및 입상',
      '前 성남시청 아이스링크 강사',
      '現 더로드 아이스링크 피겨 코치',
    ],
  },
  {
    id: '3', name: '채규진', position: '서브 코치', imageUrl: '/coaches/default.svg',
    history: [
      '피겨스케이팅 급수 5급',
      '제 98회 전국 동계체육대회 D조 여중부 3위',
      '제 99회 전국 동계체육대회 C조 여중부 3위',
      '2016 경기도 빙상경기연맹 회장배 피겨스케이팅 대회 2위',
      '국내 대회 다수 출전 및 입상'
    ]
  },
  {
    id: '4', name: '도지훈', position: '서브 코치', imageUrl: '/coaches/default.svg',
    history: [
      '전 피겨스케이팅 국가대표',
      '경희대학교 스포츠지도학과 재학 중',
      '2016 멕시코 오픈 노비스 1위',
      '2018 ISU 4차 주니어 그랑프리 캐나다 5위',
      '2019 전국 동계체육대회 A조 여고부 3위',
      '2022 & 2023 미디어아트 G-SHW 아이스쇼 조연 출연',
    ]
  },
  {
    id: '5', name: '강민지', position: '서브 코치', imageUrl: '/coaches/default.svg',
    history: [
      '생활 스포츠 지도사 자격증 빙상 2급',
      '전문 스포츠 지도사 자격증 빙상 2급',
      '제 19회 닥터리처드포머 싱크로나이즈드 클래식대회 프리주비널대회 1위',
      '국내 대회 다수 출전 및 입상',
      '前 서울광장 스케이트장 코치',
      '現 디엣지 아이스링크 피겨 코치',
    ]
  },
  {
    id: '6', name: '김소연', position: '서브 코치', imageUrl: '/coaches/default.svg',
    history: [
      "생활 스포츠 지도사 자격증 빙상 2급",
      "국내 대회 다수 출전 및 입상",
      "제 9회 전국남녀 피겨스케이팅 꿈나무대회 4위",
      "제 25회 서울특별시 빙상경기연맹 회장배 피겨스케이팅 대회 2위",
      "제 27회 서울특별시 빙상경기연맹 회장배 피겨스케이팅 대회 3위",
      "前 교대 아이콕스 피겨 코치",
    ]
  },
  {
    id: '7', name: '정진철', position: '서브 코치', imageUrl: '/coaches/default.svg',
    history: [
      '전문 스포츠 지도사 자격증 빙상 2급',
      '국내 대회 다수 출전 및 입상',
      '제 91회 전국동계체전 남대학부 1위',
      '前 청주 실내 빙상장 피겨 코치',
      '前 교대 아이콕스 피겨 코치',
      '前 고양 어울림누리 피겨 코치',
    ]
  },
  {
    id: '8', name: '차인영', position: '서브 코치', imageUrl: '/coaches/default.svg',
    history: [
      "전 피겨스케이팅 국가대표 상비군",
      "전문 스포츠 지도사 자격증 빙상 2급",
      "제 63회, 64회 전국남녀 피겨스케이팅 종합선수권대회 여자노비스 1위",
      "제 90회, 91회 전국동계체전 C조 여중부 1위",
      "국내 대회 다수 출전 및 입상",
      "前 과천시민회관 빙상장 피겨 코치",
    ]
  },
  {
    id: '9', name: '김경민', position: '서브 코치', imageUrl: '/coaches/default.svg',
    history: [
      "스포츠 컨디셔닝 지도사 자격증 1급",
      "생활 스포츠 지도사 자격증 빙상 1급",
      "2011 교보 꿈나무 대회 1위",
      "2012 대구시 회장배 피겨스케이팅 대회 1위",
      "2013 전국 동계체전 싱크로 1위",
      "2014 전국 동계체전 싱크로 1위",
    ]
  },
];

export default function Coaches() {
  return (
    <div className="overflow-x-auto pb-4 px-8 scrollbar-hide">
      <div className="flex space-x-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}>
        {coachData.map((coach) => (
          <div key={coach.id} className="flex-none">
            <div className="overflow-hidden">
              <Image
                src={coach.imageUrl}
                alt={coach.name}
                width={180}
                height={180}
              />
              <div className="p-4">
                <h3 className="font-semibold text-xl text-main">{coach.name}</h3>
                <p className="text-gray-600">{coach.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}