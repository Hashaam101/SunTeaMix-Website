import Image from 'next/image'
import React from 'react'
import MediaPreloader from './MediaPreloader';
import { motion, Variants } from 'framer-motion'



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
      className='mt-16 px-4 md:mt-[100px] lg:px-[80px]'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className='mx-auto flex w-full max-w-[1240px] flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-0'>
        <div className='relative block aspect-square h-auto max-h-[540px] w-[60%] max-w-[540px] shrink-0 rounded-[24px] object-cover lg:hidden lg:h-[400px] lg:w-[400px] xl:h-[540px] xl:w-[540px]'>
          <MediaPreloader
            src="/Images/featuring/4.webp"
            alt="Story about the best Restaurant in Honolulu, Hawaii."
            borderRadius="24px"
            className='h-full w-full object-cover'
          />
          <Image
            src="/Images/featuring/4.webp"
            alt="Story about the best Restaurant in Honolulu, Hawaii."
            width={540} height={540}
            className='h-full w-full rounded-[24px] object-cover'
          />
        </div>
        <div className='mt-8 flex w-full max-w-[560px] flex-col items-center gap-[10px] px-4 md:gap-[20px] lg:mt-0 lg:w-fit lg:items-start lg:pr-16'>
          <div className='self-stretch text-center text-h3 text-black lg:text-left xl:text-h2'>
            Story Behind Sun Tea Mix
          </div>
          <div className='text-center text-normal4 text-grey lg:text-left xl:text-normal3'>
            More than just a bubble tea café, <b>Sun Tea  Mix is Honolulu’s home for creativity, community, and desserts you can’t forget.</b>
            <br /><br />
            Founded in 2020, our mission has always been simple:
            <br /> ☀ Bring people together through fresh flavors
            <br /> ☀ Use real fruits
            <br /> ☀ Serve the fluffiest soufflé pancakes in Honolulu
            <br /><br />
            From students at the nearby college to Waikiki visitors hunting for the best dessert spots, SunTea Mix has become a must-visit for anyone searching for <b>boba near me</b> or <b>soufflé pancakes Honolulu</b>.
          </div>
        </div>
        <div className='relative hidden aspect-square h-auto max-h-[540px] w-[60%] max-w-[540px] shrink-0 rounded-[24px] object-cover lg:block lg:h-[400px] lg:w-[400px] xl:h-[540px] xl:w-[540px]'>
          <MediaPreloader
            src="/Images/featuring/4.webp"
            alt="Story about the best Restaurant in Honolulu, Hawaii."
            borderRadius="24px"
            className='h-full w-full object-cover'
          />
          <Image
            src="/Images/featuring/4.webp"
            alt="Story about the best Restaurant in Honolulu, Hawaii."
            width={540} height={540}
            className='h-full w-full rounded-[24px] object-cover'
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Story