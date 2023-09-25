import React, { useEffect } from "react";
import NotesCard from "./NotesCard";
import anime from "animejs/lib/anime.es.js";
import { FaStickyNote } from "react-icons/fa";
import useFetchNotes from "../../Hooks/useFetchNotes";
import { useNavigate } from "react-router-dom";

function NotesList() {
  const notes = useFetchNotes();
  const navigate = useNavigate();
  useEffect(() => {
    anime({
      targets: " .pop-up",
      translateY: [300, 0],
      easing: "easeOutExpo",
      opacity: [0, 1],
      delay: (el, i) => 700 + 300 * i,
    });
  }, []);
  const addNewNote = () => {
    navigate('/notes/create')
  };
  return (
    <div className="flex  flex-wrap justify-evenly ">
      <div
        className="flex  items-center flex-col   justify-center active:scale-95 max-w-sm pt-6 pr-6 pl-6 pb-2  mx-4 drop-shadow-lg hover:transform hover:scale-110 border-2 xm:w-[70vw] xm:ml-0 sm:w-64 mt-4 xm:mt-3 hover:bg-[#000000b9] !hover:text-white  border-gray-200 rounded-lg shadow  dark:bg-[#27272752] dark:border-[#ffffffa8]"
        onClick={() => addNewNote()}
      >
        <FaStickyNote
          size={30}
          className="text-black flex justify-center "
          color="white"
        />
        <p className="min-h-[3rem]  text-2xl overflow-hidden  font-mono  dark:text-white">
          <strong> Add a new note</strong>
        </p>
        <p className=" text-sm   font-mono dak:text-white">Click on me</p>
      </div>
      {notes.map((ele, index) => {
        return (
          <div key={index} className="inline-block pop-up  px-3">
            <NotesCard element={ele} index={index} />
          </div>
        );
      })}
    </div>
  );
}

export default NotesList;
