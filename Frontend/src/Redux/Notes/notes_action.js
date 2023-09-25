import baseApi from "../../apis/baseApi";
import * as type from "./notes_const_action";
import { header } from "../header";

// // Create diary entry

// 1st approach
// export const addDiary = createAsyncThunk(
//   "notes/addDiary",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await baseApi.post("/api/notes/addDiary", data,config);
//       return response.data.reverse();
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// 2nd approach
export const addNote = (noteData, authToken) => async (dispatch) => {
  const config = header(authToken);

  dispatch({ type: type.CREATE_NOTE_REQUEST });

  try {
    const response = await baseApi.post("/api/notes/addnote", noteData, config);
    const data = response.data;
    dispatch({ type: type.CREATE_NOTE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: type.CREATE_NOTE_FAILURE, payload: error.message });
  }
};

// Read diary entries
export const fetchNotes = (authToken) => async (dispatch) => {
 const config = header(authToken);

  dispatch({ type: type.FETCH_NOTE_REQUEST });

  try {
    const response = await baseApi.get("/api/notes/fetchnotes", config);
    const data = response.data;
    dispatch({ type: type.FETCH_NOTE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: type.FETCH_NOTE_FAILURE, payload: error.message });
  }
};

// Update diary entry
export const updateNote = (updatedData, authToken) => async (dispatch) => {
  const config = header(authToken);

  dispatch({ type: type.UPDATE_NOTE_REQUEST });
  try {
    const diaryId = updatedData._id;
    const response = await baseApi.put(
      `/api/notes/updatenote/${diaryId}`,
      updatedData,
      config
    );
    const updatedNote = response.data;
    dispatch({ type: type.UPDATE_NOTE_SUCCESS, payload: updatedNote });
  } catch (error) {
    dispatch({ type: type.UPDATE_NOTE_FAILURE, payload: error.message });
  }
};

// Delete diary entry
export const deleteNote = (diaryId, authToken) => async (dispatch) => {
  const config = header(authToken);

  dispatch({ type: type.DELETE_NOTE_REQUEST });

  try {
    await baseApi.delete(`/api/notes/deletenote/${diaryId}`, config);
    dispatch({ type: type.DELETE_NOTE_SUCCESS, payload: diaryId });
  } catch (error) {
    dispatch({ type: type.DELETE_NOTE_FAILURE, payload: error.message });
  }
};
