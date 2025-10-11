"use client";

import { MatchInfo } from "@/type/game-type";
import { createContext, ReactElement, useState } from "react";

const MatchContext = createContext({
  matchInfo: {
    matchID: "",
    users: [{ topic: [""], userInfo: { name: "", loss: 0, win: 0 } }],
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setMatch: (matchInfo: MatchInfo) => {},
});

function MatchProvider({ children }: { children: ReactElement }) {
  const [matchInfo, setMatchInfo] = useState<MatchInfo>({
    matchID: "",
    users: [],
  });

  const setMatch = (matchInfo: MatchInfo) => {
    setMatchInfo(matchInfo);
  };

  return (
    <MatchContext.Provider value={{ matchInfo, setMatch }}>
      {children}
    </MatchContext.Provider>
  );
}

export { MatchContext, MatchProvider };
