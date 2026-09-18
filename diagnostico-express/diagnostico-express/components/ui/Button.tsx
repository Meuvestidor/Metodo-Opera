'use client';

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-accent text-white px-8 py-3.5 hover:bg-accent-hover active:scale-[0.98]',
    secondary:
      'border border-primary text-primary px-8 py-3.5 hover:bg-primary hover:text-white active:scale-[0.98]',
    ghost:
      'text-secondary hover:text-primary px-0 py-2 underline-offset-4 hover:underline',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
