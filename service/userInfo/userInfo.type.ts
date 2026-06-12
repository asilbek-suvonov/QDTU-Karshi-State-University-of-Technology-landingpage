export interface UserInfoData {
  id: number;
  userId: number;
  categoryId: number;
  academicTitle: string;
  level: string;
}

// GET /user-info/{userInfoId} uchun javob
export interface UserInfoResponse {
  success: boolean;
  message: string;
  data: UserInfoData;
}

// GET /user-info (barcha ro'yxat) uchun javob
export interface UserInfoListResponse {
  success: boolean;
  message: string;
  data: UserInfoData[];
}