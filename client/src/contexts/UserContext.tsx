import React, {createContext, useContext, useState, ReactNode} from "react";
import {IUser} from "../interfaces/user";

type UserContextData = {
  user: IUser | undefined;
  updateUser: (newUser: IUser) => void;
};

const UserContext = createContext<UserContextData | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const updateUser = (newUser: IUser) => {
    setUser(newUser);
  };

  const contextValue: UserContextData = {
    user,
    updateUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
