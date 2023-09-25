import { createReducer } from "@reduxjs/toolkit";
import * as type from "./auth_const_action";
import { toast } from "react-toastify";
const initialState = {
  name: "",
  userName: "",
  authenticate: false,
  authToken: "",
  loading: false,
  usernameExist:false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder

    // Handle the logic for the LOGIN REQUEST
    .addCase(type.LOGIN_REQUESTED, (state, action) => {
      state.loading = true;
    })

    // Handle the logic for the LOGIN SUCCESS
    .addCase(type.LOGIN_SUCCESS, (state, action) => {
      state.authToken = action.payload;
      state.authenticate = true;
      state.loading = false;
      console.log(action.payload);

      // Save to local Storage
      // localStorage.setItem("token", action.payload);
    })

    // Handle the logic for the LOGIN FAILURE
    .addCase(type.LOGIN_FAILURE, (state, action) => {
      const error = action.payload;
      state.loading = false;
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })

    // Handle the logic for the REGISTER REQUEST
    .addCase(type.REGISTER_REQUEST, (state, action) => {
      state.loading = true;
    })

    // Handle the logic for the REGISTER SUCCESS
    .addCase(type.REGISTER_SUCCESS, (state, action) => {
      state.authToken = action.payload;
      state.authenticate = true;
      state.loading = false;
    })

    // Handle the logic for the REGISTER FAILURE
    .addCase(type.REGISTER_FAILURE, (state, action) => {
      const error = action.payload;
      state.loading = false;
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })

    .addCase(type.CHECK_USERNAME_REQUEST, (state, action) => {
      state.loading = true;
    })

    // Handle the logic for the REGISTER SUCCESS
    .addCase(type.CHECK_USERNAME_SUCCESS, (state, action) => {
      state.usernameExist = action.payload;
      state.loading = false;
    })

    // Handle the logic for the REGISTER FAILURE
    .addCase(type.CHECK_USERNAME_FAILURE, (state, action) => {
      const error = action.payload;
      state.loading = false;
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })

    // Handle the logic for the LOGOUT
    .addCase(type.LOGOUT_REQUEST, (state, action) => {
      state.authToken = "";
      state.authenticate = false;
      // localStorage.removeItem("token");
    });
    // .addCase(type.TOKENPRESENT, (state, action) => {
    //   state.authToken = localStorage.getItem("token");
    //   state.authenticate = true;
    // });
});
