import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
    email: string;
    exp: number;
    name: string;
    userId: number;
}

export function middleware(req: NextRequest) {
    const token = req.cookies.get("authToken");

    if (token) {
        try {
            const decoded: JwtPayload = jwtDecode(token.value);

            if (decoded.exp * 1000 < new Date().getTime()) {
                return NextResponse.redirect(new URL("/login", req.url));
            }

            return NextResponse.next();
            
        } catch (error) {
            console.error("Token decode error:", error);
            return NextResponse.redirect(new URL("/login", req.url));
        }
    } else {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
};
