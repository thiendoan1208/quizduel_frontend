import axios from "@/config/axios";
import { EnoughUser, UserMatchInfo } from "@/type/game-type";
import { userResponse } from "@/type/response-type";

const addUserToWaitingQueue = async (
  userMatchInfo: UserMatchInfo
): Promise<userResponse> => {
  try {
    const res = await axios.post(
      "/api/before-game/waiting-queue",
      userMatchInfo
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const checkEnoughUser = async (): Promise<EnoughUser> => {
  try {
    const res = await axios.get("/api/before-game/waiting-queue");
    console.log(res.data);

    return res.data;
  } catch (error) {
    throw error;
  }
};

const cancelMatchMaking = async (
  userMatchInfo: UserMatchInfo
): Promise<userResponse> => {
  try {
    const res = await axios.delete("/api/before-game/waiting-queue", {
      data: userMatchInfo,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { addUserToWaitingQueue, checkEnoughUser, cancelMatchMaking };
