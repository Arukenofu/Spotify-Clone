export interface ZeroStepForm {
  email: string;
}

export interface FirstStepForm {
  password: string;
}

export interface SecondStepForm {
  username: string;
  day: number | null;
  month: string;
  year: number | null;
  gender: string;
}
