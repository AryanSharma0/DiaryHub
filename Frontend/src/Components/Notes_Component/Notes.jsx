// import React, { useContext } from "react";
import Tabs from "../Components/Tabs";
import { Outlet } from "react-router-dom";
function Notes() {
  // const context = useContext(noteContext);
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

      <div className="flex transition-all ease-in delay-700 relative min-w-[100vw] min-h-[100vh] overflow-hidden     shadow-xl   bg-slate-800/50 ">
        <section className="pt-20 relative  lg:px-20 xl:mx-[10vw] md:px-5 px-3 lg:mx-20 md:mx-2 text-white">
          <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
            <div className="text-white">
              <div className="float-right xm:hidden ssm:hidden ">
                {/* <DateSection time={time} /> */}
              </div>
              <div className="float-left  xm:hidden ">
                <Tabs active="Notes" />
              </div>
            </div>
          </div>
          <div>
            <p className=" sm:hidden text-2xl flex justify-center mt-[-2.5rem] mb-6">
              Your Notes
            </p>
            <hr className="sm:hidden mb-6" />
            <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
              <Outlet />
            </div>
          </div>
        </section>
        <div className=" fixed bottom-[-4rem] hover:translate-y-[-6rem] hover:scale-150 right-0 hover:translate-x-[-2rem] translate-x-14  transition  ease-in  ">
          <img
            src={require("../../assets/notes.png")}
            className="h-40  "
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Notes;
