'use client';
import UserLogo from '@/public/user.svg';
import Image from 'next/image';
import useAuth from '../../hooks/useAuth';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
export function UserNav() {
    const { logout } = useAuth();
//   const { data: session } = useSession();
//   if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className=" flex felx-row relative w-auto ">
            <Image src={UserLogo} alt="user-logo" width={40} height={40} className=' rounded-full' />
            <div className='flex flex-col justify-start items-start'>
                <DropdownMenuLabel className='text-slate-900 text-sm font-medium leading-normal'>John Doe</DropdownMenuLabel>
                <DropdownMenuLabel className='text-gray-500 text-xs font-medium leading-tight'>JohnDoe@phincon.com</DropdownMenuLabel>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              My Account
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
// }
