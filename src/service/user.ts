import axios from "@/config/axios";
import {
  createUserResponse,
  getUserResponse,
  loginUserResponse,
} from "@/type/response-type";
import { User, userCreateForm, userLoginForm } from "@/type/user-type";

const createUser = async (
  userCreateForm: userCreateForm
): Promise<createUserResponse> => {
  try {
    const res = await axios.post("/api/user", userCreateForm);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (
  userLoginForm: userLoginForm
): Promise<loginUserResponse> => {
  try {
    const res = await axios.post("/api/user/login", userLoginForm);
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

const deleteUser = async (userInfo: User) => {
  try {
    const res = await axios.delete("/api/user", {
      params: userInfo,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export { createUser, loginUser, getUser, deleteUser };
