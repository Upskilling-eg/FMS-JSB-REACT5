export const baseURL = "https://upskilling-egypt.com:3006/api/v1";
export const imgBaseURL = "https://upskilling-egypt.com:3006";

// USERS URLs
export const USERS_URLS = {
  LOGIN: `/Users/Login`,
  REGISTER: `/Users/Register`,
  RESET_REQUEST: `/Users/Reset/Request`,
  RESET: `/Users/Reset`,
  CHANGE_PASSWORD: "/Users/ChangePassword",
  GET_CURRENT_USER: "/Users/currentUser",
};

// CATEGORY
export const CATEGORY_URLS = {
  GET_CATEGORIES: `/Category/`,
  DELETE_CATEGORY: (id) => `/Category/${id}`,
  UPDATE_CATEGORY: (id) => `/Category/${id}`,

  POST_CATEGORY: `/Category/`,
};
// TAGS
export const TAGS_URLS = {
  GET_TAGS: `/tag/`,
};
// RECIPES
export const RECIPE_URLS = {
  GET_RECIPES: `/Recipe/`,
  GET_RECIPE: (recipeId) => `/Recipe/${recipeId}`,
  CREATE_RECIPE: `/Recipe/`,
  UPDATE_RECIPE: (recipeId) => `/Recipe/${recipeId}`,
  DELETE_RECIPE: (id) => `/Recipe/${id}`,
};
//
