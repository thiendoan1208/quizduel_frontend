type Topic = {
  _id: string;
  letter: string;
  topics: { name: string; value: string }[];
};

type TopicResponse = {
  success: boolean;
  message: string;
  data: Topic[];
};

export type { Topic, TopicResponse };
