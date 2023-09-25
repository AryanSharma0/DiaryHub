// import anime from "animejs/lib/anime.es.js";
import React from "react";
export const Background = () => {
  return (
    <div className=" h-screen w-screen fixed ">
      <img
        className="h-screen w-screen "
        src={require("../../assets/background1.jpg")}
        // src={require(props.image)}
        alt="Background"
      />
    </div>
  );
};
