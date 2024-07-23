"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { authToken } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (!authToken) {
            router.push('/login');
        }
    }, [authToken, router]);

    if (!authToken) {
        return null;
    }

    return <>{children}</>;
};

export default PrivateRoute;
