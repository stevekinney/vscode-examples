import type { ComponentProps } from 'react';
import { kebabCase } from 'change-case';
import { cn } from '@/utilities/cn';

export type InputProps = ComponentProps<'input'> & {
  label: string;
};

export const Input = ({
  label,
  className,
  required,
  id = kebabCase(label),
  ...props
}: InputProps) => {
  return (
    <label
      htmlFor={id}
      className="block text-sm font-medium text-slate-700 dark:text-slate-300"
      id={`${id}-label`}
    >
      <div
        className={cn(
          'flex items-center gap-1',
          required && "after:h-1.5 after:w-1.5 after:rounded-full after:bg-red-600 after:content-['']",
        )}
      >
        {label}
        {required && <span className="sr-only">(Required)</span>}
      </div>

      <input
        id={id}
        className={cn(
          /* Base styles */
          'mt-1 peer block w-full rounded-md border p-2 transition-colors duration-200',
          /* Theme variants */
          'border-slate-300 bg-white text-slate-900 dark:border-slate-500 dark:bg-slate-700 dark:text-white',
          /* Focus states */
          'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500',
          /* User classes override */
          className,
        )}
        required={required}
        aria-labelledby={`${id}-label`}
        aria-required={required ? 'true' : undefined}
        {...props}
      />
    </label>
  );
};
