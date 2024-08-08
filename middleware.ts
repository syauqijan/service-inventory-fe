import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

interface JwtPayload {
    email: string;
    exp: number;
    name: string;
    userId: number;
}

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("authToken");

    if (token) {
        try {
            const decoded: JwtPayload = jwtDecode(token.value);

            if (decoded.exp * 1000 < new Date().getTime()) {
                return NextResponse.redirect(new URL("/login", req.url));
            }


            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_USERS}/${decoded.userId}`);
            const userRole = response.data;

            if (req.nextUrl.pathname === '/dashboard/user-management' && userRole.roleId !== 1) {
                return NextResponse.redirect(new URL("/dashboard", req.url));
            }

            return NextResponse.next();
            
        } catch (error) {
            console.error("Token decode or role check error:", error);
            return NextResponse.redirect(new URL("/login", req.url));
        }
    } else {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: [
        '/dashboard',
        '/dashboard/user-management'
    ],
};
