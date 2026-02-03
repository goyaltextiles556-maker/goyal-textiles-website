export const createRipple = (e: React.MouseEvent<HTMLElement>) => {
  const element = e.currentTarget;
  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const ripple = document.createElement('span');
  ripple.className = 'radial-ripple';
  
  // Determine ripple color based on background
  const bgColor = element.className;
  const isBlueBackground = bgColor.includes('bg-primary-blue');
  const rippleColor = isBlueBackground 
    ? 'rgba(255, 255, 255, 0.5)' 
    : 'rgba(42, 67, 101, 0.35)';
  
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.style.position = 'absolute';
  ripple.style.borderRadius = '50%';
  ripple.style.backgroundColor = rippleColor;
  ripple.style.pointerEvents = 'none';
  ripple.style.transform = 'translate(-50%, -50%)';
  ripple.style.width = '0';
  ripple.style.height = '0';
  ripple.style.animation = 'radialRipple 0.6s ease-out forwards';

  element.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
};
