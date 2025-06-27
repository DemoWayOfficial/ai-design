import { cva } from 'class-variance-authority';

export const messageVariants = cva(
  'flex w-max max-w-3/4 flex-col gap-2 rounded-lg px-3 py-2 text-sm whitespace-pre-line',
  {
    variants: {
      role: {
        system: '',
        user: 'bg-primary text-primary-foreground ml-auto',
        assistant: 'mr-auto bg-white',
        data: '',
      },
    },
    defaultVariants: {
      role: 'assistant',
    },
  },
);
