import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../Redux/Auth/auth_action";
import { toast } from "react-toastify";

function SignUp() {
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const [reEnterPass, setreEnterPass] = useState("");
  const dispatch = useDispatch();
  const onChange = (e) => {
    setFormdata((prevNote) => ({
      ...prevNote,
      [e.target.name]: e.target.value,
    }));
  };
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const validatePassWord = () => {
    if (reEnterPass === formdata.password && reEnterPass.length > 7) {
      return true;
    }
    return false;
  };
  const handleSignUp = async () => {
    validateEmail(formdata.email)
      ? validatePassWord()
        ? dispatch(register(formdata))
        : toast.error("Password should be same", {
            position: toast.POSITION.TOP_RIGHT,
            className: "absolute top-6 text-bold",
          })
      : toast.error("Invalid Email", {
          position: toast.POSITION.TOP_RIGHT,
          className: "absolute top-6 text-bold",
        });
  };

  return (
    <div className="md:flex md:items-center  md:justify-center w-full sm:w-auto md:h-full  xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcom Back!
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Please sign up your new account
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <span className="h-px w-16 bg-gray-300"></span>
          <span className="text-gray-400 font-normal">or continue with</span>
          <span className="h-px w-16 bg-gray-300"></span>
        </div>
        <div className="mt-8 space-y-6">
          <div className="relative">
            {validateEmail(formdata.email) && (
              <div className="absolute right-3 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            )}
            <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
              Email
            </label>
            <input
              className="w-full text-gray-900 text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
              type="email"
              placeholder="mail@gmail.com"
              name="email"
              value={formdata.email}
              onChange={onChange}
            />
          </div>
          <div className="mt-8 content-center">
            <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
              Password
            </label>
            <input
              className="w-full  text-gray-600 content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formdata.password}
              onChange={onChange}
            />
          </div>
          <div className="mt-8 relative content-center">
            {validatePassWord(formdata.email) && (
              <div className="absolute right-3 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            )}
            <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
              Verify Password
            </label>
            <input
              className="w-full  text-gray-600 content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              placeholder="Re-enter your password"
              name="password"
              value={reEnterPass}
              onChange={(e) => setreEnterPass(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="#" className="text-indigo-400 hover:text-blue-500">
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center bg-gradient-to-r from-[#54ddab] to-purple-400  hover:bg-gradient-to-l hover:from-[#54ddab] hover:to-purple-500 active:scale-95 font-bold text-xl text-slate-800 shadow-xl p-4  rounded-full tracking-wide    cursor-pointer transition ease-in duration-500"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
            <span>Already have an account?</span>
            <Link
              to="/auth/login"
              className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
