import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDiary, updateDiary } from "../../Redux/Diary/diary_action";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetData } from "../../Hooks/useGetData";

function NewDiary() {
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const moodOption = [
    128512, 128514, 128517, 128519, 128520, 128522, 128536, 128545, 128557,
    129327,
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const authToken = useSelector((state) => state.authReducer.authToken);

  // Temporory fetching data from component
  const diary = useGetData("diaryReducer", id);
  const tempData =
    location.pathname === "/diary/create"
      ? {
          title: "",
          description: "",
          mood: "128512",
        }
      : diary;
  const [formdata, setformdata] = useState(tempData);

  const dispatch = useDispatch();

  // Navigating back
  const goback = () => {
    navigate(-1);
  };

  // On Save Function\
  const onSave = async () => {
    setformdata((prevData) => ({ ...prevData, time: Date.now() }));
    const newData = formdata;

    location.pathname === "/diary/create"
      ? dispatch(addDiary(newData, authToken))
      : dispatch(updateDiary(newData, authToken));
    navigate("/diary");
  };

  // Form Submit Function
  const onFormSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setformdata((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div>
      <div className="modal mt-10 shadow-2xl drop-shadow-3xl">
        <div className="rounded-2xl bg-white overflow-hidden">
          <div className=" flex  p-4 pt-6 xm:pt-3 text-gray-800 flex-col">
            <div className="flex justify-between  xm:flex-col-reverse text-gray-800">
              <div>
                <p className="text-2xl font-mono font-bold">
                  {date}-{month}-{year}
                </p>
              </div>
              <div className="flex gap-4 xm:justify-between">
                <div>
                  <select
                    name="mood"
                    onChange={(event) => {
                      onFormSubmit(event);
                    }}
                    id="countries"
                    className=" bg-gray-50 border text-2xl border-gray-300 text-gray-900  rounded-full  h-10 w-16 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-md drop-shadow-md "
                    value={formdata.mood}
                  >
                    {moodOption.map((element, index) => {
                      return (
                        <option
                          key={index}
                          className="text-[2rem]"
                          value={moodOption[index]}
                        >
                          {String.fromCodePoint(element)}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <button
                    type="button"
                    className="text-gray-900  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 active:scale-95 shadow-lg"
                    onClick={goback}
                    data-popover-target="popover-animation"
                  >
                    Go Back
                  </button>

                  <button
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 active:scale-95 shadow-lg"
                    onClick={() => onSave()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            <input
              type="text"
              placeholder="Enter your Title"
              className="font-Madi Cursive p-1 underline underline-offset-8 caret-gray-500 font-bold text-5xl    focus:outline-none border-slate-500 placeholder:text-xl  placeholder:no-underline placeholder:font-Garamond  placeholder:text-gray-800 marker:text-xl "
              name="title"
              onChange={(e) => {
                onFormSubmit(e);
              }}
              value={formdata.title}
            />
            <textarea
              value={formdata.description}
              className="pt-10 h-[60vh] outline-none text-2xl text-sky-900 underline underline-offset-8 font-semibold font-Satisfy leading-relaxed  caret-gray-500 placeholder:text-xl placeholder:font-Garamond  placeholder-shown:no-underline placeholder:text-gray-700 first-letter:text-7xl first-letter:font-bold first-letter:text-white   first-letter:mr-3 first-letter:float-left"
              name="description"
              id=""
              placeholder="Enter the description"
              cols="30"
              rows="30"
              onChange={(e) => {
                onFormSubmit(e);
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewDiary;
