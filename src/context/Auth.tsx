// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";
import LoginResponse from "../types/User/LoginResponse";
import {
  AcceptInvitationStartPayload,
  getProfileService,
  loginService,
  passwordRecoveryService,
  registerService,
  requestEmailConfirmationService,
  updateUserService,
  respondToAssignmentService,
  requestPasswordRecoveryService,
} from "../services/auth";
import User from "../types/User";
import UpdateUserFields from "../types/User/UpdateUserFields";

interface AuthContextProps {
  user: User | null;
  loginUser: (data: {
    email: string;
    password: string;
  }) => Promise<LoginResponse>;
  registerUser: (data: {
    email: string;
    password: string;
    name: string;
    lastName: string;
    phone: string;
    userType: string;
    countryOrigin: string;
  }) => Promise<void>;
  requestEmailConfirmation: () => Promise<{ message: string }>;
  requestPasswordRecovery: (data: { email: string }) => Promise<void>;
  passwordRecovery: (data: {
    password: string;
    token: string;
  }) => Promise<void>;
  updateUser: (data: UpdateUserFields) => Promise<{ message: string }>;
  respondToAssignment: (
    data: AcceptInvitationStartPayload
  ) => Promise<{ accepted: boolean }>;
  logout: () => void;
  loading: {
    loadingUser: boolean;
    loginUser: boolean;
    registerUser: boolean;
    requestEmailConfirmation: boolean;
    requestPasswordRecovery: boolean;
    passwordRecovery: boolean;
    updateUser: boolean;
    respondToAssignment: boolean;
  };
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState({
    loadingUser: true,
    loginUser: false,
    registerUser: false,
    requestEmailConfirmation: false,
    requestPasswordRecovery: false,
    passwordRecovery: false,
    updateUser: false,
    respondToAssignment: false,
  });

  const loginUser = async (data: { email: string; password: string }) => {
    setLoading((prev) => ({ ...prev, loginUser: true }));
    try {
      const response = await loginService(data);
      const profile = await getProfileService();
      setUser(profile);
      return response;
    } finally {
      setLoading((prev) => ({ ...prev, loginUser: false }));
    }
  };

  const registerUser = async (data: {
    email: string;
    password: string;
    name: string;
    lastName: string;
    phone: string;
    userType: string;
    countryOrigin: string;
  }) => {
    setLoading((prev) => ({ ...prev, registerUser: true }));
    try {
      await registerService(data);
    } finally {
      setLoading((prev) => ({ ...prev, registerUser: false }));
    }
  };

  const requestEmailConfirmation = async () => {
    setLoading((prev) => ({ ...prev, requestEmailConfirmation: true }));
    try {
      return await requestEmailConfirmationService();
    } finally {
      setLoading((prev) => ({ ...prev, requestEmailConfirmation: false }));
    }
  };

  const requestPasswordRecovery = async (data: { email: string }) => {
    setLoading((prev) => ({ ...prev, requestPasswordRecovery: true }));
    try {
      await requestPasswordRecoveryService(data);
    } finally {
      setLoading((prev) => ({ ...prev, requestPasswordRecovery: false }));
    }
  };

  const passwordRecovery = async (data: {
    password: string;
    token: string;
  }) => {
    setLoading((prev) => ({ ...prev, passwordRecovery: true }));
    try {
      await passwordRecoveryService(data);
    } finally {
      setLoading((prev) => ({ ...prev, passwordRecovery: false }));
    }
  };

  const updateUser = async (data: UpdateUserFields) => {
    setLoading((prev) => ({ ...prev, updateUser: true }));
    try {
      return await updateUserService(data);
    } finally {
      setLoading((prev) => ({ ...prev, updateUser: false }));
    }
  };

  const respondToAssignment = async (data: AcceptInvitationStartPayload) => {
    setLoading((prev) => ({ ...prev, respondToAssignment: true }));
    try {
      return await respondToAssignmentService(data);
    } finally {
      setLoading((prev) => ({ ...prev, respondToAssignment: false }));
    }
  };

  const logout = () => {
    setUser(null);
    SecureStore.deleteItemAsync("authToken");
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      console.log("token", token);
      if (token) {
        try {
          const profile = await getProfileService();
          setUser(profile);
        } catch (error) {
          console.error("Failed to load user profile :", error);
          await SecureStore.deleteItemAsync("authToken");
        }
      }
      setLoading((prev) => ({ ...prev, loadingUser: false }));
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        registerUser,
        requestEmailConfirmation,
        requestPasswordRecovery,
        passwordRecovery,
        updateUser,
        respondToAssignment,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
