import { ToastContainer } from "react-toastify";
import Loader from "./Components/Components/Loader";
import { useSelector } from "react-redux";
import Router from "./Components/Routers/Routers";

function App() {
  const { loading } = useSelector((state) => state.diaryReducer.pageState);
  const loginloading = useSelector((state) => state.authReducer.loading);
  const postloading = useSelector((state) => state.postReducer.loading);
  // const blogloading = useSelector((state) => state.blogReducer.loading);
  console.log(loading);
  return (
    <>
      <ToastContainer />
      {(loading || loginloading || postloading) && <Loader />}
      <Router />
    </>
  );
}

export default App;
