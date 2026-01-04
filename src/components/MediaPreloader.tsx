// DEV TOOL: To force all preloaders on for testing, set in browser console:
//   window.__FORCE_PRELOADERS__ = true;
// To disable and return to normal, set:
//   window.__FORCE_PRELOADERS__ = false;
import React, { useState } from "react";
import Spinner from "./Spinner";

interface MediaPreloaderProps {
  src: string;
  alt?: string;
  type?: "image" | "video";
  className?: string;
  style?: React.CSSProperties;
  borderRadius?: string | number;
  children?: React.ReactNode;
  onLoaded?: () => void;
}

const MediaPreloader: React.FC<MediaPreloaderProps> = ({
  src,
  alt = "",
  type = "image",
  className = "",
  style = {},
  borderRadius = '12px',
  children,
  onLoaded,
}) => {
  // Allow dev to force all preloaders on
  const [loaded, setLoaded] = useState(false);
  const [forcePreloader, setForcePreloader] = useState(
    typeof window !== "undefined" && window.__FORCE_PRELOADERS__
  );

  // Listen for changes to window.__FORCE_PRELOADERS__
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => setForcePreloader(window.__FORCE_PRELOADERS__);
    window.addEventListener("forcepreloaders-toggle", handler);
    return () => window.removeEventListener("forcepreloaders-toggle", handler);
  }, []);

  // Patch window.__FORCE_PRELOADERS__ to dispatch event on change
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    let value = window.__FORCE_PRELOADERS__;
    Object.defineProperty(window, "__FORCE_PRELOADERS__", {
      configurable: true,
      get: () => value,
      set: (v) => {
        value = v;
        window.dispatchEvent(new Event("forcepreloaders-toggle"));
      },
    });
  }, []);
  const [error, setError] = useState(false);

  // Notify parent when loaded
  const handleLoaded = () => {
    if (!loaded) {
      setLoaded(true);
      if (onLoaded) onLoaded();
    }
  };

  // Handle load error
  const handleError = () => {
    setError(true);
    setLoaded(true);
  };

  // For cached images, check if already complete using ref
  const imgRef = React.useRef<HTMLImageElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (forcePreloader) return; // Don't auto-load if forced
    if (type === "image" && imgRef.current) {
      if (imgRef.current.complete && !loaded) {
        setLoaded(true);
        if (onLoaded) onLoaded();
      }
    }
    if (type === "video" && videoRef.current) {
      if (videoRef.current.readyState >= 3 && !loaded) {
        setLoaded(true);
        if (onLoaded) onLoaded();
      }
    }
  }, [src, type, onLoaded, loaded]);

  return (
  <div className={`absolute inset-0 flex items-center justify-center ${className}`} style={{ ...style, borderRadius }}>
      {/* Always render the image/video so load event fires */}
      {type === "image" ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          style={{ borderRadius }}
          onLoad={handleLoaded}
          onError={handleError}
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          controls
          className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          style={{ borderRadius }}
          onLoadedData={handleLoaded}
          onError={handleError}
        >
          {children}
        </video>
      )}
  {/* Overlay spinner only if not loaded, or if forcePreloader is on */}
  {(!loaded || forcePreloader) && !error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center" style={{ borderRadius }}>
          {/* Solid grey background */}
          <div className="absolute inset-0 h-full w-full bg-[#c0c0c0]" style={{ borderRadius }} />
          {/* lds-roller loader */}
          <style>{`
            .lds-roller,
            .lds-roller div,
            .lds-roller div:after {
              box-sizing: border-box;
            }
            .lds-roller {
              display: inline-block;
              position: relative;
              width: 80px;
              height: 80px;
            }
            .lds-roller div {
              animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
              transform-origin: 40px 40px;
            }
            .lds-roller div:after {
              content: " ";
              display: block;
              position: absolute;
              width: 7.2px;
              height: 7.2px;
              border-radius: 50%;
              background: #888;
              margin: -3.6px 0 0 -3.6px;
            }
            .lds-roller div:nth-child(1) { animation-delay: -0.036s; }
            .lds-roller div:nth-child(1):after { top: 62.62742px; left: 62.62742px; }
            .lds-roller div:nth-child(2) { animation-delay: -0.072s; }
            .lds-roller div:nth-child(2):after { top: 67.71281px; left: 56px; }
            .lds-roller div:nth-child(3) { animation-delay: -0.108s; }
            .lds-roller div:nth-child(3):after { top: 70.90963px; left: 48.28221px; }
            .lds-roller div:nth-child(4) { animation-delay: -0.144s; }
            .lds-roller div:nth-child(4):after { top: 72px; left: 40px; }
            .lds-roller div:nth-child(5) { animation-delay: -0.18s; }
            .lds-roller div:nth-child(5):after { top: 70.90963px; left: 31.71779px; }
            .lds-roller div:nth-child(6) { animation-delay: -0.216s; }
            .lds-roller div:nth-child(6):after { top: 67.71281px; left: 24px; }
            .lds-roller div:nth-child(7) { animation-delay: -0.252s; }
            .lds-roller div:nth-child(7):after { top: 62.62742px; left: 17.37258px; }
            .lds-roller div:nth-child(8) { animation-delay: -0.288s; }
            .lds-roller div:nth-child(8):after { top: 56px; left: 12.28719px; }
            @keyframes lds-roller {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <div className="lds-roller">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaPreloader;
