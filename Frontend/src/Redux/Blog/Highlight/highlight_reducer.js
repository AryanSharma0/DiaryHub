import { createReducer } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as type from "./highlight_const_action";
const initialState = {
  data: [3],
  pageState: {
    error: false,
    loading: false,
  },
};

export const highlightReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(type.FETCH_HIGHLIGHT_REQUEST, (state, action) => {
      state.pageState.loading = true;
    })
    .addCase(type.FETCH_HIGHLIGHT_SUCCESS, (state, action) => {
      state.data = action.payload;
      console.log(action.payload);
      state.pageState.loading = false;
    })
    // Add new highlight entry

    .addCase(type.FETCH_HIGHLIGHT_FAILURE, (state, action) => {
      const error = action.payload;
      state.pageState.loading = false;

      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
    // Calling new highlight function

    .addCase(type.CREATE_HIGHLIGHT_REQUEST, (state, action) => {
      state.pageState.loading = true;
    })

    // Add new highlight entry
    .addCase(type.CREATE_HIGHLIGHT_SUCCESS, (state, action) => {
      const newData = action.payload;
      state.data.unshift(newData);
      state.pageState.loading = false;
    })
    // Update highlight entry
    .addCase(type.CREATE_HIGHLIGHT_FAILURE, (state, action) => {
      const error = action.payload;
      state.pageState.loading = false;
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
    .addCase(type.DELETE_HIGHLIGHT_REQUEST, (state, action) => {
      state.pageState.loading = true;
    })
    // Delete highlight entry     
    .addCase(type.DELETE_HIGHLIGHT_SUCCESS, (state, action) => {
      const diaries = state.data;
      state.data = diaries.filter((highlight) => highlight._id !== action.payload);
      state.pageState.loading = false;

      toast.success("Diary successfully deleted!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
    .addCase(type.DELETE_HIGHLIGHT_FAILURE, (state, action) => {
      const error = action.payload;
      state.pageState.loading = false;

      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
    .addCase(type.UPDATE_HIGHLIGHT_REQUEST, (state, action) => {
      state.pageState.loading = true;
    })
    .addCase(type.UPDATE_HIGHLIGHT_SUCCESS, (state, action) => {
      const updatedData = action.payload;
      const index = state.data.findIndex(
        (highlight) => highlight._id === updatedData._id
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
    .addCase(type.UPDATE_HIGHLIGHT_FAILURE, (state, action) => {
      const error = action.payload;
      state.pageState.loading = false;
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    });
});
