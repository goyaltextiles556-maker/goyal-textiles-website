
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.97] relative overflow-hidden font-semibold tracking-wide';
  
  const variantStyles = {
    primary: 'bg-primary-blue text-white hover:bg-blue-900 hover:shadow-lg focus:ring-blue-500 group hover:scale-105 active:scale-95',
    secondary: 'bg-white text-primary-blue border-2 border-primary-blue hover:bg-blue-50 hover:shadow-lg hover:border-blue-900 focus:ring-blue-500 group hover:scale-105 active:scale-95',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
