"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCTAButtonProps {
  buttonLeft: () => void;
  buttonRight?: () => void;
}


export const AnimatedCTAButton:React.FC<AnimatedCTAButtonProps> = ({ buttonLeft, buttonRight }) => {
  const [hoveredButton, setHoveredButton] = useState<'left' | 'right' | null>(null);
  
  return (
    <div className="flex h-[41px] w-[221px] items-center justify-center">
      <div className="relative h-full w-full max-w-lg">
        {/* Left Button */}
        <motion.button
          className="absolute flex h-full items-center overflow-hidden rounded-l-lg border-2 border-primary"
          style={{ 
            originX: 1, 
            zIndex: hoveredButton === 'left' ? 0 : 5 
          }}
          animate={{
            width: hoveredButton === 'right' ? "10%" : "35%",
            left: hoveredButton === 'right' ? "35%" : "0%",
						borderTopRightRadius: hoveredButton === 'right' ? "8px" : "0px",
						borderBottomRightRadius: hoveredButton === 'right' ? "8px" : "0px"
          }}
          initial={{ width: "50%", left: "0%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onMouseEnter={() => setHoveredButton('left')}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={buttonLeft}
        >
          <div className="flex w-full items-center justify-between">
						<motion.div className='mx-auto overflow-hidden text-normal2 font-bold whitespace-nowrap text-grey'
							animate={{
								width: hoveredButton === 'right' ? "0%" : "100%",
								borderTopLeftRadius: hoveredButton === 'left' ? "8px" : "0px",
								borderBottomLeftRadius: hoveredButton === 'left' ? "8px" : "0px",
              }}
							initial={{ width: "100%", right: "0%" }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							Call us
						</motion.div>
          </div>
        </motion.button>

        {/* Right Button */}
        <motion.button
          className="absolute flex h-full items-center overflow-hidden rounded-r-lg bg-primary "
          style={{ 
            originX: 0, 
            zIndex: hoveredButton === 'right' ? 10 : 5 
          }}
          animate={{
            width: hoveredButton === 'left' ? "18%" : "65%",
            right: hoveredButton === 'left' ? "50%" : "0%",
						borderTopLeftRadius: hoveredButton === 'right' ? "8px" : "0px",
						borderBottomLeftRadius: hoveredButton === 'right' ? "8px" : "0px"
          }}
          initial={{ width: "50%", right: "0%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onMouseEnter={() => setHoveredButton('right')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <div className="flex w-full items-center justify-between">
            <motion.div className='mx-auto ml-1 flex-1 overflow-hidden text-normal2 font-bold whitespace-nowrap text-white'
							animate={{
								width: hoveredButton === 'left' ? "0%" : "50%",
								borderTopLeftRadius: hoveredButton === 'right' ? "8px" : "0px",
								borderBottomLeftRadius: hoveredButton === 'right' ? "8px" : "0px",
                opacity: hoveredButton === 'left' ? 0 : 1,
							}}
							initial={{ width: "50%", right: "0%" }}
							transition={{ duration: 0.3, ease: "easeInOut" }}

              onClick={buttonRight}
						>
							Order Now
						</motion.div>
						<div className='m-[5px] flex justify-end'>
              <div className="flex h-[31px] w-[31px] items-center justify-center rounded-[7px] bg-black/25"
                style={{ marginLeft: hoveredButton === 'left' ? -35 : 0 }}>
                <svg className="h-6 w-6 -rotate-45 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
						</div>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

