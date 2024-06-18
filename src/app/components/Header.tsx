'use client';

import { NOTICE_NOTION_LINK } from '@/constants';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e: MouseEvent) => {
    if (
      (e.target as HTMLElement).closest('#dropdown') ||
      (e.target as HTMLElement).closest('#hamburger')
    )
      return;
    setIsOpen(false);
  };


  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', closeDropdown);
    } else {
      document.removeEventListener('click', closeDropdown);
    }
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [isOpen]);

  return (
    <header className="w-full bg-primary py-4 flex justify-between items-center px-8">
      <div className="text-white text-lg font-semibold">FINALE</div>
      <nav className="hidden md:flex space-x-8 text-white text-xl font-bold">
        <Link href="time-table" className="hover:underline">시간표</Link>
        <a href="coaches" className="hover:underline">코치진</a>
        <a href={NOTICE_NOTION_LINK} className="hover:underline">수업 별 안내</a>
      </nav>
      <button className="hidden md:block bg-white text-primary-dark px-4 py-2 rounded-full text-xl font-bold">수강신청</button>
      <div className="md:hidden relative">
        <button id="hamburger" className="text-white" onClick={toggleDropdown}>
          <i className="fas fa-bars"></i>
        </button>
        {isOpen && (
          <div id="dropdown" className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <Link href="time-table" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">시간표</Link>
            <a href="coaches" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">코치진</a>
            <a href={NOTICE_NOTION_LINK} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">수업 별 안내</a>
            <a href="lessons" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">수강신청</a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;