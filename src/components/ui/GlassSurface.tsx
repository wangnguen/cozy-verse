import type * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from 'cn';

export const glassSurfaceVariants = cva('rounded-3xl border text-white', {
  variants: {
    level: {
      thin: 'border-glass-thin-border bg-glass-thin backdrop-blur-glass-thin',
      regular: 'border-glass-regular-border bg-glass-regular backdrop-blur-glass-regular',
      thick: 'border-glass-thick-border bg-glass-thick backdrop-blur-glass-thick',
    },
  },
  defaultVariants: {
    level: 'regular',
  },
});

type VariantProp = VariantProps<typeof glassSurfaceVariants>;

export const GlassSurface = ({
  className,
  level,
  ...props
}: React.ComponentProps<'div'> & VariantProp) => {
  return (
    <div
      data-slot="glass-surface"
      className={cn(glassSurfaceVariants({ level, className }))}
      {...props}
    />
  );
};
