import { UserNav } from './user-nav';
import Image from 'next/image';
import Link from 'next/link';
import Telkomsel from '@/public/telkomsel.svg';

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="hidden lg:block pl-[12px]">
          <Link href="/dashboard"
          >
            <Image src={Telkomsel} alt="logo" width={150} height={50} />
          </Link>
        </div>
        <div className='block lg:!hidden'>
        </div>

        <div className="flex items-center gap-2 pr-[16px]">
          <UserNav />
        </div>
      </nav>
    </div>
  );
}
