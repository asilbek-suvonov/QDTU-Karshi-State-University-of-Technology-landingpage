// 1. Umumiy va yordamchi ob'ektlar tuzilishi
export interface NazoratDataItem {
  id: number;
  name: string;
  description: string;
  year: number;
  fileUrl: string;
  userId: number;
  typeNazorat: "YILLIK" | string; // Kelishi mumkin bo'lgan boshqa enum qiymatlar uchun string qo'shildi
}

// Pagination (Sahifalash) uchun ma'lumotlar tuzilishi
export interface NazoratPageData {
  page: number;
  size: number;
  totalPage: number;
  totalElements: number;
  body: NazoratDataItem[]; // Sahifa ichidagi nazoratlar ro'yxati
}

// ==========================================
// 2. API Response Interfeyslari
// ==========================================

// GET /nazorat/{id} uchun javob
export interface NazoratDetailResponse {
  success: boolean;
  message: string;
  data: NazoratDataItem;
}

// GET /nazorat (Barcha nazoratlar ro'yxati) uchun javob
export interface NazoratListResponse {
  success: boolean;
  message: string;
  data: NazoratDataItem[];
}

// GET /nazorat/byUser/{id} (Foydalanuvchiga tegishli sahifalangan nazoratlar) uchun javob
export interface NazoratByUserResponse {
  success: boolean;
  message: string;
  data: NazoratPageData;
}