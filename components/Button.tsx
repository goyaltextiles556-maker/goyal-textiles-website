
import React, { useRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', onClick, ...props }) => {
  const baseStyles = 'w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.97] relative overflow-hidden font-semibold tracking-wide radial-reveal-button';
  
  const variantStyles = {
    primary: 'radial-reveal-primary bg-primary-blue text-white hover:shadow-lg focus:ring-blue-500 group active:scale-95',
    secondary: 'radial-reveal-secondary bg-white text-primary-blue border-2 border-primary-blue hover:shadow-lg focus:ring-blue-500 group active:scale-95',
  };

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    // Get the button's position and dimensions
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create ripple element
    const ripple = document.createElement('span');
    ripple.className = 'radial-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Add the ripple to the button
    button.appendChild(ripple);

    // Remove ripple after animation completes
    setTimeout(() => ripple.remove(), 600);

    // Call the original onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
