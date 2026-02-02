
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'w-full text-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] relative overflow-hidden';
  
  const variantStyles = {
    primary: 'bg-primary-blue text-white hover:bg-blue-800 hover:shadow-md focus:ring-primary-blue group',
    secondary: 'bg-white text-primary-blue border border-primary-blue hover:bg-blue-50 hover:shadow-md focus:ring-primary-blue group',
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
