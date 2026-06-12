export interface AcademicQualificationData {
  degreeLevel: string;
  specialization: string;
  description: string;
  startYear: number;
  endYear: number;
  institutionName: string;
  userId: number;
}

export interface AcademicQualificationResponse {
  success: boolean;
  message: string;
  data: AcademicQualificationData;
} 

export interface AcademicQualificationListData {
  degreeLevel: string;
  specialization: string;
  description: string;
  startYear: number;
  endYear: number;
  institutionName: string;
  userId: number;
}

export interface AcademicQualificationListResponse {
  success: boolean;
  message: string;
  data: AcademicQualificationListData[]; // Massiv ko'rinishida
}