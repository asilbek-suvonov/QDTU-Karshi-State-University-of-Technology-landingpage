// 1. Umumiy va yordamchi ob'ektlar tuzilishi
export interface DepartmentListItem {
  id: number;
  name: string;
}

export interface DepartmentPageItem {
  id: number;
  name: string;
  collegeName: string;
}

export interface DepartmentDetailData {
  id: number;
  name: string;
  collegeName: string;
  countUsers: number;
  countProfessor: number;
  countDotsent: number;
  countPHD: number;
  countDSC: number;
  countNull: number;
}

export interface DepartmentStatsData {
  countDepartments: number;
  countInfo: number;
  countTeachers: number;
  countInfoByMonth: number;
}

// Pagination (Sahifalash) uchun ma'lumotlar tuzilishi
export interface DepartmentPageData {
  page: number;
  size: number;
  totalPage: number;
  totalElements: number;
  body: DepartmentPageItem[]; // Sahifa ichidagi kafedralar ro'yxati
}

// ==========================================
// 2. API Response Interfeyslari
// ==========================================

// GET /department/getOne/{departmentId} uchun javob
export interface DepartmentDetailResponse {
  success: boolean;
  message: string;
  data: DepartmentDetailData;
}

// GET /department/list (Kafedralarning qisqa ro'yxati) uchun javob
export interface DepartmentListResponse {
  success: boolean;
  message: string;
  data: DepartmentListItem[];
}

// GET /department/page (Sahifalangan kafedralar ro'yxati) uchun javob
export interface DepartmentPageResponse {
  success: boolean;
  message: string;
  data: DepartmentPageData;
}

// GET /department/stats uchun javob
export interface DepartmentStatsResponse {
  success: boolean;
  message: string;
  data: DepartmentStatsData;
}