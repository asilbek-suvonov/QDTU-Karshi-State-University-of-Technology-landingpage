// ==========================================
// Real API response shapelariga mos typelar
// ==========================================

// GET /user/dashboard
export interface UserDashboardData {
  countAllUsers: number;
  countMale: number;
  countFemale: number;
  countAcademic: number;
}

export interface UserDashboardResponse {
  success: boolean;
  message: string;
  data: UserDashboardData;
}

// GET /user/scientific — [{name, count}] array
export interface ScientificDTO {
  name: string;
  count: number;
}

export interface UserScientificResponse {
  success: boolean;
  message: string;
  data: ScientificDTO[];
}

// GET /user/age-dashboard — [{total, maleCount, femaleCount, ageGroup, percentage}]
export interface AgeGenderStatsItem {
  total: number;
  maleCount: number;
  femaleCount: number;
  ageGroup: string;
  percentage: number;
}

export interface UserAgeDashboardResponse {
  success: boolean;
  message: string;
  data: AgeGenderStatsItem[];
}

// GET /user/gender-dashboard — object (not array)
export interface GenderStatsData {
  total: number;
  maleCount: number;
  femaleCount: number;
  malePercentage: number;
  femalePercentage: number;
}

export interface UserGenderDashboardResponse {
  success: boolean;
  message: string;
  data: GenderStatsData;
}

// GET /user/statistics/{userId}
export interface UserStatisticsData {
  publicationCount: number;
  consultationCount: number;
  awardCount: number;
  researchCount: number;
  nazoratCount: number;
}

export interface UserStatisticsResponse {
  success: boolean;
  message: string;
  data: UserStatisticsData;
}

// GET /user/profile-completion/{userId}
export interface UserProfileCompletion {
  userId: number;
  completionPercentage: number;
}

export interface UserProfileCompletionResponse {
  success: boolean;
  message: string;
  data: UserProfileCompletion;
}

// ResUser shape (from /user/college, /user/department)
export interface ResUser {
  id: number;
  fullName: string;
  lavozim: string;
  
  email: string;
  age: number;
  gender: boolean;
  orcId: string | null;
  scopusId: string | null;
  scienceId: string | null;
  researcherId: string | null;
  profession: string | null;
  imgUrl: string | null;
  fileUrl: string | null;
  input: string | null;
  phoneNumber: string;
  departmentName: string;
}

export interface UserCollegeResponse {
  success: boolean;
  message: string;
  data: ResUser[];
}

export interface UserDepartmentResponse {
  success: boolean;
  message: string;
  data: ResUser[];
}

// Legacy alias — used in directory/staff pages
export type UserListItem = ResUser;

export interface UserListResponse {
  success: boolean;
  message: string;
  data: ResUser[];
}

// GET /user/scientific legacy alias
export interface UserScientificData {
  countProfessor: number;
  countDotsent: number;
  countPHD: number;
  countDSC: number;
  countNull: number;
}
