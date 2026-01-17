import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 active:scale-95 px-6 py-2.5 shadow-sm";
  
  const variants = {
    primary: "bg-brand-500 hover:bg-brand-600 text-white shadow-brand-500/20",
    secondary: "bg-gray-800 hover:bg-gray-900 text-white",
    outline: "border-2 border-brand-500 text-brand-500 hover:bg-brand-50",
    white: "bg-white text-brand-600 hover:bg-brand-50"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;