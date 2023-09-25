import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../Redux/Notes/notes_action";

function useFetchNotes() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.authReducer.authToken);

  const fetchNotesCallback = useCallback(() => {
    dispatch(fetchNotes(authToken));
    console.log("New data fetched");
  }, [authToken,dispatch]);

  useEffect(() => {
    fetchNotesCallback();
  }, [fetchNotesCallback]);

  const { data } = useSelector((state) => state.noteReducer);
  return data;
}

export default useFetchNotes;
