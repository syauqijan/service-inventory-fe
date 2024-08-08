import { useState, useEffect } from 'react';
import { decodeToken } from './auth';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface User {
    name: string;
    email: string;
    userId: string;
}

export default function useAuth() {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('authToken');
        if (token) {
            const decoded = decodeToken(token);
            if (decoded && decoded.exp * 1000 > new Date().getTime()) {
                setAuthToken(token);
                setUser({ name: decoded.name, email: decoded.email, userId: decoded.userId });
            } else {
                Cookies.remove('authToken');
                router.push('/login');
            }
        }
    }, [router]);

    const login = (token: string) => {
        setAuthToken(token);
        const decoded = decodeToken(token);
        if (decoded) {
            setUser({ name: decoded.name, email: decoded.email, userId: decoded.userId });
        }
    };

    const logout = () => {
        Cookies.remove('authToken');
        setAuthToken(null);
        setUser(null);
        router.push('/login');
    };

    return {
        authToken,
        user,
        login,
        logout,
    };
}
