export interface PublicationData {
  id: number;
  userId: number;
  name: string;
  description: string;
  year: number;
  fileUrl: string;
  type: "ARTICLE" | string;     // Kelishi mumkin bo'lgan enum qiymatlar uchun string qo'shildi
  author: "COAUTHOR" | string;
  degree: "INTERNATIONAL" | string;
  volume: string;
  institution: string;
  popular: boolean;
}

// Pagination (Sahifalash) uchun umumiy ma'lumotlar tuzilishi
export interface PublicationPageData {
  page: number;
  size: number;
  totalPage: number;
  totalElements: number;
  body: PublicationData[]; // Sahifa ichidagi nashrlar ro'yxati
}

// 1. GET /api/publication/{publicationId} uchun javob
export interface PublicationResponse {
  success: boolean;
  message: string;
  data: PublicationData;
}

// 2. GET /api/publication/get-page uchun javob
export interface PublicationPageResponse {
  success: boolean;
  message: string;
  data: PublicationPageData;
}

// 3. GET /api/publication/byUser/{id} uchun javob
export interface PublicationByUserResponse {
  success: boolean;
  message: string;
  data: PublicationPageData; // Bu endpoint ham get-page kabi bir xil tuzilishga ega
}