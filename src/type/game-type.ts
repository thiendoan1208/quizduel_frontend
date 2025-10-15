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

type EachQues = {
  success: boolean;
  code: number;
  message: string;
  data: {
    total: number;
    questionNum: number,
    question: {
      question: string;
      options: string[];
      answer: string;
      difficulty: string;
      language: string;
      topic: string;
    };
  };
};

export type {
  UserMatchInfo,
  EnoughUser,
  MatchInfo,
  MatchInfoResponse,
  EachQues,
};
