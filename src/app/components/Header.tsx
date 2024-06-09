'use client';

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
    <header className="w-full bg-green-200 py-4 flex justify-between items-center px-8">
      <div className="text-white text-lg font-semibold">FINALE</div>
      <nav className="hidden md:flex space-x-8 text-white text-sm">
        <a href="#" className="hover:underline">시간표</a>
        <a href="#" className="hover:underline">코치진</a>
        <a href="#" className="hover:underline">수업 별 안내</a>
      </nav>
      <button className="hidden md:block bg-white text-green-200 px-4 py-2 rounded-full text-sm">수강신청</button>
      <div className="md:hidden relative">
        <button id="hamburger" className="text-white" onClick={toggleDropdown}>
          <i className="fas fa-bars"></i>
        </button>
        {isOpen && (
          <div id="dropdown" className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">시간표</a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">코치진</a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">수업 별 안내</a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">수강신청</a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;