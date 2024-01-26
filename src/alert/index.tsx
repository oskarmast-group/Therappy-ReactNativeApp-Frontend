import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';
import Dialog from './dialog';
import AlertOptions from './interfaces/AlertOptions';

interface AlertServiceContextProps {
  alert: (options: AlertOptions) => Promise<void>;
  closeAlert: () => void;
  submitAlert: (value: any) => void; // Define the type of 'value' as per your requirement
}

const AlertServiceContext = createContext<AlertServiceContextProps>({
  alert: () => Promise.reject(),
  closeAlert: () => {},
  submitAlert: () => {},
});

const AlertServiceProvider: React.FC<PropsWithChildren<{}>> = ({children}) => {
  const [alertState, setAlertState] = useState<AlertOptions | null>(null);
  const promise = useRef<{
    resolve: (value: any) => void;
    reject: () => void;
  } | null>(null);

  const setStateOpen = (options: AlertOptions) => {
    setAlertState(options);
    return new Promise<void>((resolve, reject) => {
      promise.current = {resolve, reject};
    });
  };

  const handleClose = () => {
    promise.current?.reject();
    setAlertState(null);
  };

  const handleSubmit = (value: any) => {
    promise.current?.resolve(value);
    setAlertState(null);
  };

  return (
    <AlertServiceContext.Provider
      value={{
        alert: setStateOpen,
        closeAlert: handleClose,
        submitAlert: handleSubmit,
      }}>
      {children}
      {!!alertState && (
        <Dialog
          open={!!alertState}
          onSubmit={handleSubmit}
          onClose={handleClose}
          alertOptions={alertState}
        />
      )}
    </AlertServiceContext.Provider>
  );
};

const useAlert = (): ((options: AlertOptions) => Promise<void>) => {
  return useContext(AlertServiceContext).alert;
};

const useAlertHelpers = (): [(value: any) => void, () => void] => {
  const {submitAlert, closeAlert} = useContext(AlertServiceContext);
  return [submitAlert, closeAlert];
};

export default AlertServiceProvider;
export {AlertServiceProvider, useAlert, useAlertHelpers};
