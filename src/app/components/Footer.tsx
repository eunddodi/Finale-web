import React from 'react';
import { Youtube, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <div className="flex justify-center bg-white text-gray-500 py-16 gap-4">
      <div className="flex-col">
        <div className="text-xl font-light mb-4 md:mb-0 text-gray-400">
          TEAM FINALE
        </div>
        <div className="flex justify-start gap-2">
          <a href="https://www.youtube.com/@figure_finale" target="_blank" className="text-gray-400 hover:text-gray-600">
            <Youtube size={22} />
          </a>
          <a href="https://www.instagram.com/figure_finale/" target="_blank" className="text-gray-400 hover:text-gray-600">
            <Instagram size={20} />
          </a>
        </div>
      </div>
      <div className="text-xs text-right">
        <p>사업자등록번호: 891-93-01576</p>
        <p>피날레 대표: 우송원</p>
        <p>TEL: 010-8249-0708</p>
        <p>&copy; 2023 FINALE. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;