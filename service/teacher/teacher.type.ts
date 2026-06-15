// GET /teacher/search — sahifalangan natija
export interface TeacherSearchItem {
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

export interface TeacherPageData {
  page: number;
  size: number;
  totalPage: number;
  totalElements: number;
  body: TeacherSearchItem[];
}

export interface TeacherSearchResponse {
  success: boolean;
  message: string;
  data: TeacherPageData;
}

// GET /teacher/{userId}
export interface TeacherDetailData {
  id: number;
  fullName: string;
  collegeName: string;
  departmentName: string;
  gender: boolean;
  birthDate: string;
  phone: string;
  scientificDegree: string | null;
  academicTitle: string | null;
  position: string | null;
  imgUrl: string | null;
}

export interface TeacherDetailResponse {
  success: boolean;
  message: string;
  data: TeacherDetailData;
}

// POST /teacher/saveUser & PUT /teacher/update-profile body
export interface ReqTeacher {
  id?: number;
  fullName: string;
  phoneNumber: string;
  imgUrl?: string;
  fileUrl?: string;
  lavozmId?: number;
  gender: boolean;
  password?: string;
  departmentId: number;
}

export interface TeacherMutationResponse {
  success: boolean;
  message: string;
  data: string;
}

// Search params
export interface TeacherSearchParams {
  name?: string;
  college?: string;
  lavozim?: string;
  page?: number;
  size?: number;
}
