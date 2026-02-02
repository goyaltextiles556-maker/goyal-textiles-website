
import React, { useState, useEffect } from 'react';

interface SlideshowProps {
  images: string[];
  duration?: number;
}

const Slideshow: React.FC<SlideshowProps> = ({ images, duration = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, duration);

    return () => clearInterval(timer);
  }, [images.length, duration]);

  return (
    <div className="relative w-screen -ml-[50vw] left-1/2 aspect-video overflow-hidden bg-gradient-to-b from-gray-900/10 to-gray-900/15">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slideshow image ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDuration: '1400ms' }}
        />
      ))}
    </div>
  );
};

export default Slideshow;
