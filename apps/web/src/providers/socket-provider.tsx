'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextValue {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextValue>({ socket: null });

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const endpoint = process.env.NEXT_PUBLIC_SOCKET_URL ?? 'http://localhost:3333';
    const instance = io(endpoint, { autoConnect: false });
    instance.connect();
    setSocket(instance);

    return () => {
      instance.disconnect();
      setSocket(null);
    };
  }, []);

  const value = useMemo(() => ({ socket }), [socket]);

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  return useContext(SocketContext).socket;
}
