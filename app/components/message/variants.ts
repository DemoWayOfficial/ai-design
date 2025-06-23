import { cva } from 'class-variance-authority';

export const messageVariants = cva(
  'ml-auto flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
  {
    variants: {
      role: {
        system: '',
        user: 'bg-primary text-primary-foreground',
        assistant: 'bg-muted',
        data: '',
      },
    },
    defaultVariants: {
      role: 'assistant',
    },
  },
);
