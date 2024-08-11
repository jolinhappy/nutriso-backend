export interface SignInResponse {
  accessToken: string;
}

export interface SignUpRequest extends UserInfo {
  password: string;
}

export interface UserInfo {
  userId?: string;
  name: string;
  email: string;
  birthday: string;
  gender: string;
  height: number;
  weight: number;
  // TODO: add BMR info
}
