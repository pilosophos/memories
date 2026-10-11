import { io } from "socket.io-client";

export const SERVER_URL = import.meta.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

export const socket = io(SERVER_URL);