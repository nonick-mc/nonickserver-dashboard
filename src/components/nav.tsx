'use client';

import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { ToggleTheme } from './toggleTheme';
import { LoginButton } from './loginButton';
import { Logo } from './logo';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export function Nav() {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menus = {
    leaderboard: '/leaderboard',
  };
  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <Link href='/'>
            <Logo width={140} />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className='hidden sm:flex gap-4'>
        <NavbarItem>
          <Link href={menus.leaderboard} color='foreground'>
            Leaderboard
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <ToggleTheme />
        </NavbarItem>
        <NavbarItem>
          <LoginButton />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {Object.entries(menus).map(([key, value]) => (
          <NavbarMenuItem key={key}>
            <Link
              color={value === path ? 'primary' : 'foreground'}
              className='w-full'
              href={value}
              size='lg'
              onPress={() => setIsMenuOpen(false)}
            >
              {key}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
