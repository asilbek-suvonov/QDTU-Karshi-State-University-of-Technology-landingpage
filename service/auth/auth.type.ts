// Login so'rovi parametrlari (query params)
export interface LoginRequestParams {
  phone: string;
  password: string;
}

// Server javobi
export interface LoginResponse {
  success: boolean;
  message: string;
  data: string; // JWT access token
}
