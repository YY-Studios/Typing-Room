import { tv } from 'tailwind-variants';

export const buttonStyles = tv({
  base: [
    'inline-flex items-center justify-center gap-1.5',
    'rounded-full font-black uppercase tracking-wider',
    'transition-all duration-150',
    'hover:scale-105 active:scale-95',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
    'disabled:pointer-events-none disabled:opacity-40',
    'cursor-pointer',
  ],
  variants: {
    variant: {
      primary: 'border-4 border-white bg-primary text-white sticker-shadow',
      secondary:
        'border-4 border-white bg-white/20 text-white backdrop-blur-sm hover:bg-white/30',
      danger: 'border-4 border-white bg-red-500 text-white sticker-shadow',
      ghost: 'border-2 border-primary/30 bg-primary-light text-nav',
      dark: 'border-4 border-white bg-black/70 text-white backdrop-blur-sm',
    },
    size: {
      sm: 'px-4 py-1.5 text-xs',
      md: 'px-6 py-2.5 text-sm',
      lg: 'px-8 py-3 text-base',
    },
    /* tab variant는 isActive로 분기 */
    isActive: {
      true: 'bg-white text-gray-800 border-4 border-white sticker-shadow',
      false: 'bg-white/20 text-white border-4 border-white hover:bg-white/30',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
