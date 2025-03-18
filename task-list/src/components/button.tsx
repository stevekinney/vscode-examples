import type { ComponentProps } from 'react';
import { cn } from '@/utilities/cn';

export type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'destructive';
};

export const Button = ({ className, variant = 'secondary', ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        /* Base styles */
        'rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 transition-colors',

        /* Default variant - Secondary */
        'bg-purple-50 text-slate-900 ring-purple-500 hover:outline-purple-500',
        'dark:bg-slate-600 dark:text-slate-300 dark:ring-slate-900',
        'hover:bg-purple-100 dark:hover:bg-slate-700 hover:outline-2 hover:outline-offset-2',

        /* Focus states */
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ',

        /* Variant-specific styles */
        variant === 'primary' &&
          'bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800',
        variant === 'destructive' &&
          'bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800',

        /* User classes override */
        className,
      )}
      aria-disabled={props.disabled}
      {...props}
    />
  );
};
