import React, { useEffect } from "react";
import ShowDiary from "./showDiary";
import "../../Styles/Home.scss";
import DateSection from "../Components/DateSection";
import Tabs from "../Components/Tabs";
import { MdAssignmentAdd } from "react-icons/md";
import anime from "animejs/lib/anime.es.js";
import { useSelector } from "react-redux";
import useFetchDiary from "../../Hooks/useFetchDiary";
import { Outlet, useNavigate } from "react-router-dom";
function Home() {

  // animejs for animation
  useEffect(() => {
    anime({
      targets: "pop-up",
      translateX: [100, 0],
      duration: 1200,
      opacity: [0, 1],
      delay: (el, i) => {
        return 300 + 100 * i;
      },
    });
    anime({
      targets: ".pop-right",
      translateX: [100, 0],
      duration: 1200,
      opacity: [0, 1],
      delay: (el, i) => {
        return 300 + 100 * i;
      },
    });
    anime({
      targets: ".pop-left",
      translateX: [-100, 0],
      duration: 1200,
      opacity: [0.5, 1],
      delay: (el, i) => {
        return 100 * i;
      },
    });

    anime({
      targets: " .pop-up-note",
      translateY: [400, 0],
      easing: "easeOutExpo",
      opacity: [0, 1],
      delay: (el, i) => 1000 + 300 * i,
    });
  }, []);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return (
    <div>
      <div className=" bg-fixed fixed    ">
        <img
          src={require(`../../assets/background${getRandomInt(1, 15)}.jpg`)}
          className="h-screen w-screen flex"
          alt="BackgroundImage"
        />
      </div>

      <section className="pt-20 relative  h-screen shadow-2xl  bg-gray-900/50 overflow-scroll hide-scroll-bar lg:px-20 xl:mx-[10vw] md:px-5 px-3 lg:mx-20 md:mx-2">
        <div className="text-white">
          <div className="float-right xm:hidden ssm:hidden pop-right">
            <DateSection />
          </div>
          <div className="float-left xm:hidden">
            <Tabs active={"Dashboard"} />
          </div>
        </div>
        <div className="flex min-w-[60vw] py-1 justify-center text-white  ">
          <p
            className="italic text-[3rem] pop-left"
            style={{ fontFamily: "Qwigley" }}
          >
            "Keep your face to the sunshine and you cannot see a shadow."{" "}
          </p>
        </div>
        {/* {openWriter ? (
          <NewDiary type={"newDiary"} />
        ) : openReader ? (
          <ReadDiary />
        ) : (
          <OldDiary />
        )} */}
        <Outlet />
      </section>
    </div>
  );
}

export default Home;

export function OldDiary() {
  const navigate = useNavigate();
  const openWriter = () => {
    navigate("/diary/create");
  };

   useFetchDiary();
  const { data } = useSelector((state) => state.diaryReducer);

  return (
    <div>
      {" "}
      <div>
        <div className="  flex justify-between px-2  ">
          <div className="flex xm:w-[90vw] justify-between">
            <div className=" flex  max-w-md  dark:text-white text-gray-900 text-sm rounded-lg  w-full  p-1  hover:bg-[#3d46529a]  hover:text-white max-h-10   shadow-xl border-spacing-3  bg-slate-800/50 border-[#353535] hover:border-[#53535381]  hover:rounded-lg  drop-shadow-lg">
              <div className=" inset-y-0 left-0 flex items-center px-2 pr-4 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-7 h-7 text-white dark:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                // datepicker="true"
                // datepicker-orientation="bottom right"
                type="date"
                className="dark:placeholder-gray-900 text-white  w-full  dark:text-white text-lg hover:text-black  bg-transparent   "
                placeholder="Select date"
              />
            </div>
            <div className="w-44 h-30 ml-4 xm:ml-0 cursor-pointer  item-center justify-center align-middle justify-items-center justify-self-center  hover:transform  active:scale-95   hover:bg-[#3d46529a]  hover:text-white max-h-10   shadow-xl border-spacing-3  bg-slate-800/50 border-[#353535] hover:border-transparent  rounded-lg  drop-shadow-lg mb-4 flex-col   pb-10 ">
              <div
                className="flex justify-center items-center h-10 align-middle flex-row   item-center  "
                onClick={() => {}}
              >
                <h4 className="text-lg w-max text-center  font-bold">Search</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-h-[20rem] shadow-2xl border-spacing-2.5  rounded-lg  drop-shadow-3xl mb-4 flex-col  m-auto p-auto">
          <div className="flex justify-between">
            <h1
              style={{ fontFamily: "Dancing Script" }}
              className="flex py-2 pl-14 xm:pl-2 pt-4 font-bold text-4xl justify-items-center ssm:text-center text-slate-100 font-serif"
            >
              Dear Diary
            </h1>
            <div
              className="w-44 h-30 ml-4 xm:ml-0 cursor-pointer  item-center justify-center align-middle justify-items-center justify-self-center  hover:transform  active:scale-95   hover:bg-[#3d46529a]  hover:text-white max-h-10   shadow-xl border-spacing-3  bg-slate-800/50 border-[#353535] hover:border-transparent  rounded-lg  drop-shadow-lg mb-4 flex-col   pb-10 "
              onClick={openWriter}
            >
              <div
                className="flex justify-evenly items-center h-10 align-middle flex-row   item-center  "
                onClick={() => {}}
              >
                <MdAssignmentAdd
                  size={26}
                  className=" text-white "
                  color="white"
                />
                <h4
                  className="text-lg w-max text-center  font-bold"
                  htmlFor="my_modal_7"
                >
                  Add Today's
                </h4>
              </div>
            </div>
          </div>
          <div className="flex overflow-x-scroll justify-center pb-10 hide-scroll-bar">
            <div className="flex flex-wrap justify-evenly ">
              {data.length !== 0 ? (
                data.map((ele, index) => {
                  return (
                    <div key={index} className="inline-block pop-up-note px-3">
                      <ShowDiary element={ele} index={index} />
                    </div>
                  );
                })
              ) : (
                <div className="h-[50vh] sm:w-[70vw] xm:w-[90vw] justify-center items-center flex">
                  <div className="flex px-3 flex-col mt-6 justify-center rounded-lg items-center bg-slate-300/30 py-10">
                    <div className="">
                      <img
                        src={require("../../assets/NoDataFound.png")}
                        alt=""
                      />
                    </div>
                    <div className="font-bold  text-[#1b2335] font-mono text-xl">
                      Sorry, No records has been added yet.
                    </div>
                    <div className="font-mono text-md text-[#ffffff] font-semibold">
                      Add a new record by simpley clicking the button on top
                      right side.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
