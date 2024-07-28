'use client';

import { NOTICE_NOTION_LINK } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="w-full bg-main py-4 flex justify-between items-center px-8">
      <Link href='/' className="text-white text-lg font-semibold">FINALE</Link>
      <div className="flex items-center gap-8">
        <nav className="hidden md:flex space-x-8 text-white text-xl font-semibold">
          <a href="/time-table" className="hover:underline">시간표</a>
          <a href="/coaches" className="hover:underline">코치진</a>
          <a href={NOTICE_NOTION_LINK} className="hover:underline">수업 별 안내</a>
          <a href="/my" className="hover:underline">마이페이지</a>
        </nav>
        <Link href='/lessons' className=" bg-white text-main-dark px-4 py-1 rounded-full text-lg font-semibold">수강신청</Link>
        <div className="md:hidden relative">
          <button id="hamburger" className="text-white" onClick={toggleDropdown}>
            <i className="fas fa-bars"></i>
          </button>
          {isOpen && (
            <div id="dropdown" className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <a href="/time-table" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">시간표</a>
              <a href="/coaches" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">코치진</a>
              <a href={NOTICE_NOTION_LINK} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">수업 별 안내</a>
              <a href="/lessons" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">수강신청</a>
              <a href="/my" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">마이페이지</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;