import axios from "@/config/axios";
import { getUserResponse, userResponse } from "@/type/response-type";
import { userCreateForm, userLoginForm } from "@/type/user-type";

const createUser = async (
  userCreateForm: userCreateForm
): Promise<userResponse> => {
  try {
    const res = await axios.post("/api/user", userCreateForm);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (
  userLoginForm: userLoginForm
): Promise<userResponse> => {
  try {
    const res = await axios.post("/api/user/login", userLoginForm);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const logoutUser = async (): Promise<userResponse> => {
  try {
    const res = await axios.post("/api/user/logout");
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getUser = async (): Promise<getUserResponse> => {
  try {
    const res = await axios.get("/api/user");
    return res.data;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (username: string): Promise<userResponse> => {
  try {
    const res = await axios.delete("/api/user", {
      params: {
        username,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export { createUser, loginUser, logoutUser, getUser, deleteUser };
