"use client";

import { User } from "@/type/user-type";
import { createContext, ReactElement, useState } from "react";

const UserContext = createContext({
  user: {
    _id: "",
    name: "",
    loginSecret: "",
    win: 0,
    loss: 0,
    createDate: "",
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (userInfo: User) => {},
});

function UserProvider({ children }: { children: ReactElement }) {
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    loginSecret: "",
    win: 0,
    loss: 0,
    createDate: "",
  });

  const login = (userInfo: User) => {
    setUser(userInfo);
  };

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
