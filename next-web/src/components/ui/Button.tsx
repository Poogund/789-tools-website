import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  href,
  type = 'button',
}) => {
  const baseClasses = 'inline-block px-6 py-3 font-bold text-center transition-all duration-200';
  const variantClasses = {
    primary: 'bg-brand-primary text-brand-dark hover:bg-brand-primary/90',
    secondary: 'bg-brand-dark text-brand-primary hover:bg-brand-dark/80',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
