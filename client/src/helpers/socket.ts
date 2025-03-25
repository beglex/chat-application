import {io} from 'socket.io-client';

export const socket = io(import.meta.env.VITE_API_URL, {autoConnect: false, timeout: 5000, query: {limit: 5}});
