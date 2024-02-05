import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { ToggleTheme } from './toggleTheme';
import { LoginButton } from './loginButton';
import { Logo } from './logo';

export function Nav() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href='/'>
          <Logo width={140} />
        </Link>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <NavbarItem>
          <ToggleTheme />
        </NavbarItem>
        <NavbarItem>
          <LoginButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
