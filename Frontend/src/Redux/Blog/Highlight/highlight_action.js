import baseApi from "../../../apis/baseApi";
import * as type from "./highlight_const_action";
import { header } from "../../header";

// // Create highlight entry

// 1st approach
// export const addDiary = createAsyncThunk(
//   "highlight/addDiary",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await baseApi.highlight("/api/highlight/addDiary", data,config);
//       return response.data.reverse();
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
const highlightHighlight = (authToken) => {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      "auth-token": authToken,
    },
  };
};

// 2nd approach
export const addHighlight = (highlightData, authToken) => async (dispatch) => {
  //  const config= header(authToken);

  dispatch({ type: type.CREATE_HIGHLIGHT_REQUEST });

  try {
    console.log(authToken);

    const response = await baseApi.highlight(
      "/api/highlight/add",
      highlightData,
      highlightHighlight(authToken)
    );
    const data = response.data;
    dispatch({ type: type.CREATE_HIGHLIGHT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: type.CREATE_HIGHLIGHT_FAILURE, payload: error.message });
  }
};

// Read highlight entries
export const fetchHighlight = (authToken) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
      "Accept": "application/json",
    },
  };
  
  dispatch({ type: type.FETCH_HIGHLIGHT_REQUEST });

  try {
    const response = await baseApi.get("/api/highlight/", config);
    const data = response.data;
    console.log(data);
    dispatch({ type: type.FETCH_HIGHLIGHT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: type.FETCH_HIGHLIGHT_FAILURE, payload: error.message });
  }
};

// Update highlight entry
export const updateHighlight = (updatedData, authToken) => async (dispatch) => {
  // const config = header(authToken);

  dispatch({ type: type.UPDATE_HIGHLIGHT_REQUEST });

  try {
    const highlightId = updatedData.get('_id');
   
    const response = await baseApi.put(
      `/api/highlight/update/${highlightId}`,
      updatedData,
      highlightHighlight(authToken)
    );
    const updatedDiary = response.data;
    dispatch({ type: type.UPDATE_HIGHLIGHT_SUCCESS, payload: updatedDiary });
  } catch (error) {
    dispatch({ type: type.UPDATE_HIGHLIGHT_FAILURE, payload: error.message });
  }
};

// Delete highlight entry
export const deleteHighlight = (highlightId, authToken) => async (dispatch) => {
  const config = header(authToken);

  dispatch({ type: type.DELETE_HIGHLIGHT_REQUEST });

  try {
    await baseApi.delete(`/api/highlight/remove/${highlightId}`, config);
    dispatch({ type: type.DELETE_HIGHLIGHT_SUCCESS, payload: highlightId });
  } catch (error) {
    dispatch({ type: type.DELETE_HIGHLIGHT_FAILURE, payload: error.message });
  }
};
 