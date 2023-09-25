import { useCallback, useEffect } from "react";
import { fetchDiary } from "../Redux/Diary/diary_action";
import { useDispatch, useSelector } from "react-redux";

function useFetchDiary() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.authReducer.authToken);
  const fetchDiaryCallback = useCallback(() => {
    dispatch(fetchDiary(authToken));
  }, [authToken]);
  useEffect(() => {
    fetchDiaryCallback();
  }, []);
}

export default useFetchDiary;
