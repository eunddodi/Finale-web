interface NotificationCardProps {
  currentMonth: string
}

const Notice: React.FC<NotificationCardProps> = ({ currentMonth }) => (
  <div className="bg-white rounded-lg p-4 flex items-center shadow">
    <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
      <div className="text2xl text-center" style={{ width: '24px', height: '24px' }}>⛸️</div>
    </div>
    <div>
      <p className="text-gray-500">{parseInt(currentMonth.split('-')[1]) + 1}월 수강신청</p>
      <p className="font-bold">휴식신청 기간입니다</p>
    </div>
  </div>
)

export default Notice

