// 1. Umumiy va yordamchi ob'ektlar tuzilishi
export interface TeacherSearchItem {
  id: number;
  fullName: string;
  collegeName: string;
  departmentName: string;
}

export interface TeacherDetailData {
  id: number;
  fullName: string;
  collegeName: string;
  departmentName: string;
  gender: string;
  birthDate: string; // YYYY-MM-DD formatida
  phone: string;
  scientificDegree: string | null;
  academicTitle: string | null;
  position: string | null;
  imgUrl: string | null;
}

// ==========================================
// 2. API Response Interfeyslari
// ==========================================

// GET /teacher/{userId} uchun javob
export interface TeacherDetailResponse {
  success: boolean;
  message: string;
  data: TeacherDetailData;
}

// GET /teacher/search (O'qituvchilarni qidirish) uchun javob
export interface TeacherSearchResponse {
  success: boolean;
  message: string;
  data: TeacherSearchItem[];
}