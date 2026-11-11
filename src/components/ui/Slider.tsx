import type * as React from 'react';
import { cn } from 'cn';
import { Slider as SliderPrimitive } from 'radix-ui';

export const Slider = ({
  className,
  'aria-label': ariaLabel,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) => {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(
        'group relative flex h-5 w-full touch-none items-center select-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 grow overflow-hidden rounded-full bg-white/20 transition-[height] group-hover:h-1.5">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-white/90" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        aria-label={ariaLabel}
        className="block size-3 rounded-full bg-white shadow-md ring-white/30 transition-[width,height,box-shadow] outline-none group-hover:size-3.5 focus-visible:ring-4"
      />
    </SliderPrimitive.Root>
  );
};
