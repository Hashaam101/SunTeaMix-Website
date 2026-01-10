// AnimatedMenuButton.client.tsx
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MenuItem {
  name: string;
  onclick: () => void;
}

interface AnimatedMenuButtonProps {
  menuItems: MenuItem[];
}

export function AnimatedMenuButton({ menuItems }: AnimatedMenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Variants for button animation
  const topLineVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: 45, translateY: 2 }
  };

  const bottomLineVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: -45, translateY: -3.5 }
  };

  // Variants for menu animation
  const menuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: { 
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1,
      height: "auto",
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
        staggerDirection: 1
      }
    }
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Button */}
      <button 
        className="z-100 flex h-[14px] w-10 cursor-pointer flex-col justify-evenly border-none bg-transparent p-0"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <motion.div
          className="h-[1.75px] w-[24px] rounded-full bg-[#000]"
          variants={topLineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="h-[1.75px] w-[24px] rounded-full bg-[#000]"
          variants={bottomLineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
      </button>

      {/* Menu Items */}
      <motion.div
        className="absolute top-18 left-5 z-100 mt-2 w-fit overflow-hidden rounded-lg bg-[#fff] shadow-lg"
        variants={menuVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            className="cursor-pointer px-8 py-2 text-normal4 hover:bg-gray-100"
            variants={menuItemVariants}
            onClick= {() => {item.onclick()}}
          >
            {item.name}
            {/* <div className='w-[80%] h-[1px] bg-grey'/> */}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}