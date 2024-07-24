import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  email: string;
  userId: string;
  name: string;
  exp: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
