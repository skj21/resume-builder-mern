export const BASE_URL = import.meta.env.VITE_API_URL;

//ROUTES USED FOR FRONTEND

export const API_PATHS = {

  AUTH: {
    REGISTER : '/api/auth/register',
    LOGIN : '/api/auth/login',
    GET_PROFILE: '/api/auth/profile',
  },

  RESUME: {
    CREATE:'/api/resume',
    GET_ALL: '/api/resume',
    GET_BY_ID: (id) => `/api/resume/${id}`,
    UPDATE: (id) => `/api/resume/${id}`,
    DELETE: (id) =>`/api/resume/${id}`,
    UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-image`,
  },

  image: {
    UPLOAD_IMAGES :'api/auth/upload-image'
  }
}