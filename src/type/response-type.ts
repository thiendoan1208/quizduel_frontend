type createUserResponse = {
  success: boolean;
  message: string;
  data: {
    save: boolean;
  };
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

export type { createUserResponse, getUserResponse, loginUserResponse };
