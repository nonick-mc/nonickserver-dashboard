'use client';

import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from './ui/dropdown-menu';
import { FiMoreHorizontal, FiLogOut } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export function LoginButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Button
      className='flex gap-3'
      onClick={() => {
        setIsLoading(true);
        signIn('discord');
      }}
      disabled={isLoading}
    >
      {isLoading && (<AiOutlineLoading3Quarters className='animate-spin' size={20}/>)}
      <span>ログイン</span>
    </Button>
  )
}

export function LogOutButton() {
  const { data: session, status } = useSession();

  if (status == 'loading') return (
    <Button variant='outline' size='icon' disabled={true}>
      <AiOutlineLoading3Quarters className='animate-spin' />
    </Button>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant='outline' size='icon'>
          <FiMoreHorizontal/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className='space-y-1'>
          <p>@{session?.user?.name}</p>
          <p className='text-xs text-muted-foreground'>Discordアカウント</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem
          className='text-red-500 focus:bg-red-500/10 focus:text-red-500 cursor-pointer'
          onSelect={() => signOut()}
        >
          <FiLogOut className='mr-2'/>
          <span>ログアウト</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}