export const GET_ENDPOINTS = {
  // files
  files: {
    // Rasmdagi birinchi bo'limda faqat POST ko'rindi, GET yo'q
  },

  // teacher-controller
  teacher: {
    getById: (userId: string | number) => `/teacher/${userId}`,
    search: '/teacher/search',
  },

  // tadqiqot-controller (research)
  research: {
    getById: (id: string | number) => `/research/${id}`,
    getAll: '/research',
    getByUser: (id: string | number) => `/research/byUserId/${id}`,
  },

  // nazorat-controller
  nazorat: {
    getById: (id: string | number) => `/nazorat/${id}`,
    getAll: '/nazorat',
    getByUser: (id: string | number) => `/nazorat/byUser/${id}`,
  },

  // lavozim-controller
  lavozim: {
    getAll: '/lavozim',
    getStats: '/lavozim/get-lavozim-statistika',
  },

  // ilmiy-daraja-controller
  ilmiyDaraja: {
    getAll: '/ilmiy-daraja',
    getStats: '/ilmiy-daraja/stats',
    getStatsAlt: '/ilmiy-daraja/get-ilmiy-daraja-statistika',
  },

  // department-controller
  department: {
    getStats: '/department/stats',
    getPage: '/department/page',
    getList: '/department/list',
    getOne: (departmentId: string | number) => `/department/getOne/${departmentId}`,
  },

  // college-controller
  college: {
    getById: (collegeId: string | number) => `/college/${collegeId}`,
    getAll: '/college',
    getPage: '/college/page',
    getDashboard: '/college/college-dashboard',
  },

  // award-controller
  award: {
    getById: (id: string | number) => `/award/${id}`,
    getAll: '/award',
    getByUser: (id: string | number) => `/award/byUserId/${id}`,
  },

  // auth-controller
  auth: {
    // Faqat PUT va POST mavjud
  },

  // publication-controller
  publication: {
    getById: (publicationId: string | number) => `/api/publication/${publicationId}`,
    getPage: '/api/publication/get-page',
    getByUser: (id: string | number) => `/api/publication/byUser/${id}`,
  },

  // consultation-controller
  consultation: {
    getById: (id: string | number) => `/api/consultation/${id}`,
    getPage: '/api/consultation/get-page',
    getByUser: (id: string | number) => `/api/consultation/byUser/${id}`,
  },

  // academic-qualification-controller
  academicQualification: {
    getById: (id: string | number) => `/academicQualification/${id}`,
    getAll: '/academicQualification',
  },

  // user-info-controller
  userInfo: {
    getById: (userInfoId: string | number) => `/user-info/${userInfoId}`,
  },

  // user-controller
  user: {
    getAll: '/user',
    getStatistics: (userId: string | number) => `/user/statistics/${userId}`,
    getScientific: '/user/scientific',
    getProfileCompletion: (userId: string | number) => `/user/profile-completion/${userId}`,
    getGenderDashboard: '/user/gender-dashboard',
    getDepartment: (departmentId: string | number) => `/user/department/${departmentId}`,
    getDashboard: '/user/dashboard',
    getCollege: (collegeId: string | number) => `/user/college/${collegeId}`,
    getAgeDashboard: '/user/age-dashboard',
  },

  // action-event-controller
  actionEvent: {
    getAll: '/action',
  }
};

export const POST_ENDPOINTS = {
  auth: {
    login: '/auth/login',
  },
  teacher: {
    create: '/teacher/saveUser',
  },
};

export const PUT_ENDPOINTS = {
  teacher: {
    update: '/teacher/update-profile',
  },
};

export const DELETE_ENDPOINTS = {
  teacher: {
    delete: (userId: string | number) => `/teacher/${userId}`,
  },
};
