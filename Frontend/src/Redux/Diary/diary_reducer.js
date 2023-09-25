import { createReducer } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as type from "./diary_const_action";
const initialState = {
  data: [],
  pageState: {
    error: false,
    loading: false,
  },
};

export const diaryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(type.FETCH_DIARY_REQUEST, (state, action) => {
      state.pageState.loading = true;
    })
    .addCase(type.FETCH_DIARY_SUCCESS, (state, action) => {
      state.data = action.payload.reverse();
      state.pageState.loading = false;
    })
    // Add new diary entry

    .addCase(type.FETCH_DIARY_FAILURE, (state, action) => {
      const error = action.payload;
      state.pageState.loading = false;

      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
    // Calling new diary function

    .addCase(type.CREATE_DIARY_REQUEST, (state, action) => {
      state.pageState.loading = true;
    })

    // Add new diary entry
    .addCase(type.CREATE_DIARY_SUCCESS, (state, action) => {
      const newData = action.payload;
      state.data.unshift(newData);
      state.pageState.loading = false;
    })
    // Update diary entry
    .addCase(type.CREATE_DIARY_FAILURE, (state, action) => {
      const error = action.payload;
      state.pageState.loading = false;
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
    .addCase(type.DELETE_DIARY_REQUEST, (state, action) => {
      state.pageState.loading = true;
    })
    // Delete diary entry
    .addCase(type.DELETE_DIARY_SUCCESS, (state, action) => {
      const diaries = state.data;
      state.data = diaries.filter((diary) => diary._id !== action.payload);
      state.pageState.loading = false;

      toast.success("Diary successfully deleted!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
    .addCase(type.DELETE_DIARY_FAILURE, (state, action) => {
      const error = action.payload;
      state.pageState.loading = false;

      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
    .addCase(type.UPDATE_DIARY_REQUEST, (state, action) => {
      state.pageState.loading = true;
    })
    .addCase(type.UPDATE_DIARY_SUCCESS, (state, action) => {
      const updatedData = action.payload;
      const index = state.data.findIndex(
        (diary) => diary._id === updatedData._id
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
    .addCase(type.UPDATE_DIARY_FAILURE, (state, action) => {
      const error = action.payload;
      state.pageState.loading = false;
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    });
});
