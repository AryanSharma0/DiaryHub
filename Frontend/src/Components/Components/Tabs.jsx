import React from "react";
import { Link } from "react-router-dom";

function Tabs({ active }) {
  const navigation = [
    {
      name: "Dashboard",
      href: "/diary",
      d: "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
    },
    {
      name: "Notes",
      href: "/notes",
      d: "M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z",
    },
    {
      name: "Personal Blog",
      href: "/blogs",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z",
    },
// For future purpose
    // {
    //   name: "Calendar",
    //   href: "/calender",
    //   d: "M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z",
    // },
  ];

  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {navigation.map((ele, index) => {
            return (
              <li key={index} className="mr-2">
                <Link
                  to={ele.href}
                  className={
                    ele.name === active
                      ? "inline-flex p-4   border-b-2 border-white rounded-t-lg active dark:text-[#ffffff] font-bold dark:border-white group"
                      : "inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-400 hover:border-gray-100 dark:hover:text-gray-100 hover:font-bold dark:text-gray-300 group"
                  }
                  aria-current={ele.current ? "page" : undefined}
                  // onClick={() => setCurrent(ele.name)}
                >
                  <svg
                    aria-hidden="true"
                    className={
                      ele.name === active
                        ? "w-5 h-5 mr-2 text-white dark:text-white "
                        : "w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500  dark:text-gray-300  dark:group-hover:text-gray-300"
                    }
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d={ele.d}
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <div
                    className={
                      ele.name === active
                        ? "  text-white dark:text-white "
                        : " text-gray-400 group-hover:text-gray-500  dark:text-gray-300  dark:group-hover:text-gray-300"
                    }
                  >
                    {ele.name}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Tabs;
