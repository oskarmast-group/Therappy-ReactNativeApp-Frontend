import React, { PropsWithChildren, createContext, useContext, useRef, useState } from 'react';
import Dialog from './dialog';
import AlertOptions from './interfaces/AlertOptions';

interface AlertServiceContextProps<T = any> {
  alert: (options: AlertOptions) => Promise<T>;
}

const AlertServiceContext = createContext<AlertServiceContextProps>({
  alert: () => Promise.reject(),
});

const AlertServiceProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [alertState, setAlertState] = useState<AlertOptions | null>(null);
  const promise = useRef<{
    resolve: (value: any) => void;
    reject: () => void;
  } | null>(null);

  function setStateOpen<T = any>(options: AlertOptions): Promise<T> {
    console.log('Alert options:', options);
    setAlertState(options);
    return new Promise<T>((resolve, reject) => {
      promise.current = { resolve, reject };
    });
  }

  const handleClose = () => {
    promise.current?.reject();
    setAlertState(null);
  };

  const handleSubmit = (value?: any) => {
    promise.current?.resolve(value);
    setAlertState(null);
  };

  return (
    <AlertServiceContext.Provider value={{ alert: setStateOpen }}>
      {children}
      <Dialog open={!!alertState} onSubmit={handleSubmit} onClose={handleClose} alertOptions={alertState} />
    </AlertServiceContext.Provider>
  );
};

function useAlert<T = any, P = any>(): (options: AlertOptions<P>) => Promise<T> {
  return useContext(AlertServiceContext).alert;
}

export default AlertServiceProvider;
export { AlertServiceProvider, useAlert };
