import { useRef, useState, useEffect } from "react";
import heroImg1 from "../assets/images/heroimg1.jpg";
import heroImg2 from "../assets/images/heroimg2.jpg";
import heroImg3 from "../assets/images/heroimg3.jpg";

export default function Hero() {
  const containerRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [heroImg1, heroImg2, heroImg3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[100dvh] overflow-hidden bg-black flex items-center justify-center"
    >
      {/* 
        Full-screen Background Slider 
        Uses object-cover to ensure it fills the entire screen width and height perfectly without scrolling.
      */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Hero background ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
              currentImage === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>
    </section>
  );
}