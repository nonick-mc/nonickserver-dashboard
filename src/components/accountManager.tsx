import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
  useDisclosure,
} from '@nextui-org/react';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { AccountSwitcher } from './accountSwitcher';

export function AccountManager({ session }: { session: Session }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Dropdown
        showArrow
        radius='sm'
        classNames={{
          base: 'before:bg-default-200',
          content: 'p-0 border-small border-divider bg-background',
        }}
      >
        <DropdownTrigger>
          <Avatar
            src={session.user?.image || ''}
            name={session.user?.name || ''}
          />
        </DropdownTrigger>
        <DropdownMenu
          disabledKeys={['profile']}
          onAction={(key) => {
            switch (key) {
              case 'logout':
                signOut();
                break;
              case 'switch':
                onOpen();
                break;
            }
          }}
        >
          <DropdownItem key='profile' isReadOnly>
            <User
              name={session.user?.name}
              avatarProps={{ size: 'sm', src: session.user?.image || '' }}
            />
          </DropdownItem>
          <DropdownItem key='switch'>アカウント切り替え</DropdownItem>
          <DropdownItem key='logout' className='text-danger' color='danger'>
            ログアウト
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <AccountSwitcher isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
