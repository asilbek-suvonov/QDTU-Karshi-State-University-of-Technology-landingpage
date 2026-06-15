import { apiClient } from "@/api/client";
import { POST_ENDPOINTS } from "@/api/endpoints";
import type { LoginRequestParams, LoginResponse } from "./auth.type";

export const authService = {
  login: (params: LoginRequestParams): Promise<LoginResponse> =>
    apiClient.post(POST_ENDPOINTS.auth.login, null, { params }),
};
