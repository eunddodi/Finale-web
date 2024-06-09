import Image from "next/image";
import Header from "./components/Header";

export default function Home() {

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center bg-white">
        <Header />
        <main className="flex flex-col items-center justify-center flex-grow px-4">
          <Image src="" width={100} height={100} alt="Line drawing of ice skates" className="my-8" />
          <h1 className="text-green-200 text-3xl font-bold mb-4 text-center">피겨가 나날이 레벨업!</h1>
          <p className="text-gray-500 text-center">
            서울 및 경기권 12개의 링크장에서<br />
            다양한 수업을 진행하고 있는 성인 취미 피겨팀 피날레입니다
          </p>
        </main>
      </div>
    </div>
  );
}
