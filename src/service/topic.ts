import axios from "@/config/axios";
import { TopicResponse } from "@/type/topic-type";

const getTopic = async (): Promise<TopicResponse> => {
  try {
    const res = await axios.get("/api/topic");
    return res.data;
  } catch (error) {
    throw error;
  }
};

const findTopic = async (keyword: string): Promise<TopicResponse> => {
  try {
    const res = await axios.post("/api/topic", { keyword });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { getTopic, findTopic };
