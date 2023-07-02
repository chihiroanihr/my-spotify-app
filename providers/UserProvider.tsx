"use client";

import { MyUserContextProvider } from "@/hooks/useUser";

interface UserProviderProps {
  children: React.ReactNode;
}

// Provider for User Authentication
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
