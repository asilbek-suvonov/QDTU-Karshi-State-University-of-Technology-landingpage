// 1. Umumiy va yordamchi ob'ektlar tuzilishi
export interface ResearchDataItem {
  id: number;
  name: string;
  description: string;
  year: number;
  fileUrl: string;
  userId: number;
}

// Pagination (Sahifalash) uchun ma'lumotlar tuzilishi
export interface ResearchPageData {
  page: number;
  size: number;
  totalPage: number;
  totalElements: number;
  body: ResearchDataItem[]; // Sahifa ichidagi tadqiqotlar ro'yxati
}

// ==========================================
// 2. API Response Interfeyslari
// ==========================================

// GET /research/{id} uchun javob
export interface ResearchDetailResponse {
  success: boolean;
  message: string;
  data: ResearchDataItem;
}

// GET /research — ResPageable (body ichida array)
export interface ResearchListResponse {
  success: boolean;
  message: string;
  data: ResearchPageData;
}

// GET /research/byUserId/{id} (Foydalanuvchiga tegishli sahifalangan tadqiqotlar) uchun javob
export interface ResearchByUserResponse {
  success: boolean;
  message: string;
  data: ResearchPageData;
}