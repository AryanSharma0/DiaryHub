import React from "react";
import { useNavigate } from "react-router-dom";

function NotesCard({ element, index }) {
  const navigate = useNavigate();
  const onRead = () => {
    navigate(`/notes/read/${element._id}`);
  };
  return (
    <>
      <div
        key={element._id}
        className="max-w-sm pt-6 pr-6 pl-6 pb-2 bg-white mx-4 drop-shadow-lg hover:transform hover:scale-110 border xm:w-[70vw] xm:ml-0 sm:w-64 mt-4 xm:mt-3 hover:bg-[#f8c057] !hover:text-white  border-gray-200 rounded-lg shadow  dark:bg-white dark:border-[#79a3a3a8]"
      >
        <strong
          to="#"
          className="inline-flex absolute top-[-0.5rem] border-white border-2 right-[-0.5rem] items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-black-800 focus:ring-4 focus:outline-none focus:ring-black dark:bg-black  "
        >
          {element.subject}
        </strong>
        <div to="#">
          <h5 className="mb-2 font-serif text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
            {element.title}
          </h5>
        </div>
        <p className="min-h-[3rem] overflow-hidden mb-3 font-mono text-black dark:text-black">
          <strong> Topic : </strong>
          {element.topic}
        </p>
        <button
          onClick={onRead}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-black-800 focus:ring-4 focus:outline-none focus:ring-black dark:bg-black  "
        >
          Read It
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
        <p className="flex justify-end text-xs text-gray-700 ">
          {element.time}
        </p>
      </div>
    </>
  );
}

export default NotesCard;
