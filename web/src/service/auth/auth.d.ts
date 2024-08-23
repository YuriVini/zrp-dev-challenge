export as namespace AuthApi;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user_id: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
