import { View, Text } from "react-native";
import React, { PropsWithChildren } from "react";
import { AuthProvider } from "./src/context/Auth";
import { AppointmentProvider } from "./src/context/Appointment";
import { CategoryProvider } from "./src/context/Category";
import { ConversationProvider } from "./src/context/Conversations";
import { RequiredDocumentationProvider } from "./src/context/RequiredDocumentation";
import { TherapistProvider } from "./src/context/Therapist";
import SocketProvider from "./src/Socket";
import { NativeRouter, RouterProvider } from "react-router-native";
import { AccountProvider } from "./src/context/Account";
import { StripeProvider } from "@stripe/stripe-react-native";
import { STRIPE_PUBLIC_KEY } from "./src/resources/constants/config";

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <StripeProvider publishableKey={STRIPE_PUBLIC_KEY || ''}>
        <AppointmentProvider>
          <CategoryProvider>
            <ConversationProvider>
              <RequiredDocumentationProvider>
                <TherapistProvider>
                  <SocketProvider>
                    <AccountProvider>
                      <NativeRouter>{children}</NativeRouter>
                    </AccountProvider>
                  </SocketProvider>
                </TherapistProvider>
              </RequiredDocumentationProvider>
            </ConversationProvider>
          </CategoryProvider>
        </AppointmentProvider>
      </StripeProvider>
    </AuthProvider>
  );
};

export default Providers;
