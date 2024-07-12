import Image from "next/image";

export default function Home() {

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center bg-white">
        <main className="flex flex-col items-center justify-center flex-grow w-full">
          <section className="text-center flex flex-col items-center mb-16 py-32">
            <Image src="/landing/logo.png" width={100} height={100} alt="Line drawing of ice skates" className="my-8" />
            <h1 className="text-main text-3xl font-bold mb-4 text-center">피겨가 나날이 레벨업!</h1>
            <p className="text-gray-500 text-center text-base">
              서울 및 경기권 12개의 링크장에서<br />
              다양한 수업을 진행하고 있는<br /> 성인 취미 피겨팀 피날레입니다
            </p>
          </section>
          <section className="text-center mb-32 bg-gray-light py-16 w-full">
            <p className="text-gray-700 text-base md:text-base">
              2020년부터 시작한 피날레는<br />
              현재 600명대의 수강생들과 함께하고 있으며<br /><br />
              피날레 만의 독보적인 수업 방식으로<br />
              수강생들의 높은 만족도를 이끌어내고 있습니다.
            </p>
          </section>
          <section className="flex flex-col md:flex-row justify-between items-center mb-32">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">피날레에서는 이렇게 수업해요!</h2>
              <ul className="list-disc list-inside text-base text-gray-700">
                <li>월 <b className="font-semibold">4회</b> 수업</li>
                <li>4회 기준 평균 <b className="font-semibold">19만 원</b></li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="space-y-2">
                <div className="bg-main text-white p-4 rounded-lg shadow-md text-base md:text-sm">
                  서울대 체교과 출신 대표와<br />
                  선수 출신 코치진들의 <b className="font-semibold">수준높은</b> 코칭 스킬
                </div>
                <div className="bg-sub-blue text-white p-4 rounded-lg shadow-md text-base md:text-sm">
                  개인의 수준에 맞는 <b className="font-semibold">개별 진도 수업</b> 방식
                </div>
                <div className="bg-sub-blue-dark text-white p-4 rounded-lg shadow-md text-base md:text-sm">
                  어플을 이용한 <b className="font-semibold">편리한 수강시스템</b>과<br />
                  파격적인 <b className="font-semibold">보강제도</b>
                </div>
              </div>
            </div>
          </section>
          <section className="text-center mb-32">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">다양한 장소의 수업이<br />준비되어있어요</h2>
            <p className="text-gray-500 mb-4 text-base">나와 가까운 곳에 수업이 있는지 확인해보세요.</p>
            <Image src="/landing/map.jpg" width={280} height={280} alt="Map showing various locations" className="mx-auto mb-8" />
            <button className="bg-sub-orange text-white px-6 py-2 rounded-full text-lg font-semibold">시간표 자세히보기</button>
          </section>
          <section className="text-center mb-32 bg-gray-light py-16 w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">실력 있는 코치진과 함께합니다</h2>
            <p className="text-gray-500 mb-4 text-base">서울대 체교과 출신 대표와 선수 출신 코치진들의<br />수준 높은 코칭 스킬을 만나보세요!</p>
            {/* <CoachList /> */}
            <button className="bg-sub-orange text-white px-6 py-2 rounded-full text-lg font-semibold">코치진 자세히보기</button>
          </section>
        </main>
      </div>
    </div>
  );
}
