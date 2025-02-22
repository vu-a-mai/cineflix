"use client";

import { SessionProvider } from "next-auth/react";

// AuthProvider component
// This component is used to wrap the children components
// It is used to provide the session to the children components
// It uses the SessionProvider from next-auth/react
// It takes the children as props
// It returns the SessionProvider with the children
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
