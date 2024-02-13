import pino from 'pino';
// Importa las funciones necesarias para convertir import.meta.url a una ruta de directorio
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Convierte la URL del archivo actual a una ruta de archivo y luego obtiene el directorio de ese archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const logger = pino({
  redact: ['password', 'accessToken'],
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
  transport: {
    targets: [
      { target: 'pino/file', options: { destination: join(__dirname, 'info.log.json') }, level: 'info' },
      { target: 'pino/file', options: { destination: join(__dirname, 'error.log.json') }, level: 'error' },
      { target: 'pino/file', options: { destination: join(__dirname, 'warn.log.json') }, level: 'warn' },
    ]
  }
});
