import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, updateNote } from "../../Redux/Notes/notes_action";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetData } from "../../Hooks/useGetData";

function NewNotes() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.authReducer.authToken);

  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const { id } = useParams();
  const note = useGetData("noteReducer", id);

  const tempData =
    location.pathname === "/notes/create"
      ? {
          title: "",
          description: "",
          subject: "",
          topic: "",
        }
      : note;
  const [formdata, setFormdata] = useState(tempData);

  const onSave = async () => {
    location.pathname === "/notes/create"
      ? dispatch(addNote(formdata, authToken))
      : dispatch(updateNote(formdata, authToken));
    navigate("/notes");
  };

  const onChange = (e) => {
    setFormdata((prevNote) => ({
      ...prevNote,
      [e.target.name]: e.target.value,
    }));
  };

  const moveBack = () => {
    navigate(-1);
  };

  return (
    <div className="">
      <div className="modal  ">
        <div className="flex justify-center xm:w-100vw">
          <div className="rounded-2xl bg-white overflow-hidden   mt-10 shadow-2xl  drop-shadow-3xl smd:mx-[10vw]  ssm:mx-[10vw] xm:w-[95vw] w-[70vw]">
            <div className=" flex  p-4 pt-6 text-gray-800 flex-col">
              <div className="flex justify-between text--gray-800">
                <div>
                  <p className="text-2xl font-mono font-bold">
                    {date}-{month}-{year}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div></div>
                  <div>
                    <button
                      type="button"
                      className="text-gray-900  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 active:scale-95 shadow-lg"
                      onClick={() => moveBack()}
                      data-popover-target="popover-animation"
                    >
                      Go Back
                    </button>

                    <button
                      type="button"
                      className="text-gray-900 border-b-2 focus:border-b-4 border-slate-800 bg-white border  focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 active:scale-95 shadow-lg"
                      onClick={onSave}
                      disabled={
                        formdata.subject.length < 3 ||
                        formdata.title.length < 3 ||
                        formdata.description.length < 3 ||
                        formdata.topic.length < 3
                      }
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="font-Caveat rounded-md  w-[100%] border-b-2 focus:border-b-4 border-slate-800  p-1  font-bold text-3xl    focus:outline-none  placeholder:text-xl  placeholder:no-underline placeholder:font-Garamond  placeholder:text-gray-800 marker:text-xl "
                onChange={onChange}
                name="subject"
                id="subject"
                value={formdata.subject}
                minLength={3}
                required
              />

              <input
                id="title"
                type="text"
                placeholder="Title"
                className="  font-Caveat rounded-md border-b-2 focus:border-b-4 border-slate-800  p-1  font-semibold text-2xl    focus:outline-none  placeholder:text-xl  placeholder:no-underline placeholder:font-Garamond  placeholder:text-gray-800 marker:text-xl "
                onChange={onChange}
                name="title"
                value={formdata.title}
                minLength={3}
                required
              />
              <input
                type="text"
                placeholder="Topic"
                className="font-Caveat p-1 rounded-md border-b-2 shadow-lg focus:border-b-4 border-slate-800/60 font-semibold text-2xl    focus:outline-none  placeholder:text-xl  placeholder:no-underline placeholder:font-Garamond  placeholder:text-gray-800 marker:text-xl "
                onChange={onChange}
                name="topic"
                id="topic"
                value={formdata.topic}
                minLength={3}
                required
              />
              <textarea
                value={formdata.description}
                className="pt-10 h-[60vh] outline-none text-2xl text-sky-900  font-semibold font-Satisfy leading-relaxed  caret-gray-500 placeholder:text-xl placeholder:font-Garamond  placeholder-shown:no-underline placeholder:text-gray-700 first-letter:text-7xl first-letter:font-bold first-letter:text-white   first-letter:mr-3 first-letter:float-left"
                name="description"
                id="description"
                placeholder="Enter the description"
                cols="30"
                rows="30"
                onChange={onChange}
                minLength={3}
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewNotes;
