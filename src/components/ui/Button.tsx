import React from 'react';
import { Plus } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: boolean;
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  icon, 
  variant = 'ghost',
  size = 'md'
}) => {
  const baseStyles = "flex items-center gap-2 rounded transition-colors";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    ghost: "text-gray-300 hover:bg-gray-700"
  };
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
    >
      {icon && <Plus size={size === 'sm' ? 14 : 16} className="text-current" />}
      {children}
    </button>
  );
};