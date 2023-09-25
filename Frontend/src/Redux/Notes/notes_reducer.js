import { createReducer } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as type from "./notes_const_action";
const initialState = {
  data: [
    // {
    //   __v: 0,
    //   user: "6488d93ffc4b822131b184bb",
    //   _id: "649c754553a8117f78f3ec53",
    //   date: "2023-06-28T18:00:37.508Z",
    //   title: "My Day",
    //   topic: "128512",
    //   subject: "Personal",
    //   description: "It was a great day alone. I worked today on nodeJS",
    // },
  ],
  pageState: {
    error: false,
    loading: false,
  },
};

export const noteReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(type.FETCH_NOTE_REQUEST, (state, action) => {
      state.pageState.loading = true;
    })
    .addCase(type.FETCH_NOTE_SUCCESS, (state, action) => {
      state.data = action.payload.reverse();
      state.pageState.loading = false;
    })
    // Add new note entry

    .addCase(type.FETCH_NOTE_FAILURE, (state, action) => {
      const error = action.payload;
      state.pageState.loading = false;

      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
    // Calling new note function

    .addCase(type.CREATE_NOTE_REQUEST, (state, action) => {
      state.pageState.loading = true;
    })

    // Add new note entry
    .addCase(type.CREATE_NOTE_SUCCESS, (state, action) => {
      const newData = action.payload;
      state.data.unshift(newData);
      state.pageState.loading = false;
    })
    // Update note entry
    .addCase(type.CREATE_NOTE_FAILURE, (state, action) => {
      const error = action.payload;
      state.pageState.loading = false;
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
    .addCase(type.DELETE_NOTE_REQUEST, (state, action) => {
      state.pageState.loading = true;
    })
    // Delete note entry
    .addCase(type.DELETE_NOTE_SUCCESS, (state, action) => {
      const notes = state.data;
      state.data = notes.filter((note) => note._id !== action.payload);
      state.pageState.loading = false;

      toast.success("note successfully deleted!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
    .addCase(type.DELETE_NOTE_FAILURE, (state, action) => {
      const error = action.payload;
      state.pageState.loading = false;

      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
    .addCase(type.UPDATE_NOTE_REQUEST, (state, action) => {
      state.pageState.loading = true;
    })
    .addCase(type.UPDATE_NOTE_SUCCESS, (state, action) => {
      const updatedData = action.payload;
      const index = state.data.findIndex(
        (note) => note._id === updatedData._id
      );
      if (index !== -1) {
        state.data[index] = updatedData;
      }
      state.pageState.loading = false;

      toast.success("Note is successfully updated!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
    .addCase(type.UPDATE_NOTE_FAILURE, (state, action) => {
      const error = action.payload;
      state.pageState.loading = false;
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        className: "absolute top-6 text-bold",
      });
    })
   
});
