import React from 'react';
import { ChangeEvent } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'eror';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | ChangeEvent<HTMLInputElement>) => void; // Update onClick prop to accept both MouseEvent and ChangeEvent
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  disabled = false,
  href,
  onClick,
  children,
}) => {
  const sizeClasses = {
    small: 'py-1 px-2 text-button-small',
    medium: 'py-3 px-8 text-button-small',
    large: 'py-4 px-6 text-button-small',
  };

  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-700 items-center',
    secondary: 'bg-neutral-50 border border-neutral-300 text-neutral-900 hover:bg-neutral-200 items-center',
    success: 'bg-success-500 text-white',
    eror: 'bg-eror-500 hover:bg-eror-800 text-white',
  };

  const iconClasses = {
    left: 'mr-2',
    right: 'ml-2',
  };

  // Conditionally render as a link or button based on the presence of href prop
  const buttonElement = href ? (
    <link href={href}>
      <div
        className={`flex rounded-lg ${sizeClasses[size]} ${variantClasses[variant]} ${
          disabled ? 'opacity-50 cursor-not-allowed hover:opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {icon && iconPosition === 'left' && <span className={iconClasses.left}>{icon}</span>}
        <span className="flex-1">{children}</span>
        {icon && iconPosition === 'right' && <span className={iconClasses.right}>{icon}</span>}
      </div>
    </link>
  ) : (
    <button
      className={`flex rounded-lg ${sizeClasses[size]} ${variantClasses[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed hover:opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick} // Update onClick event handler to accept both MouseEvent and ChangeEvent
      disabled={disabled}
    >
      {icon && iconPosition === 'left' && <span className={iconClasses.left}>{icon}</span>}
      <span className="flex-1">{children}</span>
      {icon && iconPosition === 'right' && <span className={iconClasses.right}>{icon}</span>}
    </button>
  );

  return buttonElement;
};

export default Button;
