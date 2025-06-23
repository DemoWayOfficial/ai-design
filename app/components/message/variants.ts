import { cva } from 'class-variance-authority';

export const messageVariants = cva(
  'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm whitespace-pre-line',
  {
    variants: {
      role: {
        system: '',
        user: 'bg-primary text-primary-foreground ml-auto',
        assistant: 'bg-muted mr-auto',
        data: '',
      },
    },
    defaultVariants: {
      role: 'assistant',
    },
  },
);
