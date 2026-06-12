// 1. Umumiy va yordamchi ob'ektlar tuzilishi
export interface LavozimListItem {
  id: number;
  name: string;
}

export interface LavozimStatsData {
  countDepartments: number;
  countInfo: number;
  countTeachers: number;
  countInfoByMonth: number;
}

// ==========================================
// 2. API Response Interfeyslari
// ==========================================

// GET /lavozim (Lavozimlar ro'yxati) uchun javob
export interface LavozimListResponse {
  success: boolean;
  message: string;
  data: LavozimListItem[];
}

// GET /lavozim/get-lavozim-statistika uchun javob
export interface LavozimStatistikaResponse {
  success: boolean;
  message: string;
  data: LavozimStatsData[]; // Rasmdagi namunada data massiv ko'rinishida kelgan
}