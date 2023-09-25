import baseApi from "../../../apis/baseApi";
import * as type from "./post_const_action";
import { header } from "../../header";

// // Create post entry

// 1st approach
// export const addDiary = createAsyncThunk(
//   "post/addDiary",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await baseApi.post("/api/post/addDiary", data,config);
//       return response.data.reverse();
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
const configpost = (authToken) => {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      "auth-token": authToken,
    },
  };
};

// 2nd approach
export const addPost = (postData, authToken) => async (dispatch) => {
  //  const config= header(authToken);

  dispatch({ type: type.CREATE_POST_REQUEST });

  try {
    console.log(authToken);

    const response = await baseApi.post(
      "/api/post/add",
      postData,
      configpost(authToken)
    );
    const data = response.data;
    dispatch({ type: type.CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: type.CREATE_POST_FAILURE, payload: error.message });
  }
};

// Read post entries
export const fetchPost = (authToken) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
      "Accept": "application/json",
    },
  };
  
  dispatch({ type: type.FETCH_POST_REQUEST });

  try {
    const response = await baseApi.get("/api/post/", config);
    const data = response.data;
    console.log(data);
    dispatch({ type: type.FETCH_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: type.FETCH_POST_FAILURE, payload: error.message });
  }
};

// Update post entry
export const updatePost = (updatedData, authToken) => async (dispatch) => {
  // const config = header(authToken);

  dispatch({ type: type.UPDATE_POST_REQUEST });

  try {
    const postId = updatedData.get('_id');
   
    const response = await baseApi.put(
      `/api/post/update/${postId}`,
      updatedData,
      configpost(authToken)
    );
    const updatedDiary = response.data;
    dispatch({ type: type.UPDATE_POST_SUCCESS, payload: updatedDiary });
  } catch (error) {
    dispatch({ type: type.UPDATE_POST_FAILURE, payload: error.message });
  }
};

// Delete post entry
export const deletePost = (postId, authToken) => async (dispatch) => {
  const config = header(authToken);

  dispatch({ type: type.DELETE_POST_REQUEST });

  try {
    await baseApi.delete(`/api/post/remove/${postId}`, config);
    dispatch({ type: type.DELETE_POST_SUCCESS, payload: postId });
  } catch (error) {
    dispatch({ type: type.DELETE_POST_FAILURE, payload: error.message });
  }
};
 