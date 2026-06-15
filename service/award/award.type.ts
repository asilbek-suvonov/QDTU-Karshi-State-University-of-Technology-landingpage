export interface AwardData {
  name: string;
  description: string;
  year: number;
  fileUrl: string;
  userId: number;
  awardEnum: "Trening_Va_Amaliyot" | string;
  memberEnum: "MILLIY" | string;
}

export interface AwardPageData {
  page: number;
  size: number;
  totalPage: number;
  totalElements: number;
  body: AwardData[];
}

// GET /award/{id}
export interface AwardResponse {
  success: boolean;
  message: string;
  data: AwardData;
}

// GET /award — ResPageable (body ichida array)
export interface AwardListResponse {
  success: boolean;
  message: string;
  data: AwardPageData;
}

// GET /award/byUser/{id}
export interface AwardByUserResponse {
  success: boolean;
  message: string;
  data: AwardPageData;
}