import socketIOClient, { Socket } from 'socket.io-client';
import React, { useState, useEffect, PropsWithChildren } from 'react';
import { API } from './constant/urls';

const SocketProviderContext = React.createContext<Socket | null>(null);

const SocketProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIO = socketIOClient(API, { auth: { token: '' } });
    setSocket(socketIO);

    return function cleanup() {
      socketIO.disconnect();
    };
  }, []);

  return <SocketProviderContext.Provider value={socket}>{children}</SocketProviderContext.Provider>;
};

export const useSocket = () => React.useContext(SocketProviderContext);

export default SocketProvider;
