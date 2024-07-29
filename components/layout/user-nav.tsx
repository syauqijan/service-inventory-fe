'use client';
import UserLogo from '@/public/user.svg';
import Image from 'next/image';
import useAuth from '../../hooks/useAuth';
import {LogOut} from 'lucide-react'
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuGroup,
DropdownMenuItem,
DropdownMenuLabel,
DropdownMenuSeparator,
DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function UserNav() {
const { user, logout } = useAuth();

if (!user) {
    return null;
}

return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <button className="flex flex-row relative w-auto">
        <Image src={UserLogo} alt="user-logo" width={40} height={40} className='rounded-full' />
        <div className='flex flex-col justify-start items-start'>
            <DropdownMenuLabel className='text-slate-700 text-sm font-semibold leading-tight'>
            {user.name}
            </DropdownMenuLabel>
            <DropdownMenuLabel className='text-slate-700 text-sm font-medium leading-tight'>
            {user.email}
            </DropdownMenuLabel>
        </div>
        </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 " align="end" forceMount>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className='cursor-pointer'>
        <DropdownMenuItem className='text-slate-700 text-sm font-semibold hover:bg-slate-100 pb-2 pt-2 rounded-md'>
            My Account
        </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className='flex flex-row pb-1 pt-1 mb-1 cursor-pointer items-center text-slate-700 text-sm font-medium hover:bg-slate-100 rounded-md'>
        <LogOut className='mr-2 w-4 ' />
        Log out
        </DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
);
}
