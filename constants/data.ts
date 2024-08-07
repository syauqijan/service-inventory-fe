import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Service',
    href: '/dashboard/service',
    icon: 'cloud',
    label: 'service'
  },
  {
    title: 'API',
    href: '/dashboard/api',
    icon: 'network',
    label: 'api'
  },
  {
    title: 'User Management',
    href: '/dashboard/user-management',
    icon: 'usercog',
    label: 'user-management'
  },
];
