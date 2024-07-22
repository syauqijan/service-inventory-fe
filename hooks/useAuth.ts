import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const expiryTime = localStorage.getItem('tokenExpiryTime');

        if (token && expiryTime) {
            const currentTime = new Date().getTime();
            if (currentTime >= parseInt(expiryTime, 10)) {
                logout();
            } else {
                setAuthToken(token);
                const timeout = parseInt(expiryTime, 10) - currentTime;
                setTimeout(() => {
                    logout();
                }, timeout);
            }
        }
    }, []);

    const login = (token: string, expiresIn: number) => {
        const expiryTime = new Date().getTime() + expiresIn * 1000;
        localStorage.setItem('authToken', token);
        localStorage.setItem('tokenExpiryTime', expiryTime.toString());
        setAuthToken(token);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiryTime');
        setAuthToken(null);
        router.push('/login');
    };

    return {
        authToken,
        login,
        logout
    };
};

export default useAuth;
