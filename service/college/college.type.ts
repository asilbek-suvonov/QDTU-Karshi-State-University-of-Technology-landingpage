// 1. Umumiy va yordamchi ob'ektlar tuzilishi
export interface CollegeDepartmentItem {
  id: number;
  name: string;
  imgUrl: string;
}

export interface CollegeListItem {
  id: number;
  name: string;
  imgUrl: string;
  departmentCount: number;
  departmentNames: string[];
}

export interface CollegeDetailData {
  id: number;
  name: string;
  imgUrl: string;
  countUsers: number;
  countProfessor: number;
  countDotsent: number;
  countPHD: number;
  countDSC: number;
  countNull: number;
  departmentList: CollegeDepartmentItem[];
}

export interface CollegeDashboardData {
  countDepartments: number;
  countInfo: number;
  countTeachers: number;
  countInfoByMonth: number;
}

// Pagination (Sahifalash) uchun ma'lumotlar tuzilishi
export interface CollegePageData {
  page: number;
  size: number;
  totalPage: number;
  totalElements: number;
  body: CollegeListItem[]; // Sahifa ichidagi kollejlar ro'yxati
}

// ==========================================
// 2. API Response Interfeyslari
// ==========================================

// GET /college/{collegeId} uchun javob
export interface CollegeDetailResponse {
  success: boolean;
  message: string;
  data: CollegeDetailData;
}

// GET /college (Barcha kollejlar ro'yxati) uchun javob
export interface CollegeListResponse {
  success: boolean;
  message: string;
  data: CollegeListItem[];
}

// GET /college/page (Sahifalangan kollejlar ro'yxati) uchun javob
export interface CollegePageResponse {
  success: boolean;
  message: string;
  data: CollegePageData;
}

// GET /college/college-dashboard uchun javob
export interface CollegeDashboardResponse {
  success: boolean;
  message: string;
  data: CollegeDashboardData;
}