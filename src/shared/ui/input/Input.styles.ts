import { tv } from 'tailwind-variants';

export const inputStyles = tv({
  slots: {
    container: 'relative flex flex-col gap-1.5',
    input: [
      'w-full rounded-2xl border-4 border-white/80 bg-white/90 px-4 py-2.5',
      'text-sm font-bold text-text-main placeholder:font-medium placeholder:text-text-sub',
      'outline-none transition-all duration-150',
      'focus:border-primary focus:ring-2 focus:ring-primary/30',
      'disabled:cursor-not-allowed disabled:opacity-40',
      'dark:bg-surface/80 dark:border-white/20 dark:text-text-main',
    ],
    iconWrapper:
      'pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-sub',
    rightIconWrapper:
      'absolute right-3.5 top-1/2 -translate-y-1/2 text-text-sub',
    errorMsg: 'ml-1 text-xs font-bold text-red-500',
  },
  variants: {
    variant: {
      primary: {},
      surface: {
        input: 'bg-surface border-white/30 dark:border-white/10',
      },
    },
    error: {
      true: {
        input: 'border-red-400 focus:border-red-500 focus:ring-red-300',
      },
    },
    hasIcon: {
      true: { input: 'pl-10' },
    },
    hasRightIcon: {
      true: { input: 'pr-10' },
    },
  },
  defaultVariants: {
    variant: 'primary',
    error: false,
  },
});
