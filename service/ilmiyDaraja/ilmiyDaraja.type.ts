// 1. Umumiy va yordamchi ob'ektlar tuzilishi
export interface IlmiyDarajaListItem {
  id: number;
  name: string;
}

export interface IlmiyDarajaStatsData {
  countDepartments: number;
  countInfo: number;
  countTeachers: number;
  countInfoByMonth: number;
}

// ==========================================
// 2. API Response Interfeyslari
// ==========================================

// GET /ilmiy-daraja (Ilmiy darajalar ro'yxati) uchun javob
export interface IlmiyDarajaListResponse {
  success: boolean;
  message: string;
  data: IlmiyDarajaListItem[];
}

// GET /ilmiy-daraja/stats uchun javob
export interface IlmiyDarajaStatsResponse {
  success: boolean;
  message: string;
  data: IlmiyDarajaStatsData[]; // Rasmdagi namunada data massiv ko'rinishida kelgan
}

// GET /ilmiy-daraja/get-ilmiy-daraja-statistika uchun javob
export interface IlmiyDarajaStatistikaAltResponse {
  success: boolean;
  message: string;
  data: IlmiyDarajaStatsData[]; // Bu endpoint ham xuddi stats kabi massiv qaytaradi
}