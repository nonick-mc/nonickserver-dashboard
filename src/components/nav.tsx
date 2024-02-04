import { Link } from '@nextui-org/react';

export function Nav() {
  return (
    <div className=' flex h-20 items-center justify-between gap-4 bg-background sm:gap-0'>
      <div className='flex items-center gap-3'>
        <Link href='/'>
          <div className='font-bold text-xl'>NoNICK SERVER</div>
        </Link>
      </div>
      <div>Login</div>
    </div>
  );
}
