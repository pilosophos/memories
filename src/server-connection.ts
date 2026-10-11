import { io } from "socket.io-client";

export const SERVER_URL = import.meta.env.PROD ? 'https://memories.pilosophos.com' : 'http://localhost:3000';

export const socket = io(SERVER_URL);