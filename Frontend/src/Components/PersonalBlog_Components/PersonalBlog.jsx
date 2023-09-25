import React, { useEffect } from "react";
import { Background } from "./Background";
import anime from "animejs/lib/anime.es.js";
import "../../Styles/Blog.css";
import BlogPosts from "./blogPosts";
import { useNavigate } from "react-router-dom";
import { useFetchBlog } from "../../Hooks/useFetchBlog";
import {  useSelector } from "react-redux";
import Tabs from "../Components/Tabs";
import { BsCamera } from "react-icons/bs";

// import BlogHighlight from "./BlogHighlight";
// import { MdOutlineAdd } from "react-icons/md";
// import { addHighlight } from "../../Redux/Blog/Highlight/highlight_action";
function PersonalBlog() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const data = useSelector((state) => state.postReducer.data);
  // const highlight = useSelector((state) => state.highlightReducer.data);

  useEffect(() => {
    anime({
      targets: ".nav .icon i",
      translateX: [100, 0],
      duration: 1200,
      opacity: [0, 1],
      delay: (el, i) => {
        return 300 + 100 * i;
      },
    });

    anime({
      targets: ".nav .icon p",
      duration: 1200,
      opacity: [0, 1],
      delay: 700,
    });

    anime({
      targets: ".live .person",
      translateY: [100, 0],
      duration: 1200,
      opacity: [0, 1],
      delay: (el, i) => {
        return 1000 + 100 * i;
      },
    });

    anime({
      targets: ".newsfeed .card",
      translateY: [300, 0],
      easing: "easeOutExpo",
      opacity: [0, 1],
      delay: (el, i) => 700 + 300 * i,
    });
  });

  // Fetching data using custom hooks
  useFetchBlog();

  const addPost = () => {
    navigate("/blogs/add");
  };
  // const authToken = useSelector((state) => state.authReducer.data);
  // //  Adding highlight
  // const addNewHighlight = () => {
  //   navigate("highlight/add/dsafdjafkbdk");
  // };

  return (
    <div>
      {/* <div className="fixed "> */}
      <div className=" absolute w-screen h-screen flex justify-center item-center ">
        <Background />
      </div>
      {/* </div> */}

      <section className=" absolute overflow-hidden ">
        <div className=" fixed">
          <div className=" fixed  h-screen w-screen lg:w-[80vw] lg:mx-[10vw]   bg-neutral-800/50 mx-2  backdrop-blur-sm "></div>
        </div>
      </section>
      <div className="flex  relative drop-shadow-xl pt-10 xm:pt-0    md:px-5 px-3  md:mx-2    lg:px-20 xl:px-[10vw]   overflow-hidden     shadow-xl    ">
        <section className="hide-scroll-bar relative pt-10 overflow-auto   md:px-5 px-3  md:mx-2   text-white">
          <div className="flex  overflow-x-scroll pb-10 hide-scroll-bar">
            <div className="w-screen text-white flex xm:justify-end justify-between">
              <div className=" flex justify-start xm:hidden ">
                <Tabs active="Personal Blog" />
              </div>
              <button
                onClick={addPost}
                className=" flex cursor-pointer xm:hidden min-w-20  active:scale-95 max-w-sm    mx-4 drop-shadow-lg hover:transform hover:scale-110 border-2   xm:ml-0 p-2 mt-4 xm:mt-3 hover:bg-[#000000b9] !hover:text-white  border-gray-200 rounded-lg shadow  dark:bg-[#27272752] dark:border-[#ffffffa8]"
              >
                <BsCamera className=" " />
              </button>
            </div>
          </div>
          <div>
            {/* <div className="flex hide-scroll-bar overflow-x-auto flex-row  pb-10 ">
              <div className="flex  ">
                <button
                  onClick={addNewHighlight}
                  className="live hover:transform hover:scale-110 hide-scroll-bar"
                >
                  <div className="person cursor-pointer flex justify-center drop-shadow-xl items-center flex-col  ">
                    <div className="flex justify-center bg-gray-700/50  border-cyan-950 border-2 rounded-[50%] h-[40px] w-[40px]">
                      <MdOutlineAdd size={40} color="white" />
                    </div>
                    <p className="name font-bold  !mt-[-10px] flex justify-center align-middle">
                      Add highlight
                    </p>
                  </div>
                </button>
                {highlight.map((ele) => {
                  return (
                    <section
                      key={ele._id}
                      className="live   hover:transform ease-in hover:scale-110 hide-scroll-bar drop-shadow-lg"
                    >
                      <div className="person flex cursor-pointer flex-col items-center justify-center ">
                        <BlogHighlight element={ele} />
                      </div>
                    </section>
                  );
                })}
              </div>
            
            
            </div> */}
          </div>
          <div>
            <div className="flex  flex-wrap justify-center  hide-scroll-bar">
              {data.length !== 0 ? (
                data.map((ele) => {
                  return <BlogPosts key={ele._id} element={ele} />;
                })
              ) : (
                <div>No data inserted till now</div>
              )}
            </div>
          </div>

          <div className="space"></div>
        </section>
      </div>
    </div>
  );
}

export default PersonalBlog;
