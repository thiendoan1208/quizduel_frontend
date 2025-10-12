import axios from "@/config/axios";

const createQuizByTopic = async (user: {
  matchID: string;
  topic: string[];
}) => {
  try {
    const res = await axios.post("/api/during-game/match/quiz", user);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { createQuizByTopic };
