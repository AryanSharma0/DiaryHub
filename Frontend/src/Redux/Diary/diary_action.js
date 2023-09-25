import baseApi from "../../apis/baseApi";
import * as type from "./diary_const_action"
import { header } from "../header";

// // Create diary entry

// 1st approach
// export const addDiary = createAsyncThunk(
//   "diary/addDiary",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await baseApi.post("/api/diary/addDiary", data,config);
//       return response.data.reverse();
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// 2nd approach
export const addDiary = (diaryData, authToken) => async (dispatch) => {
 const config= header(authToken);

  dispatch({ type: type.CREATE_DIARY_REQUEST });

  try {
    const response = await baseApi.post(
      "/api/diary/addDiary",
      diaryData,
      config
    );
    const data = response.data;
    dispatch({ type: type.CREATE_DIARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: type.CREATE_DIARY_FAILURE, payload: error.message });
  }
};


// Read diary entries
export const fetchDiary = (authToken) => async (dispatch) => {
 const config= header(authToken);

  dispatch({ type: type.FETCH_DIARY_REQUEST });

  try {
    const response = await baseApi.get("/api/diary/fetchdiary", config);
    const data = response.data;
    dispatch({ type: type.FETCH_DIARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: type.FETCH_DIARY_FAILURE, payload: error.message });
  }
};


// Update diary entry
export const updateDiary = (updatedData, authToken) => async (dispatch) => {
 const config= header(authToken);

  dispatch({ type: type.UPDATE_DIARY_REQUEST });

  try {
    const diaryId = updatedData._id;
    const response = await baseApi.put(
      `/api/diary/updatediary/${diaryId}`,
      updatedData,
      config
    );
    const updatedDiary = response.data;
    dispatch({ type: type.UPDATE_DIARY_SUCCESS, payload: updatedDiary });
  } catch (error) {
    dispatch({ type: type.UPDATE_DIARY_FAILURE, payload: error.message });
  }
};

// Delete diary entry
export const deleteDiary = (diaryId, authToken) => async (dispatch) => {
 const config= header(authToken);

  dispatch({ type: type.DELETE_DIARY_REQUEST });

  try {
    await baseApi.delete(`/api/diary/deletediary/${diaryId}`, config);
    dispatch({ type: type.DELETE_DIARY_SUCCESS, payload: diaryId });
  } catch (error) {
    dispatch({ type: type.DELETE_DIARY_FAILURE, payload: error.message });
  }
};
