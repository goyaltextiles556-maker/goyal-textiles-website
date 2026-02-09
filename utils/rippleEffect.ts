
import React from 'react';

export const createRipple = (e: React.MouseEvent<HTMLElement>) => {
  const element = e.currentTarget;
  
  // Ensure the element is positioned to contain the ripple
  if (getComputedStyle(element).position === 'static') {
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
  }
  
  const circle = document.createElement("span");
  const diameter = Math.max(element.clientWidth, element.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  // Position the ripple center at the click location
  const rect = element.getBoundingClientRect();
  circle.style.left = `${e.clientX - rect.left - radius}px`;
  circle.style.top = `${e.clientY - rect.top - radius}px`;

  // Apply base ripple styles from index.css
  circle.classList.add('radial-ripple');

  const existingRipple = element.querySelector('.radial-ripple');
  if (existingRipple) {
    existingRipple.remove();
  }

  element.appendChild(circle);
  
  // Remove the ripple after the animation completes
  setTimeout(() => {
    circle.remove();
  }, 600);
};
