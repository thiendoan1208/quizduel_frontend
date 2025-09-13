import axios from "@/config/axios";
import { userResponse } from "@/type/response-type";
import { userInfo } from "@/type/user-type";

const createUser = async (userInfo: userInfo): Promise<userResponse> => {
  try {
    const res = await axios.post("/api/user", userInfo);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { createUser };
