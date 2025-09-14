type userCreateForm = {
  name: string;
  win: number;
  loss: number;
};

type userLoginForm = {
  name: string;
  loginSecret: string;
};

type User = {
  _id: string;
  name: string;
  loginSecret: string;
  win: number;
  loss: number;
  createDate: string;
};

export type { userCreateForm, userLoginForm, User };
