import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function* range(min: number, max = 0) {
  const [_min, _max] = min > max ? [max, min] : [min, max];
  for (let i = _min; i < _max; i++) yield i;
}
