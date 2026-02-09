
import React, { useRef } from 'react';
import { createRipple } from '../utils/rippleEffect';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', onClick, ...props }) => {
  const baseStyles = 'w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.97] relative overflow-hidden font-semibold tracking-wide';
  
  const variantStyles = {
    primary: 'bg-primary-blue text-white hover:shadow-lg focus:ring-blue-500 group active:scale-95',
    secondary: 'bg-white text-primary-blue border-2 border-primary-blue hover:shadow-lg focus:ring-blue-500 group active:scale-95',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);

    // Call the original onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
