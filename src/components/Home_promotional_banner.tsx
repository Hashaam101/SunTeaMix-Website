import React from 'react';
import Image from 'next/image';

interface PromotionalBannerProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

import placeholderImg from "@/../public/Images/Product img 2.png";
import ThemeButton from './ThemeBtn';


const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  image,
  title,
  description,
  buttonText,
  buttonUrl
}) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg p-[42px] sm:h-[500px] md:h-[664px]"
        style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px',
            alignSelf: 'stretch',
        }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
          src={placeholderImg}
          alt="Promotional background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content Overlay */}
      <div className="flex h-full max-w-[584px] flex-1 flex-col items-start justify-center gap-2.5 rounded-[28px] bg-black/25 px-[30px] backdrop-blur-[13px] md:px-[50px] md:py-[114px]">
				<div
					style={{
						display: "flex",
						flexDirection: 'column',
						alignItems: 'flex-start',
						gap: '28px',
					}}
				>

					<h2 className="w-[70%] text-h4 font-medium text-white md:text-h2">{title}</h2>
					
					<p className="text-normal2 text-white/65 md:text-normal1">
						{description}
					</p>
					
					<ThemeButton/>

          <div className='block h-3 sm:hidden'/>


				</div>
      </div>
    </div>
  );
};

export default PromotionalBanner;