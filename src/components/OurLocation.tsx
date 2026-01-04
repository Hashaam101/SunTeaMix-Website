// location component

"use client";

import React from 'react';


const LocationComponent = () => {

  const locationData = {
    title: "Keawe St, Honolulu",
    subtitle: "Sun Tea Mix",
   
    mapQuery: "Sun Tea Mix, 400 Keawe St, Honolulu, HI 96813",
    
    contact: {
      phone: "(808) 219-5749",
      email: "email@email.com"
    },

    openingTime: "Timing",

    extraInfo: "",

    actionLinkDirections: {
      text: "Get Directions",
      url: "https://maps.google.com/?q=Sun Tea Mix, 400 Keawe St, Honolulu, HI 96813"
    },

    actionLinkContact: {
      text: "Contact",
      url: "https://maps.google.com/?q=Sun Tea Mix, 400 Keawe St, Honolulu, HI 96813"
    },

    openingHours: [
      { day: "Daily   -----------", hours: "11:00 AM – 9:00 PM" }
    ]
  };

  // Create the Google Maps embed URL
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(locationData.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  
  return (
    <div className="mx-[70px]">
      <h2 className="mb-[32px] text-h2">Our Location</h2>
      
      <div className="relative">
        {/* Map Container */}
        <div className="h-[400px] w-full overflow-hidden rounded-[14px]">
            <iframe
              width="100%"
              height="100%"
              id="gmap_canvas"
              src={mapUrl}
              aria-label={`Map showing location of ${locationData.subtitle}`}
            ></iframe>
        </div>

        {/* Overlay Container */}
        <div className="pointer-events-none absolute inset-0 z-20 hidden flex-wrap justify-between p-[16px] md:flex">
        
          <div className='flex flex-col gap-2'>
            <div className="z-99 flex h-fit w-[264px] flex-col items-start gap-[10px] self-stretch rounded-[30px] border border-primary-dark/25 bg-white/40 px-[24px] py-[21px] shadow-[6px] shadow-black/15 backdrop-blur-[14px]">
                <div>
                    {locationData.title && <div className="text-normal2 font-medium text-black/50">{locationData.title}</div>}
                    <p className="text-normal2 font-medium text-black">{locationData.subtitle}</p>
                </div>
                  {/* TODO add nav links here */}
                {/* <div className='w-full'>
                    <button className='h-[25px] text-normal3 text-black/50 w-full flex items-center justify-center bg-black/10 rounded-full'>
                        Contact
                    </button>
                </div> */}

                <div className='w-full'>
                    <button 
                      className='pointer-events-auto z-100 flex h-[25px] w-full cursor-pointer items-center justify-center rounded-full bg-primary text-white'
                      onClick={() => {
                        console.log("Opening Google Maps for directions...");
                        window.open(`https://www.google.com/maps?q=${encodeURIComponent(locationData.mapQuery)}`, '_blank');
                      }}
                    >
                        Directions
                    </button>
                </div>
            </div>
							<div className="flex h-fit w-[220px] flex-col items-start gap-[10px] self-stretch rounded-[30px] border border-primary-dark/25 bg-white/40 px-[24px] py-[21px] shadow-[6px] shadow-black/15 backdrop-blur-[14px]">
									<div>
											<div className='text-normal4 text-black/50'>
													Address
											</div>
											<div className='mb-[10px] text-normal4 leading-[24px] text-black'>
												{locationData.mapQuery}
											</div>

											<div className='text-normal4 text-black/50'>
													Contact
											</div>
											<div className='text-normal4 leading-[24px] text-black'>
												{locationData.contact?.phone}
												<br />
												{locationData.contact?.email}
											</div>
									</div>
							</div>
          </div>
          


          <div className="flex h-fit w-[264px] flex-col items-end gap-[10px] self-stretch rounded-[30px] border border-primary-dark/25 bg-white/40 px-[24px] py-[21px] shadow-[6px] shadow-black/15 backdrop-blur-[14px]">
              {/* <div className="w-full">
                <p className="text-normal4 font-medium">Opens at {locationData.openingTime}</p>
              </div> */}
            
            {locationData.openingHours && locationData.openingHours.length > 0 && (
              <div className="w-full">
                <h4 className="mb-2 text-center text-normal4 font-medium text-gray-800">Timings</h4>
                <div className="">
                  {locationData.openingHours.map((item, index) => (
                    <React.Fragment key={index}>
											<div className='flex w-full items-center justify-between'>
												<p className="text-normal4 text-black/60">{item.day}</p>
												<p className="text-normal4 text-black/60">{item.hours}</p>
											</div>
                    </React.Fragment>
                  ))}
                  <p className="mt-2 text-normal4 text-black/60">{locationData.extraInfo}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationComponent;