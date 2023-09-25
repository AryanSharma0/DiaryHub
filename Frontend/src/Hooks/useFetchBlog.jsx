import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../Redux/Blog/Post/post_action";

export const useFetchBlog = () => {
  const dispatch = useDispatch();
  // const blogData = useSelector((state) => state.postReducer.posts);
  const authToken = useSelector((state) => state.authReducer.authToken);

  useEffect(() => {
    const fetchData = () => {
      try {
        dispatch(fetchPost(authToken));
        console.log("fetch blog")
      } catch (error) {
        console.error("Error fetching blog data:", error);

      }
    };

    fetchData();
  }, [authToken]);

};
