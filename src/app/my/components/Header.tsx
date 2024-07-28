import Link from "next/link"

interface MonthHeaderProps {
  currentMonth: string
}

const Header: React.FC<MonthHeaderProps> = ({ currentMonth }) => (
  <div className="flex flex-row mb-6 items-center justify-between">
    <div className="text-xl text-gray-800 md:text-3xl font-bold">{currentMonth.replace('-', '년 ')}월</div>
    <Link href={'/lessons'} className="text-gray-500 text-sm bg-white px-3 py-1 rounded-full shadow">{currentMonth.split('-')[1]}월 남은 정원</Link>
  </div>
)

export default Header
