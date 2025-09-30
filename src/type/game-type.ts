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
    numberOfUserIsWaiting: number;
  };
};

export type { UserMatchInfo, EnoughUser };
