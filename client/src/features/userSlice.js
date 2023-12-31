import { createSlice } from "@reduxjs/toolkit";
import {
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_RESET,
  DELETE_USER_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REMOVE_USER_DETAILS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_RESET,
  UPDATE_USER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from "@/constants/userConstants";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    [CLEAR_ERRORS]: (state) => {
      state.error = null;
    },
    [LOAD_USER_FAIL]: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    [LOAD_USER_REQUEST]: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [LOAD_USER_SUCCESS]: (state, action) => {
      state.user = action.payload;
    },
    [LOAD_USER_SUCCESS]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [LOGIN_USER_FAIL]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    [LOGIN_USER_REQUEST]: (state) => {
      state.loading = true;
    },
    [LOGIN_USER_SUCCESS]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    [LOGOUT_USER_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [LOGOUT_USER_SUCCESS]: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    [REGISTER_USER_FAIL]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    [REGISTER_USER_REQUEST]: (state) => {
      state.loading = true;
    },
    [REGISTER_USER_SUCCESS]: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
  },
});

export const profileSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {
    [CLEAR_ERRORS]: (state) => {
      state.error = null;
    },
    [DELETE_USER_FAIL]: (state, action) => {
      (state.loading = false), (state.isDeleted = action.payload);
    },
    [DELETE_USER_REQUEST]: (state) => {
      state.loading = true;
    },
    [DELETE_USER_SUCCESS]: (state, action) => {
      state.loaindg = false;
      state.isDeleted = action.payload;
    },
    [DELETE_USER_RESET]: (state) => {
      state.isDeleted = false;
    },
    [UPDATE_PASSWORD_FAIL]: () => {},
    [UPDATE_PASSWORD_REQUEST]: () => {},
    [UPDATE_PASSWORD_RESET]: () => {},
    [UPDATE_PASSWORD_SUCCESS]: () => {},
    [UPDATE_PROFILE_FAIL]: () => {},
    [UPDATE_PROFILE_REQUEST]: () => {},
    [UPDATE_PROFILE_RESET]: () => {},
    [UPDATE_PROFILE_SUCCESS]: () => {},
    [UPDATE_USER_FAIL]: () => {},
    [UPDATE_USER_REQUEST]: () => {},
    [UPDATE_USER_RESET]: (state) => {
      state.isUpdated = false;
    },
    [UPDATE_USER_SUCCESS]: (state, action) => {
      (state.loading = false), (state.isUpdated = action.payload);
    },
  },
});

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {},
  reducers: {
    [CLEAR_ERRORS]: (state) => {
      state.error = null;
    },
    [FORGOT_PASSWORD_FAIL]: () => {},
    [FORGOT_PASSWORD_REQUEST]: () => {},
    [FORGOT_PASSWORD_SUCCESS]: (state, action) => {
      (state.loading = false), (state.message = action.payload);
    },
    [RESET_PASSWORD_SUCCESS]: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    [RESET_PASSWORD_FAIL]: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    [RESET_PASSWORD_REQUEST]: (state) => {
      state.loading = true;
    },
  },
});

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: { users: [] },
  reducers: {
    [ALL_USERS_FAIL]: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    [ALL_USERS_REQUEST]: (state) => {
      state.loading = true;
    },
    [ALL_USERS_SUCCESS]: (state, action) => {
      (state.loading = false), (state.users = action.payload);
    },
    [CLEAR_ERRORS]: (state) => {
      state.error = null;
    },
  },
});

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: { user: {} },
  reducers: {
    [CLEAR_ERRORS]: (state) => {
      state.error = null;
    },
    [REMOVE_USER_DETAILS]: (state) => {
      state.user = {};
    },
    [USER_DETAILS_FAIL]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [USER_DETAILS_REQUEST]: (state) => {
      state.loading = true;
    },
    [USER_DETAILS_SUCCESS]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
  },
});
