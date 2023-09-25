import React, { Suspense, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Auth from "../Auth_Components/Auth";
import SignUp from "../Auth_Components/SignUp";
import Home, { OldDiary } from "../Diary_Components/Home";
import PersonalBlog from "../PersonalBlog_Components/PersonalBlog";
import Notes from "../Notes_Component/Notes";
import Calender from "../Calender_Component/Calender";
import Profile from "../Profile_Component/Profile";
import NoDataFound from "../Components/NoDataFound";
import Loader from "../Components/Loader";
import RequiredAuth from "../Auth_Components/RequiredAuth";
import Login from "../Auth_Components/Login";
import { useSelector } from "react-redux";
import NewDiary from "../Diary_Components/NewDiary";
import ReadDiary from "../Diary_Components/ReadDiary";
import NewNotes from "../Notes_Component/NewNotes";
import ReadNote from "../Notes_Component/ReadNote";
import NotesList from "../Notes_Component/NotesList";
import NewPost from "../PersonalBlog_Components/NewPost";
import Highlight from "../PersonalBlog_Components/Highlight";
function Router() {
  const color = "#ff4e4e";
  const authenticate = useSelector((state) => state.authReducer.authenticate);
  console.log(authenticate);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      (location.pathname === "/auth/login" ||
        location.pathname === "/auth/signup" ||
        location.pathname === "/") &&
      authenticate
    ) {
      navigate("/diary");
    }
    console.log("authenticate");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticate]);
  let route;
  if (!authenticate) {
    route = (
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route index path="login" element={<Login />}></Route>
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route
          path="*"
          element={
            <RequiredAuth>
              <NoDataFound />
            </RequiredAuth>
          }
        ></Route>{" "}
      </Routes>
    );
  }
  if (authenticate) {
    route = (
      <Routes>
        <Route
          path="/diary"
          element={
            <>
              <Home color={color} />
            </>
          }
        >
          <Route index element={<OldDiary />}></Route>
          <Route path="create" element={<NewDiary />}></Route>
          <Route path="read/:id" element={<ReadDiary />}></Route>
          <Route path="update/:id" element={<NewDiary />}></Route>
        </Route>
        <Route
          path="/blogs"
          element={
            <>
              <PersonalBlog />
            </>
          }
        ></Route>
        <Route path="/blogs/update/:id" element={<NewPost />}></Route>
        <Route path="/blogs/add" element={<NewPost />}></Route>
        <Route path="/blogs/highlight/add/:id" element={<Highlight />}></Route>
        <Route
          path="/blogs/highlight/update/:id"
          element={<Highlight />}
        ></Route>
        <Route path="/blogs/highlight" element={<Highlight />}></Route>
        <Route
          path="/notes"
          element={
            <>
              <Notes />
            </>
          }
        >
          <Route index element={<NotesList />}></Route>
          <Route path="create" element={<NewNotes />}></Route>
          <Route path="read/:id" element={<ReadNote />}></Route>
          <Route path="update/:id" element={<NewNotes />}></Route>
        </Route>
        <Route
          path="/calender"
          element={
            <>
              <Calender />
            </>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <>
              <Profile />
            </>
          }
        ></Route>
        <Route path="/*" element={<NoDataFound />}></Route>
      </Routes>
    );
  }

  return (
    <Suspense fallback={Loader}>
      {authenticate && <Navbar />}
      {route}
    </Suspense>
  );
}

export default Router;
