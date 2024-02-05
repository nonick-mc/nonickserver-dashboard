'use client';

import { Button } from '@nextui-org/react';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { AccountManager } from './accountManager';

export function LoginButton() {
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  if (status === 'loading')
    return <Button className='w-6 h-6' disabled={true} isLoading />;
  if (data) return <AccountManager session={data} />;
  return (
    <Button
      onClick={() => {
        setIsLoading(true);
        signIn('discord');
      }}
      disabled={isLoading}
      isLoading={isLoading}
    >
      <span>ログイン</span>
    </Button>
  );
}
