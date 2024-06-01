export interface registerRequest {
  fullName: string;
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export interface loginRequest {
  usernameOrEmail: string;
  password: string;
}
