import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {IUser, IUserDTO} from "../interfaces/user";
import {createUser, getUserById, signIn} from "../services/UserService";

type UserContextData = {
  user: IUser | undefined | null;
  updateUserContext: (newUser: IUser) => void;
  createUserContext: (userDate: IUserDTO) => Promise<IUser>;
  logInContext: (email: string, password: string) => Promise<IUser>;
  logOutContext: () => Promise<void>;
};

const UserContext = createContext<UserContextData | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [user, setUser] = useState<IUser | undefined | null>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const userIDJSON = localStorage.getItem("userID");
      const userId = userIDJSON ? JSON.parse(userIDJSON) : undefined;
      console.log("UseEffect" + userId);

      if (userId) {
        try {
          const user = await getUserById(userId);
          setUser(user);
        } catch (error) {
          // Handle error, e.g., log it or show a user-friendly message
          console.error("Error fetching user:", error);
        }
      } else {
        setUser(null);
      }
    };

    fetchData(); // Invoke the async function
  }, []);

  /**
   * Updates the user context
   * @param newUser
   */
  const updateUserContext = (newUser: IUser): Promise<void> => {
    try {
      setUser(newUser);
      return Promise.resolve();
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
      setUser(null);
      localStorage.removeItem("userID");
      return Promise.resolve();
    } catch (err) {
      throw new Error("Trouble logging out user");
    }
  };

  const contextValue: UserContextData = {
    user,
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
