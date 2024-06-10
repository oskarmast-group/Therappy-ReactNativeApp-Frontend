import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import {
  deletePaymentMethod,
  getAccountInformation,
  getAccountLink,
  getPaymentMethods,
  getSetupIntent,
} from "../services/account";
import { AccountInformation } from "../interfaces/User";

interface AccountContextProps {
  accountInfo: AccountInformation | null;
  fetchAccountInformation: () => Promise<void>;
  fetchSetupIntent: () => Promise<void>;
  fetchPaymentMethods: () => Promise<void>;
  removePaymentMethod: (data: any) => Promise<void>;
  loadingAccountInfo: boolean;
  loadingAccountLink: boolean;
  loadingSetupIntent: boolean;
  loadingPaymentMethods: boolean;
  loadingDeletePaymentMethod: boolean;
}

const AccountContext = createContext<AccountContextProps | undefined>(
  undefined
);

export const AccountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accountInfo, setAccountInfo] = useState<AccountInformation | null>(
    null
  );
  const [loadingAccountInfo, setLoadingAccountInfo] = useState<boolean>(false);
  const [loadingAccountLink, setLoadingAccountLink] = useState<boolean>(false);
  const [loadingSetupIntent, setLoadingSetupIntent] = useState<boolean>(false);
  const [loadingPaymentMethods, setLoadingPaymentMethods] =
    useState<boolean>(false);
  const [loadingDeletePaymentMethod, setLoadingDeletePaymentMethod] =
    useState<boolean>(false);

  const fetchAccountInformation = useCallback(async () => {
    setLoadingAccountInfo(true);
    try {
      const response = await getAccountInformation();
      setAccountInfo(response.data);
    } catch (error) {
      console.error("Failed to fetch account information:", error);
    } finally {
      setLoadingAccountInfo(false);
    }
  }, []);

  const fetchSetupIntent = useCallback(async () => {
    setLoadingSetupIntent(true);
    try {
      await getSetupIntent();
    } catch (error) {
      console.error("Failed to fetch setup intent:", error);
    } finally {
      setLoadingSetupIntent(false);
    }
  }, []);

  const fetchPaymentMethods = useCallback(async () => {
    setLoadingPaymentMethods(true);
    try {
      const res = await getPaymentMethods();
      console.log("context", res.data.methods);
      return res.data.methods;
    } catch (error) {
      console.error("Failed to fetch payment methods:", error);
    } finally {
      setLoadingPaymentMethods(false);
    }
  }, []);

  const removePaymentMethod = useCallback(async (data: any) => {
    setLoadingDeletePaymentMethod(true);
    try {
      await deletePaymentMethod(data);
    } catch (error) {
      console.error("Failed to delete payment method:", error);
    } finally {
      setLoadingDeletePaymentMethod(false);
    }
  }, []);

  return (
    <AccountContext.Provider
      value={{
        accountInfo,
        fetchAccountInformation,
        fetchSetupIntent,
        fetchPaymentMethods,
        removePaymentMethod,
        loadingAccountInfo,
        loadingAccountLink,
        loadingSetupIntent,
        loadingPaymentMethods,
        loadingDeletePaymentMethod,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = (): AccountContextProps => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};
