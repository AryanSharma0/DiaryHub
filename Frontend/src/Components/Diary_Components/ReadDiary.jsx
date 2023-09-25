import { useNavigate, useParams } from "react-router-dom";
import { useGetData } from "../../Hooks/useGetData";

function ReadDiary() {
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const { id } = useParams();

  const openDiaryData = useGetData("diaryReducer", id);
  const goback = () => {
    navigate(-1);
  };
  const openEditorComponent = () => {
    navigate(`/diary/update/${id}`);
  };
  return (
    <div className="modal mt-10 mb-3 shadow-2xl drop-shadow-3xl">
      <div className="rounded-2xl bg-white overflow-hidden">
        <div className=" flex  p-4 pt-6 text-gray-800 flex-col">
          <div className="flex justify-between text--gray-800">
            <div>
              <p className="text-2xl font-mono font-bold">
                {date}-{month}-{year}
              </p>
            </div>
            <div className="flex gap-4">
              <div>
                <div className=" flex justify-center items-center bg-gray-50 border text-2xl border-gray-300 text-gray-900  rounded-full  h-10 w-16 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-md drop-shadow-md ">
                  {openDiaryData.mood?String.fromCodePoint(openDiaryData.mood):""}
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="text-gray-900  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 active:scale-95 shadow-lg"
                  onClick={() => goback()}
                  data-popover-target="popover-animation"
                >
                  Go Back
                </button>
                <button
                  type="button"
                  className="text-gray-900  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 active:scale-95 shadow-lg"
                  onClick={openEditorComponent}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className="font-Madi Cursive p-1 underline underline-offset-8 caret-gray-500 font-bold text-5xl    focus:outline-none border-slate-500 placeholder:text-xl  placeholder:no-underline placeholder:font-Garamond  placeholder:text-gray-800 marker:text-xl ">
            {openDiaryData.title}
          </div>
          <div className=" overflow-scroll pt-10  min-h-[50vh] outline-none text-2xl text-sky-900 underline underline-offset-8 font-semibold font-Satisfy leading-relaxed  caret-gray-500 placeholder:text-xl placeholder:font-Garamond  placeholder-shown:no-underline placeholder:text-gray-700 first-letter:text-7xl first-letter:font-bold first-letter:text-sky-900   first-letter:mr-3 first-letter:float-left">
            {openDiaryData.description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadDiary;
