import { userResponse } from "@/type/response-type";

type UserMatchInfo = {
  userInfo: {
    name: string;
    win: number;
    loss: number;
  };
  topic: string[];
};

type EnoughUser = Pick<userResponse, "success" | "message"> & {
  data: {
    matchUsers: UserMatchInfo[];
    numberOfUserIsWaiting: { success: boolean; user: number };
  };
};

type MatchInfoResponse = Pick<userResponse, "success" | "message"> & {
  data: {
    matchID: string;
    users: UserMatchInfo[];
  };
};

type MatchInfo = {
  matchID: string;
  users: UserMatchInfo[];
};

export type { UserMatchInfo, EnoughUser, MatchInfo, MatchInfoResponse };
