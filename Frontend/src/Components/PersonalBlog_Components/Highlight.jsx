import "../../Styles/Blog.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoIosArrowRoundBack,
  IoIosMore,
} from "react-icons/io";
function Highlight() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
      {/* <div className="fixed "> */}
      <div className=" bg-zinc-950 absolute w-screen h-screen flex justify-center item-center "></div>
      {/* </div> */}
      <button
        onClick={goBack}
        className="z-10 cursor-pointer smd:hidden ml-4 slg:hidden ssm:hidden xm:hidden absolute drop-shadow-2xl top-20 flex items-center"
      >
        <IoIosArrowRoundBack size={40} />
        <span className="text-48">Go Back</span>
      </button>
      <section className=" absolute overflow-hidden ">
        <div className=" fixed">
          <div className="  relative h-screen w-screen lg:w-[80vw] lg:mx-[10vw]   bg-neutral-800/50 mx-2  backdrop-blur-sm ">
            <div className="flex justify-between h-16 bg-zinc-950/60 w-full cursor-pointer xl:hidden pl-4 absolute drop-shadow-2xl top-16 ">
              <button onClick={goBack} className=" flex items-center">
                <IoIosArrowRoundBack size={40} />
                <span className="text-[20px]">Go Back</span>
              </button>
              <button className="mr-10">
                <IoIosMore size={40} />
              </button>
            </div>
            <CarouselViewer />
          </div>
        </div>
      </section>
      <div className="flex relative h-full  drop-shadow-xl   overflow-hidden     shadow-xl    "></div>
    </div>
  );
}
export default Highlight;

export function CarouselViewer() {
  const image = [
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
  ];
  const [activeIndex, setactiveIndex] = useState(0);
  const onprev = () => {
    if (activeIndex - 1 >= 0) {
      setactiveIndex((activeIndex) => activeIndex - 1);
    }
  };
  const onnext = () => {
    if (activeIndex + 1 < image.length) {
      setactiveIndex((activeIndex) => activeIndex + 1);
    }
  };

  useEffect(() => {
    const timeId = setInterval(() => {
      if (activeIndex < image.length - 1) {
        setactiveIndex((prev) => prev + 1);
      } else {
        setactiveIndex(0);
      }
    }, 10000);

    return () => {
      clearInterval(timeId);
    };
  }, [activeIndex]);
  return (
    <div className=" ">
      <img
        className="ease-in-out  object-cover  duration-700 transition-all rounded-lg h-screen w-full "
        src={image[activeIndex]}
        alt=""
      />
      <div className="absolute bottom-0 h-40 bg-zinc-950/60 w-full rounded-lg">
        <p className="flex justify-center items-center h-full font-poppins">
          Hey! we have injoyed alot today
        </p>
      </div>
      <div className=" absolute top-1/2 flex justify-between w-full">
        <button onClick={onprev} className=" -ml-20">
          <IoIosArrowDropleftCircle size={40} />
        </button>
        <button onClick={onnext} className=" -mr-20">
          <IoIosArrowDroprightCircle size={40} />
        </button>
      </div>
    </div>
  );
}
