import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteDiary } from "../../Redux/Diary/diary_action";
import { useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
function ShowDiary({ element, index }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.authReducer.authToken);

  const onReadButton = () => {
    navigate(`/diary/read/${element._id}`);
  };
  const removeDiary = (id) => {
    dispatch(deleteDiary(id, authToken));
  };
  const date = new Date(element.date);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const time = `${day}/${month}/${year}`;

  return (
    <>
      <div className="max-w-sm pt-6 mt-7 pr-6 pl-6 pb-2  bg-white mx-4 drop-shadow-lg hover:transform  border xm:w-[70vw] xm:ml-0 sm:w-64  xm:mt-3 hover:bg-[#dbdbdbf3] !hover:text-white  border-gray-200 rounded-lg shadow  dark:bg-white dark:border-[#79a3a3a8]">
        <div className="absolute bg-transparent rounded-full border-4 border-transparent  text-2xl top-[0px] right-[0px]">
          <div className="flex justify-between gap-2">
            <div>{String.fromCodePoint(element.mood)}</div>
            <div
              className="cursor-pointer hover:text-white  hover:shadow-xl hover:scale-105 active:scale-95 rounded-lg"
              onClick={() => removeDiary(element._id)}
            >
              <AiOutlineDelete size={30} color="black" />
            </div>
          </div>
        </div>

        <h5 className="mb-2 multiline-headline  overflow-hidden h-30  font-serif text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
          {element.title}
        </h5>
        <p className="h-[7.8rem] multiline-text overflow-hidden mb-3 font-mono text-black dark:text-black">
          {element.description}
        </p>
        <button
          onClick={() => onReadButton(index)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-black-800 focus:ring-4 focus:outline-none focus:ring-black dark:bg-black  "
        >
          Read more
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <p className="flex justify-end text-xs text-gray-700 ">{time}</p>
      </div>
    </>
  );
}

export default ShowDiary;
