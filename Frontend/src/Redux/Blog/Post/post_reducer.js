import { createReducer } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as type from "./post_const_action";
const initialState = {
  data: [],
  pageState: {
    error: false,
    loading: false,
  },
};

export const postReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(type.FETCH_POST_REQUEST, (state, action) => {
      state.pageState.loading = true;
    })
    .addCase(type.FETCH_POST_SUCCESS, (state, action) => {
      state.data = action.payload;
      console.log(action.payload);
      state.pageState.loading = false;
    })
    // Add new post entry

    .addCase(type.FETCH_POST_FAILURE, (state, action) => {
      const error = action.payload;
      state.pageState.loading = false;

      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
    // Calling new post function

    .addCase(type.CREATE_POST_REQUEST, (state, action) => {
      state.pageState.loading = true;
    })

    // Add new post entry
    .addCase(type.CREATE_POST_SUCCESS, (state, action) => {
      const newData = action.payload;
      state.data.unshift(newData);
      state.pageState.loading = false;
    })
    // Update post entry
    .addCase(type.CREATE_POST_FAILURE, (state, action) => {
      const error = action.payload;
      state.pageState.loading = false;
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
    .addCase(type.DELETE_POST_REQUEST, (state, action) => {
      state.pageState.loading = true;
    })
    // Delete post entry     
    .addCase(type.DELETE_POST_SUCCESS, (state, action) => {
      const diaries = state.data;
      state.data = diaries.filter((post) => post._id !== action.payload);
      state.pageState.loading = false;

      toast.success("Diary successfully deleted!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
    .addCase(type.DELETE_POST_FAILURE, (state, action) => {
      const error = action.payload;
      state.pageState.loading = false;

      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
    .addCase(type.UPDATE_POST_REQUEST, (state, action) => {
      state.pageState.loading = true;
    })
    .addCase(type.UPDATE_POST_SUCCESS, (state, action) => {
      const updatedData = action.payload;
      const index = state.data.findIndex(
        (post) => post._id === updatedData._id
      );
      if (index !== -1) {
        state.data[index] = updatedData;
      }
      state.pageState.loading = false;

      toast.success("Diary successfully Updated!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
    .addCase(type.UPDATE_POST_FAILURE, (state, action) => {
      const error = action.payload;
      state.pageState.loading = false;
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    });
});
