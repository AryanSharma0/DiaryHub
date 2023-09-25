import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../Redux/Blog/Post/post_action";
import { useNavigate } from "react-router-dom";
function BlogPosts({ element }) {
  const date = new Date(element.date);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hour = String(date.getHours());
  const minutes = String(date.getMinutes());

  const time = `${day}/${month}/${year}  ${hour}:${minutes}`;

  return (
    <div >
      <section className="newsfeed cursor-pointer hover:transform hover:scale-105">
        <div className="card w-80  ">
          <div className="right-2 top-2 flex gap-2 absolute">
            <MenuButtonBlog id={element._id} />
          </div>
          <div className=" h-full w-80">
            {element.image && <img src={element.image} alt="post" />}
          </div>
          <div className="max-h-[10rem]  overflow-y-auto  content">
            <p className="desc w-76  ">{element.about}</p>
          </div>
            <div className="tags">
              <span>{element.tag}</span>
            </div>
          <div className="flex justify-end mx-4">
            <small>{time}</small>{" "}
          </div>
        </div>
      </section>
    </div>
  );
}

export function MenuButtonBlog(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.authReducer.authToken);

  const removePost = () => {
    dispatch(deletePost(props.id, authToken));
  };
  const navigate = useNavigate();

  const updatePost = () => {
    // dispatch(updatePost(props.id,authToken));
    navigate(`/blogs/update/${props.id}`);
  };
  return (
    <>
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="flex w-[30px] justify-center  items-center h-[30px] rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <FaEllipsisV size={20} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={updatePost}
                  className={classNames(
                    active ? "bg-gray-300 h-fit rounded-md" : "",
                    "block px-4 py-2 text-sm text-gray-700 w-full"
                  )}
                >
                  Update
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={removePost}
                  className={classNames(
                    active ? "bg-gray-300 rounded-md" : "",
                    "block px-4 py-2 text-sm text-gray-700 w-full"
                  )}
                >
                  Delete
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}

export default BlogPosts;
