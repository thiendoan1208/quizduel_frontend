"use client";

import { MainUser } from "@/type/user-type";
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
  login: (userInfo: MainUser) => {},
});

function UserProvider({ children }: { children: ReactElement }) {
  const [user, setUser] = useState<MainUser>({
    _id: "",
    name: "",
    loginSecret: "",
    win: 0,
    loss: 0,
    createDate: "",
  });

  const login = (userInfo: MainUser) => {
    setUser(userInfo);
  };

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
