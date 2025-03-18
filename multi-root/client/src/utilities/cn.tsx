import { twMerge as merge } from 'tailwind-merge';
import { clsx } from 'clsx';

export const cn = (...inputs: (string | boolean | null | undefined)[]) => {
  return merge(clsx(inputs));
};
