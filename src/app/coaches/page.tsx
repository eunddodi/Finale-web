import React from 'react';
import Image from 'next/image';
import { coachData, ICoach } from '../components/Coaches';

const CoachCard = ({ coach }: { coach: ICoach }) => (
  <div className="bg-white mb-6">
    <div className="overflow-hidden mx-auto mb-4" style={{ width: '180px', height: '180px' }}>
      <Image
        src={coach.imageUrl}
        alt={coach.name}
        width={180}
        height={180}
      />
    </div>
    <h2 className="text-sm text-center text-gray-800">{coach.position}</h2>
    <h3 className="text-xl font-semibold text-center tracking-wider text-main mb-4">{coach.name}</h3>
    <ul className="text-xs text-center space-y-2 text-gray-600">
      {coach.history.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const CoachProfilePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-8 text-center">코치진</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {coachData.map((coach) => (
          <CoachCard key={coach.id} coach={coach} />
        ))}
      </div>
    </div>
  );
};

export default CoachProfilePage;