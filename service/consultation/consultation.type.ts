export interface ConsultationData {
  id: number;
  name: string;
  description: string;
  year: number;
  fileUrl: string;
  userId: number;
  member: boolean;
  finishedEnum: "COMPLETED" | string; // Agar boshqa holatlar bo'lsa string qo'shilgan
  leader: string;
}

// Pagination (Sahifalash) uchun umumiy ma'lumotlar tuzilishi
export interface ConsultationPageData {
  page: number;
  size: number;
  totalPage: number;
  totalElements: number;
  body: ConsultationData[]; // Sahifa ichidagi elementlar ro'yxati
}

// 1. GET /api/consultation/{id} uchun javob
export interface ConsultationResponse {
  success: boolean;
  message: string;
  data: ConsultationData;
}

// 2. GET /api/consultation/get-page uchun javob
export interface ConsultationPageResponse {
  success: boolean;
  message: string;
  data: ConsultationPageData;
}

// 3. GET /api/consultation/byUser/{id} uchun javob
export interface ConsultationByUserResponse {
  success: boolean;
  message: string;
  data: ConsultationPageData; // Bu endpoint ham get-page kabi tuzilishga ega
}