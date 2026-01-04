// src/components/ThemeButton.tsx (or .jsx)
import React from 'react';
// import Link from 'next/link'; // Link component wasn't used, can be removed if not needed elsewhere
// import { head } from 'framer-motion/client'; // This import seems unused, remove if unnecessary

interface ThemeButtonProps {
    text?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Make onClick more specific if needed
    href?: string;
    className?: string;
    showArrow?: boolean;
    arrowRotation?: number;
    textColor?: string;
    textClassname?: string;
    borderColor?: string;
    borderHoverColor?: string;
    iconBgColor?: string;
    iconBgHoverColor?: string;
    iconColor?: string;
    iconHoverColor?: string;
    // Add other props like 'type' if needed for button element
    type?: "button" | "submit" | "reset";
    target?: string; // Add target prop for links
    rel?: string; // Add rel prop for links
    cursor?: "pointer" | "default" | "not-allowed";
}

const ThemeButton: React.FC<ThemeButtonProps> = ({
    text = "Order Now",
    onClick,
    href,
    className = "",
    showArrow = true,
    arrowRotation = -45,
    textColor = "text-white",
    textClassname = "",
    borderColor = "border-primary/50",
    borderHoverColor = "border-primary-dark",
    iconBgColor = "bg-white/10",
    iconBgHoverColor = "bg-black/25",
    iconColor = "text-white",
    iconHoverColor = "text-white",
    type = "button",
    target = "_blank",
    rel = "noopener noreferrer"
}) => {

    // Define the common visual content
    const buttonContent = (
        <div className={`group ${className} border ${borderColor} flex min-h-[41px] w-fit min-w-[157px] items-center overflow-hidden rounded-[9px] bg-primary shadow-lg transition-all duration-200 hover:scale-105 hover:bg-primary-dark hover:shadow-xl ${borderHoverColor}`}>
            <div className={`text-normal2 font-bold text-nowrap ${textColor} ${textClassname} mx-auto flex h-full items-center justify-center`}>
                {text}
            </div>
            {showArrow && (
                <div className='m-[5px] flex justify-end'>
                    <div className={`h-[31px] w-[31px] ${iconBgColor} group-hover:${iconBgHoverColor} flex items-center justify-center rounded-[7px] transition-all duration-300`}>
                        <svg
                            className={`h-6 w-6 ${iconColor} group-hover:${iconHoverColor}`}
                            style={{ transform: `rotate(${arrowRotation}deg)` }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );

    // If href is provided, render as an anchor tag (link)
    if (href) {
        // Check if it's an external link
        const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
        const linkTarget = isExternal ? target : undefined; // Only use target for external links usually
        const linkRel = isExternal ? rel : undefined; // Only use rel for external links

        return (
            <a href={href} target={linkTarget} rel={linkRel}>
                {buttonContent}
            </a>
        );
        // If using Next.js Link for internal routing:
        // if (!isExternal) {
        //  return <Link href={href}>{buttonContent}</Link>
        // } else { // External link }
    }

    // If onClick is provided (and href is not), render as a button tag
    if (onClick) {
        return (
            <button type={type} onClick={onClick}>
                {buttonContent}
            </button>
        );
    }

    // Fallback: If neither href nor onClick is provided, render a non-interactive div
    // Or you could render a disabled button: <button type={type} disabled>{buttonContent}</button>
    return (
        <div>
            {buttonContent}
        </div>
    );
};

export default ThemeButton;