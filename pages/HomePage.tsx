
import React, { useRef, useEffect, useState } from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import { categories } from '../data/products';
import CategoryCard from '../components/CategoryCard';
import { useScrollSpy } from '../context/ScrollSpyContext';
import Slideshow from '../components/Slideshow';

const slideshowImages = [
  
  '/images/homepage/slideshow/slideshow1.webp',
  '/images/homepage/slideshow/slideshow2.webp',
  '/images/homepage/slideshow/slideshow3.webp',
];

const HomePage: React.FC = () => {
  const collectionsRef = useRef<HTMLElement>(null);
  const { setActiveSection } = useScrollSpy();
  const [isCollectionsVisible, setIsCollectionsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('categories');
          setIsCollectionsVisible(true);
        } else if (entry.boundingClientRect.top > 0) {
          setActiveSection('home');
        }
      },
      { threshold: 0.15 }
    );

    const currentRef = collectionsRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [setActiveSection]);

  return (
    <div className="pt-20">
      <Slideshow images={slideshowImages} />
      
      <section 
        ref={collectionsRef} 
        id="categories" 
        className={`bg-gradient-to-b from-off-white/60 to-off-white pt-20 pb-24 text-center scroll-mt-28 transition-all duration-700 ease-out ${isCollectionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-display font-bold text-primary-blue mb-4 tracking-tight">Our Fabric Collections</h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-primary-blue/80 via-primary-blue/40 to-transparent mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;