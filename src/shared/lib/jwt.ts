import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

interface TokenPayload {
  user_id: string;
}

// Access Token — 짧은 수명 (1시간)
export const createAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

// Refresh Token — 긴 수명 (30일)
export const createRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};
