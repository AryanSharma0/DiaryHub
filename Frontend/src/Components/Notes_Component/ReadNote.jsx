import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../../Redux/Notes/notes_action";
import { useNavigate, useParams } from "react-router-dom";
import { useGetData } from "../../Hooks/useGetData";
// import PopOver from "./PopOver";

// props is passed for updation of notes
function ReadNote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.authReducer.authToken);

  const { id } = useParams();

  const data = useGetData("noteReducer", id);
  const onGoback = () => {
    navigate(-1);
  };
  const onEdit = () => {
    navigate(`/notes/update/${data._id}`);
  };
  const onDelete = () => {
    dispatch(deleteNote(data._id, authToken));
    navigate(-1);
  };
  return (
    <div className="">
      <div className="modal  ">
        {/* <h1 className=" flex justify-center text-3xl">Add New Notes</h1> */}
        <div className="flex justify-center xm:w-100vw">
          <div className="rounded-2xl h-[75vh] overflow-scroll bg-white   mt-10 shadow-2xl  drop-shadow-3xl smd:mx-[10vw]  ssm:mx-[10vw] xm:w-[95vw] w-[70vw]">
            <div className=" flex  p-4 pt-6 text-gray-800 flex-col">
              <div className="flex justify-between text--gray-800">
                <div>
                  <p className="text-2xl font-mono font-bold">
                    {/* {date}-{month}-{year} */}
                    {data.time}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div></div>
                  <div>
                    <button
                      onClick={onGoback}
                      type="button"
                      className="text-gray-900  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 active:scale-95 shadow-lg"
                      data-popover-target="popover-animation"
                    >
                      Go Back
                    </button>

                    <button
                      type="button"
                      className="text-gray-900 border-b-2 focus:border-b-4 border-slate-800 bg-white border  focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 active:scale-95 shadow-lg"
                      onClick={onEdit}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-gray-900 border-b-2 focus:border-b-4 border-slate-800 bg-white border  focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 active:scale-95 shadow-lg"
                      onClick={onDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="font-Caveat rounded-md  w-[100%] border-b-2 focus:border-b-4 border-slate-800  p-1  font-bold text-3xl    focus:outline-none  placeholder:text-xl  placeholder:no-underline placeholder:font-Garamond  placeholder:text-gray-800 marker:text-xl "
                id="subject"
                // value={subject}
              >
                {data.subject}
              </div>
              <div
                id="title"
                className="  font-Caveat rounded-md border-b-2 focus:border-b-4 border-slate-800  p-1  font-semibold text-2xl    focus:outline-none  placeholder:text-xl  placeholder:no-underline placeholder:font-Garamond  placeholder:text-gray-800 marker:text-xl "
              >
                {data.title}
              </div>
              <div
                className="font-Caveat p-1 rounded-md border-b-2 shadow-lg focus:border-b-4 border-slate-800/60 font-semibold text-2xl    focus:outline-none  placeholder:text-xl  placeholder:no-underline placeholder:font-Garamond  placeholder:text-gray-800 marker:text-xl "
                id="topic"
                // value={topic}
              >
                {data.topic}
              </div>
              <div
                className="pt-10 h-max overflow-scroll outline-none text-2xl text-sky-900  font-semibold font-Satisfy leading-relaxed  caret-gray-500 placeholder:text-xl placeholder:font-Garamond  placeholder-shown:no-underline placeholder:text-gray-700 first-letter:text-7xl first-letter:font-bold first-letter:text-sky-900   first-letter:mr-3 first-letter:float-left"
                id="description"
              >
                {data.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadNote;
