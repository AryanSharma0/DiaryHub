import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const description =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde dolore saepe, eos dolor aspernatur debitis odit fugit laboriosam enim sunt consequatur suscipit nobis, dicta ab incidunt deleniti vel sequi. Ipsam cum asperiores iusto at ducimus consequatur nostrum. Sed, asperiores. Consequatur, veniam aliquam, tempore ducimus minima nostrum beatae fugiat iure expedita corporis quod veritatis praesentium consectetur. Officiis ex rerum eligendi esse facilis, doloremque autem modi. Quod a modi iure repellat ipsum magnam voluptas quaerat explicabo atque facere id officiis harum fuga tempora possimus, rerum, reprehenderit suscipit eaque recusandae necessitatibus repellendus, eius doloribus? Vitae, asperiores laborum modi quia rem, est officia in optio quibusdam voluptas odio voluptate omnis tempora iusto eos at natus nobis fugiat nihil a molestiae culpa. Minus corporis aspernatur praesentium autem debitis odit nostrum facere unde error dolorum! Ipsum voluptatum doloremque maiores, aperiam quod assumenda minus explicabo blanditiis fuga. ewk werwl mc;pds dfdor";
  const notes = [
    {
      title: "Noteworthy technology acquisitions 2021",
      topic: "Environmental Science",
      time: "43-3434",

      subject: "Diary",
      headlines: ["fsdf", "fsda"],
      description,
    },
    {
      title: "Noteworthy technology acquisitions 2021",
      topic: "overloading",
      time: "",

      subject: "Computer Science",
      headlines: ["fsdf", "fsda"],
      description,
    },
    {
      title: "Noteworthy technology acquisitions 2021",
      topic: "Environmental Science",
      time: "",

      subject: "Diary",
      headlines: ["fsdf", "fsda"],
      description,
    },
   
  ];

  // For changing editer and viewer
  const [openEditor, setOpenEditor] = useState(false);
  const [openReader, setOpenReader] = useState(false);

  const [userNotes, setUserNotes] = useState(notes);
  const [readComponent, setReadComponent] = useState({});

  const reader = { openReader, setOpenReader, readComponent, setReadComponent };
  // Add a Notes
  const addNote = (title, topic, description, subject) => {
    // TODO: API Call
    const note = { title, topic, description, subject, date: Date.now() };

    setUserNotes(userNotes.concat(note));
    console.log(userNotes);
  };
  // Delete a Note
  const deleteNote = () => {};
  // Update a  Note
  const updateNote = () => {};
  return (
    <NoteContext.Provider
      value={{
        userNotes,
        openEditor,
        addNote,
        deleteNote,
        updateNote,
        setOpenEditor,
        reader,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
