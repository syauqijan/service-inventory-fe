'use client';
import React, { useState, useEffect } from 'react';
import { DashboardNav } from '@/components/dashboard-nav';
import { navItems as originalNavItems } from '@/constants/data';
import { ChevronLeft } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { NavItem } from '@/types';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_USERS}/${user.userId}`);
        const userData = response.data;
        if (userData.roleId === 1) {
          setNavItems(originalNavItems);
        } else {
          setNavItems(originalNavItems.filter(item => item.label !== 'user-management'));
        }
      } catch (error) {
        console.error('Failed to fetch user role', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [user]);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };

  if (loading) {
    return (
      <nav
        className={`
          relative hidden h-screen flex-none border-r z-10 pt-20 md:block
          ${status ? 'duration-500' : ''}
          ${!isMinimized ? 'w-72' : 'w-[72px]'}
          ${className || ''}
        `}
      >
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="mt-3 space-y-1">
              <div className="animate-pulse">
                <div className="h-10 bg-gray-200 rounded-md mb-2"></div>
                <div className="h-10 bg-gray-200 rounded-md mb-2"></div>
                <div className="h-10 bg-gray-200 rounded-md mb-2"></div>
                <div className="h-10 bg-gray-200 rounded-md mb-2"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`
        relative hidden h-screen flex-none border-r z-10 pt-20 md:block
        ${status ? 'duration-500' : ''}
        ${!isMinimized ? 'w-72' : 'w-[72px]'}
        ${className || ''}
      `}
    >
      <ChevronLeft
        className={`
          absolute right-3 top-20 cursor-pointer rounded-full border bg-white text-3xl text-foreground
          ${isMinimized ? 'rotate-180' : ''}
        `}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
