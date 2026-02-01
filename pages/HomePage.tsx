
import React, { useRef, useEffect, useState } from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import { categories } from '../data/products';
import CategoryCard from '../components/CategoryCard';
import { useScrollSpy } from '../context/ScrollSpyContext';

const ANIMATION_END_SCROLL = 400; // The scroll distance over which the animation occurs

const HomePage: React.FC = () => {
  const collectionsRef = useRef<HTMLElement>(null);
  const { setActiveSection } = useScrollSpy();
  const [titleStyle, setTitleStyle] = useState<React.CSSProperties>({});
  const [contentOpacity, setContentOpacity] = useState(1);
  const [isCollectionsVisible, setIsCollectionsVisible] = useState(false);

  useEffect(() => {
    const handleAnimationUpdate = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(1, scrollY / ANIMATION_END_SCROLL);
      
      const scale = 1 - 0.7 * progress;
      const top = 45 - 30 * progress;
      const opacity = 1 - progress;

      setTitleStyle({
        position: 'fixed',
        top: `${top}%`,
        left: '50%',
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: opacity,
        pointerEvents: progress >= 1 ? 'none' : 'auto',
        willChange: 'transform, opacity, top',
      });
      
      setContentOpacity(Math.max(0, 1 - scrollY / 250));
    };

    window.addEventListener('scroll', handleAnimationUpdate, { passive: true });
    window.addEventListener('resize', handleAnimationUpdate);
    
    handleAnimationUpdate();

    return () => {
      window.removeEventListener('scroll', handleAnimationUpdate);
      window.removeEventListener('resize', handleAnimationUpdate);
    };
  }, []);
  
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
    <div>
      <ReactRouterDOM.Link
        to="/"
        style={titleStyle}
        className="z-50 text-5xl sm:text-6xl md:text-8xl font-bold uppercase font-display text-center sm:whitespace-nowrap text-off-white"
        aria-hidden={titleStyle.opacity === 0}
      >
        GOYAL TEXTILES
      </ReactRouterDOM.Link>

      <section className="relative h-[90vh] text-off-white overflow-hidden">
        <div className="absolute inset-0 w-full h-full -z-10">
          <img 
            src="/images/homepage/homepage_hero.webp" 
            alt="A collection of fine textiles"
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-blue/40"></div>
        </div>
        
        <div 
          style={{ opacity: contentOpacity, willChange: 'opacity', pointerEvents: contentOpacity > 0 ? 'auto' : 'none' }} 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-20 text-center w-full px-4"
        >
          <p className="text-lg text-off-white/90 leading-relaxed max-w-lg mx-auto">
            A trusted textile store offering premium suiting, shirting, kurta, and pant fabrics.
          </p>
          <div className="max-w-xl mx-auto bg-blue-100/30 border border-primary-blue/20 rounded-md p-3 text-center mt-6 backdrop-blur-sm">
            <p className="text-sm text-off-white/95">
              Only selected designs are displayed online due to frequent stock updates.
            </p>
          </div>
        </div>
      </section>

      <section 
        ref={collectionsRef} 
        id="categories" 
        className={`bg-off-white pt-12 pb-20 text-center scroll-mt-28 transition-all duration-700 ease-out ${isCollectionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold text-primary-blue mb-12">Our Fabric Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
