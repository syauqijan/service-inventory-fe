import { useState, useEffect } from 'react';
import { decodeToken } from './auth';
import { useRouter } from 'next/navigation';

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
        const token = localStorage.getItem('authToken');
        if (token) {
        setAuthToken(token);
        const decoded = decodeToken(token);
        if (decoded) {
            setUser({ name: decoded.name, email: decoded.email, userId: decoded.userId });
        }
        }
    }, []);

    const login = (token: string, expiresIn: number) => {
        const expiryTime = new Date().getTime() + expiresIn * 1000;
        localStorage.setItem('authToken', token);
        localStorage.setItem('tokenExpiryTime', expiryTime.toString());
        setAuthToken(token);
        const decoded = decodeToken(token);
        if (decoded) {
        setUser({ name: decoded.name, email: decoded.email, userId: decoded.userId });
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiryTime');
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
