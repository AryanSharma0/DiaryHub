// import { url } from "inspector";
import React from "react";
import "../../Styles/Login.scss";

import { Outlet, useLocation } from "react-router-dom";
function Login() {
  const { pathname } = useLocation();
  return (
    <div>
      <div className="relative min-h-screen flex ">
        <div className="flex duration-1000 transition-all   ease-in  flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
          {pathname === "/auth/signup" && <Outlet />}
          <div className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-[#373b44] text-white bg-no-repeat bg-cover relative">
            <div className="absolute bg-gradient-to-b from-[#73c8a9] to-[#373b44] opacity-75 inset-0 z-0"></div>
            <div className="w-full  max-w-md z-10">
              <div className=" text-[45px] font-semibold text-[#fffefa]  font-Qwigley  ">
                <p>
                  "Welcome to your personal sanctuary, a digital haven for your
                  thoughts and reflections. This is your private space to record
                  your journey, express yourself, and share with intention.
                  Start writing, exploring, and creating your own unique
                  narrative. Your story begins here."
                </p>
              </div>
            </div>
            <ul className="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          {pathname === "/auth/login" && <Outlet />}
        </div>
      </div>
    </div>
  );
}

export default Login;
