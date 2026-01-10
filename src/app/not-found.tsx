"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import Header from "../components/Header";

// Static Star Component with Click-to-Fall
const Star = ({
    src,
    initialPos,
}: {
    src: string;
    initialPos: { top: number; left: number };
}) => {
    const controls = useAnimation();
    const [isFalling, setIsFalling] = useState(false);

    const handleClick = async () => {
        if (isFalling) return;
        setIsFalling(true);

        // Random slant for the fall
        const slant = (Math.random() - 0.5) * 20;

        await controls.start({
            top: "120%",
            left: `${initialPos.left + slant}%`,
            opacity: [1, 1, 0],
            transition: {
                duration: 1 + Math.random(),
                ease: "easeIn"
            }
        });
    };

    return (
        <motion.div
            className="absolute cursor-pointer"
            style={{
                top: `${initialPos.top}%`,
                left: `${initialPos.left}%`,
            }}
            initial={{ scale: 1, rotate: 0 }}
            animate={controls}
            whileHover={!isFalling ? { scale: 1.2, rotate: 15 } : {}}
            whileTap={!isFalling ? { scale: 0.9 } : {}}
            onClick={handleClick}
        >
            <Image src={src} alt="Star" width={20} height={20} />
        </motion.div>
    );
};

// Falling Star Component (Background Animation)
const FallingStar = ({
    src,
    delay,
    repeatDelay,
    duration,
    startLeft,
    endLeft,
}: {
    src: string;
    delay: number;
    repeatDelay: number;
    duration: number;
    startLeft: number;
    endLeft: number;
}) => {
    return (
        <motion.div
            className="absolute pointer-events-none"
            initial={{ top: "-20%", left: `${startLeft}%`, opacity: 0 }}
            animate={{
                top: "120%",
                left: `${endLeft}%`,
                opacity: [0, 1, 0], // Fade in then out completely
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                repeatDelay: repeatDelay,
                ease: "easeIn",
                delay: delay,
            }}
        >
            <Image src={src} alt="Falling Star" width={20} height={20} />
        </motion.div>
    );
};

// Return Home Button
const ReturnHomeButton = () => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center pointer-events-auto">
            <button
                className="group border border-primary/50 flex min-h-[41px] w-fit min-w-[157px] items-center overflow-hidden rounded-[9px] bg-primary shadow-lg transition-all duration-200 hover:scale-105 hover:bg-primary-dark hover:shadow-xl border-primary-dark cursor-pointer"
                onClick={() => router.push("/")}
            >
                <div className="text-normal2 font-bold whitespace-nowrap text-white pr-[8px] pl-[14px] mx-auto flex h-full items-center justify-center">
                    Take Me Home
                </div>
                <div className="m-[5px] flex justify-end">
                    <div className="h-[31px] w-[31px] bg-white/10 group-hover:bg-black/25 flex items-center justify-center rounded-[7px] transition-all duration-300">
                        <svg
                            className="h-6 w-6 text-white group-hover:text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ transform: "rotate(-45deg)" }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default function NotFound() {
    const [staticStars, setStaticStars] = useState<
        Array<{ id: number; src: string; top: number; left: number }>
    >([]);
    const [fallingStars, setFallingStars] = useState<
        Array<{ id: number; src: string; delay: number; repeatDelay: number; duration: number; startLeft: number; endLeft: number }>
    >([]);

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Generate Static Stars with Grid-based Uniform Distribution
        const generateStaticStars = () => {
            const newStars: Array<{ id: number; src: string; top: number; left: number }> = [];

            // Define grid
            const rows = 8;
            const cols = 8;
            const cellHeight = 100 / rows;
            const cellWidth = 100 / cols;

            const centerZone = {
                left: 30,
                right: 70,
                top: 30,
                bottom: 70
            };

            let starId = 0;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                              // Define cell boundaries
                              const cellTop = r * cellHeight;
                              const cellLeft = c * cellWidth;
                    
                              // Check if cell overlaps significantly with center zone                    // Simple check: if cell center is inside center zone
                    const cellCenterY = cellTop + cellHeight / 2;
                    const cellCenterX = cellLeft + cellWidth / 2;

                    const inCenter =
                        cellCenterX > centerZone.left &&
                        cellCenterX < centerZone.right &&
                        cellCenterY > centerZone.top &&
                        cellCenterY < centerZone.bottom;

                    if (inCenter) continue;

                    // Place 1 star per cell with random offset within the cell
                    // Add padding so stars don't touch cell edges too much
                    const padding = 2;
                    const top = cellTop + padding + Math.random() * (cellHeight - 2 * padding);
                    const left = cellLeft + padding + Math.random() * (cellWidth - 2 * padding);

                    newStars.push({
                        id: starId++,
                        src: starId % 2 === 0 ? "/Svgs/bg-star-0.svg" : "/Svgs/bg-star-1.svg",
                        top,
                        left,
                    });
                }
            }
            setStaticStars(newStars);
        };

        // Generate Falling Stars
        const generateFallingStars = () => {
            const count = 6;
            const stars = [];
            for (let i = 0; i < count; i++) {
                const startLeft = Math.random() * 100;
                const slant = (Math.random() - 0.5) * 50;
                const endLeft = startLeft + slant;

                stars.push({
                    id: i,
                    src: i % 2 === 0 ? "/Svgs/bg-star-0.svg" : "/Svgs/bg-star-1.svg",
                    delay: Math.random() * 15,
                    repeatDelay: 15 + Math.random() * 20,
                    duration: 1 + Math.random() * 1.5,
                    startLeft,
                    endLeft
                });
            }
            setFallingStars(stars);
        };

        generateStaticStars();
        generateFallingStars();
    }, []);

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center bg-[#DFEFF9] overflow-hidden">
            {/* Header */}
            <div className="z-50 w-full">
                <Header onClick={() => { }} />
            </div>

            {/* Falling Stars Layer (Background) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {fallingStars.map((star) => (
                    <FallingStar
                        key={`falling-${star.id}`}
                        src={star.src}
                        delay={star.delay}
                        repeatDelay={star.repeatDelay}
                        duration={star.duration}
                        startLeft={star.startLeft}
                        endLeft={star.endLeft}
                    />
                ))}
            </div>

            {/* Static Stars Layer */}
            <div className="absolute inset-0 z-0">
                {staticStars.map((star) => (
                    <Star
                        key={star.id}
                        src={star.src}
                        initialPos={{ top: star.top, left: star.left }}
                    />
                ))}
            </div>

                  {/* Main Content */}
                  <div ref={contentRef} className="z-10 flex flex-grow flex-col items-center justify-center gap-4 pb-20 pointer-events-none">                        <div className="relative h-[250px] w-[600px] max-w-full pointer-events-auto">
                             <Image
                              src="/Images/404Image.webp"
                              alt="404 Page Not Found"
                              fill
                              className="object-contain"
                              priority
                            />
                        </div>
                
                                <p 
                                  className="text-center"
                                  style={{ 
                                    color: '#0E0F0F',
                                    fontFamily: '"CretoDispay", sans-serif',
                                    fontSize: '20px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal'
                                  }}
                                >
                                  Seems like you’re lost?
                                </p>                
                        <ReturnHomeButton />            </div>
        </div>
    );
}