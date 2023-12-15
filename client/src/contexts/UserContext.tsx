import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {IUser, IUserDTO} from "../interfaces/user";
import {
  createUser,
  getUserById,
  signIn,
  updateUser,
} from "../services/UserService";

type UserContextData = {
  user: IUser | undefined;
  signedIn: boolean;
  updateUserContext: (newUser: Partial<IUserDTO>) => Promise<IUser>;
  createUserContext: (userDate: IUserDTO) => Promise<IUser>;
  logInContext: (email: string, password: string) => Promise<IUser>;
  logOutContext: () => Promise<void>;
};

const UserContext = createContext<UserContextData | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [signedIn, setSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const userIDJSON = localStorage.getItem("userID");
      const userId = userIDJSON ? JSON.parse(userIDJSON) : undefined;
      if (userId) {
        try {
          const user = await getUserById(userId);
          setUser(user);
          setSignedIn(true);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      } else {
        setUser(undefined);
        setSignedIn(false);
      }
    };
    fetchData();
  }, [signedIn]);

  /**
   * Updates the user context
   * @param newUser
   */
  const updateUserContext = async (
    newUser: Partial<IUserDTO>
  ): Promise<IUser> => {
    try {
      if (user === undefined) {
        throw new Error("User not found");
      }
      const userResponse = await updateUser(user._id, newUser);
      console.log("here");
      setUser(userResponse);
      console.log("here again");
      return userResponse;
    } catch (err) {
      throw new Error("Trouble updating user");
    }
  };

  /**
   * Creates a new user and sets the user context
   * @param userData
   */
  const createUserContext = async (userData: IUserDTO): Promise<IUser> => {
    try {
      const newUser = await createUser(userData);
      setUser(newUser);
      localStorage.setItem("userID", JSON.stringify(newUser._id));
      console.log(localStorage.getItem("userID"));
      return newUser;
    } catch (err) {
      throw new Error("Trouble creating user");
    }
  };

  /**
   * Logs in a user and sets the user context
   * @param username
   * @param password
   */
  const logInContext = async (
    email: string,
    password: string
  ): Promise<IUser> => {
    try {
      const newUser = await signIn({email, password});
      setUser(newUser);
      setSignedIn(true);
      localStorage.setItem("userID", JSON.stringify(newUser._id));
      console.log(localStorage.getItem("userID"));
      return newUser;
    } catch (err) {
      throw new Error("Trouble logging in user");
    }
  };

  /**
   * Logs out a user and sets the user context to null
   */
  const logOutContext = async (): Promise<void> => {
    try {
      setSignedIn(false);
      setUser(undefined);
      localStorage.removeItem("userID");

      return Promise.resolve();
    } catch (err) {
      throw new Error("Trouble logging out user");
    }
  };

  const contextValue: UserContextData = {
    user,
    signedIn,
    updateUserContext,
    createUserContext,
    logInContext,
    logOutContext,
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
