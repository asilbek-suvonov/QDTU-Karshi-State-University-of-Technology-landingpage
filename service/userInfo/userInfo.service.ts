import { apiClient } from "@/api/client";
import { GET_ENDPOINTS } from "@/api/endpoints";
import type { UserInfoResponse } from "./userInfo.type";

export const userInfoService = {
  getById: (userInfoId: string | number): Promise<UserInfoResponse> =>
    apiClient.get(GET_ENDPOINTS.userInfo.getById(userInfoId)),
};
