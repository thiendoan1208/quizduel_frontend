type userResponse = {
  success: boolean;
  message: string;
  data: null;
};

type loginUserResponse = {
  success: boolean;
  message: string;
  data: null;
};

type getUserResponse = {
  success: boolean;
  message: string;
  data: [
    {
      _id: string;
      name: string;
      loginSecret: string;
      win: number;
      loss: number;
      createDate: string;
    }
  ];
};

export type { userResponse, getUserResponse, loginUserResponse };
