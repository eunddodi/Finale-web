import React from 'react';
import Image from 'next/image';

interface ICoach {
  id: number;
  name: string;
  title: string;
  image?: string;
  history: string[];
}

const coaches = [
  {
    id: 1,
    name: '우승원',
    title: '헤드 코치',
    image: '/coaches/1.jpg',
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
    id: 2,
    name: '김채영',
    title: '서브 코치',
    image: '/coaches/2.jpg',
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
    history: [
      생활 스포츠 지도사 자격증 빙상 2급
국내 대회 다수 출전 및 입상
제 9회 전국남녀 피겨스케이팅 꿈나무대회 4위
제 25회 서울특별시 빙상경기연맹 회장배 피겨스케이팅 대회 2위
제 27회 서울특별시 빙상경기연맹 회장배 피겨스케이팅 대회 3위 교대 아이콕스 피겨 코치
    ]
  }
  // ... Add 7 more coach objects with similar structure
];

const CoachCard = ({ coach }: { coach: ICoach }) => (
  <div className="bg-white p-6 mb-6">
    <Image
      // 없으면 default 이미지 보여주기
      src={`/coaches/${coach.id}.jpg`}
      alt={coach.name}
      width={200}
      height={200}
      className="rounded-full mx-auto mb-4"
    />
    <h2 className="text-sm text-center text-neutral-500">{coach.title}</h2>
    <h3 className="text-2xl font-semibold text-center text-main mb-4">{coach.name}</h3>
    <ul className="text-sm text-center space-y-2">
      {coach.history.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const CoachProfilePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-teal-600 mb-8 text-center">FINALE 코치진</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coaches.map((coach) => (
          <CoachCard key={coach.id} coach={coach} />
        ))}
      </div>
    </div>
  );
};

export default CoachProfilePage;