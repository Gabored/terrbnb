import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.SECSECRET_KEY;

export const generarToken = (payload): string => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export const verificarToken = (token: string): any => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};
