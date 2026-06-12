export interface AwardData {
  name: string;
  description: string;
  year: number;
  fileUrl: string;
  userId: number;
  awardEnum: "Trening_Va_Amaliyot" | string; // Kelishi mumkin bo'lgan boshqa enum qiymatlar uchun string qo'shildi
  memberEnum: "MILLIY" | string;
}

// Pagination (Sahifalash) uchun umumiy ma'lumotlar tuzilishi
export interface AwardPageData {
  page: number;
  size: number;
  totalPage: number;
  totalElements: number;
  body: AwardData[]; // Sahifa ichidagi mukofotlar ro'yxati
}

// 1. GET /award/{id} uchun javob
export interface AwardResponse {
  success: boolean;
  message: string;
  data: AwardData;
}

// 2. GET /award/byUser/{id} uchun javob
export interface AwardByUserResponse {
  success: boolean;
  message: string;
  data: AwardPageData;
}