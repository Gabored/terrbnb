import crypto from 'crypto';

export const generarHashContraseña = (contraseña: string): string => {
  const hash = crypto.createHash('sha256');
  hash.update(contraseña);
  return hash.digest('hex');
};

export const generarSaltAleatorio = (longitud: number = 16): string => {
  return crypto.randomBytes(Math.ceil(longitud / 2)).toString('hex').slice(0, longitud);
};

export const encriptarContraseña = (contraseña: string, salt: string): string => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(contraseña);
  return hash.digest('hex');
};