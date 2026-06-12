// ==========================================
// 1. Yordamchi va Umumiy Ma'lumot Tuzilmalari
// ==========================================

export interface UserScientificData {
  countProfessor: number;
  countDotsent: number;
  countPHD: number;
  countDSC: number;
  countNull: number;
}

export interface UserAgeDashboardItem {
  ageGroup: string; // Masalan: "30-40", "40-50"
  count: number;
}

export interface UserGenderDashboardItem {
  gender: "MALE" | "FEMALE" | string;
  count: number;
}

export interface UserDashboardData {
  countDepartments: number;
  countInfo: number;
  countTeachers: number;
  countInfoByMonth: number;
}

export interface UserStatisticsData {
  publicationCount: number;
  consultationCount: number;
  awardCount: number;
  researchCount: number;
  nazoratCount: number;
}

export interface UserProfileCompletion {
  userId: number;
  completionPercentage: number; // Masalan: 85
}

export interface UserListItem {
  id: number;
  fullName: string;
  collegeName: string;
  departmentName: string;
  imgUrl: string | null;
}

// ==========================================
// 2. API Response Interfeyslari
// ==========================================

// GET /user/scientific uchun javob
export interface UserScientificResponse {
  success: boolean;
  message: string;
  data: UserScientificData;
}

// GET /user/age-dashboard uchun javob
export interface UserAgeDashboardResponse {
  success: boolean;
  message: string;
  data: UserAgeDashboardItem[];
}

// GET /user/gender-dashboard uchun javob
export interface UserGenderDashboardResponse {
  success: boolean;
  message: string;
  data: UserGenderDashboardItem[];
}

// GET /user/dashboard uchun javob
export interface UserDashboardResponse {
  success: boolean;
  message: string;
  data: UserDashboardData;
}

// GET /user/statistics/{userId} uchun javob
export interface UserStatisticsResponse {
  success: boolean;
  message: string;
  data: UserStatisticsData;
}

// GET /user/profile-completion/{userId} uchun javob
export interface UserProfileCompletionResponse {
  success: boolean;
  message: string;
  data: UserProfileCompletion;
}

// GET /user/college/{collegeId} uchun javob
export interface UserCollegeResponse {
  success: boolean;
  message: string;
  data: UserListItem[];
}

// GET /user/department/{departmentId} uchun javob
export interface UserDepartmentResponse {
  success: boolean;
  message: string;
  data: UserListItem[];
}

// GET /user uchun javob
export interface UserListResponse {
  success: boolean;
  message: string;
  data: UserListItem[];
}