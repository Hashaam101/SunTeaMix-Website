"use client";

import React from 'react';
import { AnimatedCTAButton } from './CTA_header_btn';
import logo from "@/assets/Images/Logo.webp";
import Image from 'next/image';
import { AnimatedMenuButton } from './Menu_Header_btn';
import { usePathname, useRouter } from 'next/navigation';

function Header( {onClick} : {onClick: () => void}) {

  const router = useRouter();
  const pathname = usePathname(); 

    const scrollToSection = (sectionId: string) => {
        if (pathname === '/') {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                console.warn(`Scroll target not found on home page: #${sectionId}`);

            }
        } else {
            router.push('/');
            const handleScroll = () => {
              const section = document.getElementById(sectionId);
              if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                console.warn(`Scroll target not found on home page: #${sectionId}`);
              }
              window.removeEventListener('DOMContentLoaded', handleScroll);
            };
            window.addEventListener('DOMContentLoaded', handleScroll);
            if (typeof onClick === 'function') {
              onClick();
            }
        }
    };


  return (
    <div className="w-full px-[10px] py-[20px] md:p-[20px]">
      
      <div className={`grid w-full grid-cols-3 items-center`}>
        {/* Left Section - Hamburger Menu */}
        <div className="flex justify-start">
            <AnimatedMenuButton
                menuItems={[
                    { name: "Home", onclick: () => { scrollToSection('Home') } },
                    { name: "Menu", onclick: () => { scrollToSection('Menu') } },
                    { name: "Reviews", onclick: () => { scrollToSection('Reviews') } },
                    { name: "Our Story", onclick: () => { scrollToSection('Story') } },
                    { name: "Featuring", onclick: () => { scrollToSection('Featuring') } },
                    { name: "FAQ's", onclick: () => { scrollToSection("FAQ's") } },
                    { name: "Location", onclick: () => { scrollToSection('Location') } }
                ]}
            />           
        </div>

        {/* Center Section - Logo */}
        <div className={`flex justify-center`}>
            <div
            className="relative cursor-pointer text-white"
            onClick={() => { router.push("/"); }}
            >
            <span
              className="absolute inset-0 rounded-full border-[0.5px]"
              style={{
              borderColor: "rgba(0,0,0,0.15)",
              pointerEvents: "none",
              }}
            />
            <Image
              src={logo}
              alt="Sun Tea Mix Logo"
              width={70}
              height={70}
              className="rounded-full object-cover"
              priority
            />
            </div>
        </div>

        {/* Right Section */}
        <div className="flex w-full justify-end">
            {/* Desktop View */}
            <div className="hidden md:block">
              <AnimatedCTAButton 
                buttonLeft={() => { router.push("tel:+1(808)219-5749") }}
                buttonRight={() => { window.open("https://www.clover.com/online-ordering/sun-tea-mix-honolulu", "_blank") }}
              />
            </div>

            {/* Mobile View - Simplified Order Now Button */}
            <div className="md:hidden">
              <button
                className="flex h-[41px] items-center justify-center rounded-lg bg-primary px-4 text-normal2 font-bold whitespace-nowrap text-white transition-opacity hover:opacity-90"
                onClick={() => { window.open("https://www.clover.com/online-ordering/sun-tea-mix-honolulu", "_blank") }}
              >
                Order Now
              </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Header