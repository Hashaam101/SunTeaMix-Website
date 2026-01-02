import Image from 'next/image'
import React from 'react'
import MediaPreloader from './MediaPreloader';
import { motion, Variants } from 'framer-motion'

import Link from 'next/link';


function Story() {

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 }, // Start hidden, slightly below final position
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6, // Animation duration
        ease: "easeOut" // Animation easing
      }
    }
  };
  return (
    <motion.div // Wrap section in motion.div
      className='mt-16 md:mt-[100px] px-4 lg:px-[80px]'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className='mx-auto w-full max-w-[1240px] flex flex-col lg:flex-row lg:justify-between items-center gap-8 lg:gap-0'>
        <div className='relative block lg:hidden aspect-square max-w-[540px] max-h-[540px] w-[60%] h-auto lg:w-[400px] lg:h-[400px] xl:w-[540px] xl:h-[540px] shrink-0 rounded-[24px] object-cover'>
          <MediaPreloader
            src="/Images/featuring/4.webp"
            alt="Story about the best Restaurant in Honolulu, Hawaii."
            borderRadius="24px"
            className='w-full h-full object-cover'
          />
          <Image
            src="/Images/featuring/4.webp"
            alt="Story about the best Restaurant in Honolulu, Hawaii."
            width={540} height={540}
            className='w-full h-full object-cover rounded-[24px]'
          />
        </div>
        <div className='flex w-full lg:w-fit max-w-[560px] flex-col items-center lg:items-start gap-[10px] md:gap-[20px] mt-8 lg:mt-0 lg:pr-16 px-4'>
          <div className='self-stretch text-h3 xl:text-h2 text-black text-center lg:text-left'>
            Story Behind Sun Tea Mix
          </div>
          <div className='text-normal4 xl:text-normal3 text-grey text-center lg:text-left'>
            More than just a bubble tea café, <b>Sun Tea  Mix is Honolulu’s home for creativity, community, and desserts you can’t forget.</b>
            <br /><br />
            Founded in 2020, our mission has always been simple:
            <br /> ☀ Bring people together through fresh flavors
            <br /> ☀ Use real fruit, never powder
            <br /> ☀ Serve the fluffiest soufflé pancakes in Honolulu
            <br /><br />
            From students at the nearby college to Waikiki visitors hunting for the best dessert spots, SunTea Mix has become a must-visit for anyone searching for <b>boba near me</b> or <b>soufflé pancakes Honolulu</b>.
          </div>
        </div>
        <div className='relative hidden lg:block aspect-square max-w-[540px] max-h-[540px] w-[60%] h-auto lg:w-[400px] lg:h-[400px] xl:w-[540px] xl:h-[540px] shrink-0 rounded-[24px] object-cover'>
          <MediaPreloader
            src="/Images/featuring/4.webp"
            alt="Story about the best Restaurant in Honolulu, Hawaii."
            borderRadius="24px"
            className='w-full h-full object-cover'
          />
          <Image
            src="/Images/featuring/4.webp"
            alt="Story about the best Restaurant in Honolulu, Hawaii."
            width={540} height={540}
            className='w-full h-full object-cover rounded-[24px]'
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Story