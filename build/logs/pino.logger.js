import pino from 'pino';
//import fs from 'fs'
import path from 'path';
export const logger = pino({
    //formatters: {level: (label)=>{return {level: label.toUpperCase}}},
    redact: ['password', 'accessToken'],
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
    transport: {
        targets: [
            { target: 'pino/file', options: { destination: path.join(__dirname, 'info.log.json') }, level: 'info' },
            { target: 'pino/file', options: { destination: path.join(__dirname, 'error.log.json') }, level: 'error' },
            { target: 'pino/file', options: { destination: path.join(__dirname, 'warn.log.json') }, level: 'warn' },
        ]
    }
});
// targets: [
//     { target: 'pino/file', options: { destination: path.join(__dirname,  'info.log.json') }, level: 'info'},
//     { target: 'pino/file', options: { destination: path.join(__dirname,  'warn.log.json') }, level: 'warn' },
//     { target: 'pino/file', options: { destination: path.join(__dirname,  'error.log.json') }, level: 'error' }
// ]
