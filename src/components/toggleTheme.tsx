'use client';

import { Button } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { Icon } from '@iconify/react';

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      isIconOnly
      variant='light'
      disableRipple
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Icon
        icon={theme === 'light' ? 'solar:sun-2-bold' : 'solar:moon-bold'}
        className='transition-all w-6 h-6 active:-rotate-[360deg] active:scale-0 text-foreground'
      />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
