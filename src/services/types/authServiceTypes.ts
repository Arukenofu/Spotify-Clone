export interface LoginForm {
  email: string;
  password: string;
  isRemember: boolean;
}

export interface RegisterForm {
  email: string;
  password: string;
  username: string;
  day: number | null;
  month: string;
  year: number | null;
  gender: string;
}
